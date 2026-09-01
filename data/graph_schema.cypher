// NTRO SIH Social Media Analytics Graph Schema (Neo4j Cypher)
// Team: NULL POINTERS

// 1. Node Constraints
CREATE CONSTRAINT FOR (u:User) REQUIRE u.user_id IS UNIQUE;
CREATE CONSTRAINT FOR (p:Post) REQUIRE p.post_id IS UNIQUE;
CREATE CONSTRAINT FOR (t:Topic) REQUIRE t.name IS UNIQUE;

// 2. Index Creation
CREATE INDEX FOR (u:User) ON (u.bot_probability);
CREATE INDEX FOR (u:User) ON (u.pagerank);
CREATE INDEX FOR (p:Post) ON (p.sentiment);

// 3. Sample Graph Structure (For Reference)
// User Nodes:
// (:User {user_id: "u_101", username: "@IntelAnalyst_IN", influence_score: 94.2, bot_probability: 0.02, pagerank: 0.089})
// (:User {user_id: "u_205", username: "@NetAmplifier_X", influence_score: 88.5, bot_probability: 0.78, pagerank: 0.064})

// Relationships:
// (u1:User)-[:POSTED]->(p:Post)
// (u1:User)-[:RETWEETED {timestamp: datetime(), amplification_factor: 4.2}]->(p:Post)
// (u1:User)-[:MENTIONS]->(u2:User)
// (p:Post)-[:TAGGED_WITH]->(t:Topic)
