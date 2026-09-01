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
- **Backend (Optional)**: FastAPI (Python 3.10+)

---

## 💻 How to Install & Run on Windows PC

Follow these step-by-step instructions to set up and run the platform locally on your computer.

### Step 1: Prerequisites
Ensure you have the following software installed on your PC:
- **Node.js** (v18.0.0 or higher): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **Python** (v3.10 or higher - optional for backend API): [Download Python](https://www.python.org/)

---

### Step 2: Clone the Repository

Open **PowerShell** or **Command Prompt** (cmd) and run:

```bash
git clone https://github.com/ApekshaDave/SIH-Social-media-analytics.git
cd SIH-Social-media-analytics
```

---

### Step 3: Install Frontend Dependencies

Run the following command in the project root folder to install all required NPM packages:

```bash
npm install
```

---

### Step 4: Run the Development Server

Start the Vite development server:

```bash
npm run dev
```

You will see output similar to this:

```text
  VITE v5.4.21  ready in 450 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### Step 5: Access the Dashboard

1. Open your web browser (Chrome, Edge, Firefox, or Brave).
2. Go to **`http://localhost:5173/`** (or the URL printed in your terminal).
3. On the **Login Page**, enter the Analyst Passcode:
   ```text
   Passcode: 1234
   ```
4. Click **Authenticate as Intelligence Analyst** to access the dashboard!

---

### Step 6 (Optional): Run the FastAPI Backend

If you wish to run the Python backend service:

1. Open a new terminal window inside the repository folder.
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install required Python packages:
   ```bash
   pip install fastapi uvicorn pydantic
   ```
4. Start the FastAPI server:
   ```bash
   python main.py
   ```
   *(Backend will start running at `http://localhost:8000`)*

---

## 📂 Project Structure

```text
SIH-Social-media-analytics/
├── src/
│   ├── components/       # Reusable UI components (Sidebar, TopBar, StatCard, etc.)
│   ├── pages/            # Dashboard modules (Overview, Sentiment, Demographics, Trends, NetworkGraph, Alerts, Login)
│   ├── mock/             # Typed mock dataset (mockData.ts)
│   ├── types/            # TypeScript interfaces (index.ts)
│   ├── App.tsx           # Router & protected route configuration
│   ├── main.tsx          # Application entry point
│   └── index.css         # Tailwind CSS & design system tokens
├── backend/              # FastAPI Python backend engine
├── data/                 # Database schema & graph files
├── public/               # Static assets (favicon.svg)
├── package.json          # Project dependencies & scripts
├── README.md             # Installation & documentation guide
└── vite.config.js        # Vite configuration
```

---

## 🔐 Security & Access Control

The prototype operates on an **Analyst-Only Security Model**:
- All public-facing routes are protected by default.
- Access requires typing passcode `1234`. Unauthenticated requests to any page automatically redirect to `/login`.

---

## 👥 Team & License

- **Team**: Null Pointers
- **Event**: Smart India Hackathon (SIH) Prototype
- **License**: Restricted Government Prototype
