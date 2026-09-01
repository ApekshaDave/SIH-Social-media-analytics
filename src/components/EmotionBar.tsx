import React from 'react';
import { EmotionBreakdown } from '../types';

interface EmotionBarProps {
  emotions: EmotionBreakdown[];
  selectedEmotion: string | null;
  onSelectEmotion: (name: string | null) => void;
}

export const EmotionBar: React.FC<EmotionBarProps> = ({
  emotions,
  selectedEmotion,
  onSelectEmotion
}) => {
  return (
    <div className="space-y-4">
      {/* Segmented Horizontal Progress Bar */}
      <div className="w-full bg-[#E5E3DA] h-4 rounded-xl overflow-hidden flex cursor-pointer shadow-inner">
        {emotions.map((emo) => (
          <div
            key={emo.name}
            onClick={() => onSelectEmotion(selectedEmotion === emo.name ? null : emo.name)}
            className={`h-full transition-all duration-300 hover:opacity-90 ${
              selectedEmotion && selectedEmotion !== emo.name ? 'opacity-40' : 'opacity-100'
            }`}
            style={{ width: `${emo.percentage}%`, backgroundColor: emo.color }}
            title={`${emo.name}: ${emo.percentage}% (Click to filter)`}
          />
        ))}
      </div>

      {/* Clickable Legend Item Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {emotions.map((emo) => {
          const isSelected = selectedEmotion === emo.name;
          return (
            <button
              key={emo.name}
              onClick={() => onSelectEmotion(isSelected ? null : emo.name)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-white border-[#378ADD] shadow-sm ring-1 ring-[#378ADD]'
                  : 'bg-[#F1EFE8] border-[#E5E3DA] hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: emo.color }} />
                  <span className="text-xs font-bold text-[#2C2C2A]">{emo.name}</span>
                </div>
                <span className="text-xs font-bold text-[#2C2C2A] font-mono">{emo.percentage}%</span>
              </div>
              <p className="text-[11px] text-[#5F5E5A] line-clamp-1">{emo.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
