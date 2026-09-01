import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, Info, X, ShieldAlert } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'info' | 'error';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (title: string, description?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((title: string, description?: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, title, description, type };
    
    setToasts((prev) => [...prev.slice(-3), newToast]); // Keep max 4 toasts

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-[#34C759]" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-[#FF9500]" />;
      case 'error':
        return <ShieldAlert className="w-4 h-4 text-[#FF3B30]" />;
      default:
        return <Info className="w-4 h-4 text-[#007AFF]" />;
    }
  };

  const getBorderColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'rgba(52, 199, 89, 0.3)';
      case 'warning':
        return 'rgba(255, 149, 0, 0.3)';
      case 'error':
        return 'rgba(255, 59, 48, 0.3)';
      default:
        return 'rgba(0, 122, 255, 0.3)';
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Render Stack */}
      <div 
        aria-live="polite" 
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white/85 backdrop-blur-2xl border shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300 transform translate-y-0 opacity-100 animate-in fade-in slide-in-from-bottom-3"
            style={{
              borderColor: getBorderColor(toast.type),
            }}
          >
            <div className="mt-0.5 shrink-0">{getIcon(toast.type)}</div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#1D1D1F] leading-snug">{toast.title}</h4>
              {toast.description && (
                <p className="text-[11px] text-[#6E6E73] mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#86868B] hover:text-[#1D1D1F] transition-colors p-1 -mr-1 -mt-1 rounded-lg hover:bg-black/5"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
