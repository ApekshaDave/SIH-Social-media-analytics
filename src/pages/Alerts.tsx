import React, { useState } from 'react';
import { AlertItem } from '../types';
import { AlertCard } from '../components/AlertCard';

interface AlertsProps {
  alerts: AlertItem[];
}

export const Alerts: React.FC<AlertsProps> = ({ alerts: initialAlerts }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const handleAcknowledge = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === 'ACTIVE' ? 'ACKNOWLEDGED' : 'ACTIVE' } : a))
    );
  };

  const filteredAlerts =
    filterSeverity === 'ALL'
      ? alerts
      : alerts.filter((a) => a.severity.toLowerCase() === filterSeverity.toLowerCase());

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C2C2A] tracking-tight">Security & Disinformation Alerts</h1>
          <p className="text-xs text-[#5F5E5A] mt-0.5">
            Automated anomaly feed monitoring sentiment surges, post velocity spikes, and bot coordination
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold">
          <span className="text-[#5F5E5A]">Filter:</span>
          {['ALL', 'DANGER', 'WARNING', 'SUCCESS'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterSeverity === sev
                  ? 'bg-[#378ADD] text-white shadow-sm font-bold'
                  : 'bg-[#F1EFE8] text-[#5F5E5A] hover:text-[#2C2C2A] border border-[#E5E3DA]'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Feed Cards */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <AlertCard 
            key={alert.id} 
            alert={alert} 
            onAcknowledge={handleAcknowledge} 
          />
        ))}
      </div>

    </div>
  );
};
