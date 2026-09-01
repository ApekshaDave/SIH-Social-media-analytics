# 🛡️ NTRO Audience Intelligence Platform

**Unified Multi-Platform Social Media Analytics & Threat Intelligence Framework**  
*Smart India Hackathon (SIH) Prototype | Team: Null Pointers*

---

## 📌 Overview

**NTRO Audience Intelligence** is an analyst-grade security intelligence platform built to monitor national audience sentiment, dialect metrics, narrative acceleration, and coordinated disinformation campaigns across X (Twitter) and Telegram feeds.

### 🌟 Core Dashboard Modules

1. **Overview Dashboard**: Executive KPI stat cards, 24-hour sentiment progression, and multi-class emotion classification.
2. **Sentiment Intelligence**: Sentiment progression timeline with multi-class emotion breakdown (*Support*, *Anxiety*, *Sarcasm*, *Anger/Hostility*) and live post sentiment feed.
3. **Demographics & Dialect Share**: DPDP-compliant age distribution, regional audience share, and Hinglish code-mix dialect metrics.
4. **Narrative Acceleration & Trends**: Real-time topic velocity tracking across X & Telegram with keyword tag cloud clusters.
5. **Force-Directed Network Topology (`/network`)**: Powered by `react-force-graph-2d` for PageRank centrality modeling, Key Opinion Leader (KOL) mapping, and **2px dotted red link visualization of coordinated bot network clusters**.
6. **Security Alerts Feed**: Automated threat detection for bot coordination, disinformation spikes, and rapid sentiment drops.
7. **Analyst Access Portal**: Role-based access control (RBAC) enforced with analyst passcode validation.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Visualizations**: `react-force-graph-2d` (Force-directed network physics), Recharts (Sentiment & Demographics)
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Backend API**: FastAPI (Python 3.10+)
- **Containerization**: Docker & Docker Compose

---

## 🐳 Option 1: Quick Start with Docker (Recommended for Teams)

Running with Docker ensures that all team members (Windows, Mac, Linux) experience the exact same environment without manual Node.js or Python configuration.

### Prerequisites
- Install **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**

### Step-by-Step Setup

1. **Clone the GitHub Repository**:
   ```bash
   git clone https://github.com/ApekshaDave/SIH-Social-media-analytics.git
   cd SIH-Social-media-analytics
   ```

2. **Launch Containers**:
   ```bash
   docker-compose up --build
   ```

3. **Access Application**:
   - **Frontend App**: Open **`http://localhost:3000`** in your browser.
   - **Analyst Passcode**: Enter **`1234`** to authenticate.
   - **FastAPI Backend**: Open **`http://localhost:8000`** (Swagger API Docs at `http://localhost:8000/docs`).

---

## 💻 Option 2: Manual Local Installation

If you prefer installing dependencies directly on your PC:

### Prerequisites
- **Node.js** (v18.0.0+): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **Python** (v3.10+ - optional for backend API): [Download Python](https://www.python.org/)

### 1. Frontend Setup
```bash
git clone https://github.com/ApekshaDave/SIH-Social-media-analytics.git
cd SIH-Social-media-analytics
npm install
npm run dev
```
Open **`http://localhost:5173/`** or **`http://localhost:5177/`** and authenticate with passcode `1234`.

### 2. Backend Setup (Optional)
In a new terminal window:
```bash
cd backend
pip install -r requirements.txt
python main.py
```
*(Backend API service starts at `http://localhost:8000`)*

---

## 📁 Repository Structure

```text
SIH-Social-media-analytics/
├── src/                  # Frontend React + TypeScript + Vite codebase
│   ├── components/       # UI components (Sidebar, TopBar, StatCard, etc.)
│   ├── pages/            # 7 Dashboard pages & Analyst Login
│   ├── mock/             # Typed mock dataset (mockData.ts)
│   └── types/            # Shared TypeScript interfaces (index.ts)
├── backend/              # FastAPI Python backend engine
│   ├── Dockerfile        # Backend container build manifest
│   ├── main.py           # FastAPI REST API endpoints
│   └── requirements.txt  # Python package dependencies
├── public/               # Static assets (favicon.svg)
├── Dockerfile            # Frontend container build manifest (Nginx production server)
├── docker-compose.yml    # Docker multi-container orchestration manifest
├── README.md             # Project documentation & team setup guide
└── package.json          # Node dependencies & build scripts
```

---

## 🔐 Analyst Security & Access Control

- **Passcode Authentication**: Access to the dashboard requires passcode **`1234`**.
- **Route Protection**: All public routes (`/`, `/sentiment`, `/demographics`, `/trends`, `/network`, `/alerts`) are protected. Unauthenticated navigation automatically redirects to `/login`.

---

## 👥 Team & License

- **GitHub Repository**: [ApekshaDave/SIH-Social-media-analytics](https://github.com/ApekshaDave/SIH-Social-media-analytics.git)
- **Team**: Null Pointers
- **Event**: Smart India Hackathon (SIH) Prototype
- **License**: Restricted Government Prototype
