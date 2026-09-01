import React, { useState, useEffect, useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { NetworkGraphData, NetworkNode } from '../types';
import { Share2, ShieldAlert, Users, Bot, Info, X } from 'lucide-react';
import { ScrollCard } from '../components/ScrollCard';

interface NetworkGraphProps {
  data: NetworkGraphData;
}

const NODE_COLORS: Record<string, { fill: string; glow: string; label: string }> = {
  kol_influencer: { fill: '#8B5CF6', glow: '#8B5CF680', label: 'KOL Influencer' },
  channel:        { fill: '#007AFF', glow: '#007AFF80', label: 'Channel' },
  bot_account:    { fill: '#FF3B30', glow: '#FF3B3080', label: 'Bot Account' },
  general_user:   { fill: '#86868B', glow: '#86868B80', label: 'General User' },
};

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(data.nodes[0] || null);
  const [containerWidth, setContainerWidth] = useState(600);
  const [showLegend, setShowLegend] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.clientWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge')?.strength(-300);
      fgRef.current.d3Force('link')?.distance(90);
    }
  }, [data]);

  const influencers = data.nodes
    .filter((n) => n.category === 'kol_influencer')
    .sort((a, b) => b.pageRankScore - a.pageRankScore);

  const botNodes = data.nodes.filter((n) => n.category === 'bot_account');

  return (
    <div className="space-y-6">
      {/* Header */}
      <ScrollCard>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6] shadow-sm" />
              <span className="text-[10px] font-mono font-bold text-[#8B5CF6] uppercase tracking-widest">
                Network Module
              </span>
            </div>
            <h1 className="text-2xl font-black text-[#1D1D1F] tracking-tight">
              Network Topology & Influence Spread
            </h1>
            <p className="text-xs text-[#86868B] mt-1">
              PageRank centrality · KOL mapping · coordinated bot detection
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm bg-white"
              style={{ border: '1px solid rgba(255,59,48,0.2)', color: '#FF3B30' }}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              {botNodes.length} Flagged Bot Nodes
            </div>
          </div>
        </div>
      </ScrollCard>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Graph Canvas */}
        <ScrollCard index={1} className="lg:col-span-2">
          <div className="bg-white/65 backdrop-blur-[40px] rounded-[24px] border border-black/5 shadow-apple p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#1D1D1F]">3D Force-Directed Network</h2>
                <p className="text-[10px] text-[#86868B] mt-0.5">
                  Node size = audience reach · Rotate & Zoom with mouse
                </p>
              </div>
              <button
                onClick={() => setShowLegend((s) => !s)}
                className="text-[10px] text-[#86868B] hover:text-[#1D1D1F] flex items-center gap-1 transition-colors bg-black/5 px-2 py-1 rounded-full"
              >
                <Info className="w-3 h-3" />
                {showLegend ? 'Hide' : 'Show'} Legend
              </button>
            </div>

            {showLegend && (
              <div className="flex flex-wrap gap-3 pb-3 border-b border-black/5">
                {Object.entries(NODE_COLORS).map(([key, { fill, label }]) => (
                  <div key={key} className="flex items-center gap-1.5 text-[10px]">
                    <div
                      className="w-2.5 h-2.5 rounded-full shadow-sm"
                      style={{ background: fill }}
                    />
                    <span className="text-[#86868B] font-medium">{label}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 text-[10px] text-[#86868B] font-medium">
                  <div className="w-5 h-0.5 border-t-2 border-dashed border-[#FF3B30]" />
                  <span>Coordinated Links</span>
                </div>
              </div>
            )}

            <div
              ref={containerRef}
              className="w-full rounded-2xl overflow-hidden relative shadow-inner border border-black/5"
              style={{ height: '440px', background: '#F5F5F7' }}
            >
              <ForceGraph3D
                ref={fgRef}
                width={containerWidth}
                height={440}
                graphData={{
                  nodes: data.nodes.map((n) => ({ ...n })),
                  links: data.edges.map((e) => ({ ...e })),
                }}
                backgroundColor="#F5F5F7"
                showNavInfo={false}
                
                nodeLabel="handle"
                nodeColor={(node: any) => NODE_COLORS[node.category]?.fill || NODE_COLORS.general_user.fill}
                nodeVal={(node: any) => Math.max(5, Math.log10(node.audienceReach || 1000) * 3)}
                nodeResolution={16}
                
                linkColor={(link: any) => link.relationship === 'coordinated_with' ? 'rgba(255, 59, 48, 0.6)' : 'rgba(0, 122, 255, 0.2)'}
                linkWidth={(link: any) => link.relationship === 'coordinated_with' ? 2 : 0.5}
                linkDirectionalArrowLength={(link: any) => (link.direction === 'directed' ? 4 : 0)}
                linkDirectionalArrowRelPos={0.85}
                linkDirectionalParticles={(link: any) => link.relationship === 'coordinated_with' ? 3 : 0}
                linkDirectionalParticleWidth={1.5}
                linkDirectionalParticleColor={() => '#FF3B30'}
                
                onNodeClick={(node: any) => setSelectedNode(node as NetworkNode)}
              />
            </div>

            <p className="text-[10px] text-[#86868B]">
              Dotted red particles indicate coordinated bot behavior · Solid blue lines = organic connections
            </p>
          </div>
        </ScrollCard>

        {/* Inspector Sidebar */}
        <div className="space-y-5">
          {/* Account Inspector */}
          <ScrollCard index={2}>
            <div className="bg-white/65 backdrop-blur-[40px] rounded-[24px] border border-black/5 shadow-apple p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-[#1D1D1F]">Account Inspector</h2>
                {selectedNode && (
                  <button onClick={() => setSelectedNode(null)} className="text-[#86868B] hover:text-[#1D1D1F] p-1 rounded-full hover:bg-black/5 transition-all">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {selectedNode ? (() => {
                const cfg = NODE_COLORS[selectedNode.category] || NODE_COLORS.general_user;
                const isBot = selectedNode.botProbability > 0.5;
                return (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white border border-black/5 shadow-sm">
                      <div className="font-mono text-sm font-bold text-[#1D1D1F]">{selectedNode.handle}</div>
                      <div
                        className="text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full inline-block shadow-sm"
                        style={{ background: `${cfg.fill}15`, color: cfg.fill }}
                      >
                        {cfg.label}
                      </div>
                    </div>

                    {[
                      { label: 'PageRank Score', value: selectedNode.pageRankScore.toFixed(3), color: '#8B5CF6' },
                      { label: 'Audience Reach', value: selectedNode.audienceReach.toLocaleString(), color: '#007AFF' },
                      { label: 'Bot Probability', value: `${(selectedNode.botProbability * 100).toFixed(0)}%`, color: isBot ? '#FF3B30' : '#34C759' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-black/5 shadow-sm">
                        <span className="text-[10px] text-[#86868B] font-medium">{label}</span>
                        <span className="font-mono text-xs font-bold" style={{ color }}>{value}</span>
                      </div>
                    ))}

                    {isBot && (
                      <div className="p-3 rounded-xl bg-[#FF3B30]/5 border border-[#FF3B30]/20 space-y-1 shadow-sm">
                        <div className="flex items-center gap-1.5 text-[#FF3B30] text-xs font-bold">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Security Flag Active
                        </div>
                        <p className="text-[10px] text-[#1D1D1F] leading-relaxed font-medium">
                          High bot likelihood. Automated amplification logged for security review.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })() : (
                <div className="text-center py-6 text-[#86868B]">
                  <Share2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-xs font-medium">Click any node to inspect</p>
                </div>
              )}
            </div>
          </ScrollCard>

          {/* Influencer Leaderboard */}
          <ScrollCard index={3}>
            <div className="bg-white/65 backdrop-blur-[40px] rounded-[24px] border border-black/5 shadow-apple p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <h2 className="text-sm font-bold text-[#1D1D1F]">Influencer Leaderboard</h2>
              </div>
              <div className="space-y-2">
                {influencers.map((node, i) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all border shadow-sm ${
                      selectedNode?.id === node.id
                        ? 'border-[#8B5CF6]/30 bg-[#8B5CF6]/5 shadow-apple'
                        : 'border-black/5 bg-white hover:border-black/10 hover:shadow-md'
                    }`}
                  >
                    <span className="text-xs font-black font-mono text-[#86868B] w-5">#{i + 1}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-semibold text-[#1D1D1F] truncate">{node.handle}</div>
                      <div className="text-[9px] font-mono text-[#86868B]">
                        PageRank: {node.pageRankScore.toFixed(3)}
                      </div>
                    </div>
                    <div className="text-[9px] font-mono font-semibold text-[#8B5CF6] text-right bg-[#8B5CF6]/10 px-1.5 py-0.5 rounded">
                      {(node.audienceReach / 1000).toFixed(0)}K
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </ScrollCard>

          {/* Bot Cluster Alert */}
          {botNodes.length > 0 && (
            <ScrollCard index={4}>
              <div className="bg-white/65 backdrop-blur-[40px] rounded-[24px] border border-[#FF3B30]/20 shadow-apple p-4 space-y-2">
                <div className="flex items-center gap-2 text-[#FF3B30] text-xs font-bold">
                  <Bot className="w-3.5 h-3.5" />
                  Coordinated Bot Cluster
                </div>
                {botNodes.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNode(n)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-white border border-black/5 text-[10px] hover:border-[#FF3B30]/30 hover:shadow-md transition-all"
                  >
                    <span className="font-mono text-[#FF3B30] font-medium">{n.handle}</span>
                    <span className="text-[#86868B] font-semibold">{(n.botProbability * 100).toFixed(0)}% bot</span>
                  </button>
                ))}
              </div>
            </ScrollCard>
          )}
        </div>
      </div>
    </div>
  );
};
