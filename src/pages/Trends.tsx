import React, { useState } from 'react';
import { TrendTopic } from '../types';
import { TrendCard } from '../components/TrendCard';
import { Clock, TrendingUp, Zap, Search } from 'lucide-react';

interface TrendsProps {
  trends: TrendTopic[];
}

const TIME_WINDOWS = ['1h', '6h', '24h', '7d'] as const;
type TimeWindow = typeof TIME_WINDOWS[number];

export const Trends: React.FC<TrendsProps> = ({ trends }) => {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('24h');
  const [search, setSearch] = useState('');

  const filtered = trends.filter(
    (t) =>
      t.hashtag.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()))
  );

  // All keywords from all trends for the tag cloud
  const allKeywords = trends.flatMap((t) =>
    t.keywords.map((kw) => ({ kw, volume: t.volume, growth: t.growthPercentage }))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 fade-in">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#007AFF] shadow-sm" />
            <span className="text-[10px] font-mono font-bold text-[#007AFF] uppercase tracking-widest">
              Trends Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#1D1D1F] tracking-tight">
            Topic Trends & Narrative Acceleration
          </h1>
          <p className="text-xs text-[#6E6E73] mt-1">
            Ranked narratives · real-time post velocity · cross-platform keyword clusters
          </p>
        </div>

        {/* Time window + search */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#6E6E73] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search trends..."
              className="bg-white border border-black/10 rounded-full pl-8 pr-3 py-1.5 text-xs text-[#1D1D1F] placeholder:text-[#6E6E73] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/40 focus:border-[#007AFF] transition-all w-40 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-0.5 p-1 rounded-full bg-black/5 border border-black/5 shadow-inner">
            {TIME_WINDOWS.map((tw) => (
              <button
                key={tw}
                onClick={() => setTimeWindow(tw)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  timeWindow === tw
                    ? 'bg-white text-[#1D1D1F] shadow-apple'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                {tw}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="grid grid-cols-3 gap-4 fade-in-1">
        {[
          { icon: TrendingUp, label: 'Active Trends', value: trends.length.toString(), color: '#007AFF' },
          { icon: Zap,        label: 'Fastest Growing', value: `+${Math.max(...trends.map((t) => t.growthPercentage))}%`, color: '#34C759' },
          { icon: Clock,      label: 'Time Window', value: timeWindow.toUpperCase(), color: '#FF9500' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="glass-card p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div>
              <div className="text-[10px] text-[#6E6E73] uppercase tracking-wider font-semibold">{label}</div>
              <div className="font-mono text-base font-black text-[#1D1D1F]">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 fade-in-2">
        {filtered.map((trend, i) => (
          <TrendCard key={trend.id} trend={trend} rank={i + 1} />
        ))}
        {filtered.length === 0 && (
          <div className="md:col-span-3 glass-card p-10 text-center text-[#6E6E73] text-sm">
            No trends match "{search}"
          </div>
        )}
      </div>

      {/* Keyword Tag Cloud */}
      <div className="glass-card p-5 space-y-4 fade-in-3">
        <div>
          <h2 className="text-sm font-bold text-[#1D1D1F]">Keyword Intelligence Cloud</h2>
          <p className="text-[10px] text-[#6E6E73] mt-0.5">
            Ranked keywords from all active trend narratives · font weight = relative volume
          </p>
        </div>

        <div className="flex flex-wrap gap-2 py-3">
          {allKeywords.map(({ kw, volume, growth }, i) => {
            return (
              <button
                key={`${kw}-${i}`}
                onClick={() => setSearch(kw)}
                className="px-3 py-1.5 rounded-full bg-white border border-black/5 hover:border-[#007AFF]/40 hover:bg-[#007AFF]/5 text-xs font-semibold text-[#1D1D1F] transition-all shadow-xs hover:scale-105 cursor-pointer flex items-center gap-1.5"
              >
                <span>#{kw}</span>
                <span className="text-[9px] font-mono text-[#34C759]">+{growth}%</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
