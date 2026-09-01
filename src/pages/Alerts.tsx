import React, { useState } from 'react';
import { AlertItem } from '../types';
import { AlertCard } from '../components/AlertCard';
import { Radio, RefreshCw, Filter, AlertTriangle, Shield, Radar } from 'lucide-react';
import { useToast } from '../components/Toast';
import { useSonar } from '../contexts/SonarContext';

interface AlertsProps {
  alerts: AlertItem[];
}

const SEVERITY_ORDER: Record<string, number> = { danger: 0, warning: 1, success: 2, info: 3 };

export const Alerts: React.FC<AlertsProps> = ({ alerts: initialAlerts }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const { showToast } = useToast();
  const { triggerPulse } = useSonar();

  const handleAcknowledge = (id: string) => {
    const target = alerts.find((a) => a.id === id);
    const willAcknowledge = target?.status === 'ACTIVE';

    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'ACTIVE' ? 'ACKNOWLEDGED' : 'ACTIVE' } : a))
    );

    if (target) {
      showToast(
        willAcknowledge ? `Alert Acknowledged: ${target.title}` : `Alert Reopened: ${target.title}`,
        willAcknowledge ? 'Incident flagged as triaged by analyst' : 'Incident restored to active threat queue',
        willAcknowledge ? 'success' : 'info'
      );
    }
  };

  const handleRefresh = () => {
    setAlerts(initialAlerts);
    showToast('Threat Radar Synchronized', 'Real-time feed updated with latest node telemetry', 'success');
  };

  const handleSimulateIntrusion = () => {
    // Trigger visual sonar pulse from center of screen
    triggerPulse(window.innerWidth / 2, window.innerHeight / 2, '#FF3B30');
    showToast('THREAT DETECTED', 'Coordinated bot cluster anomaly registered. Sonar engaged.', 'error');
  };

  const filtered = (filterSeverity === 'ALL' ? alerts : alerts.filter((a) => a.severity === filterSeverity.toLowerCase()))
    .sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);

  const activeDangerCount = alerts.filter((a) => a.severity === 'danger' && a.status === 'ACTIVE').length;
  const activeWarningCount = alerts.filter((a) => a.severity === 'warning' && a.status === 'ACTIVE').length;
  const acknowledgedCount = alerts.filter((a) => a.status === 'ACKNOWLEDGED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 fade-in">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="relative w-2 h-2">
              <div className="w-2 h-2 rounded-full bg-[#FF3B30]" />
              {activeDangerCount > 0 && (
                <div className="absolute inset-0 rounded-full bg-[#FF3B30] animate-ping opacity-60" />
              )}
            </div>
            <span className="text-[10px] font-mono font-bold text-[#FF3B30] uppercase tracking-widest">
              Alerts Module · {activeDangerCount} Critical Active
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#1D1D1F] tracking-tight">
            Security & Disinformation Alerts
          </h1>
          <p className="text-xs text-[#6E6E73] mt-1">
            Automated anomaly feed · bot coordination · sentiment surges · post velocity spikes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateIntrusion}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#FF3B30] bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 border border-[#FF3B30]/20 shadow-sm transition-all flex-shrink-0 animate-pulse"
          >
            <Radar className="w-3.5 h-3.5" />
            Simulate Intrusion
          </button>
          
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1D1D1F] bg-white border border-black/5 hover:bg-black/5 shadow-sm transition-all flex-shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#007AFF]" />
            Refresh Feed
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 fade-in-1">
        {[
          { label: 'Critical', count: activeDangerCount, color: '#FF3B30', icon: AlertTriangle },
          { label: 'Warnings', count: activeWarningCount, color: '#FF9500', icon: Radio },
          { label: 'Acknowledged', count: acknowledgedCount, color: '#34C759', icon: Shield },
        ].map(({ label, count, color, icon: Icon }) => (
          <div key={label} className="glass-card p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}18` }}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div>
              <div className="text-[9px] text-[#6E6E73] uppercase tracking-wider font-semibold">{label}</div>
              <div className="font-mono text-xl font-black" style={{ color }}>{count}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 fade-in-2 flex-wrap">
        <Filter className="w-3.5 h-3.5 text-[#6E6E73]" />
        <span className="text-[10px] text-[#6E6E73] font-semibold mr-1">Filter:</span>
        {[
          { key: 'ALL',     label: 'All',      color: '#6E6E73' },
          { key: 'DANGER',  label: 'Critical', color: '#FF3B30' },
          { key: 'WARNING', label: 'Warning',  color: '#FF9500' },
          { key: 'INFO',    label: 'Info',     color: '#007AFF' },
        ].map(({ key, label, color }) => (
          <button
            key={key}
            onClick={() => setFilterSeverity(key)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
              filterSeverity === key
                ? 'text-white'
                : 'text-[#6E6E73] hover:text-[#1D1D1F] bg-white border-black/5 shadow-xs'
            }`}
            style={
              filterSeverity === key
                ? { background: color, borderColor: color, boxShadow: `0 2px 8px ${color}30` }
                : {}
            }
          >
            {label}
          </button>
        ))}
        <span className="ml-auto text-[10px] text-[#6E6E73] font-mono">
          Showing {filtered.length} of {alerts.length}
        </span>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3 fade-in-3">
        {filtered.map((alert) => (
          <AlertCard key={alert.id} alert={alert} onAcknowledge={handleAcknowledge} />
        ))}
        {filtered.length === 0 && (
          <div className="glass-card p-10 text-center text-[#6E6E73] text-sm">
            No alerts match selected filter.
          </div>
        )}
      </div>
    </div>
  );
};
