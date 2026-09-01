import React from 'react';
import { Shield } from 'lucide-react';
import { UserRole } from '../types';

interface RoleToggleProps {
  role: UserRole;
  onChange: (role: UserRole) => void;
}

export const RoleToggle: React.FC<RoleToggleProps> = () => {
  return (
    <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#378ADD]/10 border border-[#378ADD]/30 text-[#378ADD] text-xs font-bold shadow-sm">
      <Shield className="w-4 h-4 stroke-[2.5]" />
      <span>Analyst Access Active</span>
    </div>
  );
};
