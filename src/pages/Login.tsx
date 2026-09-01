import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, ChevronRight, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleAnalystLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter the passcode.');
      return;
    }

    if (passcode === '1234') {
      setError('');
      onLogin('analyst');
      navigate('/');
    } else {
      setError('Invalid Analyst Passcode.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F1EFE8] flex items-center justify-center p-4 selection:bg-[#378ADD] selection:text-white">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E5E3DA] p-8 shadow-sm space-y-6">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#378ADD] rounded-2xl flex items-center justify-center text-white mx-auto shadow-sm">
            <Shield className="w-6 h-6 stroke-[2.5]" />
          </div>
          
          <h1 className="text-2xl font-bold text-[#2C2C2A] tracking-tight">
            NTRO <span className="text-[#378ADD]">Intelligence</span>
          </h1>
          <p className="text-xs text-[#5F5E5A]">
            Unified Social Media Audience Intelligence Platform | Team: Null Pointers
          </p>
        </div>

        {/* Analyst Secure Authentication Form */}
        <form onSubmit={handleAnalystLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#2C2C2A] flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-[#378ADD]" />
              <span>Analyst Access Passcode</span>
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter passcode"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E3DA] bg-[#F1EFE8]/50 text-xs text-[#2C2C2A] focus:outline-none focus:border-[#378ADD] focus:bg-white transition-all font-mono"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-[#E24B4A]/10 border border-[#E24B4A]/30 text-[#E24B4A] text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#378ADD] hover:bg-[#378ADD]/90 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
          >
            <span>Authenticate as Intelligence Analyst</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Disclaimer */}
        <div className="pt-4 border-t border-[#E5E3DA] text-center">
          <p className="text-[11px] text-[#5F5E5A]">
            Restricted Government Intelligence Portal — Authorized Personnel Only
          </p>
        </div>

      </div>
    </div>
  );
};
