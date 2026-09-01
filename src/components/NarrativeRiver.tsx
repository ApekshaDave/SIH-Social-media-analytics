import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
  maxLife: number;
}

export const NarrativeRiver: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resize
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        // High DPI canvas support
        const dpr = window.devicePixelRatio || 1;
        canvas.width = parent.clientWidth * dpr;
        canvas.height = parent.clientHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${parent.clientWidth}px`;
        canvas.style.height = `${parent.clientHeight}px`;
      }
    };
    
    window.addEventListener('resize', updateSize);
    updateSize();

    const particles: Particle[] = [];
    let animationFrameId: number;

    const colors = {
      positive: '#34C759',
      negative: '#FF3B30',
      neutral: '#007AFF', // Or a neutral gray/blue #86868B
    };

    const spawnParticle = (type: 'positive' | 'negative' | 'neutral', isBurst = false) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      const baseY = height / 2;
      // Start on left edge
      const x = -10;
      let y = baseY + (Math.random() * 40 - 20); // slight random scatter

      let vy = (Math.random() - 0.5) * 0.5;
      const vx = (Math.random() * 0.5 + 0.5) * (isBurst ? 3 : 1); // Burst moves faster

      if (type === 'positive') {
        vy -= Math.random() * 0.8; // Float up
      } else if (type === 'negative') {
        vy += Math.random() * 0.8; // Sink down
      }

      particles.push({
        x,
        y,
        vx,
        vy,
        radius: Math.random() * 2 + 1.5,
        color: colors[type],
        life: 0,
        maxLife: width + 50, // Live until they cross screen
      });
    };

    // Simulation loop
    let tick = 0;
    const render = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Clear with slight fade for motion blur effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Randomly spawn regular flow
      tick++;
      if (tick % 3 === 0) {
        const rand = Math.random();
        if (rand < 0.4) spawnParticle('positive');
        else if (rand < 0.6) spawnParticle('negative');
        else spawnParticle('neutral');
      }

      // Simulate a bot attack burst every 300 ticks
      if (tick % 300 > 0 && tick % 300 < 20) {
        spawnParticle('negative', true);
        spawnParticle('negative', true);
        spawnParticle('negative', true);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Physics
        p.x += p.vx;
        p.y += p.vy;
        
        // Slight wave effect to vx/vy
        p.vy += Math.sin(p.x * 0.02) * 0.02;
        p.life += p.vx;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        
        // Fade out at edges
        const alpha = Math.min(1, Math.min(p.x / 50, (width - p.x) / 50));
        ctx.globalAlpha = Math.max(0, alpha);
        
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Remove dead
        if (p.life > p.maxLife || p.x > width + 20) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-xl bg-white border border-black/5 shadow-[inset_0_2px_20px_rgba(0,0,0,0.02)]">
      <div className="absolute top-4 left-4 z-10">
        <h3 className="text-[10px] font-bold text-[#6E6E73] uppercase tracking-widest font-mono">
          Live Narrative River
        </h3>
        <p className="text-xs font-semibold text-[#1D1D1F] mt-0.5">
          Real-time Sentiment Particle Flow
        </p>
      </div>
      <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none mix-blend-multiply" />
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-3 text-[10px] font-mono font-bold text-[#6E6E73]">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#34C759]" /> Support
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#007AFF]" /> Neutral
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF3B30]" /> Hostile / Bot
        </div>
      </div>
    </div>
  );
};
