import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Users,
  TrendingUp,
  Share2,
  AlertTriangle,
  Shield,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Activity,
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
}

const NAV_ITEMS = [
  { path: '/dashboard',    label: 'Overview',      icon: LayoutDashboard, accent: '#4F8EF7',  module: 'overview' },
  { path: '/sentiment',    label: 'Sentiment',     icon: BarChart3,       accent: '#F5A623',  module: 'sentiment' },
  { path: '/demographics', label: 'Demographics',  icon: Users,           accent: '#00D4B4',  module: 'demographics' },
  { path: '/trends',       label: 'Trends',        icon: TrendingUp,      accent: '#4F8EF7',  module: 'trends' },
  { path: '/network',      label: 'Network',       icon: Share2,          accent: '#8B5CF6',  module: 'network' },
  { path: '/alerts',       label: 'Alerts',        icon: AlertTriangle,   accent: '#EF4444',  module: 'alerts' },
];

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  const handleLogout = () => {
    sessionStorage.removeItem('ntro_authenticated');
    navigate('/login');
  };

  return (
    <aside
      className={`sticky top-0 h-screen bg-white/70 backdrop-blur-[40px] border-r border-black/5 flex flex-col transition-all duration-300 z-50 flex-shrink-0 ${
        collapsed ? 'w-[68px]' : 'w-[240px]'
      }`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-white border border-black/10 flex items-center justify-center text-[#6E6E73] hover:text-[#1D1D1F] hover:border-black/20 transition-all z-30 shadow-apple"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Brand */}
      <Link 
        to="/" 
        title="Go to Landing Page"
        className={`flex items-center gap-3 px-4 py-5 border-b border-black/5 hover:bg-black/[0.02] transition-colors ${collapsed ? 'justify-center' : ''}`}
      >
        <div className="w-8 h-8 rounded-lg bg-[#007AFF]/10 border border-[#007AFF]/20 flex items-center justify-center flex-shrink-0">
          <Shield className="w-4 h-4 text-[#007AFF]" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-[#1D1D1F] leading-none whitespace-nowrap">
              NTRO <span className="text-[#007AFF]">Intelligence</span>
            </div>
            <div className="text-[10px] text-[#6E6E73] mt-0.5 whitespace-nowrap">Null Pointers · SIH 2024</div>
          </div>
        )}
      </Link>

      {/* Live Clock */}
      {!collapsed && (
        <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-white/50 border border-black/5 shadow-sm flex items-center gap-2">
          <div className="relative w-2 h-2">
            <div className="w-2 h-2 rounded-full bg-[#FF3B30]" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#FF3B30] animate-ping opacity-60" />
          </div>
          <span className="font-mono text-[11px] text-[#6E6E73]">LIVE</span>
          <span className="font-mono text-[11px] text-[#1D1D1F] font-semibold ml-auto">{formatTime(time)}</span>
        </div>
      )}

      {/* Role Badge */}
      {!collapsed && (
        <div className="mx-3 mt-2 px-3 py-1.5 rounded-lg bg-[#007AFF]/10 border border-[#007AFF]/20 flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-[#007AFF]" />
          <span className="text-[10px] font-semibold text-[#007AFF] uppercase tracking-wider">
            {role === 'analyst' ? 'Analyst Portal' : 'Public View'}
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 mt-4 px-2 space-y-0.5 overflow-hidden">
        {!collapsed && (
          <div className="px-2 mb-2 text-[9px] font-bold text-[#A1A1A6] uppercase tracking-widest">
            Modules
          </div>
        )}
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 group overflow-hidden ${
                  isActive
                    ? 'text-[#1D1D1F]'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5'
                } ${collapsed ? 'justify-center' : ''}`
              }
              style={({ isActive }) =>
                isActive
                  ? { background: `white`, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }
                  : {}
              }
              title={collapsed ? item.label : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className="w-4 h-4 flex-shrink-0 transition-colors"
                    style={{ color: isActive ? item.accent : undefined }}
                  />
                  {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                  {isActive && !collapsed && (
                    <span
                      className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider"
                      style={{ background: `${item.accent}15`, color: item.accent }}
                    >
                      Active
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 pb-4 border-t border-black/5 pt-3">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium text-[#6E6E73] hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Lock Session</span>}
        </button>
      </div>
    </aside>
  );
};
