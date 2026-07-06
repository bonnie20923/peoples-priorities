import React, { useState } from "react";
import { Sparkles, User, ShieldCheck, ArrowRight } from "lucide-react";
import CitizenPortal from "./components/CitizenPortal";
import MpDashboard from "./components/MpDashboard";
import { initialSuggestions } from "./data/mockData";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing"); // 'landing', 'citizen', 'dashboard'
  const [selectedLang, setSelectedLang] = useState("en");
  const [suggestions, setSuggestions] = useState(() => 
    initialSuggestions.map(s => ({ ...s, status: s.status || "Pending" }))
  );

  // Callback to add citizen suggestions from portal to main feed dynamically
  const handleAddSuggestion = (newSugg) => {
    setSuggestions((prev) => [newSugg, ...prev]);
  };

  // Callback to update ticket status in the MP dashboard
  const handleUpdateStatus = (id, newStatus) => {
    setSuggestions((prev) => 
      prev.map(s => s.id === id ? { ...s, status: newStatus } : s)
    );
  };

  return (
    <div className="app-container">
      {/* 3D Glass Header (only visible when not on landing page) */}
      {currentPage !== "landing" && (
        <header className="nav-header">
          <div className="logo-section" style={{ cursor: "pointer" }} onClick={() => setCurrentPage("landing")}>
            <div className="logo-icon-container">
              <Sparkles className="logo-icon" />
            </div>
            <div>
              <h1 className="logo-text">People's Priorities</h1>
              <div className="logo-tagline">AI Constituency Development</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "var(--success)" }}></span>
              AI Core Pipeline: Online
            </div>
            <button 
              type="button" 
              className="btn-nav-back" 
              onClick={() => setCurrentPage("landing")}
              style={{ margin: 0, padding: "0.45rem 0.9rem", borderRadius: "8px" }}
            >
              Exit to Home
            </button>
          </div>
        </header>
      )}

      {/* Main Panel Content */}
      <main className="main-content">
        {currentPage === "landing" ? (
          <div className="page-container">
            <div className="landing-hero">
              <div className="logo-icon-container" style={{ width: "fit-content", margin: "0 auto 1.5rem auto", padding: "1rem", borderRadius: "20px" }}>
                <Sparkles size={40} style={{ color: "var(--text-inverse)" }} />
              </div>
              <h1 className="landing-title">People's Priorities</h1>
              <div className="landing-tagline">Constituency Development Planning Engine</div>
              <p className="landing-description">
                An objective, AI-assisted platform linking community grievances directly to official development planning. Real-time translation, visual severity scanners, and gap analytics.
              </p>

              <div className="landing-cards-grid">
                {/* Citizen Card - Page 1 Option A */}
                <div 
                  className="landing-role-card"
                  onClick={() => setCurrentPage("citizen")}
                >
                  <div className="role-icon-box" style={{ color: "var(--primary)" }}>
                    <User size={32} />
                  </div>
                  <h3 className="role-title">Report an Issue</h3>
                  <p className="role-desc">
                    Submit localized development requirements directly. Upload photos of broken roads, record voice memos, or type issues in your local language.
                  </p>
                  <div className="role-action-btn">
                    Citizen Portal <ArrowRight size={16} />
                  </div>
                </div>

                {/* MP Dashboard Card - Page 1 Option B */}
                <div 
                  className="landing-role-card admin-card"
                  onClick={() => setCurrentPage("dashboard")}
                >
                  <div className="role-icon-box" style={{ color: "var(--secondary)" }}>
                    <ShieldCheck size={32} />
                  </div>
                  <h3 className="role-title">MP Dashboard Login</h3>
                  <p className="role-desc">
                    Access real-time constituency demand maps. Rank priorities using AI cost-efficiency factors, compare proposals, and draft sanction briefs.
                  </p>
                  <div className="role-action-btn">
                    MP Dashboard <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : currentPage === "citizen" ? (
          <CitizenPortal 
            selectedLang={selectedLang}
            onLangChange={setSelectedLang}
            onSubmitSuggestion={handleAddSuggestion}
            onBackToHome={() => setCurrentPage("landing")}
          />
        ) : (
          <MpDashboard 
            suggestions={suggestions} 
            onUpdateStatus={handleUpdateStatus}
            onBackToHome={() => setCurrentPage("landing")}
          />
        )}
      </main>

      {/* Modern footer */}
      <footer className="app-footer">
        © 2026 <span>People's Priorities</span> Platform. Objective Development Planning Engine for Member of Parliament Constituency Development.
      </footer>
    </div>
  );
}
