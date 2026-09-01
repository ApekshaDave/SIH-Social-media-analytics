import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from 'recharts';
import { DemographicData } from '../types';
import { ShieldCheck, MapPin } from 'lucide-react';

interface DemographicsProps {
  data: DemographicData;
}

const AGE_COLORS = ['#00D4B4', '#4F8EF7', '#8B5CF6', '#F5A623'];
const LANG_COLORS = ['#00D4B4', '#4F8EF7', '#8B5CF6', '#F5A623', '#EF4444'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="font-mono text-[10px] text-[#86868B] mb-1">{label}</div>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }} />
            <span className="font-bold font-mono" style={{ color: p.color || p.fill }}>{p.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Demographics: React.FC<DemographicsProps> = ({ data }) => {
  const maxRegion = Math.max(...data.regions.map((r) => r.volume));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="fade-in">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-[#00D4B4]" style={{ boxShadow: '0 0 6px #00D4B4' }} />
          <span className="text-[10px] font-mono font-bold text-[#00D4B4] uppercase tracking-widest">
            Demographics Module
          </span>
        </div>
        <h1 className="text-2xl font-black text-[#1D1D1F] tracking-tight">
          Demographic & Linguistic Analytics
        </h1>
        <p className="text-xs text-[#86868B] mt-1">
          Population aggregate profiling · age distribution · geographic density · dialect patterns
        </p>
      </div>

      {/* Privacy Banner */}
      <div
        className="flex items-center gap-3 p-3.5 rounded-xl border fade-in-1"
        style={{ background: 'rgba(0,212,180,0.05)', borderColor: 'rgba(0,212,180,0.2)' }}
      >
        <ShieldCheck className="w-4 h-4 text-[#00D4B4] flex-shrink-0" />
        <div>
          <span className="text-xs font-bold text-[#00D4B4]">Privacy & Data Governance Compliance · </span>
          <span className="text-[11px] text-[#86868B]">
            Aggregate, anonymized data only — no individual identification. Fully compliant with Indian Data Protection standards (DPDP Act).
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Age Bar Chart */}
        <div className="glass-card p-5 space-y-4 fade-in-2">
          <div>
            <h2 className="text-sm font-bold text-[#1D1D1F]">Age Bracket Distribution</h2>
            <p className="text-[10px] text-[#86868B] mt-0.5">Audience age percentage across public posts</p>
          </div>
          <div className="w-full h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ageBrackets} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="bracket" stroke="#86868B" fontSize={10} tickLine={false} />
                <YAxis stroke="#86868B" fontSize={10} tickLine={false} unit="%" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                  {data.ageBrackets.map((_, i) => (
                    <Cell key={i} fill={AGE_COLORS[i % AGE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3">
            {data.ageBrackets.map((ab, i) => (
              <div key={ab.bracket} className="flex items-center gap-1.5 text-[10px]">
                <div className="w-2 h-2 rounded-full" style={{ background: AGE_COLORS[i % AGE_COLORS.length] }} />
                <span className="text-[#86868B]">{ab.bracket}:</span>
                <span className="font-mono font-bold" style={{ color: AGE_COLORS[i % AGE_COLORS.length] }}>
                  {ab.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Language Donut */}
        <div className="glass-card p-5 space-y-4 fade-in-2">
          <div>
            <h2 className="text-sm font-bold text-[#1D1D1F]">Language & Dialect Mix</h2>
            <p className="text-[10px] text-[#86868B] mt-0.5">Including code-mixed Hinglish composition</p>
          </div>
          <div className="w-full h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.languages}
                  dataKey="percentage"
                  nameKey="language"
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {data.languages.map((_, i) => (
                    <Cell key={i} fill={LANG_COLORS[i % LANG_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center">
            {data.languages.map((lang, i) => (
              <div key={lang.language} className="flex items-center gap-1.5 text-[10px]">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: LANG_COLORS[i % LANG_COLORS.length], boxShadow: `0 0 4px ${LANG_COLORS[i % LANG_COLORS.length]}` }}
                />
                <span className="text-[#86868B]">{lang.language}:</span>
                <span className="font-mono font-bold" style={{ color: LANG_COLORS[i % LANG_COLORS.length] }}>
                  {lang.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Regional Density */}
      <div className="glass-card p-5 space-y-5 fade-in-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#1D1D1F]">Geographic Regional Density</h2>
            <p className="text-[10px] text-[#86868B] mt-0.5">Regional post volume & national share of voice</p>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#00D4B4]">
            <MapPin className="w-3.5 h-3.5" />
            <span className="font-semibold">{data.regions.length} Metro Zones</span>
          </div>
        </div>

        <div className="space-y-3">
          {data.regions.map((reg, idx) => {
            const barPct = (reg.volume / maxRegion) * 100;
            const color = LANG_COLORS[idx % LANG_COLORS.length];
            return (
              <div key={reg.region} className="grid grid-cols-[120px_1fr_80px_70px] items-center gap-4">
                <div className="text-xs font-semibold text-[#1D1D1F] truncate">{reg.region}</div>
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div
                    className="h-full rounded-full bar-fill transition-all"
                    style={{ width: `${barPct}%`, background: color, boxShadow: `0 0 6px ${color}60` }}
                  />
                </div>
                <div className="font-mono text-xs font-bold text-right" style={{ color }}>
                  {reg.volume.toLocaleString()}
                </div>
                <div
                  className="text-[10px] font-bold text-right"
                  style={{ color }}
                >
                  {reg.sharePercentage}%
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-[10px] text-[#86868B] border-t border-white/[0.05] pt-3">
          <span>Post Volume →</span>
          <span className="ml-auto">Share of Voice</span>
        </div>
      </div>
    </div>
  );
};
