import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { EmotionBreakdown, Post, SentimentTimePoint, ChartTooltipPayloadItem } from '../types';
import { EmotionBar } from '../components/EmotionBar';
import { Bot, Heart, Share2, Filter, Calendar } from 'lucide-react';
import { useToast } from '../components/Toast';
import { NarrativeRiver } from '../components/NarrativeRiver';

interface SentimentProps {
  timePoints: SentimentTimePoint[];
  emotions: EmotionBreakdown[];
  posts: Post[];
}

const PLATFORM_COLORS: Record<string, string> = {
  'X (Twitter)': '#007AFF',
  'Telegram':    '#8B5CF6',
};

const SENTIMENT_COLORS: Record<string, { color: string; bg: string }> = {
  positive: { color: '#34C759', bg: 'rgba(52,199,89,0.12)' },
  negative: { color: '#FF3B30', bg: 'rgba(255,59,48,0.12)' },
  neutral:  { color: '#6E6E73', bg: 'rgba(110,110,115,0.08)' },
};

interface TooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
  label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white/90 backdrop-blur-2xl border border-black/5 shadow-apple p-3 rounded-xl min-w-[150px]">
        <div className="font-mono text-[10px] text-[#6E6E73] mb-1.5 font-bold">{label}</div>
        {payload.map((p) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-4 text-[11px] py-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
              <span className="text-[#6E6E73] capitalize">{p.dataKey}</span>
            </div>
            <span className="font-bold font-mono text-[#1D1D1F]" style={{ color: p.color }}>{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Sentiment: React.FC<SentimentProps> = ({ timePoints, emotions, posts }) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [platform, setPlatform] = useState<'all' | 'X (Twitter)' | 'Telegram'>('all');
  const [timeRange, setTimeRange] = useState<'1H' | '6H' | '24H' | '7D'>('24H');
  const { showToast } = useToast();

  const handlePlatformChange = (p: 'all' | 'X (Twitter)' | 'Telegram') => {
    setPlatform(p);
    showToast(
      `Platform filter updated: ${p === 'all' ? 'All Networks' : p}`,
      'Recalibrating real-time sentiment distribution',
      'info'
    );
  };

  const handleTimeRangeChange = (tr: '1H' | '6H' | '24H' | '7D') => {
    setTimeRange(tr);
    showToast(
      `Time window set to ${tr}`,
      'Aggregating temporal sentiment progression curves',
      'info'
    );
  };

  // Modulate timePoints dynamically based on timeRange
  const activeTimePoints = useMemo(() => {
    switch (timeRange) {
      case '1H':
        return timePoints.slice(-3).map((tp, i) => ({ ...tp, timestamp: `10:${i * 20}m` }));
      case '6H':
        return timePoints.slice(-4);
      case '7D':
        return [
          { timestamp: 'Mon', score: 48, positive: 60, negative: 18, neutral: 22, support: 50, anxiety: 15, sarcasm: 12 },
          { timestamp: 'Tue', score: 52, positive: 65, negative: 14, neutral: 21, support: 55, anxiety: 12, sarcasm: 10 },
          { timestamp: 'Wed', score: 41, positive: 54, negative: 25, neutral: 21, support: 42, anxiety: 22, sarcasm: 14 },
          { timestamp: 'Thu', score: 58, positive: 70, negative: 12, neutral: 18, support: 62, anxiety: 10, sarcasm: 8 },
          { timestamp: 'Fri', score: 64, positive: 76, negative: 10, neutral: 14, support: 68, anxiety: 8, sarcasm: 7 },
          { timestamp: 'Sat', score: 54, positive: 66, negative: 15, neutral: 19, support: 58, anxiety: 14, sarcasm: 11 },
          { timestamp: 'Sun', score: 62, positive: 72, negative: 11, neutral: 17, support: 64, anxiety: 9, sarcasm: 9 },
        ];
      default:
        return timePoints;
    }
  }, [timePoints, timeRange]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const emotionMatch = !selectedEmotion || p.emotion.toLowerCase() === selectedEmotion.toLowerCase();
      const platformMatch = platform === 'all' || p.platform === platform;
      return emotionMatch && platformMatch;
    });
  }, [posts, selectedEmotion, platform]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 fade-in">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#FF9500] shadow-sm" />
            <span className="text-[10px] font-mono font-bold text-[#FF9500] uppercase tracking-widest">
              Sentiment Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#1D1D1F] tracking-tight">
            Sentiment & Emotion Progression
          </h1>
          <p className="text-xs text-[#6E6E73] mt-1">
            Multi-platform NLP sentiment progression · multi-class emotion classification
          </p>
        </div>

        {/* Platform Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-black/5 border border-black/5 flex-shrink-0 shadow-inner">
          {(['all', 'X (Twitter)', 'Telegram'] as const).map((p) => (
            <button
              key={p}
              onClick={() => handlePlatformChange(p)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                platform === p
                  ? 'bg-white text-[#1D1D1F] shadow-apple'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {p === 'all' ? 'All' : p === 'X (Twitter)' ? 'X / Twitter' : 'Telegram'}
            </button>
          ))}
        </div>
      </div>

      {/* Sentiment Chart */}
      <div className="glass-card p-5 space-y-4 fade-in-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-[#1D1D1F]">
              Sentiment Trajectory ({timeRange})
            </h2>
            <p className="text-[10px] text-[#6E6E73] mt-0.5">Scale range: −100 (hostile) to +100 (advocacy)</p>
          </div>

          {/* Time Range Selector & Live Score */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 p-1 rounded-full bg-black/5 border border-black/5">
              {(['1H', '6H', '24H', '7D'] as const).map((tr) => (
                <button
                  key={tr}
                  onClick={() => handleTimeRangeChange(tr)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                    timeRange === tr
                      ? 'bg-white text-[#1D1D1F] shadow-apple'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  {tr}
                </button>
              ))}
            </div>

            <div
              className="px-3 py-1.5 rounded-full text-[10px] font-mono font-bold shadow-xs bg-[#FF9500]/10 text-[#FF9500] border border-[#FF9500]/20"
            >
              Score: {activeTimePoints[activeTimePoints.length - 1]?.score ?? '--'}
            </div>
          </div>
        </div>

        {/* Narrative River Canvas */}
        <div className="w-full h-48 mb-4">
          <NarrativeRiver />
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activeTimePoints} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 6" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="timestamp" stroke="#6E6E73" fontSize={10} tickLine={false} />
              <YAxis stroke="#6E6E73" fontSize={10} domain={[-20, 100]} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="score" stroke="#FF9500" strokeWidth={2.5} dot={{ r: 4, fill: '#FF9500', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="positive" stroke="#34C759" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              <Line type="monotone" dataKey="negative" stroke="#FF3B30" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              <Line type="monotone" dataKey="neutral" stroke="#6E6E73" strokeWidth={1} strokeDasharray="2 6" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-4 text-[10px] pt-1 border-t border-black/5">
          {[
            { color: '#FF9500', label: 'Sentiment Score' },
            { color: '#34C759', label: 'Positive' },
            { color: '#FF3B30', label: 'Negative' },
            { color: '#6E6E73', label: 'Neutral' },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span className="text-[#6E6E73] font-medium">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emotion + Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Emotion Breakdown */}
        <div className="lg:col-span-2 glass-card p-5 space-y-4 fade-in-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#1D1D1F]">Emotion Breakdown</h2>
              <p className="text-[10px] text-[#6E6E73] mt-0.5">Click to filter posts below</p>
            </div>
            {selectedEmotion && (
              <button
                onClick={() => setSelectedEmotion(null)}
                className="text-[10px] font-semibold text-[#FF9500] hover:text-[#1D1D1F] transition-colors"
              >
                Clear ×
              </button>
            )}
          </div>
          <EmotionBar
            emotions={emotions}
            selectedEmotion={selectedEmotion}
            onSelectEmotion={setSelectedEmotion}
          />
        </div>

        {/* Posts Feed */}
        <div className="lg:col-span-3 space-y-3 fade-in-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#1D1D1F]">
              Social Feed Inspector
              {selectedEmotion && <span className="text-[#FF9500]"> — {selectedEmotion}</span>}
            </h2>
            <div className="flex items-center gap-1 text-[10px] text-[#6E6E73]">
              <Filter className="w-3 h-3" />
              <span>{filteredPosts.length} posts</span>
            </div>
          </div>

          <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
            {filteredPosts.map((post) => {
              const sentStyle = SENTIMENT_COLORS[post.sentiment] || SENTIMENT_COLORS.neutral;
              const platformColor = PLATFORM_COLORS[post.platform] || '#6E6E73';

              return (
                <div
                  key={post.id}
                  className="glass-card p-4 space-y-2.5"
                  style={{ borderLeft: `3px solid ${sentStyle.color}` }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[#1D1D1F]">{post.authorName}</span>
                      <span className="text-[10px] font-mono text-[#6E6E73]">{post.author}</span>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: `${platformColor}18`, color: platformColor }}
                      >
                        {post.platform}
                      </span>
                      {post.botFlag && (
                        <span className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/20">
                          <Bot className="w-2.5 h-2.5" />
                          BOT
                        </span>
                      )}
                    </div>
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: sentStyle.bg, color: sentStyle.color }}
                    >
                      {post.emotion}
                    </span>
                  </div>

                  <p className="text-xs text-[#1D1D1F]/90 leading-relaxed font-normal">{post.content}</p>

                  <div className="flex items-center justify-between text-[10px] text-[#6E6E73] pt-2 border-t border-black/5">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-[#FF2D55]" />
                        {post.likes?.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3 text-[#007AFF]" />
                        {post.shares?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Lang: <strong className="text-[#1D1D1F]">{post.language}</strong></span>
                      <span>· {post.postedAt}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
