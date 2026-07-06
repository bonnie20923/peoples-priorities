# 🏛️ People's Priorities
### *AI for Constituency Development Planning*

> **Hack2Skill × Google Hackathon Submission**  
> A multilingual AI platform that bridges citizen development requests with data-driven MP decision-making.

---

## 🌐 Live Demo
🔗 **[Live Demo — Deploy to Vercel/Netlify using this repo](#-deployment)**

---

## 📌 The Problem

MPs receive development requests through public meetings, letters, social media, grievance portals, and direct representations — while local development plans contain dozens of competing proposed projects. There is no objective way to:
- Consolidate citizen feedback across languages and formats
- Spot recurring needs and demand hotspots
- Weigh competing proposals against real demand (e.g. school upgrades vs. a vocational centre, cross-referenced with enrollment data and travel-distance gaps)

---

## 🎯 The Challenge

> *Build a multilingual AI platform where citizens can submit development suggestions via voice, text, photos, or messaging apps. The system should analyze submissions to surface recurring themes, map demand hotspots, and combine citizen feedback with demographic data, infrastructure gaps, local development plans, and public datasets — to recommend and rank high-priority development works an MP can act on.*

---

## 💡 Our Solution: People's Priorities

A dual-sided AI-powered civic platform:

**Citizen Portal** — Any citizen submits a development request via Text, Photo, or Voice in 6 Indian languages. The AI auto-translates, classifies the issue, and tags the exact GPS location.

**MP Command Dashboard** — The representative's office receives a fully translated, AI-scored, objectively ranked feed of all active submissions, with visual hotspot maps, side-by-side project comparison, and real demographic/infrastructure telemetry to back every decision.

---

## 🚀 Key Features

### 🧑‍🤝‍🧑 Citizen Submission Portal
| Feature | Description |
|---|---|
| 🗣️ **Multilingual Voice Input** | Record in English, Hindi, Telugu, Tamil, Marathi, Bengali — AI transcribes and translates to English automatically |
| 📸 **Camera / Photo Upload** | Capture live photos or upload from gallery. AI Vision Scanner runs bounding-box defect detection with confidence scoring |
| 📝 **Text + AI Translate** | Type in any Indian language. AI standardizes to English for the MP dashboard |
| 🗺️ **Real-World Geolocation** | Interactive OpenStreetMap (Leaflet) with Nominatim address search — type a landmark, pin drops on the real map |
| 🔢 **Instant Tracking ID** | Unique `PP-XXXXXX` code + AI classification badge shown on confirmation |

### 🏛️ MP Command Dashboard
| Feature | Description |
|---|---|
| 🤖 **AI Priority Index** | Every grievance scored 0–100 using: Urgency (40%) + Citizen Demand Density (30%) + Ward Infrastructure Gap (30%) |
| 🗺️ **Demand Hotspot Map** | Interactive 3D tilted SVG constituency map — ward color reflects complaint density. Click to filter feed |
| 🔍 **Live Smart Filters** | Filter by Zone, Category, Status, or keyword in real-time |
| 📋 **Score Breakdown Modal** | Click any submission to see the exact AI reasoning and math behind its priority rank |
| ⚖️ **Comparative Project Analysis** | Side-by-side data-backed comparison of competing proposals (e.g. School Upgrade vs. Vocational Centre) with AI winner rationale |
| 📊 **Infrastructure Telemetry** | Real zone data (Water Quality Index, road scores, school travel distance, hospital bed ratios) powering the AI engine |
| 🔄 **Status Workflow** | MP can mark issues Pending → In Progress → Resolved. Dashboard stats update live |

---

## 🧮 AI Priority Score Formula

```
Priority Score = (Urgency Score × 0.4) + (Demand Density Score × 0.3) + (Ward Gap Score × 0.3)

Where:
  Urgency Score     → Critical=100 | High=75 | Medium=50 | Low=25
  Demand Score      → Min(100, (complaint_count_in_ward_category × 12) + 30)
  Ward Gap Score    → Computed from telemetry:
                        Water  → 100 − Water Quality Index
                        Roads  → (10 − Road Quality Index) × 10
                        Health → (travel_time × 4) + (20 − beds_per_1000 × 2)
                        Education → (travel_km × 8) + (100 − enrollment_rate)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 + Vite 8 |
| **Styling** | Vanilla CSS — Glassmorphism Dark Mode, CSS3 3D perspective transforms |
| **Icons** | Lucide React |
| **Mapping** | Leaflet.js + CartoDB Dark Matter OSM tiles |
| **Geocoding** | OpenStreetMap Nominatim API (free, no API key required) |
| **AI Engine** | Client-side multilingual keyword classifier + urgency extractor + telemetry cross-referencing |
| **State Management** | React hooks (useState, useEffect, useRef) |
| **Build Tool** | Vite with Rolldown bundler |

---

## 🗂️ Project Structure

```
src/
├── App.jsx                    # Central router + global state event broker
├── main.jsx                   # React DOM entry point
├── index.css                  # Full design system (glassmorphism, animations, 3D cards)
├── components/
│   ├── CitizenPortal.jsx      # Pages 2, 3, 4 — Multilingual citizen submission flow
│   └── MpDashboard.jsx        # Pages 5, 6, 7, 8 — MP AI command dashboard
└── data/
    └── mockData.js            # Ward telemetry, sample images, mock submissions
```

---

## 🔄 App Flow

```
Landing Page (Page 1)
    ├── Report an Issue → Citizen Portal
    │       ├── Choose Method (Page 2): Text | Photo | Voice
    │       ├── Submission Form (Page 3): Name, Zone, Issue, GPS Pin
    │       └── Confirmation (Page 4): Tracking ID + AI Badge
    │
    └── MP Dashboard Login → MP Command Dashboard
            ├── Ranked Submissions Feed + Hotspot Map (Page 5)
            ├── Score Breakdown Modal (Page 6)
            ├── Comparative Proposals (Page 7)
            └── AI Context Telemetry Data (Page 8)
```

---

## ⚡ Local Setup

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/peoples-priorities.git
cd peoples-priorities

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build
```

---

## 🌍 Deployment (Get a Live Link)

### Option 1 — Vercel ⭐ Recommended
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import GitHub repo
3. Framework: **Vite** (auto-detected) → Click **Deploy**
4. Live link: `https://peoples-priorities.vercel.app`

### Option 2 — Netlify (Drag & Drop, no GitHub needed)
1. Run `npm run build` → generates `dist/` folder
2. Go to [netlify.com](https://netlify.com) → Drag & Drop the `dist/` folder
3. Instant live link in under 30 seconds

### Option 3 — GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build && npx gh-pages -d dist
```

---

## 🎯 Why This Wins

| Judging Criterion | Our Approach |
|---|---|
| **AI Innovation** | Multimodal input (text + vision + voice), multilingual NLP, cross-referenced telemetry scoring |
| **Real-World Impact** | Directly addresses MPLADS fund bias; applicable to 543 Indian constituencies immediately |
| **Inclusivity** | Voice + photo inputs serve non-literate and low-tech rural citizens in 6 languages |
| **Technical Depth** | Real OSM maps, live geocoding, dynamic AI scoring formula, bidirectional state sync |
| **UX/UI Excellence** | Cyber-glassmorphism dark mode, 3D SVG heatmaps, animated AI scanner, premium design |

---

## 👥 Team
Built with ❤️ for the **Hack2Skill × Google Hackathon**

---

## 📄 License
MIT License
