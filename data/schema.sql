-- NTRO SIH Social Media Analytics Data Schema (PostgreSQL)
-- Team: NULL POINTERS

-- 1. Users & Authentication (Role-Based Access)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'public', -- 'analyst', 'admin', 'public'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Ingested Social Media Posts
CREATE TABLE IF NOT EXISTS posts (
    id VARCHAR(100) PRIMARY KEY,
    platform VARCHAR(20) NOT NULL, -- 'x', 'telegram', 'reddit', 'news'
    author_id VARCHAR(100) NOT NULL,
    author_username VARCHAR(100),
    author_display_name VARCHAR(100),
    content TEXT NOT NULL,
    language VARCHAR(10) DEFAULT 'en', -- 'en', 'hi', 'hi-en' (code-mixed)
    posted_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ingested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    likes_count INT DEFAULT 0,
    retweets_count INT DEFAULT 0,
    replies_count INT DEFAULT 0,
    views_count INT DEFAULT 0,
    is_flagged BOOLEAN DEFAULT FALSE
);

-- 3. Sentiment & Emotion Classifications
CREATE TABLE IF NOT EXISTS sentiment_analysis (
    id SERIAL PRIMARY KEY,
    post_id VARCHAR(100) REFERENCES posts(id) ON DELETE CASCADE,
    overall_sentiment VARCHAR(20) NOT NULL, -- 'positive', 'negative', 'neutral'
    sentiment_score FLOAT NOT NULL, -- -1.0 to +1.0
    primary_emotion VARCHAR(30) NOT NULL, -- 'support', 'sarcasm', 'anxiety', 'anger', 'joy'
    emotion_confidence FLOAT NOT NULL,
    detected_language VARCHAR(10),
    analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Aggregate Demographic Inferences (Anonymized)
CREATE TABLE IF NOT EXISTS demographic_aggregates (
    id SERIAL PRIMARY KEY,
    topic_id VARCHAR(100) NOT NULL,
    time_window VARCHAR(20) NOT NULL, -- '1h', '24h', '7d'
    age_group VARCHAR(20) NOT NULL, -- '18-24', '25-34', '35-44', '45+'
    gender VARCHAR(20) NOT NULL, -- 'male', 'female', 'other', 'unknown'
    region VARCHAR(100) NOT NULL, -- 'Delhi', 'Maharashtra', 'Karnataka', etc.
    sample_count INT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Trending Topics & Keywords
CREATE TABLE IF NOT EXISTS trending_topics (
    id SERIAL PRIMARY KEY,
    topic_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'Defense', 'Security', 'Policy', 'Tech'
    post_volume_24h INT NOT NULL,
    growth_rate_pct FLOAT NOT NULL,
    dominant_sentiment VARCHAR(20),
    platforms JSONB NOT NULL, -- e.g. {"x": 65, "telegram": 35}
    sample_keywords TEXT[] NOT NULL,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. System Alerts & Anomaly Warnings
CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    alert_type VARCHAR(50) NOT NULL, -- 'SENTIMENT_SPIKE', 'BOT_COORDINATION', 'HIGH_SPREAD_TOPIC'
    severity VARCHAR(20) NOT NULL, -- 'CRITICAL', 'WARNING', 'INFO'
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    affected_topic VARCHAR(100),
    metadata JSONB,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'ACKNOWLEDGED', 'RESOLVED'
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexing for performance
CREATE INDEX IF NOT EXISTS idx_posts_posted_at ON posts(posted_at);
CREATE INDEX IF NOT EXISTS idx_posts_platform ON posts(platform);
CREATE INDEX IF NOT EXISTS idx_sentiment_post_id ON sentiment_analysis(post_id);
CREATE INDEX IF NOT EXISTS idx_alerts_triggered_at ON alerts(triggered_at);
