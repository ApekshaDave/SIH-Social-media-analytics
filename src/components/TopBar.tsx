import React, { useEffect, useState } from 'react';
import { Bell, ChevronDown, Search, Activity, Command } from 'lucide-react';
import { UserRole } from '../types';
import { useToast } from './Toast';

interface TopBarProps {
  role: UserRole;
  onRoleChange: (r: UserRole) => void;
  onOpenCommandPalette?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ role, onRoleChange, onOpenCommandPalette }) => {
  const [date, setDate] = useState(new Date());
  const [packetCount, setPacketCount] = useState(384210);
  const { showToast } = useToast();

  useEffect(() => {
    const t = setInterval(() => setDate(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Simulated live packet ingestion counter
  useEffect(() => {
    const t = setInterval(() => {
      setPacketCount((c) => c + Math.floor(Math.random() * 120 + 60));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const handleRoleToggle = (newRole: UserRole) => {
    onRoleChange(newRole);
    showToast(
      `Switched to ${newRole === 'analyst' ? 'Analyst Command Portal' : 'Public Observer View'}`,
      `Permissions and data classification updated`,
      'success'
    );
  };

  const handleNotificationClick = () => {
    showToast(
      'Threat Radar Alert: 3 Active Anomalies',
      'Coordinated bot clusters detected across Telegram & X',
      'warning'
    );
  };

  return (
    <header className="sticky top-0 z-40 h-[72px] bg-white/75 backdrop-blur-[40px] border-b border-black/5 flex items-center justify-between px-6">
      {/* Left side: Quick Command Search & Live Status */}
      <div className="flex items-center gap-4 sm:gap-6">
        <button
          onClick={onOpenCommandPalette}
          className="relative w-64 sm:w-80 bg-black/[0.04] hover:bg-black/[0.07] border border-black/5 hover:border-black/10 rounded-full py-2 pl-10 pr-3 text-left transition-all duration-200 shadow-sm flex items-center justify-between group cursor-pointer"
          aria-label="Open Command Palette"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6E6E73] group-hover:text-[#1D1D1F] transition-colors" />
          <span className="text-xs text-[#6E6E73] group-hover:text-[#1D1D1F] transition-colors truncate">
            Search entities, alerts, topics...
          </span>
          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white/80 border border-black/5 text-[10px] font-mono font-semibold text-[#6E6E73] shadow-xs">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </button>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#34C759]/10 border border-[#34C759]/20">
          <Activity className="w-3.5 h-3.5 text-[#34C759]" />
          <span className="text-[11px] font-mono font-medium text-[#248A3D]">
            {packetCount.toLocaleString()} posts ingested
          </span>
        </div>
      </div>

      {/* Right side: Time, Role Switcher, Alerts & Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden lg:block text-xs font-medium text-[#6E6E73] font-mono tracking-wide">
          Tue, 01 Sept, 2026
        </div>

        <div className="hidden lg:block h-4 w-px bg-black/10" />

        {/* Role Switcher */}
        <div className="flex items-center bg-black/5 p-1 rounded-full border border-black/5 shadow-inner">
          <span className="text-[10px] text-[#6E6E73] uppercase tracking-wider px-2 mr-1 hidden sm:inline">View:</span>
          <button
            onClick={() => handleRoleToggle('analyst')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-sm ${
              role === 'analyst' ? 'bg-white text-[#1D1D1F] shadow-apple' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            Analyst
          </button>
          <button
            onClick={() => handleRoleToggle('public')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-sm ${
              role === 'public' ? 'bg-white text-[#1D1D1F] shadow-apple' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
            }`}
          >
            Public
          </button>
        </div>

        {/* Notifications */}
        <button 
          onClick={handleNotificationClick}
          className="relative w-9 h-9 rounded-full bg-white border border-black/5 shadow-sm flex items-center justify-center text-[#1D1D1F] hover:bg-black/5 transition-all"
          aria-label="View security notifications"
        >
          <Bell className="w-4 h-4 text-[#1D1D1F]" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FF3B30] rounded-full border-2 border-white text-[8px] font-bold flex items-center justify-center text-white">
            3
          </span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white border border-black/5 shadow-sm">
          <div className="w-6 h-6 rounded-full bg-[#007AFF]/10 flex items-center justify-center text-[10px] font-bold text-[#007AFF]">
            {role === 'analyst' ? 'AN' : 'PB'}
          </div>
          <span className="text-xs font-medium text-[#1D1D1F] hidden sm:inline">
            {role === 'analyst' ? 'analyst@ntro.gov.in' : 'public@ntro.gov.in'}
          </span>
        </div>
      </div>
    </header>
  );
};
