import React from 'react';
import { TrendTopic } from '../types';
import { TrendCard } from '../components/TrendCard';

interface TrendsProps {
  trends: TrendTopic[];
}

export const Trends: React.FC<TrendsProps> = ({ trends }) => {
  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2C2C2A] tracking-tight">Topic Trends & Narrative Acceleration</h1>
        <p className="text-xs text-[#5F5E5A] mt-0.5">
          Ranked topic narratives, post velocity acceleration rates, and keyword tag clouds
        </p>
      </div>

      {/* Grid of Trend Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trends.map((trend) => (
          <TrendCard key={trend.id} trend={trend} />
        ))}
      </div>

      {/* Narrative Breakdown Cards */}
      <div className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-4">
        <h2 className="text-base font-bold text-[#2C2C2A]">Cross-Platform Velocity Comparison</h2>
        
        <div className="space-y-3">
          {trends.map((t) => (
            <div key={t.id} className="p-4 rounded-xl bg-white border border-[#E5E3DA] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#2C2C2A]">
                <span>{t.hashtag} ({t.category})</span>
                <span className="font-mono">{t.volume.toLocaleString()} total posts</span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="w-20 text-[#5F5E5A] font-semibold">X (Twitter):</span>
                <div className="flex-1 bg-[#E5E3DA] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#378ADD] h-full" style={{ width: `${t.platforms.x}%` }} />
                </div>
                <span className="w-10 font-bold text-[#2C2C2A] text-right">{t.platforms.x}%</span>
              </div>

              <div className="flex items-center space-x-2 text-xs">
                <span className="w-20 text-[#5F5E5A] font-semibold">Telegram:</span>
                <div className="flex-1 bg-[#E5E3DA] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#7F77DD] h-full" style={{ width: `${t.platforms.telegram}%` }} />
                </div>
                <span className="w-10 font-bold text-[#2C2C2A] text-right">{t.platforms.telegram}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
