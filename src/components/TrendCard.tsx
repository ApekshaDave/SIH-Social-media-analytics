import React from 'react';
import { TrendTopic } from '../types';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface TrendCardProps {
  trend: TrendTopic;
  rank: number;
}

const SENTIMENT_STYLES: Record<string, { color: string; bg: string }> = {
  Positive: { color: '#34C759', bg: 'rgba(52,199,89,0.12)' },
  Negative: { color: '#FF3B30', bg: 'rgba(255,59,48,0.12)' },
  Neutral:  { color: '#6E6E73', bg: 'rgba(110,110,115,0.12)' },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Defense Tech':      '#007AFF',
  'National Security': '#34C759',
  'Anomaly Warning':   '#FF3B30',
};

export const TrendCard: React.FC<TrendCardProps> = ({ trend, rank }) => {
  const sentStyle = SENTIMENT_STYLES[trend.sentiment] || SENTIMENT_STYLES.Neutral;
  const categoryColor = CATEGORY_COLORS[trend.category] || '#007AFF';
  const isAnomaly = trend.category === 'Anomaly Warning';

  return (
    <div
      className="glass-card p-5 space-y-4 fade-in hover:scale-[1.01] transition-all"
      style={{ animationDelay: `${rank * 80}ms` }}
    >
      {/* Rank + Category */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span
            className="text-2xl font-black font-mono leading-none"
            style={{ color: isAnomaly ? '#FF3B30' : '#1D1D1F' }}
          >
            #{rank}
          </span>
          <span
            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs"
            style={{ background: `${categoryColor}15`, color: categoryColor, border: `1px solid ${categoryColor}30` }}
          >
            {trend.category}
          </span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-[#6E6E73]" />
      </div>

      {/* Hashtag (High Contrast Bold) */}
      <div>
        <div className="text-lg font-black text-[#1D1D1F] tracking-tight leading-snug">
          {trend.hashtag}
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between pt-1 border-t border-black/5">
        <div>
          <div className="text-[10px] text-[#6E6E73] font-semibold mb-0.5 uppercase tracking-wider">Volume (24h)</div>
          <div className="font-mono text-base font-black text-[#1D1D1F]">
            {trend.volume.toLocaleString()}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-[#6E6E73] font-semibold mb-0.5 uppercase tracking-wider">Growth</div>
          <div className="flex items-center gap-1 justify-end font-mono text-sm font-black text-[#34C759]">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{trend.growthPercentage}%</span>
          </div>
        </div>
        <div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{ background: sentStyle.bg, color: sentStyle.color }}
          >
            {trend.sentiment}
          </span>
        </div>
      </div>

      {/* Platform Split */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[#6E6E73] font-medium w-16 flex-shrink-0">X (Twitter)</span>
          <div className="flex-1 h-2 rounded-full bg-black/5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${trend.platforms.x}%`, background: '#007AFF' }}
            />
          </div>
          <span className="font-mono text-[#007AFF] font-bold w-8 text-right">{trend.platforms.x}%</span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="text-[#6E6E73] font-medium w-16 flex-shrink-0">Telegram</span>
          <div className="flex-1 h-2 rounded-full bg-black/5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${trend.platforms.telegram}%`, background: '#8B5CF6' }}
            />
          </div>
          <span className="font-mono text-[#8B5CF6] font-bold w-8 text-right">{trend.platforms.telegram}%</span>
        </div>
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5">
        {trend.keywords.map((kw) => (
          <span
            key={kw}
            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/5 text-[#6E6E73] border border-black/5"
          >
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
};
