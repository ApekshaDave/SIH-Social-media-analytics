import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ScrollCard } from './ScrollCard';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  caption?: string;
  accent: string;
  accentBg: string;
  trend?: 'up' | 'down' | 'neutral';
  onClick?: () => void;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  caption,
  accent,
  accentBg,
  trend,
  onClick,
  delay = 0,
}) => {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? '#34C759' : trend === 'down' ? '#FF3B30' : '#86868B';

  return (
    <ScrollCard index={delay / 100} onClick={onClick} className="h-full">
      <div className={`glass-card p-6 space-y-4 h-full flex flex-col justify-between`}>
        <div className="flex items-start justify-between">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
            style={{ background: accentBg, color: accent }}
          >
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <div className="flex items-center gap-1 font-medium text-sm" style={{ color: trendColor }}>
              <TrendIcon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div>
          <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mb-1">
            {label}
          </div>
          <div className="text-3xl font-bold tracking-tight text-[#1D1D1F]">
            {value}
          </div>
        </div>

        {caption && (
          <div className="text-[12px] text-[#86868B] pt-3 border-t border-black/5 mt-auto">
            {caption}
          </div>
        )}
      </div>
    </ScrollCard>
  );
};
