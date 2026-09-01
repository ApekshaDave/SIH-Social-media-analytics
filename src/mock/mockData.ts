import { 
  OverviewSummary, 
  SentimentTimePoint, 
  EmotionBreakdown, 
  Post, 
  DemographicData, 
  TrendTopic, 
  NetworkGraphData, 
  AlertItem 
} from '../types';

export const mockSummary: OverviewSummary = {
  totalPosts: 148920,
  volumeChange24h: 18.4,
  sentimentIndex: 38,
  dominantEmotion: 'Support',
  topTrendTopic: '#MakeInIndiaDefense',
  topTrendGrowth: 184,
  activeAlertsCount: 3,
  botClustersCount: 142
};

export const mockSentimentTimePoints: SentimentTimePoint[] = [
  { timestamp: '00:00', score: 28, positive: 45, negative: 22, neutral: 33, support: 40, anxiety: 15, sarcasm: 8 },
  { timestamp: '04:00', score: 22, positive: 42, negative: 28, neutral: 30, support: 38, anxiety: 20, sarcasm: 12 },
  { timestamp: '08:00', score: 44, positive: 58, negative: 18, neutral: 24, support: 52, anxiety: 10, sarcasm: 6 },
  { timestamp: '12:00', score: 52, positive: 64, negative: 15, neutral: 21, support: 60, anxiety: 8, sarcasm: 5 },
  { timestamp: '16:00', score: 30, positive: 52, negative: 31, neutral: 17, support: 45, anxiety: 25, sarcasm: 18 },
  { timestamp: '20:00', score: 48, positive: 60, negative: 20, neutral: 20, support: 55, anxiety: 12, sarcasm: 9 },
  { timestamp: '24:00', score: 54, positive: 68, negative: 14, neutral: 18, support: 62, anxiety: 7, sarcasm: 4 }
];

export const mockEmotions: EmotionBreakdown[] = [
  { name: 'Support', percentage: 48, color: '#639922', description: 'Positive approval and indigenous technology backing' },
  { name: 'Anxiety', percentage: 22, color: '#EF9F27', description: 'Concern regarding policy timelines and privacy guidelines' },
  { name: 'Sarcasm', percentage: 16, color: '#7F77DD', description: 'Satirical commentary and ironic critique on draft updates' },
  { name: 'Anger', percentage: 14, color: '#E24B4A', description: 'Hostile reactions driven by bot disinformation channels' }
];

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    platform: 'X (Twitter)',
    author: '@DefSec_India',
    authorName: 'Defense Security India',
    content: 'Major milestone achieved in indigenous defense tech! High resolution satellite constellation now operational. Excellent work by our research teams. #MakeInIndia #NTRO',
    language: 'English',
    sentiment: 'positive',
    sentimentScore: 0.88,
    emotion: 'Support',
    postedAt: '10 mins ago',
    likes: 1420,
    shares: 385,
    botFlag: false
  },
  {
    id: 'post-2',
    platform: 'Telegram',
    author: 't.me/IntelPulse_IN',
    authorName: 'IntelPulse Channel',
    content: 'Sarkar ne naye cyber security guidelines issue kiye hain. Kya yeh privacy policy impact karega? Let us see what happens next. #CyberDefense',
    language: 'Hinglish',
    sentiment: 'neutral',
    sentimentScore: 0.12,
    emotion: 'Anxiety',
    postedAt: '25 mins ago',
    likes: 890,
    shares: 210,
    botFlag: false
  },
  {
    id: 'post-3',
    platform: 'X (Twitter)',
    author: '@BotNet_Alpha99',
    authorName: 'Alpha News Bot 99',
    content: 'ALERT: Fake news spreading regarding coastal border security protocol update. Do not fall for unverified reports! #SecurityUpdate',
    language: 'English',
    sentiment: 'negative',
    sentimentScore: -0.74,
    emotion: 'Anger',
    postedAt: '40 mins ago',
    likes: 45,
    shares: 1820,
    botFlag: true
  },
  {
    id: 'post-4',
    platform: 'X (Twitter)',
    author: '@TechGeek_IN',
    authorName: 'Rohan Sharma',
    content: 'Wow, another policy announcement without detailed documentation. Very transparent indeed! /s #TechPolicy',
    language: 'English',
    sentiment: 'negative',
    sentimentScore: -0.65,
    emotion: 'Sarcasm',
    postedAt: '1 hour ago',
    likes: 310,
    shares: 78,
    botFlag: false
  }
];

export const mockDemographics: DemographicData = {
  ageBrackets: [
    { bracket: '18-24', percentage: 34 },
    { bracket: '25-34', percentage: 42 },
    { bracket: '35-44', percentage: 16 },
    { bracket: '45+', percentage: 8 }
  ],
  regions: [
    { region: 'Delhi NCR', volume: 38400, sharePercentage: 25.8 },
    { region: 'Maharashtra', volume: 32100, sharePercentage: 21.5 },
    { region: 'Karnataka', volume: 24500, sharePercentage: 16.4 },
    { region: 'Tamil Nadu', volume: 18900, sharePercentage: 12.7 },
    { region: 'West Bengal', volume: 14200, sharePercentage: 9.5 }
  ],
  languages: [
    { language: 'English', percentage: 48 },
    { language: 'Hindi-English (Hinglish)', percentage: 35 },
    { language: 'Pure Hindi', percentage: 12 },
    { language: 'Regional Languages', percentage: 5 }
  ]
};

export const mockTrends: TrendTopic[] = [
  {
    id: 'trend-1',
    hashtag: '#MakeInIndiaDefense',
    category: 'Defense Tech',
    volume: 42800,
    growthPercentage: 184,
    sentiment: 'Positive',
    keywords: ['constellation', 'satellite', 'indigenous', 'NTRO', 'radar'],
    platforms: { x: 70, telegram: 30 }
  },
  {
    id: 'trend-2',
    hashtag: '#CyberDefensePolicy',
    category: 'National Security',
    volume: 31200,
    growthPercentage: 92,
    sentiment: 'Neutral',
    keywords: ['guidelines', 'encryption', 'CERT-In', 'data law'],
    platforms: { x: 55, telegram: 45 }
  },
  {
    id: 'trend-3',
    hashtag: '#CoordinatedBotNetwork',
    category: 'Anomaly Warning',
    volume: 18500,
    growthPercentage: 310,
    sentiment: 'Negative',
    keywords: ['amplification', 'disinformation', 'coastal security', 'fake alert'],
    platforms: { x: 88, telegram: 12 }
  }
];

export const mockNetworkData: NetworkGraphData = {
  nodes: [
    // 3 KOL Influencers (Purple)
    { id: 'node-1', handle: '@DefSec_India', category: 'kol_influencer', audienceReach: 245000, pageRankScore: 0.095, botProbability: 0.01 },
    { id: 'node-2', handle: '@PolicyAnalyst_IN', category: 'kol_influencer', audienceReach: 120000, pageRankScore: 0.078, botProbability: 0.02 },
    { id: 'node-3', handle: '@StrategicThinker_IN', category: 'kol_influencer', audienceReach: 95000, pageRankScore: 0.064, botProbability: 0.01 },

    // 4 Channels (Blue)
    { id: 'node-4', handle: 't.me/IntelPulse_IN', category: 'channel', audienceReach: 180000, pageRankScore: 0.082, botProbability: 0.04 },
    { id: 'node-5', handle: 't.me/DefenseBulletin', category: 'channel', audienceReach: 85000, pageRankScore: 0.055, botProbability: 0.03 },
    { id: 'node-6', handle: 't.me/NationalSecurityBrief', category: 'channel', audienceReach: 60000, pageRankScore: 0.048, botProbability: 0.02 },
    { id: 'node-7', handle: 't.me/CyberWatch_IN', category: 'channel', audienceReach: 40000, pageRankScore: 0.038, botProbability: 0.05 },

    // 4 Flagged Bot Accounts (Red - Tightly Coordinated Cluster)
    { id: 'node-8', handle: '@BotNet_Alpha99', category: 'bot_account', audienceReach: 1200, pageRankScore: 0.068, botProbability: 0.94 },
    { id: 'node-9', handle: '@BotNet_Beta41', category: 'bot_account', audienceReach: 850, pageRankScore: 0.051, botProbability: 0.91 },
    { id: 'node-10', handle: '@BotNet_Gamma07', category: 'bot_account', audienceReach: 620, pageRankScore: 0.044, botProbability: 0.89 },
    { id: 'node-11', handle: '@BotNet_Delta88', category: 'bot_account', audienceReach: 980, pageRankScore: 0.058, botProbability: 0.96 },

    // 7 General Users (Gray)
    { id: 'node-12', handle: '@CitizenObserver', category: 'general_user', audienceReach: 3200, pageRankScore: 0.021, botProbability: 0.05 },
    { id: 'node-13', handle: '@TechEnthusiast_IN', category: 'general_user', audienceReach: 8500, pageRankScore: 0.035, botProbability: 0.02 },
    { id: 'node-14', handle: '@PublicPolicy_IN', category: 'general_user', audienceReach: 5400, pageRankScore: 0.028, botProbability: 0.03 },
    { id: 'node-15', handle: '@DefenseGeek', category: 'general_user', audienceReach: 4100, pageRankScore: 0.024, botProbability: 0.01 },
    { id: 'node-16', handle: '@MediaWatcher_IN', category: 'general_user', audienceReach: 2900, pageRankScore: 0.018, botProbability: 0.04 },
    { id: 'node-17', handle: '@InfoSec_India', category: 'general_user', audienceReach: 6700, pageRankScore: 0.031, botProbability: 0.02 },
    { id: 'node-18', handle: '@ResearchScholar', category: 'general_user', audienceReach: 1800, pageRankScore: 0.012, botProbability: 0.01 }
  ],
  edges: [
    // Coordinated Bot Cluster (Red Dotted Edges)
    { source: 'node-8', target: 'node-9', relationship: 'coordinated_with', direction: 'coordinated' },
    { source: 'node-9', target: 'node-10', relationship: 'coordinated_with', direction: 'coordinated' },
    { source: 'node-10', target: 'node-11', relationship: 'coordinated_with', direction: 'coordinated' },
    { source: 'node-11', target: 'node-8', relationship: 'coordinated_with', direction: 'coordinated' },

    // Bot Targeted Attacks on Channels / Influencers
    { source: 'node-8', target: 'node-4', relationship: 'targeted_mention', direction: 'directed' },
    { source: 'node-11', target: 'node-1', relationship: 'targeted_mention', direction: 'directed' },

    // Influencer / Channel Real Organic Network
    { source: 'node-1', target: 'node-2', relationship: 'cited', direction: 'directed' },
    { source: 'node-2', target: 'node-3', relationship: 'cited', direction: 'directed' },
    { source: 'node-1', target: 'node-4', relationship: 'amplified_by', direction: 'directed' },
    { source: 'node-4', target: 'node-5', relationship: 'cited', direction: 'directed' },
    { source: 'node-5', target: 'node-6', relationship: 'amplified_by', direction: 'directed' },
    { source: 'node-3', target: 'node-7', relationship: 'amplified_by', direction: 'directed' },

    // General Users Connected to Influencers & Channels
    { source: 'node-12', target: 'node-1', relationship: 'reshared_to', direction: 'directed' },
    { source: 'node-13', target: 'node-1', relationship: 'reshared_to', direction: 'directed' },
    { source: 'node-14', target: 'node-2', relationship: 'reshared_to', direction: 'directed' },
    { source: 'node-15', target: 'node-3', relationship: 'reshared_to', direction: 'directed' },
    { source: 'node-16', target: 'node-4', relationship: 'reshared_to', direction: 'directed' },
    { source: 'node-17', target: 'node-7', relationship: 'reshared_to', direction: 'directed' },
    { source: 'node-18', target: 'node-5', relationship: 'reshared_to', direction: 'directed' },
    { source: 'node-13', target: 'node-4', relationship: 'cited', direction: 'directed' }
  ]
};

export const mockAlerts: AlertItem[] = [
  {
    id: 'alt-1',
    title: 'Coordinated Bot Amplification Detected',
    timestamp: '12 mins ago',
    description: 'Cluster of 4 bot accounts (@BotNet_Alpha99, @BotNet_Beta41, etc.) artificially amplifying disinformation regarding coastal security.',
    severity: 'danger',
    type: 'BOT_COORDINATION',
    status: 'ACTIVE'
  },
  {
    id: 'alt-2',
    title: 'Negative Sentiment Surge on #TechPolicy',
    timestamp: '45 mins ago',
    description: 'Sarcasm and negative sentiment increased by +42% in past 2 hours following preliminary policy draft release.',
    severity: 'warning',
    type: 'SENTIMENT_SPIKE',
    status: 'ACTIVE'
  },
  {
    id: 'alt-3',
    title: '#MakeInIndiaDefense Trend Spike',
    timestamp: '2 hours ago',
    description: 'Post velocity reached 1,800 posts/min with 88% positive sentiment across X and Telegram.',
    severity: 'success',
    type: 'HIGH_SPREAD_TOPIC',
    status: 'ACKNOWLEDGED'
  }
];
