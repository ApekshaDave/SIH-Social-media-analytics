export type UserRole = 'analyst' | 'public';

export interface OverviewSummary {
  totalPosts: number;
  volumeChange24h: number;
  sentimentIndex: number;
  dominantEmotion: string;
  topTrendTopic: string;
  topTrendGrowth: number;
  activeAlertsCount: number;
  botClustersCount: number;
}

export interface SentimentTimePoint {
  timestamp: string;
  score: number;
  positive: number;
  negative: number;
  neutral: number;
  support: number;
  anxiety: number;
  sarcasm: number;
}

export interface EmotionBreakdown {
  name: string;
  percentage: number;
  color: string;
  description: string;
}

export interface Post {
  id: string;
  platform: 'X (Twitter)' | 'Telegram' | 'Reddit' | 'News';
  author: string;
  authorName: string;
  content: string;
  language: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  emotion: 'Support' | 'Anxiety' | 'Sarcasm' | 'Anger';
  postedAt: string;
  likes: number;
  shares: number;
  botFlag: boolean;
}

export interface AgeBracket {
  bracket: string;
  percentage: number;
}

export interface RegionDistribution {
  region: string;
  volume: number;
  sharePercentage: number;
}

export interface LanguageBreakdown {
  language: string;
  percentage: number;
}

export interface DemographicData {
  ageBrackets: AgeBracket[];
  regions: RegionDistribution[];
  languages: LanguageBreakdown[];
}

export interface TrendTopic {
  id: string;
  hashtag: string;
  category: string;
  volume: number;
  growthPercentage: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  keywords: string[];
  platforms: { x: number; telegram: number };
}

export interface NetworkNode {
  id: string;
  handle: string;
  category: 'kol_influencer' | 'channel' | 'bot_account' | 'general_user';
  pageRankScore: number;
  audienceReach: number;
  botProbability: number;
  x?: number;
  y?: number;
}

export interface NetworkEdge {
  source: string;
  target: string;
  relationship: 'cited' | 'amplified_by' | 'targeted_mention' | 'reshared_to' | 'coordinated_with';
  direction: 'directed' | 'coordinated';
}

export interface NetworkGraphData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

export interface AlertItem {
  id: string;
  title: string;
  timestamp: string;
  description: string;
  severity: 'danger' | 'warning' | 'success' | 'info';
  type: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED';
}
