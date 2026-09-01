import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { EmotionBreakdown, Post, SentimentTimePoint } from '../types';
import { EmotionBar } from '../components/EmotionBar';

interface SentimentProps {
  timePoints: SentimentTimePoint[];
  emotions: EmotionBreakdown[];
  posts: Post[];
}

export const Sentiment: React.FC<SentimentProps> = ({
  timePoints,
  emotions,
  posts
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const filteredPosts = selectedEmotion
    ? posts.filter((p) => p.emotion.toLowerCase() === selectedEmotion.toLowerCase())
    : posts;

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2C2C2A] tracking-tight">Sentiment & Emotion Intelligence</h1>
        <p className="text-xs text-[#5F5E5A] mt-0.5">
          24-hour continuous NLP sentiment progression and multi-class emotion classification
        </p>
      </div>

      {/* 24-Hour Sentiment Line Chart Card */}
      <div className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#2C2C2A]">Sentiment Progression (24 Hours)</h2>
            <p className="text-xs text-[#5F5E5A]">Aggregate sentiment score metric mapped across 4-hour intervals</p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-white border border-[#E5E3DA] text-xs font-bold text-[#378ADD]">
            Score Range: -100 to +100
          </span>
        </div>

        <div className="w-full h-64 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timePoints} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E3DA" />
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

      {/* Emotion Classification Horizontal Bar Card */}
      <div className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#2C2C2A]">Emotion Classification Breakdown</h2>
            <p className="text-xs text-[#5F5E5A]">Click any emotion category below to filter relevant sample social posts</p>
          </div>
          {selectedEmotion && (
            <button
              onClick={() => setSelectedEmotion(null)}
              className="text-xs font-semibold text-[#378ADD] underline hover:text-[#2C2C2A]"
            >
              Clear Emotion Filter ({selectedEmotion})
            </button>
          )}
        </div>

        <EmotionBar 
          emotions={emotions} 
          selectedEmotion={selectedEmotion} 
          onSelectEmotion={setSelectedEmotion} 
        />
      </div>

      {/* Sample Posts Stream */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#2C2C2A]">
            Social Feed Inspector {selectedEmotion ? `— Filtered: ${selectedEmotion}` : ''}
          </h2>
          <span className="text-xs text-[#5F5E5A]">Showing {filteredPosts.length} posts</span>
        </div>

        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-[#2C2C2A]">{post.authorName}</span>
                  <span className="text-xs text-[#5F5E5A] font-mono">{post.author}</span>
                  <span className="px-2 py-0.5 rounded bg-white text-[10px] font-semibold text-[#5F5E5A] border border-[#E5E3DA]">
                    {post.platform}
                  </span>
                </div>
                
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  post.emotion === 'Support' ? 'bg-[#639922]/10 text-[#639922] border border-[#639922]/30' :
                  post.emotion === 'Anxiety' ? 'bg-[#EF9F27]/10 text-[#EF9F27] border border-[#EF9F27]/30' :
                  post.emotion === 'Sarcasm' ? 'bg-[#7F77DD]/10 text-[#7F77DD] border border-[#7F77DD]/30' :
                  'bg-[#E24B4A]/10 text-[#E24B4A] border border-[#E24B4A]/30'
                }`}>
                  {post.emotion}
                </span>
              </div>

              <p className="text-xs text-[#2C2C2A] leading-relaxed font-sans">{post.content}</p>

              <div className="flex items-center justify-between text-[11px] text-[#5F5E5A] pt-1">
                <span>Language: <strong className="text-[#2C2C2A]">{post.language}</strong></span>
                <span>Posted {post.postedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
