import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Shield, 
  ArrowRight, 
  Activity, 
  Globe, 
  Zap, 
  CheckCircle2, 
  Lock, 
  BarChart3, 
  Radio, 
  Sparkles, 
  Share2, 
  TrendingUp, 
  AlertTriangle,
  Layers,
  Search
} from 'lucide-react';
import { Hero3D } from '../components/Hero3D';

gsap.registerPlugin(ScrollTrigger);

export const Landing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'sentiment' | 'network' | 'alerts'>('sentiment');

  useGSAP(() => {
    // Staggered hero entry
    gsap.from('.hero-anim', {
      y: 36,
      opacity: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power3.out',
      delay: 0.1,
    });

    // Fade-in sections as user scrolls
    const fadeSections = gsap.utils.toArray('.apple-reveal');
    fadeSections.forEach((elem: any) => {
      gsap.fromTo(elem, 
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Dashboard Preview Scale-Up on scroll (Apple flagship scroll interaction)
    gsap.fromTo(
      '.dashboard-preview-window',
      { scale: 0.92, y: 30, opacity: 0.8 },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: '.dashboard-preview-container',
          start: 'top bottom',
          end: 'center center',
          scrub: 1,
        },
      }
    );

    // Stagger Bento Cards
    gsap.fromTo('.bento-item',
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bento-grid-container',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col relative z-10 w-full font-sans text-[#1D1D1F] selection:bg-[#0071E3]/20 selection:text-[#0071E3]">
      
      {/* 3D Dynamic Social Intelligence Halo */}
      <Hero3D />

      {/* Top Floating Glass Navigation */}
      <header className="w-full fixed top-0 z-50 px-6 py-4">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between bg-white/75 backdrop-blur-2xl border border-white/80 rounded-full px-6 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0071E3] to-[#43BFEA] flex items-center justify-center shadow-sm">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-[#1D1D1F]">NTRO Intelligence</span>
            <span className="hidden sm:inline-flex text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-black/5 text-[#86868B]">
              v2.0
            </span>
          </div>
          
          <nav className="flex items-center gap-3">
            <Link 
              to="/login" 
              className="text-xs font-semibold text-[#86868B] hover:text-[#1D1D1F] px-4 py-2 rounded-full transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/login" 
              className="px-4 py-2 rounded-full bg-[#1D1D1F] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col w-full max-w-[1200px] mx-auto px-6 pt-28 pb-20 relative z-10">
        
        {/* 1. Hero Section */}
        <section className="flex flex-col items-center justify-center text-center min-h-[70vh] relative py-8">
          
          {/* Badge */}
          <div className="hero-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-black/5 backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34C759] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34C759]"></span>
            </span>
            <span className="text-[11px] font-semibold text-[#1D1D1F] tracking-wide uppercase">
              Real-Time Audience & Narrative Intelligence
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-anim text-5xl sm:text-6xl md:text-7xl font-black text-[#1D1D1F] tracking-tight leading-[0.98] max-w-3xl mb-5">
            See the signal. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] via-[#5B8DF6] to-[#7928CA]">
              Ignore the noise.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="hero-anim text-base md:text-lg text-[#86868B] max-w-xl font-normal leading-relaxed mb-8">
            A unified, multi-platform intelligence command center. Disentangle millions of chaotic social feeds into crystalline, actionable insights in sub-second time.
          </p>

          {/* CTAs */}
          <div className="hero-anim flex flex-col sm:flex-row items-center gap-4">
            <Link 
              to="/login" 
              className="px-8 py-3.5 rounded-full bg-[#0071E3] text-white font-semibold text-sm hover:bg-[#0077ED] transition-all shadow-[0_8px_20px_-4px_rgba(0,113,227,0.4)] flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Exploring <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="#preview" 
              className="px-7 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#1D1D1F] font-semibold text-sm border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Live Product Preview
            </a>
          </div>

          {/* Micro-Proof Strip */}
          <div className="hero-anim flex items-center gap-6 sm:gap-10 mt-10 text-xs font-medium text-[#86868B]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" />
              <span>14M+ events/min</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Sub-second Latency</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#7928CA]" />
              <span>Coordinated Bot Detection</span>
            </div>
          </div>
        </section>

        {/* 2. Problem Statement ("From Chaos to Clarity") */}
        <section className="apple-reveal pointer-events-auto py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF3B30] bg-[#FF3B30]/10 px-3 py-1 rounded-full">
              The Critical Problem
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F] tracking-tight leading-tight">
              Data is everywhere.<br />
              <span className="text-[#86868B]">Insights are nowhere.</span>
            </h2>
            <p className="text-base text-[#86868B] leading-relaxed">
              Intelligence analysts and decision-makers are flooded by disconnected dashboards, fragmented API outputs, and deceptive narrative campaigns. Sifting through noisy data manually leads to delayed responses and blind spots.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-[#1D1D1F] font-medium">
                <div className="w-2 h-2 rounded-full bg-[#FF3B30]" />
                <span>Synthetic bot networks orchestrate synthetic trends</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#1D1D1F] font-medium">
                <div className="w-2 h-2 rounded-full bg-[#FF9500]" />
                <span>Emotion shifts go unnoticed until viral outbreak</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#1D1D1F] font-medium">
                <div className="w-2 h-2 rounded-full bg-[#34C759]" />
                <span>NTRO aggregates and purifies signals in real-time</span>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Visual Glass Box */}
            <div className="aspect-[4/3] rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-black/5">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#0071E3]" />
                  <span className="text-xs font-bold text-[#1D1D1F]">Signal Clarity Engine</span>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#34C759]/10 text-[#34C759]">
                  ACTIVE 99.8%
                </span>
              </div>

              {/* Animated Waveform Visualization */}
              <div className="space-y-3 my-auto">
                <div className="flex items-center justify-between text-xs text-[#86868B]">
                  <span>Raw Ingested Noise</span>
                  <span className="font-mono text-[#FF3B30]">1,420,800 msgs/hr</span>
                </div>
                <div className="h-2 rounded-full bg-black/5 overflow-hidden flex gap-1">
                  <div className="h-full bg-[#FF3B30] w-[35%] rounded-full animate-pulse" />
                  <div className="h-full bg-[#FF9500] w-[25%] rounded-full" />
                  <div className="h-full bg-[#0071E3] w-[40%] rounded-full" />
                </div>

                <div className="flex items-center justify-between text-xs text-[#86868B] pt-3">
                  <span>Synthesized Actionable Signals</span>
                  <span className="font-mono text-[#34C759] font-bold">14 High-Impact Alerts</span>
                </div>
                <div className="h-2 rounded-full bg-black/5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0071E3] to-[#34C759] w-[100%] rounded-full" />
                </div>
              </div>

              {/* Bottom Insight Pill */}
              <div className="p-3 rounded-2xl bg-black/[0.02] border border-black/5 flex items-center justify-between text-xs">
                <span className="text-[#86868B]">Bot Cluster Isolation</span>
                <span className="font-semibold text-[#0071E3]">-84% Noise Reduction</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Flagship Interactive Product Preview */}
        <section id="preview" className="dashboard-preview-container pointer-events-auto py-32 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 apple-reveal">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0071E3] bg-[#0071E3]/10 px-3 py-1 rounded-full">
              Command Center
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F] tracking-tight">
              One view. Total comprehension.
            </h2>
            <p className="text-base text-[#86868B]">
              Experience analytics built with tactile elegance, sub-second queries, and deep multi-platform synthesis.
            </p>
          </div>

          {/* Interactive Window Shell */}
          <div className="dashboard-preview-window w-full rounded-[28px] sm:rounded-[36px] bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_30px_70px_rgba(0,0,0,0.08)] overflow-hidden relative">
            
            {/* macOS Chrome Header */}
            <div className="h-12 border-b border-black/5 bg-white/40 px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#86868B] bg-black/5 px-4 py-1 rounded-full">
                <Lock className="w-3 h-3 text-[#34C759]" />
                <span className="font-mono text-[11px]">ntro.gov.in/intelligence/live</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
                <span className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider hidden sm:inline">LIVE FEED</span>
              </div>
            </div>

            {/* Interactive Preview Body */}
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Tab Selector */}
              <div className="flex items-center gap-2 border-b border-black/5 pb-4">
                {[
                  { key: 'sentiment', label: 'Sentiment Spectrum', icon: BarChart3 },
                  { key: 'network', label: 'Topology & Clusters', icon: Share2 },
                  { key: 'alerts', label: 'Anomaly Feed', icon: AlertTriangle },
                ].map(t => (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      activeTab === t.key 
                        ? 'bg-[#1D1D1F] text-white shadow-sm' 
                        : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5'
                    }`}
                  >
                    <t.icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* KPI Mini-Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Ingested', val: '1.48M', delta: '+12.4%', color: '#0071E3' },
                  { label: 'Net Sentiment', val: '+68.2%', delta: 'Positive', color: '#34C759' },
                  { label: 'Active Clusters', val: '24 Rings', delta: '3 Suspicious', color: '#FF9500' },
                  { label: 'Signal Quality', val: '99.4%', delta: 'Optimal', color: '#7928CA' },
                ].map((kpi, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-black/[0.02] border border-black/5">
                    <span className="text-[11px] text-[#86868B] font-medium">{kpi.label}</span>
                    <div className="text-xl md:text-2xl font-black text-[#1D1D1F] tracking-tight mt-1">{kpi.val}</div>
                    <span className="text-[10px] font-semibold" style={{ color: kpi.color }}>{kpi.delta}</span>
                  </div>
                ))}
              </div>

              {/* Chart Visual Simulation */}
              <div className="aspect-[21/9] rounded-2xl bg-gradient-to-br from-white/90 to-white/50 border border-black/5 p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#0071E3]" />
                    <span className="text-xs font-bold text-[#1D1D1F]">
                      {activeTab === 'sentiment' && 'Cross-Platform Emotional Velocity (24h)'}
                      {activeTab === 'network' && 'Coordinated Ring Amplification Index'}
                      {activeTab === 'alerts' && 'Active Threat Anomalies & Narrative Spikes'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#86868B]">Real-Time Streaming</span>
                </div>

                {/* Animated Wave Bars */}
                <div className="flex items-end justify-between gap-1.5 h-28 pt-4">
                  {[24, 38, 45, 60, 52, 75, 90, 84, 68, 92, 100, 88, 70, 62, 78, 85, 94, 76, 82, 95].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 rounded-t-md transition-all duration-500 hover:opacity-80"
                      style={{ 
                        height: `${h}%`,
                        backgroundColor: i > 15 ? '#0071E3' : '#0071E340',
                      }} 
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#86868B] pt-2 border-t border-black/5 font-mono">
                  <span>00:00 UTC</span>
                  <span>06:00 UTC</span>
                  <span>12:00 UTC</span>
                  <span>18:00 UTC</span>
                  <span className="text-[#0071E3] font-bold">LIVE NOW</span>
                </div>
              </div>
            </div>

            {/* Hover Demo Launcher Overlay */}
            <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
              <Link 
                to="/login" 
                className="px-8 py-4 rounded-full bg-[#1D1D1F] text-white font-semibold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                Launch Live Interactive Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Apple Bento Grid ("Engineered for Depth") */}
        <section className="bento-grid-container pointer-events-auto py-32 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4 apple-reveal">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7928CA] bg-[#7928CA]/10 px-3 py-1 rounded-full">
              Intelligence Architecture
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F] tracking-tight">
              Analyst-grade precision.
            </h2>
            <p className="text-base text-[#86868B]">
              Every tool crafted to reveal hidden signals across the social spectrum.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Bento 1: Topology */}
            <div className="bento-item md:col-span-2 rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/80 p-8 shadow-[0_16px_40px_rgba(0,0,0,0.04)] hover:shadow-apple transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-[#0071E3]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
                  3D Network Topology & Coordinated Rings
                </h3>
                <p className="text-[#86868B] text-sm leading-relaxed max-w-md">
                  Uncover concealed bot botnets, astroturfing clusters, and echo chambers with multi-dimensional node graphs.
                </p>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-black/[0.02] border border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Radio className="w-4 h-4 text-[#0071E3] animate-pulse" />
                  <span className="text-xs font-semibold text-[#1D1D1F]">Auto-Isolated 18 Synthetic Clusters</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#34C759]">CONFIRMED</span>
              </div>
            </div>

            {/* Bento 2: Multi-Class Emotion */}
            <div className="bento-item rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/80 p-8 shadow-[0_16px_40px_rgba(0,0,0,0.04)] hover:shadow-apple transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#34C759]/10 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#34C759]" />
                </div>
                <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">
                  Multi-Class Emotion Spectrum
                </h3>
                <p className="text-[#86868B] text-sm leading-relaxed">
                  Beyond binary sentiment. Track nuanced emotions: Trust, Joy, Anger, Fear, and Surprise in real-time.
                </p>
              </div>

              <div className="space-y-2 mt-6">
                {[
                  { emo: 'Trust', pct: 64, color: '#34C759' },
                  { emo: 'Surprise', pct: 42, color: '#0071E3' },
                  { emo: 'Anger', pct: 18, color: '#FF3B30' },
                ].map((e, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[11px] font-medium text-[#86868B]">
                      <span>{e.emo}</span>
                      <span>{e.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-black/5 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${e.pct}%`, backgroundColor: e.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bento 3: Anomaly Detection */}
            <div className="bento-item rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/80 p-8 shadow-[0_16px_40px_rgba(0,0,0,0.04)] hover:shadow-apple transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FF9500]/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#FF9500]" />
                </div>
                <h3 className="text-xl font-bold text-[#1D1D1F] tracking-tight">
                  Predictive Anomaly Alerter
                </h3>
                <p className="text-[#86868B] text-sm leading-relaxed">
                  AI engines model historical baselines and flag emergent narrative spikes 4 hours before virality.
                </p>
              </div>

              <div className="mt-6 p-3 rounded-xl bg-[#FF9500]/10 border border-[#FF9500]/20 flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#FF9500]" />
                <span className="text-[11px] font-semibold text-[#1D1D1F]">Early Spike: Narrative Ring #402</span>
              </div>
            </div>

            {/* Bento 4: Secure Platform */}
            <div className="bento-item md:col-span-2 rounded-[32px] bg-white/70 backdrop-blur-2xl border border-white/80 p-8 shadow-[0_16px_40px_rgba(0,0,0,0.04)] hover:shadow-apple transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#7928CA]/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-[#7928CA]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
                  Air-Gapped & Sovereign Deployment Ready
                </h3>
                <p className="text-[#86868B] text-sm leading-relaxed max-w-md">
                  Compliant with national security benchmarks, localized DPDP protocols, and zero external data leakage.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                {['DPDP Compliant', 'SOC 2 Type II', 'Zero-Trust Architecture', 'End-to-End Encrypted'].map((badge, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 text-[11px] font-semibold text-[#1D1D1F]">
                    <CheckCircle2 className="w-3 h-3 text-[#34C759]" /> {badge}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 5. How It Works Section */}
        <section className="apple-reveal pointer-events-auto py-32 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0071E3] bg-[#0071E3]/10 px-3 py-1 rounded-full">
              The Workflow
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F] tracking-tight">
              Three steps to clarity.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Ingest & Normalize', desc: 'Connects to APIs, dark feeds, and public discourse channels with automated noise reduction.' },
              { num: '02', title: 'Synthesize & Cluster', desc: 'Proprietary graph models isolate amplification rings, emotions, and narrative origin seeds.' },
              { num: '03', title: 'Decide & Protect', desc: 'Deploy automated alerts, export analyst-grade briefs, and brief stakeholders instantly.' },
            ].map((step, i) => (
              <div key={i} className="p-8 rounded-[28px] bg-white/60 backdrop-blur-xl border border-white/80 space-y-4 shadow-sm">
                <span className="font-mono text-3xl font-black text-[#0071E3]/30">{step.num}</span>
                <h3 className="text-lg font-bold text-[#1D1D1F]">{step.title}</h3>
                <p className="text-sm text-[#86868B] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. High-Impact Final Call to Action */}
        <section className="apple-reveal pointer-events-auto py-24 flex flex-col items-center text-center">
          <div className="w-full max-w-4xl rounded-[40px] bg-gradient-to-b from-white/90 to-white/50 backdrop-blur-2xl border border-white/90 p-12 md:p-16 shadow-[0_30px_70px_rgba(0,0,0,0.06)] flex flex-col items-center space-y-8">
            <div className="w-16 h-16 rounded-3xl bg-[#1D1D1F] flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-[#0071E3]" />
            </div>
            
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-[#1D1D1F] tracking-tight leading-tight">
                Ready to command the narrative?
              </h2>
              <p className="text-base text-[#86868B]">
                Join premier intelligence teams transforming social chaos into decisive strategic advantage.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md pt-2">
              <Link 
                to="/login" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0071E3] text-white font-semibold text-sm hover:bg-[#0077ED] transition-all shadow-[0_8px_20px_-4px_rgba(0,113,227,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                Access Dashboard <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/login" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/5 hover:bg-black/10 text-[#1D1D1F] font-semibold text-sm transition-all flex items-center justify-center"
              >
                Request Briefing
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Apple-Style Minimalist Footer */}
      <footer className="w-full py-10 border-t border-black/5 bg-white/40 backdrop-blur-xl relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#86868B] font-medium gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-[#0071E3]" />
            <span>&copy; 2026 NTRO Intelligence. Unified AI Audience Platform.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Security Architecture</a>
            <a href="#" className="hover:text-[#1D1D1F] transition-colors">Compliance</a>
            <Link to="/login" className="text-[#0071E3] hover:underline">Analyst Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};