# 🛡️ NTRO Audience Intelligence Platform

**Unified Multi-Platform NLP & Threat Analytics Dashboard**  
*Developed for Smart India Hackathon (SIH) Prototype | Team: Null Pointers*

---

## 📌 Project Overview

**NTRO Audience Intelligence** is a multipage security and threat intelligence analytics platform designed for monitoring national audience sentiment, narrative acceleration, regional audience demographics, and coordinated disinformation campaigns across X (Twitter) and Telegram feeds.

### 🌟 Key Capabilities

1. **National Sentiment & Emotion Intelligence**: Real-time tracking of overall sentiment index and 4-class emotion classification (*Support*, *Anxiety*, *Sarcasm*, *Anger/Hostility*).
2. **Force-Directed Influence Topology**: Built with `react-force-graph-2d` for PageRank centrality modeling, Key Opinion Leader (KOL) identification, and 2px dotted red link visualization of **coordinated bot network clusters**.
3. **Demographics & Language Profiling**: DPDP-compliant profiling of audience age distribution, regional share, and Hinglish code-mix dialect metrics.
4. **Narrative Acceleration**: Tracking post velocity spikes across X and Telegram with keyword tag cloud clusters.
5. **Security Alerts Feed**: Automated anomaly detection for bot coordination, disinformation spikes, and sudden sentiment drops.
6. **Analyst Access Portal**: Enforced analyst authentication with passcode protection.

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: `react-force-graph-2d` (Network Topology), Recharts (Sentiment & Demographics)
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Backend**: FastAPI (Python 3.10+)
- **Containerization**: Docker & Docker Compose

---

## 🐳 Option 1: Run with Docker (Recommended for Teams)

If you are working in a team, Docker allows **anyone** on your team (Windows, Mac, Linux) to run the full stack with **one single command** without installing Node.js or Python manually!

### Step 1: Install Docker Desktop
- Download & Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

### Step 2: Launch Full Stack Container

In your project folder, open terminal and run:

```bash
docker-compose up --build
```

That's it! 
- **Frontend App**: Open **`http://localhost:3000`** (Passcode: `1234`)
- **FastAPI Backend**: Open **`http://localhost:8000`** (Swagger docs at `http://localhost:8000/docs`)

---

## 💻 Option 2: Local Installation (Manual Setup)

If you prefer installing dependencies directly on your PC:

### Step 1: Prerequisites
- **Node.js** (v18.0.0+): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **Python** (v3.10+): [Download Python](https://www.python.org/)

### Step 2: Clone & Install Frontend

```bash
git clone https://github.com/ApekshaDave/SIH-Social-media-analytics.git
cd SIH-Social-media-analytics
npm install
npm run dev
```

Open your browser at **`http://localhost:5173/`** (Passcode: `1234`).

### Step 3: Run FastAPI Backend

In a new terminal window:
```bash
cd backend
pip install -r requirements.txt
python main.py
```

---

## 📂 Project Structure

```text
SIH-Social-media-analytics/
├── src/                  # Frontend React + TypeScript + Vite codebase
│   ├── components/       # UI components (Sidebar, TopBar, StatCard, etc.)
│   ├── pages/            # 7 Analyst Dashboard modules & Login
│   ├── mock/             # Typed mock dataset (mockData.ts)
│   └── types/            # Shared TypeScript interfaces
├── backend/              # FastAPI Python backend engine
│   ├── Dockerfile        # Backend container manifest
│   ├── main.py           # FastAPI REST API endpoints
│   └── requirements.txt  # Python package dependencies
├── Dockerfile            # Frontend container manifest
├── docker-compose.yml    # Multi-container orchestration config
├── README.md             # Team documentation & guide
└── package.json          # Node dependencies
```

---

## 👥 Team & License

- **Team**: Null Pointers
- **Event**: Smart India Hackathon (SIH) Prototype
- **License**: Restricted Government Prototype
