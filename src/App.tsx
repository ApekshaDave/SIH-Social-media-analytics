import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

import { Login } from './pages/Login';
import { Overview } from './pages/Overview';
import { Sentiment } from './pages/Sentiment';
import { Demographics } from './pages/Demographics';
import { Trends } from './pages/Trends';
import { NetworkGraph } from './pages/NetworkGraph';
import { Alerts } from './pages/Alerts';

function Layout({ role, onRoleChange, children }: { role: UserRole; onRoleChange: (r: UserRole) => void; children: React.ReactNode }) {
  const location = useLocation();

  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-white text-[#2C2C2A] font-sans selection:bg-[#378ADD] selection:text-white">
      
      {/* Persistent Left Sidebar */}
      <Sidebar role={role} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <TopBar role={role} onRoleChange={onRoleChange} />

        {/* Page View Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[#F1EFE8] border-t border-[#E5E3DA] py-4 px-6 text-center text-xs text-[#5F5E5A]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span>NTRO SIH Prototype — Unified AI Framework for Social Media Audience Intelligence</span>
            </div>
            <div className="flex items-center space-x-3">
              <span>Team: <strong className="text-[#378ADD]">Null Pointers</strong></span>
              <span>|</span>
              <span>Build Status: <strong className="text-[#639922]">Stable 1.0</strong></span>
            </div>
          </div>
        </footer>

      </div>
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
    <Router>
      <Layout role={role} onRoleChange={setRole}>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          {/* Protected Analyst Dashboard Routes */}
          <Route path="/" element={isAuthenticated ? <Overview role={role} summary={mockSummary} /> : <Navigate to="/login" replace />} />
          <Route path="/sentiment" element={isAuthenticated ? <Sentiment timePoints={mockSentimentTimePoints} emotions={mockEmotions} posts={mockPosts} /> : <Navigate to="/login" replace />} />
          <Route path="/demographics" element={isAuthenticated ? <Demographics data={mockDemographics} /> : <Navigate to="/login" replace />} />
          <Route path="/trends" element={isAuthenticated ? <Trends trends={mockTrends} /> : <Navigate to="/login" replace />} />
          <Route path="/network" element={isAuthenticated ? <NetworkGraph data={mockNetworkData} /> : <Navigate to="/login" replace />} />
          <Route path="/alerts" element={isAuthenticated ? <Alerts alerts={mockAlerts} /> : <Navigate to="/login" replace />} />

          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
