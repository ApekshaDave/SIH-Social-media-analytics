import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  caption: string;
  icon: LucideIcon;
  iconColor?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  caption,
  icon: Icon,
  iconColor = 'text-[#378ADD]',
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 flex flex-col justify-between transition-all ${
        onClick ? 'cursor-pointer hover:border-[#378ADD] hover:bg-[#EAE8E0]' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#5F5E5A] uppercase tracking-wider">{label}</span>
        <div className={`p-2 rounded-lg bg-white border border-[#E5E3DA] ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold text-[#2C2C2A] tracking-tight">{value}</div>
        <p className="text-xs text-[#5F5E5A] mt-1 font-medium">{caption}</p>
      </div>
    </div>
  );
};
