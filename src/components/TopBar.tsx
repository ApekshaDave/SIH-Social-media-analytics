import React from 'react';
import { UserRole } from '../types';
import { RoleToggle } from './RoleToggle';

interface TopBarProps {
  role: UserRole;
  onRoleChange: (newRole: UserRole) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ role, onRoleChange }) => {
  return (
    <header className="bg-white border-b border-[#E5E3DA] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-40">
      <div>
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-[#2C2C2A] tracking-tight">
            NTRO Audience Intelligence
          </h1>
          <span className="px-2 py-0.5 rounded-md bg-[#F1EFE8] text-[#5F5E5A] border border-[#E5E3DA] text-[11px] font-bold">
            Null Pointers
          </span>
        </div>
        <p className="text-xs text-[#5F5E5A] mt-0.5">
          Unified multi-platform NLP and network spread framework
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <RoleToggle role={role} onRoleChange={onRoleChange} />
      </div>
    </header>
  );
};
