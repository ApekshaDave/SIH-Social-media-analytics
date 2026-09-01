import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';
import { OverviewSummary, UserRole, SentimentTimePoint, EmotionBreakdown, ChartTooltipPayloadItem } from '../types';
import { StatCard } from '../components/StatCard';
import { mockSentimentTimePoints, mockEmotions } from '../mock/mockData';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Share2,
  MessageSquare,
  ChevronRight,
  Zap,
  Radio,
  ArrowUpRight,
} from 'lucide-react';

interface OverviewProps {
  role?: UserRole;
  summary: OverviewSummary;
  sentimentProgression?: SentimentTimePoint[];
  emotionBreakdown?: EmotionBreakdown[];
}

const EMOTION_COLORS: Record<string, string> = {
  Support: '#34C759',
  Anxiety: '#FF9500',
  Sarcasm: '#8B5CF6',
  Anger:   '#FF3B30',
};

interface TooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
  label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white/90 backdrop-blur-2xl border border-black/5 shadow-apple p-3 rounded-xl min-w-[140px]">
        <div className="font-mono text-[10px] text-[#6E6E73] mb-1 font-bold">{label}</div>
        {payload.map((p) => (
          <div key={p.dataKey || p.name} className="flex items-center justify-between gap-3 text-[11px] py-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }} />
              <span className="text-[#6E6E73] capitalize">{p.dataKey || p.name}</span>
            </div>
            <span className="font-bold font-mono text-[#1D1D1F]" style={{ color: p.color || p.fill }}>
              {p.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Overview: React.FC<OverviewProps> = ({
  summary,
  sentimentProgression = mockSentimentTimePoints,
  emotionBreakdown = mockEmotions,
}) => {
  const navigate = useNavigate();
  const [timeWindow, setTimeWindow] = useState<'24H' | '7D'>('24H');

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 fade-in">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="relative w-2 h-2">
              <div className="w-2 h-2 rounded-full bg-[#34C759]" />
              <div className="absolute inset-0 rounded-full bg-[#34C759] animate-ping opacity-60" />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#248A3D] uppercase tracking-widest">
              Live Intelligence Feed Active
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#1D1D1F] tracking-tight leading-none">
            National Audience Intelligence
          </h1>
          <p className="text-xs text-[#6E6E73] mt-1">
            Cross-platform continuous ingestion across X (Twitter) and Telegram
          </p>
        </div>

        <button
          onClick={() => navigate('/network')}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105 shadow-sm flex-shrink-0 bg-[#007AFF] hover:bg-[#0071E3]"
        >
          <Share2 className="w-3.5 h-3.5" />
          Explore 3D Network Graph
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Posts Analyzed"
          value={summary.totalPosts.toLocaleString()}
          icon={MessageSquare}
          caption={`+${summary.volumeChange24h}% volume in 24h`}
          accent="#007AFF"
          accentBg="rgba(0,122,255,0.1)"
          trend="up"
          delay={0}
        />
        <StatCard
          label="Overall Sentiment Index"
          value={`${summary.sentimentIndex > 0 ? '+' : ''}${summary.sentimentIndex}%`}
          icon={BarChart3}
          caption={`Dominant: ${summary.dominantEmotion}`}
          accent="#34C759"
          accentBg="rgba(52,199,89,0.1)"
          trend="up"
          delay={1}
        />
        <StatCard
          label="Top Trending Topic"
          value={summary.topTrendTopic}
          icon={TrendingUp}
          caption={`+${summary.topTrendGrowth}% acceleration spike`}
          accent="#FF9500"
          accentBg="rgba(255,149,0,0.1)"
          trend="up"
          delay={2}
        />
        <StatCard
          label="Active Threat Flags"
          value={`${summary.activeAlertsCount} Alerts`}
          icon={AlertTriangle}
          caption={`${summary.botClustersCount} bot clusters detected`}
          accent="#FF3B30"
          accentBg="rgba(255,59,48,0.1)"
          trend={summary.activeAlertsCount > 0 ? 'down' : 'up'}
          delay={3}
        />
      </div>

      {/* Main Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Sentiment Timeline */}
        <div className="lg:col-span-2 glass-card p-5 space-y-4 fade-in-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-[#1D1D1F]">Cross-Platform Sentiment Trajectory</h2>
              <p className="text-[10px] text-[#6E6E73] mt-0.5">Real-time aggregate polarity index over time</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 p-1 rounded-full bg-black/5 border border-black/5">
                {(['24H', '7D'] as const).map((tw) => (
                  <button
                    key={tw}
                    onClick={() => setTimeWindow(tw)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                      timeWindow === tw ? 'bg-white text-[#1D1D1F] shadow-apple' : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    {tw}
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate('/sentiment')}
                className="text-[11px] font-semibold text-[#007AFF] hover:underline flex items-center gap-1"
              >
                Deep-Dive <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentProgression} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 6" stroke="rgba(0,0,0,0.05)" />
                <XAxis dataKey="timestamp" stroke="#6E6E73" fontSize={10} tickLine={false} />
                <YAxis stroke="#6E6E73" fontSize={10} domain={[-20, 100]} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="score" stroke="#007AFF" strokeWidth={2.5} dot={{ r: 3, fill: '#007AFF', strokeWidth: 0 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="positive" stroke="#34C759" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="negative" stroke="#FF3B30" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-[10px] pt-1 border-t border-black/5">
            {[
              { color: '#007AFF', label: 'Sentiment Score', dash: false },
              { color: '#34C759', label: 'Positive', dash: true },
              { color: '#FF3B30', label: 'Negative', dash: true },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div
                  className="w-6 h-0.5"
                  style={{
                    background: l.color,
                    borderTop: l.dash ? `2px dashed ${l.color}` : undefined,
                    backgroundColor: l.dash ? 'transparent' : l.color,
                  }}
                />
                <span className="text-[#6E6E73] font-medium">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emotion Breakdown */}
        <div className="glass-card p-5 space-y-4 fade-in-3 flex flex-col">
          <div>
            <h2 className="text-sm font-bold text-[#1D1D1F]">Emotion Classification</h2>
            <p className="text-[10px] text-[#6E6E73] mt-0.5">Multi-class NLP emotion tag breakdown</p>
          </div>

          <div className="w-full h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotionBreakdown}
                  dataKey="percentage"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={68}
                  paddingAngle={3}
                >
                  {emotionBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={EMOTION_COLORS[entry.name] || '#6E6E73'} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 grid grid-cols-2 gap-2 pt-2 border-t border-black/5">
            {emotionBreakdown.map((item) => {
              const c = EMOTION_COLORS[item.name] || '#6E6E73';
              return (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: c }}
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] text-[#6E6E73] truncate font-medium">{item.name}</div>
                    <div className="font-mono text-xs font-bold" style={{ color: c }}>
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Module Quick-Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            path: '/demographics',
            title: 'Demographics & Geography',
            desc: 'Age distribution, Hinglish dialect metrics, regional audience share',
            accent: '#007AFF',
            tag: 'DPDP Compliant',
            tagColor: '#007AFF',
            icon: Zap,
          },
          {
            path: '/trends',
            title: 'Narrative Acceleration',
            desc: 'Post velocity spikes across X and Telegram with keyword tag clusters',
            accent: '#FF9500',
            tag: '#MakeInIndiaDefense +184%',
            tagColor: '#FF9500',
            icon: TrendingUp,
          },
          {
            path: '/alerts',
            title: 'Security Alerts Feed',
            desc: 'Automated anomaly monitoring: bot coordination, sentiment drops',
            accent: '#FF3B30',
            tag: '3 Active Security Flags',
            tagColor: '#FF3B30',
            icon: Radio,
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className="glass-card p-5 text-left space-y-3 group hover:scale-[1.01] transition-all duration-200 fade-in-4 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: `${card.accent}15` }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: card.accent }} />
                </div>
                <ChevronRight
                  className="w-4 h-4 text-[#6E6E73] group-hover:translate-x-1 transition-transform"
                  style={{ color: card.accent }}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1D1D1F]">{card.title}</h3>
                <p className="text-[11px] text-[#6E6E73] mt-1 leading-relaxed">{card.desc}</p>
              </div>
              <div
                className="text-[10px] font-bold"
                style={{ color: card.tagColor }}
              >
                {card.tag}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
