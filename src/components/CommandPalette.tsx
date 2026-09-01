import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  BarChart3,
  Users2,
  TrendingUp,
  Share2,
  AlertTriangle,
  Home,
  Shield,
  UserCheck,
  Lock,
  Hash,
  AtSign,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { UserRole } from '../types';
import { useToast } from './Toast';

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Monitored Entities' | 'Trending Topics' | 'Actions';
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
  onRoleChange: (r: UserRole) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  role,
  onRoleChange,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const items: CommandItem[] = [
    // Navigation
    {
      id: 'nav-overview',
      category: 'Navigation',
      title: 'Overview & National Metrics',
      subtitle: 'Real-time multi-platform KPI summary',
      icon: LayoutDashboard,
      shortcut: 'G O',
      action: () => { navigate('/dashboard'); onClose(); },
    },
    {
      id: 'nav-sentiment',
      category: 'Navigation',
      title: 'Sentiment & Emotion Intelligence',
      subtitle: '24h NLP emotional progression & post feed',
      icon: BarChart3,
      shortcut: 'G S',
      action: () => { navigate('/sentiment'); onClose(); },
    },
    {
      id: 'nav-demographics',
      category: 'Navigation',
      title: 'Demographic & Linguistic Analytics',
      subtitle: 'Age distribution, regional density & dialects',
      icon: Users2,
      shortcut: 'G D',
      action: () => { navigate('/demographics'); onClose(); },
    },
    {
      id: 'nav-trends',
      category: 'Navigation',
      title: 'Topic Trends & Velocity Spike',
      subtitle: 'Narrative acceleration & keyword cloud',
      icon: TrendingUp,
      shortcut: 'G T',
      action: () => { navigate('/trends'); onClose(); },
    },
    {
      id: 'nav-network',
      category: 'Navigation',
      title: '3D Network Topology & Influence',
      subtitle: 'PageRank centrality & coordinated bot detection',
      icon: Share2,
      shortcut: 'G N',
      action: () => { navigate('/network'); onClose(); },
    },
    {
      id: 'nav-alerts',
      category: 'Navigation',
      title: 'Security & Threat Feed',
      subtitle: 'Active coordinated amplification & bot alerts',
      icon: AlertTriangle,
      shortcut: 'G A',
      action: () => { navigate('/alerts'); onClose(); },
    },
    {
      id: 'nav-home',
      category: 'Navigation',
      title: 'Return to Landing Page',
      subtitle: 'Interactive 3D Data Ecosystem & preview',
      icon: Home,
      shortcut: 'G H',
      action: () => { navigate('/'); onClose(); },
    },

    // Monitored Entities
    {
      id: 'entity-1',
      category: 'Monitored Entities',
      title: '@DefSec_India',
      subtitle: 'KOL Influencer · 245K reach · PageRank 0.095',
      icon: AtSign,
      action: () => {
        navigate('/network');
        showToast('Inspecting entity @DefSec_India', 'Node selected in 3D Topology', 'info');
        onClose();
      },
    },
    {
      id: 'entity-2',
      category: 'Monitored Entities',
      title: '@PolicyAnalyst_IN',
      subtitle: 'Defense Think Tank · 120K reach · PageRank 0.078',
      icon: AtSign,
      action: () => {
        navigate('/network');
        showToast('Inspecting entity @PolicyAnalyst_IN', 'Node highlighted in network', 'info');
        onClose();
      },
    },
    {
      id: 'entity-3',
      category: 'Monitored Entities',
      title: '@IntelStream_Asia',
      subtitle: 'Flagged Bot Hub · 98% bot probability',
      icon: Shield,
      action: () => {
        navigate('/alerts');
        showToast('Flagged Bot Hub Target', 'Opening active threat triage feed', 'warning');
        onClose();
      },
    },

    // Trending Topics
    {
      id: 'topic-1',
      category: 'Trending Topics',
      title: '#MakeInIndiaDefense',
      subtitle: '124,500 posts · +340% velocity spike',
      icon: Hash,
      action: () => {
        navigate('/trends');
        showToast('Narrative Focus: #MakeInIndiaDefense', 'Filtering trend analytics', 'info');
        onClose();
      },
    },
    {
      id: 'topic-2',
      category: 'Trending Topics',
      title: '#TechPolicy',
      subtitle: '89,200 posts · Sentiment Shift (+52%)',
      icon: Hash,
      action: () => {
        navigate('/trends');
        showToast('Narrative Focus: #TechPolicy', 'Opening velocity comparison', 'info');
        onClose();
      },
    },

    // Tactical Actions
    {
      id: 'action-role-toggle',
      category: 'Actions',
      title: role === 'analyst' ? 'Switch to Public Observer View' : 'Switch to Analyst Command View',
      subtitle: `Currently active as ${role.toUpperCase()}`,
      icon: UserCheck,
      action: () => {
        const nextRole = role === 'analyst' ? 'public' : 'analyst';
        onRoleChange(nextRole);
        showToast(`Switched view to ${nextRole.toUpperCase()}`, 'Dashboard permissions updated', 'success');
        onClose();
      },
    },
    {
      id: 'action-simulate-ingestion',
      category: 'Actions',
      title: 'Trigger Real-time Ingestion Stream',
      subtitle: 'Simulate high-velocity packet intake (+500 posts)',
      icon: Sparkles,
      action: () => {
        showToast('Live Ingestion Spike Triggered', '528 posts processed in 12ms', 'success');
        onClose();
      },
    },
    {
      id: 'action-lock',
      category: 'Actions',
      title: 'Lock Active Session',
      subtitle: 'Clear analyst state and return to login',
      icon: Lock,
      action: () => {
        navigate('/login');
        showToast('Session Securely Locked', 'NTRO portal credentials required to resume', 'info');
        onClose();
      },
    },
  ];

  const filteredItems = items.filter((item) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/25 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white/90 backdrop-blur-3xl border border-white/80 rounded-2xl shadow-[0_24px_70px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col max-h-[520px] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-black/5 gap-3">
          <Search className="w-4 h-4 text-[#86868B] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, hashtag, entity or jump to..."
            className="w-full bg-transparent text-sm text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none"
          />
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[10px] font-mono text-[#86868B] bg-black/5 px-1.5 py-0.5 rounded border border-black/5">
              ESC
            </span>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#86868B]">
              No matching commands or entities for "<span className="text-[#1D1D1F] font-semibold">{query}</span>"
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-[#007AFF] text-white shadow-sm'
                      : 'hover:bg-black/5 text-[#1D1D1F]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-[#1D1D1F]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold leading-tight truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-[#86868B]'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <div
                          className={`text-[10px] mt-0.5 truncate ${
                            isSelected ? 'text-white/80' : 'text-[#6E6E73]'
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    {item.shortcut && (
                      <span
                        className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded border ${
                          isSelected
                            ? 'bg-white/20 border-white/30 text-white'
                            : 'bg-black/5 border-black/5 text-[#86868B]'
                        }`}
                      >
                        {item.shortcut}
                      </span>
                    )}
                    <ArrowRight
                      className={`w-3 h-3 transition-transform ${
                        isSelected ? 'text-white translate-x-0.5' : 'text-[#86868B] opacity-0'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 bg-black/[0.02] border-t border-black/5 flex items-center justify-between text-[10px] text-[#86868B]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="font-medium text-[#1D1D1F]">NTRO Intelligence Quick Command</span>
        </div>
      </div>
    </div>
  );
};
