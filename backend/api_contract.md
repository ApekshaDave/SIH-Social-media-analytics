# API Contract - NTRO SIH Social Media Analytics Platform
Version: 1.0.0
Base URL: `/api`

## Endpoints Summary

| Method | Endpoint | Description | Role Required |
|---|---|---|---|
| `GET` | `/api/summary` | Executive dashboard overview metrics | Public / Analyst |
| `GET` | `/api/sentiment/over-time` | Sentiment scores & emotions over time | Analyst |
| `POST` | `/api/sentiment/analyze` | Real-time sentiment analysis on text | Analyst |
| `GET` | `/api/demographics` | Aggregate anonymized demographic profiling | Analyst |
| `GET` | `/api/trends` | Ranked trending topics & keyword velocity | Public / Analyst |
| `GET` | `/api/network` | Influence graph nodes & relationship edges | Analyst |
| `GET` | `/api/alerts` | Real-time system alerts & anomaly warnings | Analyst |
| `POST` | `/api/auth/login` | Mock JWT login returning user token & role | All |
