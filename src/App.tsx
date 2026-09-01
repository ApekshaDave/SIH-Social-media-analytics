import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { UserRole } from './types';
import {
  mockSummary,
  mockSentimentTimePoints,
  mockEmotions,
  mockPosts,
  mockDemographics,
  mockTrends,
  mockNetworkData,
  mockAlerts
} from './mock/mockData';

import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { ToastProvider, useToast } from './components/Toast';
import { CommandPalette } from './components/CommandPalette';

import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { Overview } from './pages/Overview';
import { Sentiment } from './pages/Sentiment';
import { Demographics } from './pages/Demographics';
import { Trends } from './pages/Trends';
import { NetworkGraph } from './pages/NetworkGraph';
import { Alerts } from './pages/Alerts';
import { VantaBackground } from './components/VantaBackground';
import { SonarProvider } from './contexts/SonarContext';

function Layout({
  role,
  onRoleChange,
  children,
}: {
  role: UserRole;
  onRoleChange: (r: UserRole) => void;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global keyboard shortcut for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      lenis.on('scroll', ScrollTrigger.update);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  if (location.pathname === '/login' || location.pathname === '/') {
    return (
      <div className="min-h-screen flex bg-[#F5F5F7] selection:bg-[#007AFF]/20 selection:text-black">
        {/* Vanta WebGL Background */}
        <VantaBackground />
        {children}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          role={role}
          onRoleChange={onRoleChange}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F5F5F7] text-[#1D1D1F] selection:bg-[#007AFF]/20 selection:text-black">
      {/* Vanta WebGL Background */}
      <VantaBackground />

      {/* Frost overlay to ensure text readability */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-white/40 backdrop-blur-[40px]" />

      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative z-[1]">
        <TopBar
          role={role}
          onRoleChange={onRoleChange}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />

        <main className="flex-1 max-w-[1400px] w-full mx-auto p-5 md:p-7 space-y-6 pb-24">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-black/5 py-3 px-6 mb-20">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[10px] text-[#6E6E73] font-mono">
              NTRO · Unified AI Framework for Social Media Audience Intelligence · Problem ID: 26152
            </span>
            <div className="flex items-center gap-3 text-[10px] text-[#6E6E73]">
              <span>Team: <strong className="text-[#007AFF]">Null Pointers</strong></span>
              <span className="text-black/10">|</span>
              <span>Build: <strong className="text-[#34C759]">Stable 1.0</strong></span>
              <span className="text-black/10">|</span>
              <span>Theme: Blockchain &amp; Cybersecurity</span>
            </div>
          </div>
        </footer>
      </div>

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        role={role}
        onRoleChange={onRoleChange}
      />
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState<UserRole>('analyst');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('ntro_authenticated') === 'true';
  });

  const handleLogin = (r: UserRole) => {
    setRole(r);
    setIsAuthenticated(true);
    sessionStorage.setItem('ntro_authenticated', 'true');
  };

  return (
      <SonarProvider>
        <ToastProvider>
          <Router>
            <Layout role={role} onRoleChange={setRole}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            <Route
              path="/dashboard"
              element={
                isAuthenticated
                  ? <Overview role={role} summary={mockSummary} />
                  : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/sentiment"
              element={
                isAuthenticated
                  ? <Sentiment timePoints={mockSentimentTimePoints} emotions={mockEmotions} posts={mockPosts} />
                  : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/demographics"
              element={
                isAuthenticated
                  ? <Demographics data={mockDemographics} />
                  : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/trends"
              element={
                isAuthenticated
                  ? <Trends trends={mockTrends} />
                  : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/network"
              element={
                isAuthenticated
                  ? <NetworkGraph data={mockNetworkData} />
                  : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/alerts"
              element={
                isAuthenticated
                  ? <Alerts alerts={mockAlerts} />
                  : <Navigate to="/login" replace />
              }
            />

            <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
          </Routes>
        </Layout>
      </Router>
      </ToastProvider>
      </SonarProvider>
  );
}
