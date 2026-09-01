import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Share2, 
  AlertTriangle, 
  Shield, 
  LogOut
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const navItems = [
    { path: '/', label: 'Overview', icon: LayoutDashboard },
    { path: '/sentiment', label: 'Sentiment', icon: BarChart3 },
    { path: '/demographics', label: 'Demographics', icon: Users },
    { path: '/trends', label: 'Trends', icon: TrendingUp },
    { path: '/network', label: 'Network Graph', icon: Share2 },
    { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
  ];

  return (
    <aside className="w-64 bg-[#F1EFE8] border-r border-[#E5E3DA] min-h-screen flex flex-col justify-between p-4 sticky top-0">
      <div className="space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center space-x-3 px-2 py-1">
          <div className="p-2.5 bg-[#378ADD] rounded-xl text-white shadow-sm">
            <Shield className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-[#2C2C2A] leading-tight">
              NTRO <span className="text-[#378ADD]">Intelligence</span>
            </h1>
            <p className="text-[11px] text-[#5F5E5A]">Null Pointers</p>
          </div>
        </div>

        {/* View Mode Indicator Badge */}
        <div className="px-3 py-1.5 rounded-lg border border-[#378ADD]/30 bg-[#378ADD]/10 text-[#378ADD] text-xs font-semibold flex items-center space-x-2">
          <Shield className="w-3.5 h-3.5" />
          <span>Analyst Portal Active</span>
        </div>

        {/* Multipage Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white text-[#378ADD] shadow-sm border border-[#E5E3DA]'
                      : 'text-[#5F5E5A] hover:bg-white/60 hover:text-[#2C2C2A]'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Link */}
      <div className="pt-4 border-t border-[#E5E3DA]">
        <NavLink
          to="/login"
          className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-[#5F5E5A] hover:text-[#2C2C2A] hover:bg-white/60 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Lock Session / Logout</span>
        </NavLink>
      </div>
    </aside>
  );
};
