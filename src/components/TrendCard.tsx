import React from 'react';
import { TrendTopic } from '../types';
import { TrendingUp, Tag } from 'lucide-react';

interface TrendCardProps {
  trend: TrendTopic;
  onClick?: () => void;
}

export const TrendCard: React.FC<TrendCardProps> = ({ trend, onClick }) => {
  const isPositive = trend.sentiment === 'Positive';
  const isNegative = trend.sentiment === 'Negative';

  const growthColorClass = isPositive 
    ? 'text-[#639922] bg-[#639922]/10 border-[#639922]/30' 
    : isNegative 
    ? 'text-[#E24B4A] bg-[#E24B4A]/10 border-[#E24B4A]/30'
    : 'text-[#EF9F27] bg-[#EF9F27]/10 border-[#EF9F27]/30';

  return (
    <div 
      onClick={onClick}
      className={`bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 flex flex-col justify-between transition-all ${
        onClick ? 'cursor-pointer hover:border-[#378ADD] hover:bg-white' : ''
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-base text-[#2C2C2A]">{trend.hashtag}</h3>
            <span className="text-xs font-semibold text-[#5F5E5A]">{trend.category}</span>
          </div>
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${growthColorClass}`}>
            +{trend.growthPercentage}% growth
          </span>
        </div>

        <div className="flex items-center space-x-4 text-xs text-[#5F5E5A] my-3">
          <div>Volume: <strong className="text-[#2C2C2A] font-mono">{trend.volume.toLocaleString()}</strong></div>
          <div>Sentiment: <strong className="text-[#2C2C2A]">{trend.sentiment}</strong></div>
        </div>
      </div>

      <div className="pt-3 border-t border-[#E5E3DA] flex flex-wrap gap-1.5 items-center">
        <Tag className="w-3 h-3 text-[#5F5E5A] mr-1" />
        {trend.keywords.map((kw) => (
          <span key={kw} className="px-2 py-0.5 rounded-md bg-white text-[11px] font-mono text-[#5F5E5A] border border-[#E5E3DA]">
            {kw}
          </span>
        ))}
      </div>
    </div>
  );
};
