import React, { useState, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { NetworkGraphData, NetworkNode } from '../types';
import { Share2, ShieldAlert } from 'lucide-react';

interface NetworkGraphProps {
  data: NetworkGraphData;
}

export const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(data.nodes[0] || null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 700, height: 420 });
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);

  // Resize canvas dynamically to fill container
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.clientWidth,
          height: 420
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Configure force engine & auto zoom-to-fit on load
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge')?.strength(-240);
      fgRef.current.d3Force('link')?.distance(80);
      
      const timer = setTimeout(() => {
        fgRef.current?.zoomToFit(400, 40);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [data]);

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C2C2A] tracking-tight">Network Topology & Influence Spread</h1>
          <p className="text-xs text-[#5F5E5A] mt-0.5">
            PageRank centrality modeling, key opinion leader (KOL) mapping & coordinated bot network detection
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-lg bg-[#E24B4A]/10 text-[#E24B4A] border border-[#E24B4A]/30 text-xs font-bold flex items-center space-x-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>2 Flagged Bot Nodes</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Canvas & Inspector Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Force-Directed Graph Container */}
        <div className="lg:col-span-2 bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#2C2C2A]">Force-Directed Network Visualizer</h2>
              <div className="flex items-center space-x-3 text-xs font-semibold">
                <span className="flex items-center space-x-1 text-[#7F77DD]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7F77DD]" />
                  <span>KOL Influencer</span>
                </span>
                <span className="flex items-center space-x-1 text-[#378ADD]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#378ADD]" />
                  <span>Channel</span>
                </span>
                <span className="flex items-center space-x-1 text-[#E24B4A]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E24B4A]" />
                  <span>Bot Account</span>
                </span>
                <span className="flex items-center space-x-1 text-[#8C8B85]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8C8B85]" />
                  <span>General User</span>
                </span>
              </div>
            </div>

            {/* Sub-Legend Guidance Notes */}
            <div className="flex items-center space-x-4 text-[11px] text-[#5F5E5A] italic border-t border-[#E5E3DA]/60 pt-1">
              <span>• Node size indicates audience reach</span>
              <span>• Dotted red lines indicate coordinated bot behavior</span>
            </div>
          </div>

          <div 
            ref={containerRef}
            className="w-full bg-white rounded-xl border border-[#E5E3DA] relative overflow-hidden flex items-center justify-center"
            style={{ height: '420px' }}
          >
            <ForceGraph2D
              ref={fgRef}
              width={containerDimensions.width}
              height={containerDimensions.height}
              graphData={{
                nodes: data.nodes.map(n => ({ ...n })),
                links: data.edges.map(e => ({ ...e }))
              }}
              backgroundColor="#FFFFFF"
              
              // Directed Arrows & Curvature
              linkDirectionalArrowLength={(link: any) => (link.direction === 'directed' ? 6 : 0)}
              linkDirectionalArrowRelPos={0.85}
              linkDirectionalArrowColor={(link: any) => (link.relationship === 'coordinated_with' ? '#E24B4A' : '#5F5E5A')}
              linkCurvature={0.18}

              // Custom Canvas Link Drawing
              linkCanvasObjectMode={() => 'replace'}
              linkCanvasObject={(link: any, ctx: CanvasRenderingContext2D) => {
                const start = link.source;
                const end = link.target;
                if (!start || !end || typeof start.x !== 'number' || typeof end.x !== 'number') return;

                const isCoordinated = link.relationship === 'coordinated_with' || link.direction === 'coordinated';

                ctx.beginPath();
                ctx.moveTo(start.x, start.y);

                // Quadratic curve drawing for non-crossing links
                const curvature = 0.18;
                const dx = end.x - start.x;
                const dy = end.y - start.y;
                const cpX = (start.x + end.x) / 2 - dy * curvature;
                const cpY = (start.y + end.y) / 2 + dx * curvature;
                ctx.quadraticCurveTo(cpX, cpY, end.x, end.y);

                if (isCoordinated) {
                  ctx.setLineDash([4, 4]);
                  ctx.strokeStyle = '#E24B4A';
                  ctx.lineWidth = 2;
                } else {
                  ctx.setLineDash([]);
                  ctx.strokeStyle = '#D5D3C8';
                  ctx.lineWidth = 1;
                }

                ctx.stroke();
                ctx.setLineDash([]);
              }}

              // Hover Tooltip pill for Edge Labels
              linkLabel={(link: any) => {
                const rel = (link.relationship || '').toUpperCase();
                return `<div style="background:#FFFFFF; border:1px solid #E5E3DA; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:bold; color:#2C2C2A; box-shadow:0 1px 3px rgba(0,0,0,0.1);">${rel}</div>`;
              }}

              // Custom Node Drawing with Audience Reach Sizing
              nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
                const reach = node.audienceReach || 1000;
                // Logarithmic sizing between r=5 and r=15
                const r = Math.max(5, Math.min(15, Math.log10(reach) * 2.8));

                let fillColor = '#8C8B85'; // General User
                if (node.category === 'kol_influencer') fillColor = '#7F77DD';
                else if (node.category === 'channel') fillColor = '#378ADD';
                else if (node.category === 'bot_account') fillColor = '#E24B4A';

                const isSelected = selectedNode?.id === node.id;

                // Draw Circle
                ctx.beginPath();
                ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
                ctx.fillStyle = fillColor;
                ctx.fill();

                // Draw Border
                ctx.lineWidth = isSelected ? 3 / globalScale : 1.5 / globalScale;
                ctx.strokeStyle = isSelected ? '#2C2C2A' : '#FFFFFF';
                ctx.stroke();

                // Draw Handle Label
                const label = node.handle || node.label || node.id;
                const fontSize = Math.max(9 / globalScale, 3);
                ctx.font = `${fontSize}px Inter, sans-serif`;
                ctx.fillStyle = '#2C2C2A';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillText(label, node.x, node.y + r + 3);
              }}

              onNodeClick={(node: any) => {
                setSelectedNode(node as NetworkNode);
              }}
            />
          </div>

          <p className="text-[11px] text-[#5F5E5A]">
            Click any node on the force visualizer to inspect PageRank score, audience reach, and bot likelihood in the Account Inspector.
          </p>
        </div>

        {/* Account Inspector Sidebar (Identical Styling Kept) */}
        <div className="bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-[#2C2C2A]">Account Inspector</h2>
              {selectedNode?.category === 'kol_influencer' && (
                <span className="px-2 py-0.5 rounded bg-[#7F77DD]/10 text-[#7F77DD] border border-[#7F77DD]/30 text-[10px] font-bold uppercase">
                  KEY OPINION LEADER
                </span>
              )}
              {selectedNode?.category === 'channel' && (
                <span className="px-2 py-0.5 rounded bg-[#378ADD]/10 text-[#378ADD] border border-[#378ADD]/30 text-[10px] font-bold uppercase">
                  BROADCAST CHANNEL
                </span>
              )}
              {selectedNode?.category === 'bot_account' && (
                <span className="px-2 py-0.5 rounded bg-[#E24B4A]/10 text-[#E24B4A] border border-[#E24B4A]/30 text-[10px] font-bold uppercase">
                  BOT ACCOUNT
                </span>
              )}
              {selectedNode?.category === 'general_user' && (
                <span className="px-2 py-0.5 rounded bg-[#8C8B85]/10 text-[#8C8B85] border border-[#8C8B85]/30 text-[10px] font-bold uppercase">
                  GENERAL USER
                </span>
              )}
            </div>

            {selectedNode ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E5E3DA] space-y-1">
                  <div className="font-bold text-sm text-[#2C2C2A]">{selectedNode.handle}</div>
                  <div className="text-[#5F5E5A] capitalize">
                    Category: <strong className="text-[#2C2C2A]">{selectedNode.category.replace('_', ' ')}</strong>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E5E3DA]">
                    <span className="text-[#5F5E5A]">PageRank Score:</span>
                    <span className="font-bold text-[#378ADD] font-mono">{selectedNode.pageRankScore}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E5E3DA]">
                    <span className="text-[#5F5E5A]">Audience Reach:</span>
                    <span className="font-bold text-[#2C2C2A] font-mono">{selectedNode.audienceReach.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#E5E3DA]">
                    <span className="text-[#5F5E5A]">Bot Probability:</span>
                    <span className={`font-bold font-mono ${selectedNode.botProbability > 0.5 ? 'text-[#E24B4A]' : 'text-[#639922]'}`}>
                      {(selectedNode.botProbability * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {selectedNode.botProbability > 0.5 && (
                  <div className="p-3 rounded-xl bg-[#E24B4A]/10 border border-[#E24B4A]/30 text-[#E24B4A] space-y-1">
                    <span className="font-bold text-xs flex items-center space-x-1">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Security Flag</span>
                    </span>
                    <p className="text-[11px] leading-relaxed text-[#2C2C2A]">
                      High bot likelihood detected. Automated amplification behavior flag logged for security review.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-[#5F5E5A]">Select a node to inspect details.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
