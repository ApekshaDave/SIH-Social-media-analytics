import React, { useRef, useState } from 'react';
import { Shield, Sparkles, Cpu, CheckCircle2, Lock } from 'lucide-react';
import { UserRole } from '../types';

interface SecurityBadgeProps {
  role: UserRole;
  label: string;
  badge: string;
  clearance: string;
  idNumber: string;
  color: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const SecurityBadge: React.FC<SecurityBadgeProps> = ({
  role,
  label,
  badge,
  clearance,
  idNumber,
  color,
  isSelected,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotX(-(y / (rect.height / 2)) * 12);
    setRotY((x / (rect.width / 2)) * 12);
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
  };

  return (
    <div
      ref={cardRef}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer select-none rounded-2xl p-4 transition-all duration-300 transform perspective-1000 ${
        isSelected
          ? 'scale-[1.02] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.15)] ring-2'
          : 'hover:scale-[1.01] hover:shadow-lg opacity-85 hover:opacity-100'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${isSelected ? color : 'rgba(0, 0, 0, 0.08)'}`,
        boxShadow: isSelected
          ? `0 16px 36px -10px ${color}30, 0 0 0 1px ${color}40, inset 0 1px 1px rgba(255, 255, 255, 1)`
          : '0 4px 20px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Laser Scanline on Active Selection */}
      {isSelected && (
        <div 
          className="absolute inset-x-0 top-0 h-0.5 animate-scanline pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      )}

      {/* Top Bar: Hologram Chip + Clearance */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {/* Gold Microchip Representation */}
          <div 
            className="w-7 h-5 rounded-md border flex items-center justify-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #FFE259 0%, #FFA751 100%)',
              borderColor: '#E69500',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.6)',
            }}
          >
            <div className="w-full h-px bg-[#B86B00]/40 absolute top-1.5" />
            <div className="w-full h-px bg-[#B86B00]/40 absolute bottom-1.5" />
            <div className="w-px h-full bg-[#B86B00]/40 absolute left-2" />
            <div className="w-px h-full bg-[#B86B00]/40 absolute right-2" />
          </div>

          <div className="flex items-center gap-1 text-[9px] font-mono font-bold tracking-widest text-[#6E6E73]">
            <span>NFC</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
          </div>
        </div>

        {/* Clearance Badge Pill */}
        <span
          className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider"
          style={{
            backgroundColor: `${color}15`,
            color: color,
            border: `1px solid ${color}30`,
          }}
        >
          {badge}
        </span>
      </div>

      {/* Main Identity Info */}
      <div className="space-y-1 mb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-[#1D1D1F] tracking-tight">{label}</h3>
          {isSelected && (
            <CheckCircle2 className="w-3.5 h-3.5" style={{ color }} />
          )}
        </div>
        <div className="text-[10px] text-[#6E6E73] font-medium leading-snug">
          {clearance}
        </div>
      </div>

      {/* Footer: ID Code & Sovereign Crest Stamp */}
      <div className="flex items-center justify-between pt-2.5 border-t border-black/5 text-[9px] font-mono text-[#6E6E73]">
        <div className="flex items-center gap-1.5">
          <span className="text-black/30">KEY ID:</span>
          <span className="font-bold text-[#1D1D1F]">{idNumber}</span>
        </div>
        <span className="text-[8px] tracking-widest uppercase font-semibold text-black/40">
          NTRO SOVEREIGN
        </span>
      </div>
    </div>
  );
};
