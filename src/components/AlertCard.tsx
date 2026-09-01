import React from 'react';
import { AlertItem } from '../types';
import { AlertTriangle, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

interface AlertCardProps {
  alert: AlertItem;
  onAcknowledge?: (id: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onAcknowledge }) => {
  const getSeverityBadge = () => {
    switch (alert.severity) {
      case 'danger':
        return {
          bg: 'bg-[#E24B4A]/10 border-[#E24B4A]/30 text-[#E24B4A]',
          icon: ShieldAlert,
          label: 'CRITICAL'
        };
      case 'warning':
        return {
          bg: 'bg-[#EF9F27]/10 border-[#EF9F27]/30 text-[#EF9F27]',
          icon: AlertTriangle,
          label: 'WARNING'
        };
      case 'success':
      default:
        return {
          bg: 'bg-[#639922]/10 border-[#639922]/30 text-[#639922]',
          icon: CheckCircle2,
          label: 'SUCCESS'
        };
    }
  };

  const severityInfo = getSeverityBadge();
  const Icon = severityInfo.icon;
  const isAcknowledged = alert.status === 'ACKNOWLEDGED';

  return (
    <div 
      className={`bg-[#F1EFE8] rounded-xl border border-[#E5E3DA] p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all ${
        isAcknowledged ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2.5 rounded-xl border ${severityInfo.bg}`}>
          <Icon className="w-5 h-5 stroke-[2.5]" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${severityInfo.bg}`}>
              {severityInfo.label}
            </span>
            <h3 className="font-bold text-sm text-[#2C2C2A]">{alert.title}</h3>
          </div>

          <p className="text-xs text-[#5F5E5A] leading-relaxed">{alert.description}</p>

          <div className="flex items-center space-x-2 text-[11px] text-[#5F5E5A] pt-1">
            <Clock className="w-3 h-3 text-[#5F5E5A]" />
            <span>{alert.timestamp}</span>
          </div>
        </div>
      </div>

      {onAcknowledge && (
        <button
          onClick={() => onAcknowledge(alert.id)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all self-end sm:self-auto ${
            isAcknowledged
              ? 'bg-[#E5E3DA] text-[#5F5E5A] border-[#E5E3DA]'
              : 'bg-white hover:bg-[#378ADD] hover:text-white text-[#2C2C2A] border-[#E5E3DA]'
          }`}
        >
          {isAcknowledged ? 'Acknowledged' : 'Acknowledge'}
        </button>
      )}
    </div>
  );
};
