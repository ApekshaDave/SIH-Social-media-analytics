import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface SonarPulse {
  id: string;
  x: number;
  y: number;
  color: string;
}

interface SonarContextType {
  triggerPulse: (x: number, y: number, color?: string) => void;
  pulses: SonarPulse[];
}

const SonarContext = createContext<SonarContextType | undefined>(undefined);

export const SonarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pulses, setPulses] = useState<SonarPulse[]>([]);
  const [isAlertActive, setIsAlertActive] = useState(false);

  const triggerPulse = useCallback((x: number, y: number, color: string = '#FF3B30') => {
    const id = Math.random().toString(36).substring(2, 9);
    setPulses((prev) => [...prev, { id, x, y, color }]);
    setIsAlertActive(true);

    // Clean up pulse after animation
    setTimeout(() => {
      setPulses((prev) => prev.filter((p) => p.id !== id));
    }, 4000);

    // Turn off global screen dimming after 2.5s
    setTimeout(() => {
      setIsAlertActive(false);
    }, 2500);
  }, []);

  return (
    <SonarContext.Provider value={{ triggerPulse, pulses }}>
      {/* Global Vignette Dimming */}
      <div 
        className="fixed inset-0 z-40 pointer-events-none transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: isAlertActive ? 1 : 0,
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      {/* Sonar Rings Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
        {pulses.map((pulse) => (
          <div
            key={pulse.id}
            className="absolute rounded-full border-2 animate-sonar-expand"
            style={{
              left: pulse.x,
              top: pulse.y,
              borderColor: pulse.color,
              boxShadow: `0 0 40px ${pulse.color}, inset 0 0 20px ${pulse.color}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {children}
    </SonarContext.Provider>
  );
};

export const useSonar = () => {
  const context = useContext(SonarContext);
  if (context === undefined) {
    throw new Error('useSonar must be used within a SonarProvider');
  }
  return context;
};
