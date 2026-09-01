import React from 'react';
import { EmotionBreakdown } from '../types';

interface EmotionBarProps {
  emotions: EmotionBreakdown[];
  selectedEmotion: string | null;
  onSelectEmotion: (emotion: string | null) => void;
}

const EMOTION_ACCENTS: Record<string, { color: string; bg: string }> = {
  Support:  { color: '#22C55E', bg: 'rgba(34,197,94,0.12)' },
  Anxiety:  { color: '#F5A623', bg: 'rgba(245,166,35,0.12)' },
  Sarcasm:  { color: '#8B5CF6', bg: 'rgba(139,92,246,0.12)' },
  Anger:    { color: '#EF4444', bg: 'rgba(239,68,68,0.12)' },
};

export const EmotionBar: React.FC<EmotionBarProps> = ({
  emotions,
  selectedEmotion,
  onSelectEmotion,
}) => {
  return (
    <div className="space-y-3">
      {emotions.map((emotion) => {
        const accents = EMOTION_ACCENTS[emotion.name] || { color: '#8B95B0', bg: 'rgba(139,149,176,0.12)' };
        const isSelected = selectedEmotion === emotion.name;
        const isDimmed = selectedEmotion && !isSelected;

        return (
          <button
            key={emotion.name}
            onClick={() => onSelectEmotion(isSelected ? null : emotion.name)}
            className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
              isSelected
                ? 'border-white/20'
                : 'border-white/[0.05] hover:border-white/10'
            } ${isDimmed ? 'opacity-40' : ''}`}
            style={{
              background: isSelected ? accents.bg : 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: accents.color, boxShadow: `0 0 6px ${accents.color}` }}
                />
                <span className="text-xs font-semibold" style={{ color: accents.color }}>
                  {emotion.name}
                </span>
              </div>
              <span className="font-mono text-xs font-bold" style={{ color: accents.color }}>
                {emotion.percentage}%
              </span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
              <div
                className="h-full rounded-full bar-fill"
                style={{
                  width: `${emotion.percentage}%`,
                  background: accents.color,
                  boxShadow: `0 0 8px ${accents.color}`,
                }}
              />
            </div>

            {emotion.description && (
              <p className="text-[10px] text-[#4B566E] mt-1.5 leading-relaxed">
                {emotion.description}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
};
