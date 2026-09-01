import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { OverviewSummary, UserRole, SentimentTimePoint, EmotionBreakdown } from '../types';
import { StatCard } from '../components/StatCard';
import { mockSentimentTimePoints, mockEmotions } from '../mock/mockData';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  Share2, 
  ShieldCheck, 
  MessageSquare,
  ChevronRight
} from 'lucide-react';

interface OverviewProps {
  role?: UserRole;
  summary: OverviewSummary;
  sentimentProgression?: SentimentTimePoint[];
  emotionBreakdown?: EmotionBreakdown[];
}

const EMOTION_COLORS: Record<string, string> = {
  Support: '#639922',
  Anxiety: '#EF9F27',
  Sarcasm: '#7F77DD',
  Anger: '#E24B4A',
  Hostility: '#E24B4A'
};

export const Overview: React.FC<OverviewProps> = ({ 
  summary, 
  sentimentProgression = mockSentimentTimePoints,
  emotionBreakdown = mockEmotions
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C2C2A] tracking-tight">National Audience Sentiment & Influence Overview</h1>
          <p className="text-xs text-[#5F5E5A] mt-0.5">
            Cross-platform continuous ingestion active across X (Twitter) and Telegram feeds
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/network')}
            className="px-4 py-2 rounded-xl bg-[#378ADD] hover:bg-[#378ADD]/90 text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Explore Network Graph</span>
          </button>
        </div>
      </div>

      {/* 2x2 Executive KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Posts Analyzed"
          value={summary.totalPosts.toLocaleString()}
          icon={MessageSquare}
          caption="+18.4% volume in 24h"
          iconColor="text-[#378ADD]"
        />

        <StatCard
          label="Overall Sentiment Index"
          value={`${summary.sentimentIndex > 0 ? '+' : ''}${summary.sentimentIndex}%`}
          icon={BarChart3}
          caption={`Dominant Emotion: ${summary.dominantEmotion}`}
          iconColor="text-[#639922]"
        />

        <StatCard
          label="Top Trending Topic"
          value={summary.topTrendTopic}
          icon={TrendingUp}
          caption={`Growth: +${summary.topTrendGrowth}%`}
          iconColor="text-[#EF9F27]"
        />

        <StatCard
          label="Active Security Alerts"
          value={summary.activeAlertsCount}
          icon={AlertTriangle}
          caption={`Bot Clusters: ${summary.botClustersCount} accounts`}
          iconColor="text-[#E24B4A]"
          onClick={() => navigate('/alerts')}
        />
      </div>

      {/* Main Grid: Sentiment Chart & Emotion Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 24-Hour Sentiment Progression Line Chart */}
        <div className="lg:col-span-2 bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#2C2C2A]">Sentiment Progression (24 Hours)</h2>
              <p className="text-xs text-[#5F5E5A]">Tracking aggregate sentiment score trends across all monitored feeds</p>
            </div>
            <button 
              onClick={() => navigate('/sentiment')}
              className="text-xs font-semibold text-[#378ADD] hover:underline flex items-center space-x-1"
            >
              <span>Detailed View</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentProgression} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <XAxis dataKey="timestamp" stroke="#5F5E5A" fontSize={11} tickLine={false} />
                <YAxis stroke="#5F5E5A" fontSize={11} domain={[-20, 100]} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', borderColor: '#E5E3DA', fontSize: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#378ADD" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#378ADD' }}
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Emotion Classification Doughnut Chart */}
        <div className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#2C2C2A]">Emotion Classification</h2>
            <p className="text-xs text-[#5F5E5A]">Multi-class NLP emotion tag breakdown</p>

            <div className="w-full h-48 flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={emotionBreakdown}
                    dataKey="percentage"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                  >
                    {emotionBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={EMOTION_COLORS[entry.name] || entry.color || '#378ADD'} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', borderColor: '#E5E3DA', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E5E3DA]">
            {emotionBreakdown.map((item) => (
              <div key={item.name} className="flex items-center space-x-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: EMOTION_COLORS[item.name] || item.color }} />
                <span className="text-[#5F5E5A] truncate">{item.name}: <strong className="text-[#2C2C2A]">{item.percentage}%</strong></span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Module Overview Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Demographics Overview Card */}
        <div 
          onClick={() => navigate('/demographics')}
          className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-3 hover:border-[#378ADD] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#2C2C2A] group-hover:text-[#378ADD]">Demographics & Geography</h3>
            <ChevronRight className="w-4 h-4 text-[#5F5E5A] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-[#5F5E5A]">
            Age distribution profiling, Hinglish code-mix dialect metrics, and regional audience share.
          </p>
          <div className="text-[11px] font-semibold text-[#378ADD] flex items-center space-x-1 pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DPDP Compliant Data</span>
          </div>
        </div>

        {/* Trends Overview Card */}
        <div 
          onClick={() => navigate('/trends')}
          className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-3 hover:border-[#378ADD] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#2C2C2A] group-hover:text-[#378ADD]">Narrative Acceleration</h3>
            <ChevronRight className="w-4 h-4 text-[#5F5E5A] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-[#5F5E5A]">
            Track post velocity spikes across X and Telegram with keyword tag cloud clusters.
          </p>
          <div className="text-[11px] font-semibold text-[#EF9F27]">
            #MakeInIndiaDefense (+184%)
          </div>
        </div>

        {/* Security Alerts Overview Card */}
        <div 
          onClick={() => navigate('/alerts')}
          className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-3 hover:border-[#E24B4A] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#2C2C2A] group-hover:text-[#E24B4A]">Security Alerts Feed</h3>
            <ChevronRight className="w-4 h-4 text-[#5F5E5A] group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="text-xs text-[#5F5E5A]">
            Automated anomaly feed monitoring bot coordination, sentiment drops, and disinformation.
          </p>
          <div className="text-[11px] font-semibold text-[#E24B4A]">
            3 Active Security Flags
          </div>
        </div>

      </div>

    </div>
  );
};
