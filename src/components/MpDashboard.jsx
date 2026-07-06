import React, { useState, useEffect } from "react";

import * as Lucide from "lucide-react";
import { initialWards, projectTemplates, defaultPrioritiesList } from "../data/mockData";

const categories = [
  { id: "Water", label: "Water Supply" },
  { id: "Education", label: "Education" },
  { id: "Health", label: "Healthcare" },
  { id: "Roads", label: "Roads & Bridges" },
  { id: "Transport", label: "Public Transit" },
  { id: "Electricity", label: "Electricity" },
  { id: "Sanitation", label: "Sanitation" }
];

export default function MpDashboard({ suggestions, onUpdateStatus, onBackToHome }) {
  // local tab state within MP dashboard: 'feed' (Page 5), 'proposals' (Page 7), 'context' (Page 8)
  const [activeTab, setActiveTab] = useState("feed");

  // Filters state (Page 5)
  const [selectedWard, setSelectedWard] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Detailed view state (Page 6)
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  // Active playing audio card state
  const [playingAudioId, setPlayingAudioId] = useState(null);
  const [audioProgress, setAudioProgress] = useState(0);

  // Hovered ward map state
  const [hoveredWard, setHoveredWard] = useState(null);

  // Audio simulator timer
  useEffect(() => {
    let interval = null;
    if (playingAudioId) {
      interval = setInterval(() => {
        setAudioProgress(p => {
          if (p >= 100) {
            setPlayingAudioId(null);
            return 0;
          }
          return p + 10;
        });
      }, 300);
    } else {
      setAudioProgress(0);
    }
    return () => clearInterval(interval);
  }, [playingAudioId]);

  const handlePlayAudio = (id, e) => {
    e.stopPropagation(); // don't trigger card expansion click
    if (playingAudioId === id) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(id);
      setAudioProgress(0);
    }
  };

  // Infrastructure gap calculator
  const calculateGapScore = (ward, category) => {
    if (!ward) return 50;
    switch (category) {
      case "Water":
        return Math.max(0, 100 - ward.waterQualityIndex);
      case "Education":
        const distScore = Math.min(50, ward.avgSchoolTravelDistance * 10);
        const enrollScore = Math.max(0, 50 - (ward.schoolEnrollmentRate - 50));
        return Math.round(distScore + enrollScore);
      case "Health":
        const timeScore = Math.min(50, ward.avgHealthCentreTravelTime * 1.5);
        const bedScore = Math.max(0, 50 - (ward.hospitalBedsPer1000 * 20));
        return Math.round(timeScore + bedScore);
      case "Roads":
        return Math.round((10 - ward.roadQualityIndex) * 10);
      case "Electricity":
        return Math.round(ward.powerDeficit * 4);
      case "Sanitation":
        return Math.round(100 - ward.waterQualityIndex * 1.1);
      case "Transport":
        return Math.round(ward.avgSchoolTravelDistance * 12);
      default:
        return 50;
    }
  };

  // Helper to fetch ward gap specific indicator details
  const getContextIndicatorLabel = (ward, category) => {
    if (!ward) return "N/A";
    switch (category) {
      case "Water":
        return `Water WQI is ${ward.waterQualityIndex}/100`;
      case "Education":
        return `School travel distance is ${ward.avgSchoolTravelDistance} km (Enrollment: ${ward.schoolEnrollmentRate}%)`;
      case "Health":
        return `Health travel time is ${ward.avgHealthCentreTravelTime} mins (Beds: ${ward.hospitalBedsPer1000}/1k)`;
      case "Roads":
        return `Road Quality Index is ${ward.roadQualityIndex}/10`;
      case "Electricity":
        return `Peak Power Deficit is ${ward.powerDeficit}%`;
      case "Sanitation":
        return `Sanitation Gap Index is ${Math.round(100 - ward.waterQualityIndex * 1.1)}/100`;
      case "Transport":
        return `Access school travel proxy is ${ward.avgSchoolTravelDistance} km`;
      default:
        return "General infrastructure needs";
    }
  };

  // Dynamic Suggestion Priority Scorer
  const calculateSuggestionScore = (sugg) => {
    // 1. Urgency factor
    const urgencyWeightMap = { Critical: 100, High: 75, Medium: 50, Low: 25 };
    const urgencyScore = urgencyWeightMap[sugg.urgency] || 50;

    // 2. Citizen Demand factor (based on how many complaints in the same ward for this category)
    const categoryCount = suggestions.filter(s => s.wardId === sugg.wardId && s.category === sugg.category).length;
    const demandScore = Math.min(100, categoryCount * 12 + 30);

    // 3. Official Ward Gaps factor
    const ward = initialWards.find(w => w.id === sugg.wardId);
    const gapScore = calculateGapScore(ward, sugg.category);

    // Weighted average
    const finalScore = Math.round((urgencyScore * 0.4) + (demandScore * 0.3) + (gapScore * 0.3));
    return {
      finalScore,
      breakdown: {
        urgency: urgencyScore,
        demand: demandScore,
        gap: gapScore,
        indicatorText: getContextIndicatorLabel(ward, sugg.category)
      }
    };
  };

  // Scored suggestions pipeline
  const scoredSuggestions = suggestions.map(s => {
    const scores = calculateSuggestionScore(s);
    return {
      ...s,
      score: scores.finalScore,
      breakdown: scores.breakdown
    };
  });

  // Filtered submissions list
  const filteredSubmissions = scoredSuggestions.filter(s => {
    const matchWard = selectedWard === "all" || s.wardId === selectedWard;
    const matchCat = selectedCategory === "all" || s.category === selectedCategory;
    const matchStatus = selectedStatus === "all" || s.status === selectedStatus;
    
    const query = searchQuery.toLowerCase();
    const matchSearch = query === "" || 
      s.userName.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.translatedText.toLowerCase().includes(query) ||
      s.category.toLowerCase().includes(query);

    return matchWard && matchCat && matchStatus && matchSearch;
  });

  // Sort by priorityScore descending
  const rankedSubmissions = [...filteredSubmissions].sort((a, b) => b.score - a.score);

  // Statistics calculation
  const totalCount = suggestions.length;
  const pendingCount = suggestions.filter(s => s.status === "Pending").length;
  const inProgressCount = suggestions.filter(s => s.status === "In Progress").length;
  const resolvedCount = suggestions.filter(s => s.status === "Resolved").length;

  // Heatmap color helper — complaint density per ward
  const getWardHeatmapColor = (wardId) => {
    const count = suggestions.filter(s => s.wardId === wardId).length;
    if (count === 0) return "rgba(30, 41, 59, 0.6)";
    if (count <= 2) return "rgba(34, 197, 94, 0.25)";
    if (count <= 4) return "rgba(234, 179, 8, 0.25)";
    if (count <= 6) return "rgba(249, 115, 22, 0.25)";
    return "rgba(239, 68, 68, 0.35)";
  };

  const getWardHeatmapStroke = (wardId) => {
    const count = suggestions.filter(s => s.wardId === wardId).length;
    if (count === 0) return "rgba(255,255,255,0.1)";
    if (count <= 2) return "rgba(34, 197, 94, 0.6)";
    if (count <= 4) return "rgba(234, 179, 8, 0.6)";
    if (count <= 6) return "rgba(249, 115, 22, 0.6)";
    return "rgba(239, 68, 68, 0.8)";
  };

  // Find active Ward info object
  const activeWardInfo = selectedWard !== "all" ? initialWards.find(w => w.id === selectedWard) : null;

  return (
    <div className="page-container" style={{ padding: "1.5rem" }}>
      
      {/* ----------------- TABS / NAVIGATION HEADER ----------------- */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem", flexWrap: "wrap", gap: "1rem" }}>
        <div className="mp-nav-tabs" style={{ margin: 0 }}>
          <button 
            type="button" 
            className={`mp-tab-btn ${activeTab === "feed" ? "active" : ""}`}
            onClick={() => setActiveTab("feed")}
          >
            <Lucide.List size={16} /> Submissions Feed
          </button>
          
          <button 
            type="button" 
            className={`mp-tab-btn ${activeTab === "proposals" ? "active" : ""}`}
            onClick={() => setActiveTab("proposals")}
          >
            <Lucide.Sparkles size={16} /> Comparative Proposals
          </button>
          
          <button 
            type="button" 
            className={`mp-tab-btn ${activeTab === "context" ? "active" : ""}`}
            onClick={() => setActiveTab("context")}
          >
            <Lucide.Database size={16} /> AI Context Telemetry
          </button>
        </div>

        <button 
          type="button" 
          className="btn-nav-back"
          onClick={onBackToHome}
          style={{ margin: 0 }}
        >
          <Lucide.LogOut size={14} /> Logout
        </button>
      </div>

      {/* ----------------- PAGE 5: Submissions Ranked Grid & Map ----------------- */}
      {activeTab === "feed" && (
        <div className="dashboard-grid">
          
          {/* Left Column: Tilted Map Visualization & Mini Themes */}
          <div className="dashboard-left">
            
            {/* Live Telemetry Stats Widgets */}
            <div className="stats-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
              <div className="stat-widget-3d" style={{ padding: "0.85rem 1.25rem" }}>
                <div className="stat-icon-wrapper cyan" style={{ padding: "0.4rem" }}><Lucide.Users size={16} /></div>
                <div>
                  <div className="stat-value" style={{ fontSize: "1.25rem" }}>{totalCount}</div>
                  <div className="stat-label" style={{ fontSize: "0.7rem" }}>Total Submissions</div>
                </div>
              </div>
              <div className="stat-widget-3d" style={{ padding: "0.85rem 1.25rem" }}>
                <div className="stat-icon-wrapper red" style={{ padding: "0.4rem" }}><Lucide.AlertCircle size={16} /></div>
                <div>
                  <div className="stat-value" style={{ fontSize: "1.25rem" }}>{pendingCount}</div>
                  <div className="stat-label" style={{ fontSize: "0.7rem" }}>Pending AI Review</div>
                </div>
              </div>
              <div className="stat-widget-3d" style={{ padding: "0.85rem 1.25rem" }}>
                <div className="stat-icon-wrapper purple" style={{ padding: "0.4rem" }}><Lucide.Clock size={16} /></div>
                <div>
                  <div className="stat-value" style={{ fontSize: "1.25rem" }}>{inProgressCount}</div>
                  <div className="stat-label" style={{ fontSize: "0.7rem" }}>In Progress Works</div>
                </div>
              </div>
              <div className="stat-widget-3d" style={{ padding: "0.85rem 1.25rem" }}>
                <div className="stat-icon-wrapper green" style={{ padding: "0.4rem" }}><Lucide.CheckCircle size={16} /></div>
                <div>
                  <div className="stat-value" style={{ fontSize: "1.25rem" }}>{resolvedCount}</div>
                  <div className="stat-label" style={{ fontSize: "0.7rem" }}>Resolved Priorities</div>
                </div>
              </div>
            </div>

            {/* 3D Map Selection Card */}
            <div className="glass-card-3d map-card" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
                <div>
                  <h4 style={{ fontWeight: "700", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Lucide.MapPin size={18} style={{ color: "#9b51e0" }} />
                    Constituency Map Bounds
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Heatmap of demands per zone.</p>
                </div>
                {selectedWard !== "all" && (
                  <button type="button" className="action-brief-btn-3d" style={{ padding: "0.25rem 0.5rem", fontSize: "0.65rem" }} onClick={() => setSelectedWard("all")}>
                    Reset Map
                  </button>
                )}
              </div>

              <div className="map-viz-container" style={{ height: "230px" }}>
                <svg viewBox="0 0 600 400" className="interactive-map-svg" style={{ transform: "perspective(800px) rotateX(15deg) translateY(-20px)" }}>
                  {/* Zone 1 - Ganga Nagar */}
                  <polygon
                    points="100,80 300,50 350,150 150,180"
                    style={{ fill: selectedWard === "ward-1" ? "rgba(155,81,224,0.3)" : getWardHeatmapColor("ward-1"), stroke: selectedWard === "ward-1" ? "#9b51e0" : getWardHeatmapStroke("ward-1"), strokeWidth: selectedWard === "ward-1" ? 4 : 2, cursor: "pointer", transition: "all 0.3s ease" }}
                    onClick={() => setSelectedWard("ward-1")}
                    onMouseEnter={() => setHoveredWard("Zone 1 - Ganga Nagar")}
                    onMouseLeave={() => setHoveredWard(null)}
                  />
                  {/* Zone 2 - Vikas Nagar */}
                  <polygon
                    points="300,50 500,70 520,180 350,150"
                    style={{ fill: selectedWard === "ward-2" ? "rgba(155,81,224,0.3)" : getWardHeatmapColor("ward-2"), stroke: selectedWard === "ward-2" ? "#9b51e0" : getWardHeatmapStroke("ward-2"), strokeWidth: selectedWard === "ward-2" ? 4 : 2, cursor: "pointer", transition: "all 0.3s ease" }}
                    onClick={() => setSelectedWard("ward-2")}
                    onMouseEnter={() => setHoveredWard("Zone 2 - Vikas Nagar")}
                    onMouseLeave={() => setHoveredWard(null)}
                  />
                  {/* Zone 3 - Shanti Nagar */}
                  <polygon
                    points="150,180 350,150 380,280 200,320"
                    style={{ fill: selectedWard === "ward-3" ? "rgba(155,81,224,0.3)" : getWardHeatmapColor("ward-3"), stroke: selectedWard === "ward-3" ? "#9b51e0" : getWardHeatmapStroke("ward-3"), strokeWidth: selectedWard === "ward-3" ? 4 : 2, cursor: "pointer", transition: "all 0.3s ease" }}
                    onClick={() => setSelectedWard("ward-3")}
                    onMouseEnter={() => setHoveredWard("Zone 3 - Shanti Nagar")}
                    onMouseLeave={() => setHoveredWard(null)}
                  />
                  {/* Zone 4 - Udyog Nagar */}
                  <polygon
                    points="50,180 150,180 200,320 80,300"
                    style={{ fill: selectedWard === "ward-4" ? "rgba(155,81,224,0.3)" : getWardHeatmapColor("ward-4"), stroke: selectedWard === "ward-4" ? "#9b51e0" : getWardHeatmapStroke("ward-4"), strokeWidth: selectedWard === "ward-4" ? 4 : 2, cursor: "pointer", transition: "all 0.3s ease" }}
                    onClick={() => setSelectedWard("ward-4")}
                    onMouseEnter={() => setHoveredWard("Zone 4 - Udyog Nagar")}
                    onMouseLeave={() => setHoveredWard(null)}
                  />
                  {/* Zone 5 - Janata Colony */}
                  <polygon
                    points="350,150 520,180 480,320 380,280"
                    style={{ fill: selectedWard === "ward-5" ? "rgba(155,81,224,0.3)" : getWardHeatmapColor("ward-5"), stroke: selectedWard === "ward-5" ? "#9b51e0" : getWardHeatmapStroke("ward-5"), strokeWidth: selectedWard === "ward-5" ? 4 : 2, cursor: "pointer", transition: "all 0.3s ease" }}
                    onClick={() => setSelectedWard("ward-5")}
                    onMouseEnter={() => setHoveredWard("Zone 5 - Janata Colony")}
                    onMouseLeave={() => setHoveredWard(null)}
                  />

                  {/* SVG Text Labels */}
                  <text x="210" y="110" className="ward-label-text" style={{ fontSize: "0.95rem" }}>Zone 1</text>
                  <text x="390" y="110" className="ward-label-text" style={{ fontSize: "0.95rem" }}>Zone 2</text>
                  <text x="280" y="220" className="ward-label-text" style={{ fontSize: "0.95rem" }}>Zone 3</text>
                  <text x="120" y="250" className="ward-label-text" style={{ fontSize: "0.95rem" }}>Zone 4</text>
                  <text x="430" y="240" className="ward-label-text" style={{ fontSize: "0.95rem" }}>Zone 5</text>
                </svg>

                {hoveredWard && (
                  <div style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0,0,0,0.85)", padding: "0.3rem 0.6rem", borderRadius: "6px", border: "1px solid var(--primary)", fontSize: "0.75rem" }}>
                    {hoveredWard}
                  </div>
                )}
              </div>

              {activeWardInfo && (
                <div style={{ marginTop: "1rem", background: "rgba(0,0,0,0.2)", borderRadius: "10px", padding: "0.75rem", fontSize: "0.8rem", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <strong style={{ color: "var(--primary)" }}>{activeWardInfo.name}:</strong>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem", marginTop: "0.4rem", color: "var(--text-muted)" }}>
                    <div>Population: {activeWardInfo.population.toLocaleString()}</div>
                    <div>Literacy: {activeWardInfo.literacyRate}%</div>
                    <div>Road Index: {activeWardInfo.roadQualityIndex}/10</div>
                    <div>Water WQI: {activeWardInfo.waterQualityIndex}/100</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Ranked Citizen Submissions Feed */}
          <div>
            <div className="glass-card-3d" style={{ height: "100%", padding: "1.5rem" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <h3 className="section-title" style={{ fontSize: "1.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Lucide.Sparkles style={{ color: "#00f2fe" }} />
                  Grievance Rank Feed
                </h3>
                <p className="section-subtitle">
                  AI-prioritized citizen demands based on urgency metrics, population feedback density, and constituency telemetry gaps.
                </p>
              </div>

              {/* Filters Panel at Top of Page 5 Feed */}
              <div className="feed-filters-box" style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--border-color)", padding: "1rem", borderRadius: "14px", display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <div style={{ position: "relative" }}>
                  <Lucide.Search size={14} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    placeholder="Search by keywords or reporter name..."
                    className="text-input-3d"
                    style={{ paddingLeft: "2.4rem", paddingRight: "1rem", fontSize: "0.85rem", height: "36px" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                  {/* Zone Filter */}
                  <select
                    className="status-dropdown-3d"
                    value={selectedWard}
                    onChange={(e) => setSelectedWard(e.target.value)}
                    style={{ height: "36px", fontSize: "0.8rem", padding: "0 0.5rem" }}
                  >
                    <option value="all">All Zones</option>
                    {initialWards.map((w, idx) => (
                      <option key={w.id} value={w.id}>Zone {idx + 1} - {w.name.split(" - ")[1]}</option>
                    ))}
                  </select>

                  {/* Category Filter */}
                  <select
                    className="status-dropdown-3d"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ height: "36px", fontSize: "0.8rem", padding: "0 0.5rem" }}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>

                  {/* Status Filter */}
                  <select
                    className="status-dropdown-3d"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    style={{ height: "36px", fontSize: "0.8rem", padding: "0 0.5rem" }}
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Feed Cards Container */}
              <div className="feed-cards-container" style={{ maxHeight: "550px" }}>
                {rankedSubmissions.length > 0 ? (
                  rankedSubmissions.map((sugg) => {
                    const isPlaying = playingAudioId === sugg.id;
                    const zoneIdx = initialWards.findIndex(w => w.id === sugg.wardId) + 1;
                    
                    return (
                      <div 
                        key={sugg.id} 
                        className="feed-item-card-3d"
                        style={{ cursor: "pointer", position: "relative" }}
                        onClick={() => setSelectedSubmission(sugg)}
                      >
                        {/* Priority Score circular badge floating at top right */}
                        <div style={{
                          position: "absolute",
                          right: "12px",
                          top: "12px",
                          background: "rgba(0, 0, 0, 0.4)",
                          border: "1px solid var(--primary)",
                          borderRadius: "50%",
                          width: "38px",
                          height: "38px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "0 0 10px rgba(0, 242, 254, 0.25)"
                        }}>
                          <span style={{ fontSize: "0.55rem", color: "var(--primary)", fontWeight: "800", lineHeight: "1" }}>SCORE</span>
                          <span style={{ fontSize: "0.85rem", color: "var(--text-main)", fontWeight: "800", lineHeight: "1" }}>{sugg.score}</span>
                        </div>

                        <div className="feed-card-header">
                          <span className="feed-user-name" style={{ color: "var(--text-main)", fontWeight: "700" }}>{sugg.userName}</span>
                          <span className="feed-timestamp" style={{ marginRight: "45px" }}>
                            {new Date(sugg.timestamp).toLocaleDateString([], { month: "short", day: "numeric" })}
                          </span>
                        </div>

                        <div className="feed-title-line" style={{ margin: "0.25rem 0 0.5rem 0" }}>
                          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                            Zone {zoneIdx} · {initialWards.find(w => w.id === sugg.wardId)?.name.split(" - ")[1]}
                          </span>
                        </div>

                        {/* Image preview */}
                        {sugg.mediaUrl && (
                          <div style={{ width: "100%", height: "85px", borderRadius: "8px", overflow: "hidden", marginBottom: "0.5rem", border: "1px solid var(--border-color)" }}>
                            <img src={sugg.mediaUrl} alt="Visual diagnostics" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                        )}

                        {/* Audio Memo preview */}
                        {sugg.type === "Voice" && (
                          <div className="feed-audio-player-sim" style={{ margin: "0.4rem 0" }}>
                            <button
                              type="button"
                              className="feed-audio-play-btn"
                              onClick={(e) => handlePlayAudio(sugg.id, e)}
                            >
                              {isPlaying ? <Lucide.Pause size={10} /> : <Lucide.Play size={10} style={{ marginLeft: "1px" }} />}
                            </button>
                            <div className="feed-audio-bar-sim" style={{ gap: "1px" }}>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((idx) => {
                                const active = isPlaying && audioProgress >= (idx * 8.3);
                                return (
                                  <div
                                    key={idx}
                                    className={`feed-audio-pin ${active ? "active" : ""}`}
                                    style={{ height: `${3 + (idx % 3) * 3}px`, width: "2px" }}
                                  ></div>
                                );
                              })}
                            </div>
                            <span style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}>0:05</span>
                          </div>
                        )}

                        <p className="feed-text-desc" style={{ fontSize: "0.82rem", lineBreak: "anywhere", WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", margin: "0.4rem 0" }}>
                          {sugg.translatedText || sugg.description}
                        </p>

                        <div className="feed-card-footer" style={{ borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "0.5rem", marginTop: "0.5rem" }}>
                          <div className="feed-footer-tags">
                            <span className={`status-badge-indicator ${sugg.status.replace(" ", "").toLowerCase()}`} style={{ fontSize: "0.6rem", padding: "0.1rem 0.4rem", borderWidth: "1px", borderStyle: "solid" }}>
                              {sugg.status}
                            </span>
                            <span className={`feed-pill urgency-${sugg.urgency.toLowerCase()}`} style={{ fontSize: "0.6rem" }}>
                              {sugg.urgency}
                            </span>
                            <span className={`category-tag-pill ${sugg.category.toLowerCase()}`} style={{ fontSize: "0.6rem", padding: "0.1rem 0.45rem" }}>
                              {sugg.category}
                            </span>
                          </div>
                          <span style={{ fontSize: "0.75rem", color: "var(--primary)", fontWeight: "600" }}>
                            Review details →
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "3rem 1rem", fontSize: "0.85rem" }}>
                    No citizen submissions match selected filters.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- PAGE 6: Score Breakdown Pop-up Overlay ----------------- */}
      {selectedSubmission && (
        <div className="modal-overlay-glass" style={{ zIndex: 110 }}>
          <div className="modal-content-3d" style={{ maxWidth: "600px", padding: 0 }}>
            
            <div className="modal-header" style={{ padding: "1.25rem 2rem", background: "rgba(0,0,0,0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                  background: "rgba(0, 242, 254, 0.15)",
                  border: "1px solid var(--primary)",
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                  <span style={{ fontSize: "0.55rem", color: "var(--primary)", fontWeight: "800", lineHeight: "1" }}>INDEX</span>
                  <span style={{ fontSize: "1.1rem", color: "var(--text-main)", fontWeight: "800", lineHeight: "1" }}>{selectedSubmission.score}</span>
                </div>
                <div>
                  <h3 className="modal-title" style={{ fontSize: "1.25rem" }}>AI Score Breakdown</h3>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    Reporter: {selectedSubmission.userName} | Channel: {selectedSubmission.type}
                  </span>
                </div>
              </div>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setSelectedSubmission(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body" style={{ padding: "1.5rem 2rem" }}>
              {/* Submission details */}
              <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "12px", padding: "1rem", border: "1px solid var(--border-color)", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "uppercase" }}>Grievance Description</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Status Tracker</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-main)", fontStyle: "italic", lineBreak: "anywhere", marginBottom: "0.75rem" }}>
                  "{selectedSubmission.description}"
                </p>
                {selectedSubmission.translatedText && selectedSubmission.originalLanguage !== "en" && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "0.5rem", fontSize: "0.82rem", color: "var(--primary)" }}>
                    <strong>AI English Synthesis:</strong> "{selectedSubmission.translatedText}"
                  </div>
                )}
                {selectedSubmission.mediaUrl && (
                  <div style={{ marginTop: "0.75rem", width: "100%", height: "140px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-color)" }}>
                    <img src={selectedSubmission.mediaUrl} alt="Submission visual diagnostic" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}
              </div>

              {/* Score Breakdown factors */}
              <h4 className="proposal-section-title">Telemetry Index Metrics</h4>
              <div className="score-breakdown-box" style={{ margin: 0, padding: "0.75rem 1.25rem" }}>
                <div className="score-breakdown-row">
                  <div>
                    <strong>1. Citizen Demand factor</strong>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Accumulated category density inside this zone</div>
                  </div>
                  <div className="context-data-value-highlight">
                    {selectedSubmission.breakdown.demand} / 100
                  </div>
                </div>

                <div className="score-breakdown-row">
                  <div>
                    <strong>2. Incident Severity / Urgency</strong>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Severity classification: {selectedSubmission.urgency}</div>
                  </div>
                  <div className="context-data-value-highlight">
                    {selectedSubmission.breakdown.urgency} / 100
                  </div>
                </div>

                <div className="score-breakdown-row">
                  <div>
                    <strong>3. Context Gaps Analytics</strong>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>AI reference: {selectedSubmission.breakdown.indicatorText}</div>
                  </div>
                  <div className="context-data-value-highlight">
                    {selectedSubmission.breakdown.gap} / 100
                  </div>
                </div>

                <div className="score-breakdown-row" style={{ color: "var(--primary)", borderTop: "1px solid var(--border-color)", padding: "0.75rem 0 0 0", marginTop: "0.4rem" }}>
                  <div>
                    <strong>Combined Priority Index Score</strong>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Weighted algorithm synthesis</div>
                  </div>
                  <div style={{ fontSize: "1.2rem", fontWeight: "800" }}>
                    {selectedSubmission.score}
                  </div>
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                <div style={{ fontSize: "0.85rem" }}>
                  <strong>Review Status:</strong>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Action state on development pipeline</div>
                </div>
                
                <select
                  className="status-dropdown-3d"
                  value={selectedSubmission.status}
                  onChange={(e) => {
                    const nextStatus = e.target.value;
                    onUpdateStatus(selectedSubmission.id, nextStatus);
                    setSelectedSubmission(prev => ({ ...prev, status: nextStatus }));
                  }}
                  style={{ border: "1px solid var(--primary-glow)", color: "var(--primary)" }}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="modal-footer" style={{ padding: "1rem 2rem" }}>
              <button 
                type="button" 
                className="modal-btn-sec"
                onClick={() => setSelectedSubmission(null)}
              >
                Back to Feed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- PAGE 7: Comparative Proposals Side-by-Side ----------------- */}
      {activeTab === "proposals" && (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 className="section-title" style={{ fontSize: "1.5rem" }}>
              <Lucide.Sparkles style={{ color: "var(--primary)", marginRight: "8px" }} />
              Comparative Proposals Analysis
            </h3>
            <p className="section-subtitle">
              Comparing two competing developmental schemes side-by-side inside Zone 5 (Janata Colony) to determine funding optimization.
            </p>
          </div>

          <div className="proposals-comparison-grid">
            {/* Proposal A: School Upgrade */}
            <div className="proposal-comparison-card winner">
              <div className="proposal-winner-ribbon">🏆 Selected Winner</div>
              
              <div className="proposal-card-header">
                <span className="proposal-section-title" style={{ color: "var(--primary)" }}>Option A: School Upgrade Drive</span>
                <h4 className="proposal-card-title">Janata Primary & Secondary School Infrastructure Upgrade</h4>
              </div>

              <div>
                <span className="proposal-section-title">Estimated Allocation Details</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.85rem", marginTop: "0.4rem" }}>
                  <div>Budget: <strong>INR 25.0 Lakhs</strong></div>
                  <div>Timeframe: <strong>6 Months</strong></div>
                  <div>Impact: <strong>8,500 residents</strong></div>
                  <div>Primary Area: <strong>Janata Colony (Zone 5)</strong></div>
                </div>
              </div>

              <div>
                <span className="proposal-section-title">Telemetry Gap Score Components</span>
                <div className="score-breakdown-box" style={{ padding: "0.5rem 0.85rem" }}>
                  <div className="score-breakdown-row" style={{ fontSize: "0.8rem", padding: "0.4rem 0" }}>
                    <span>Citizen Demand count: 45 letters</span>
                    <span>Score: 60/100</span>
                  </div>
                  <div className="score-breakdown-row" style={{ fontSize: "0.8rem", padding: "0.4rem 0" }}>
                    <span>Ward Distance Gap: 5.2 km (Critical)</span>
                    <span>Score: 78/100</span>
                  </div>
                  <div className="score-breakdown-row" style={{ fontSize: "0.8rem", padding: "0.4rem 0" }}>
                    <span>Cost-Efficiency Factor</span>
                    <span>Score: 42/100</span>
                  </div>
                  <div className="score-breakdown-row" style={{ fontSize: "0.8rem", padding: "0.4rem 0", color: "var(--primary)", fontWeight: "700" }}>
                    <span>Aggregate Recommendation Priority</span>
                    <span>78 Index</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                <strong>Description:</strong> Construct 4 new smart classrooms, separate boys/girls toilet blocks, and provision a dedicated 14-seater shuttle van to eliminate long commutes.
              </div>
            </div>

            {/* Proposal B: Vocational Centre */}
            <div className="proposal-comparison-card">
              <div className="proposal-card-header">
                <span className="proposal-section-title">Option B: Youth Skilling Hub</span>
                <h4 className="proposal-card-title">Skill Development Vocational Training Centre</h4>
              </div>

              <div>
                <span className="proposal-section-title">Estimated Allocation Details</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.85rem", marginTop: "0.4rem" }}>
                  <div>Budget: <strong>INR 19.0 Lakhs</strong></div>
                  <div>Timeframe: <strong>5 Months</strong></div>
                  <div>Impact: <strong>4,200 residents</strong></div>
                  <div>Primary Area: <strong>Janata Colony (Zone 5)</strong></div>
                </div>
              </div>

              <div>
                <span className="proposal-section-title">Telemetry Gap Score Components</span>
                <div className="score-breakdown-box" style={{ padding: "0.5rem 0.85rem" }}>
                  <div className="score-breakdown-row" style={{ fontSize: "0.8rem", padding: "0.4rem 0" }}>
                    <span>Citizen Demand count: 28 requests</span>
                    <span>Score: 45/100</span>
                  </div>
                  <div className="score-breakdown-row" style={{ fontSize: "0.8rem", padding: "0.4rem 0" }}>
                    <span>Youth Unemployment: 14.5%</span>
                    <span>Score: 82/100</span>
                  </div>
                  <div className="score-breakdown-row" style={{ fontSize: "0.8rem", padding: "0.4rem 0" }}>
                    <span>Cost-Efficiency Factor</span>
                    <span>Score: 38/100</span>
                  </div>
                  <div className="score-breakdown-row" style={{ fontSize: "0.8rem", padding: "0.4rem 0", color: "var(--secondary)", fontWeight: "700" }}>
                    <span>Aggregate Recommendation Priority</span>
                    <span>74 Index</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.4" }}>
                <strong>Description:</strong> Establish a 200-seat institute offering certified technical courses in electronics, plumbing, digital literacy, and tailoring, with placement cells.
              </div>
            </div>
          </div>

          {/* Winner Explanation box */}
          <div className="proposal-winner-explanation-box">
            <Lucide.Sparkles size={24} style={{ color: "var(--primary)", flexShrink: 0, marginTop: "2px" }} />
            <p className="proposal-winner-explanation-text">
              <strong>Recommendation Winner Summary:</strong> Option A (School Infrastructure Upgrade) has been prioritized with an AI Priority Index of <strong>78</strong> vs Option B's score of <strong>74</strong>. While youth unemployment is high, the critical safety factor of female student travel distance (5.2 km walk) combined with 45 direct citizen requests makes school transit and facility enhancement the urgent mandate.
            </p>
          </div>
        </div>
      )}

      {/* ----------------- PAGE 8: Context Data Table ----------------- */}
      {activeTab === "context" && (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 className="section-title" style={{ fontSize: "1.5rem" }}>
              <Lucide.Database style={{ color: "var(--primary)", marginRight: "8px" }} />
              Constituency Telemetry Metrics Database
            </h3>
            <p className="section-subtitle" style={{ color: "var(--primary)", fontWeight: "600" }}>
              💡 This is the data our AI uses for scoring.
            </p>
          </div>

          <div className="context-data-table-container">
            <table className="context-data-table">
              <thead>
                <tr>
                  <th>Constituency Zone</th>
                  <th>Literacy Rate</th>
                  <th>School Enrollment</th>
                  <th>Avg School Distance</th>
                  <th>Water Quality Index (WQI)</th>
                  <th>Hospital Beds /1000</th>
                  <th>Power Deficit %</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Zone 1 (Ganga Nagar)</strong></td>
                  <td>72%</td>
                  <td>84%</td>
                  <td>3.8 km</td>
                  <td>58 / 100</td>
                  <td className="context-data-value-highlight">0.6</td>
                  <td>15%</td>
                </tr>
                <tr>
                  <td><strong>Zone 2 (Vikas Nagar)</strong></td>
                  <td>89%</td>
                  <td>96%</td>
                  <td>1.2 km</td>
                  <td>82 / 100</td>
                  <td>2.1</td>
                  <td>4%</td>
                </tr>
                <tr>
                  <td><strong>Zone 3 (Shanti Nagar)</strong></td>
                  <td>65%</td>
                  <td className="context-data-value-highlight">71%</td>
                  <td>4.5 km</td>
                  <td className="context-data-value-highlight">45 / 100</td>
                  <td className="context-data-value-highlight">0.4</td>
                  <td className="context-data-value-highlight">22%</td>
                </tr>
                <tr>
                  <td><strong>Zone 4 (Udyog Nagar)</strong></td>
                  <td>78%</td>
                  <td>88%</td>
                  <td>2.1 km</td>
                  <td>68 / 100</td>
                  <td>1.4</td>
                  <td>8%</td>
                </tr>
                <tr>
                  <td><strong>Zone 5 (Janata Colony)</strong></td>
                  <td className="context-data-value-highlight">59%</td>
                  <td className="context-data-value-highlight">68%</td>
                  <td className="context-data-value-highlight">5.2 km</td>
                  <td>52 / 100</td>
                  <td>0.8</td>
                  <td>18%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
