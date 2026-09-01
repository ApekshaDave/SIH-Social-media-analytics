import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  ChevronLeft,
  KeyRound,
  FileCheck,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Lock,
  Cpu,
  Radio,
  Terminal,
  Activity,
} from 'lucide-react';
import { UserRole } from '../types';
import { useToast } from '../components/Toast';
import { SecurityBadge } from '../components/SecurityBadge';
import { PinVault } from '../components/PinVault';
import { SecurityCore3D } from '../components/SecurityCore3D';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

interface RoleProfile {
  role: UserRole;
  passcode: string;
  label: string;
  badge: string;
  clearance: string;
  idNumber: string;
  color: string;
  desc: string;
}

const ROLES: RoleProfile[] = [
  {
    role: 'analyst',
    passcode: '1234',
    label: 'Intelligence Analyst',
    badge: 'Tier-1 Classified',
    clearance: 'Secret / SCI Level 3 Access',
    idNumber: 'NTRO-8942-IN',
    color: '#007AFF',
    desc: 'Access full 3D force network topology, NLP sentiment curves, and coordinated bot threat triage feeds.',
  },
  {
    role: 'public',
    passcode: '0000',
    label: 'Public Observer',
    badge: 'Public Transparency',
    clearance: 'General Citizen Observer Tier',
    idNumber: 'NTRO-OPEN-PUB',
    color: '#34C759',
    desc: 'Access anonymized national sentiment aggregates, verified trend briefs, and open data governance reports.',
  },
];

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>('analyst');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [authStep, setAuthStep] = useState<string>('');

  const currentRole = ROLES.find((r) => r.role === selectedRole) || ROLES[0];

  const handleRoleSelect = (roleKey: UserRole) => {
    setSelectedRole(roleKey);
    setPasscode('');
    setError('');
  };

  const handleAuthenticate = () => {
    if (!passcode.trim()) {
      setError('Cryptographic access token is required.');
      return;
    }

    setLoading(true);
    setAuthStep('Reading quantum micro-signature...');

    setTimeout(() => {
      setAuthStep('Authorizing sovereign terminal clearance...');
    }, 300);

    setTimeout(() => {
      const code = passcode.trim();
      const matched = ROLES.find((u) => u.passcode === code) ||
        (code.toLowerCase() === 'pub' ? ROLES[1] : null);

      if (matched) {
        setAuthStep('Decrypting national intelligence stream...');
        setTimeout(() => {
          setError('');
          onLogin(matched.role);
          showToast(
            `Access Granted · ${matched.label}`,
            `Clearance: ${matched.clearance}`,
            'success'
          );
          navigate('/dashboard');
        }, 250);
      } else {
        setError('Security handshake failed. Use demo code 1234 (Analyst) or 0000 (Public).');
        setLoading(false);
        setAuthStep('');
        showToast('Access Denied', 'Invalid cryptographic token signature', 'error');
      }
    }, 700);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-4 sm:p-8 relative z-10 font-sans text-[#1D1D1F]">
      
      {/* Top Floating Header */}
      <header className="w-full flex items-center justify-between max-w-6xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-2xl border border-black/5 text-xs font-semibold text-[#6E6E73] hover:text-[#1D1D1F] shadow-sm transition-all hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4 text-[#007AFF]" />
          <span>Back to Landing</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#6E6E73] bg-white/60 backdrop-blur-xl px-3 py-1.5 rounded-full border border-black/5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
            <span>GovCloud Delhi Node · Latency: 14ms</span>
          </div>

          <div className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-black/5 text-[#1D1D1F] border border-black/5">
            DEFCON 4 · GUARDED
          </div>
        </div>
      </header>

      {/* Main Split Sovereign Stage */}
      <main className="w-full max-w-6xl mx-auto my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3D Quantum Enclave & Sovereign Telemetry */}
          <div className="lg:col-span-6 space-y-4 hidden lg:block pr-4">
            
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#007AFF]/10 border border-[#007AFF]/20 text-[#007AFF] text-xs font-bold tracking-wide">
                <Shield className="w-3.5 h-3.5" />
                <span>SOVEREIGN CLEARANCE TERMINAL</span>
              </div>
              <span className="text-[10px] font-mono text-[#6E6E73]">
                FIPS 140-3 COMPLIANT
              </span>
            </div>

            {/* 3D Cryptographic Sentinel Enclave */}
            <div className="relative rounded-3xl bg-gradient-to-b from-white/70 to-white/30 border border-white/90 shadow-[0_16px_50px_rgba(0,0,0,0.05)] backdrop-blur-3xl p-3">
              <SecurityCore3D role={selectedRole} isAuthenticating={loading} />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-[#6E6E73] bg-white/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-black/5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: currentRole.color }}
                  />
                  <span className="font-semibold text-[#1D1D1F]">
                    Cipher: {selectedRole === 'analyst' ? 'QUANTUM_ENCRYPTED' : 'PUBLIC_GOVERNED'}
                  </span>
                </div>
                <span>TLS 1.3 · SHA-384</span>
              </div>
            </div>

            {/* Mission Overview */}
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tight text-[#1D1D1F] leading-snug">
                Unified Social Media Audience Intelligence
              </h1>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                Continuous real-time multi-platform ingestion engine. Disentangling chaotic narratives, mapping sentiment, and exposing coordinated bot clusters across national feeds.
              </p>
            </div>

            {/* Live Governance Strip */}
            <div className="p-3.5 rounded-2xl bg-white/70 border border-black/5 backdrop-blur-xl flex items-center justify-between text-xs text-[#6E6E73] shadow-xs">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#34C759]" />
                <span className="font-semibold text-[#1D1D1F]">DPDP Act 2023 Compliant</span>
              </div>
              <span className="font-mono text-[10px] bg-black/5 px-2.5 py-1 rounded-full font-bold text-[#1D1D1F]">
                256-BIT ENCLAVE
              </span>
            </div>
          </div>

          {/* Right Column: Physical ID Badges & PIN Vault Terminal */}
          <div className="lg:col-span-6 w-full max-w-md mx-auto space-y-4">
            
            {/* Step 1: Tactile Physical ID Badges */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#6E6E73] uppercase tracking-wider px-1">
                <span>1. Select Clearance Identity</span>
                <span className="text-[10px] text-[#007AFF] font-mono">Slot-in NFC</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {ROLES.map((r) => (
                  <SecurityBadge
                    key={r.role}
                    role={r.role}
                    label={r.label}
                    badge={r.badge}
                    clearance={r.clearance}
                    idNumber={r.idNumber}
                    color={r.color}
                    isSelected={selectedRole === r.role}
                    onSelect={() => handleRoleSelect(r.role)}
                  />
                ))}
              </div>
            </div>

            {/* Step 2: Cryptographic PIN Vault Card */}
            <div className="rounded-[28px] bg-white/85 backdrop-blur-3xl border border-white/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.08)] space-y-3.5">
              
              <div className="flex items-center justify-between pb-3 border-b border-black/5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: `${currentRole.color}15`, color: currentRole.color }}
                  >
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-black text-[#1D1D1F] uppercase tracking-wider">
                      2. Authorize Terminal Passkey
                    </h2>
                    <p className="text-[10px] text-[#6E6E73]">
                      Preset: <strong className="font-mono" style={{ color: currentRole.color }}>{currentRole.passcode}</strong>
                    </p>
                  </div>
                </div>

                <span 
                  className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${currentRole.color}15`, color: currentRole.color }}
                >
                  AUTOKEY
                </span>
              </div>

              {/* Discrete PIN Pods & Streaming Hash */}
              <PinVault
                value={passcode}
                onChange={(val) => {
                  setPasscode(val);
                  if (error) setError('');
                }}
                onSubmit={handleAuthenticate}
                accentColor={currentRole.color}
                presetCode={currentRole.passcode}
                disabled={loading}
              />

              {/* Error Banner */}
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/20 text-[#FF3B30] text-xs font-medium animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Action Button */}
              <button
                type="button"
                onClick={handleAuthenticate}
                disabled={loading}
                className="w-full py-3.5 px-5 rounded-full font-bold text-xs text-white transition-all shadow-[0_8px_24px_-4px_rgba(0,122,255,0.4)] disabled:opacity-60 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                style={{ backgroundColor: currentRole.color }}
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span className="text-xs font-mono">{authStep}</span>
                  </>
                ) : (
                  <>
                    <span>Authorize & Launch Command Terminal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Metadata */}
      <footer className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-black/5 text-[11px] text-[#6E6E73]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" />
          <span>National Technical Research Organisation · Sovereign Cryptographic Gateway</span>
        </div>
        <span className="font-mono text-[10px]">Session Clearance Hash: 0x8FA2B9...C04</span>
      </footer>
    </div>
  );
};
