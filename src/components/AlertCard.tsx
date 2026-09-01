import React, { useState } from 'react';
import { AlertItem } from '../types';
import { ShieldAlert, AlertTriangle, CheckCircle, Info, Clock, ChevronDown, ChevronUp, Check, X } from 'lucide-react';

interface AlertCardProps {
  alert: AlertItem;
  onAcknowledge: (id: string) => void;
}

const SEVERITY_CONFIG: Record<string, { icon: typeof ShieldAlert; color: string; bg: string; label: string }> = {
  danger:  { icon: ShieldAlert,    color: '#FF3B30', bg: 'rgba(255,59,48,0.12)',   label: 'CRITICAL' },
  warning: { icon: AlertTriangle,  color: '#FF9500', bg: 'rgba(255,149,0,0.12)',  label: 'WARNING' },
  success: { icon: CheckCircle,    color: '#34C759', bg: 'rgba(52,199,89,0.12)',   label: 'INFO' },
  info:    { icon: Info,           color: '#007AFF', bg: 'rgba(0,122,255,0.12)',  label: 'INFO' },
};

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onAcknowledge }) => {
  const [expanded, setExpanded] = useState(false);
  const config = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.info;
  const Icon = config.icon;
  const isAcknowledged = alert.status === 'ACKNOWLEDGED';

  return (
    <div
      className={`glass-card overflow-hidden transition-all fade-in ${isAcknowledged ? 'opacity-60' : ''}`}
      style={{
        borderLeft: `3px solid ${config.color}`,
        boxShadow: isAcknowledged ? 'none' : `0 4px 20px ${config.bg}`,
      }}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: config.bg }}
          >
            <Icon className="w-4 h-4" style={{ color: config.color }} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest"
                    style={{ background: config.bg, color: config.color }}
                  >
                    {config.label}
                  </span>
                  <span className="text-[9px] font-mono text-[#6E6E73] px-1.5 py-0.5 rounded bg-black/5 border border-black/5">
                    {alert.type}
                  </span>
                  {isAcknowledged && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest bg-black/5 text-[#6E6E73]">
                      ACKNOWLEDGED
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-[#1D1D1F] mt-1 leading-tight">
                  {alert.title}
                </h3>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => onAcknowledge(alert.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:scale-105 shadow-xs"
                  style={{
                    background: isAcknowledged ? 'rgba(0,0,0,0.05)' : config.bg,
                    color: isAcknowledged ? '#6E6E73' : config.color,
                  }}
                  title={isAcknowledged ? 'Mark Active' : 'Acknowledge'}
                  aria-label={isAcknowledged ? 'Mark Active' : 'Acknowledge'}
                >
                  {isAcknowledged ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setExpanded((e) => !e)}
                  className="w-7 h-7 rounded-lg bg-black/5 border border-black/5 flex items-center justify-center text-[#6E6E73] hover:text-[#1D1D1F] transition-all"
                  aria-label={expanded ? 'Collapse alert' : 'Expand alert'}
                >
                  {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1 mt-1.5 text-[10px] text-[#6E6E73]">
              <Clock className="w-3 h-3" />
              <span>{alert.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Expanded Description */}
        {expanded && (
          <div
            className="mt-3 pt-3 border-t border-black/5 text-xs text-[#1D1D1F]/80 leading-relaxed fade-in"
          >
            {alert.description}
          </div>
        )}
      </div>
    </div>
  );
};
