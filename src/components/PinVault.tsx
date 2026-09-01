import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Delete, Hash, Sparkles, ShieldCheck } from 'lucide-react';

interface PinVaultProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  accentColor: string;
  presetCode?: string;
  disabled?: boolean;
}

export const PinVault: React.FC<PinVaultProps> = ({
  value,
  onChange,
  onSubmit,
  accentColor,
  presetCode = '1234',
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef(value);
  valueRef.current = value;

  const [hashPreview, setHashPreview] = useState('');
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(true);

  // Generate simulated cryptographic SHA-256 hash string from input
  useEffect(() => {
    if (!value) {
      setHashPreview('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
      return;
    }
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    setHashPreview(`7f83b1${hex}fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d${hex.slice(0, 4)}`);
  }, [value]);

  // Flash active key state for tactile keyboard feedback
  const triggerKeyFlash = useCallback((keyChar: string) => {
    setActiveKey(keyChar);
    setTimeout(() => {
      setActiveKey((curr) => (curr === keyChar ? null : curr));
    }, 180);
  }, []);

  // Global physical keyboard listener - always captures 0-9, Backspace, Enter, Esc
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;

      const target = e.target as HTMLElement;
      if (target && target.tagName === 'INPUT' && target !== inputRef.current) {
        return;
      }

      const key = e.key;
      if (key >= '0' && key <= '9') {
        e.preventDefault();
        triggerKeyFlash(key);
        if (valueRef.current.length < 4) {
          onChange(valueRef.current + key);
        }
      } else if (key === 'Backspace') {
        e.preventDefault();
        triggerKeyFlash('backspace');
        onChange(valueRef.current.slice(0, -1));
      } else if (key === 'Escape') {
        e.preventDefault();
        triggerKeyFlash('clear');
        onChange('');
      } else if (key === 'Enter') {
        e.preventDefault();
        triggerKeyFlash('enter');
        onSubmit();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [disabled, triggerKeyFlash, onChange, onSubmit]);

  const handleContainerClick = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  const handleNumpadClick = (char: string) => {
    if (disabled) return;
    triggerKeyFlash(char);

    if (char === 'clear') {
      onChange('');
    } else if (char === 'backspace') {
      onChange(value.slice(0, -1));
    } else if (char === 'enter') {
      onSubmit();
    } else {
      if (value.length < 4) {
        onChange(value + char);
      }
    }
  };

  // Sequential typing animation when AutoKey preset is clicked
  const handleAutoType = () => {
    if (disabled || !presetCode) return;
    onChange('');
    let current = '';
    presetCode.split('').forEach((char, idx) => {
      setTimeout(() => {
        current += char;
        onChange(current);
        triggerKeyFlash(char);
      }, (idx + 1) * 120);
    });
  };

  // 4 discrete display slots
  const slots = [0, 1, 2, 3];

  return (
    <div className="space-y-3.5">
      {/* Discrete 4-Pod Visualizer with Focus Glow & direct input capture */}
      <div
        onClick={handleContainerClick}
        className={`relative cursor-pointer group flex items-center justify-center gap-3 p-3 rounded-2xl transition-all duration-300 ${
          isFocused
            ? 'bg-white/95 shadow-md border'
            : 'bg-black/[0.03] border border-black/5 hover:border-black/10'
        }`}
        style={{
          borderColor: isFocused ? `${accentColor}60` : undefined,
          boxShadow: isFocused ? `0 4px 20px ${accentColor}15` : undefined,
        }}
      >
        {/* Hidden transparent overlay input to capture mobile keyboard and focus */}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          value={value}
          onChange={(e) => {
            const clean = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
            onChange(clean);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          autoFocus
        />

        {slots.map((idx) => {
          const char = value[idx];
          const isFilled = Boolean(char);
          const isCurrent = value.length === idx;

          return (
            <div
              key={idx}
              className={`w-11 h-13 rounded-xl flex flex-col items-center justify-center transition-all duration-200 relative select-none ${
                isFilled
                  ? 'bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] border scale-105'
                  : isCurrent
                  ? 'bg-white/95 border-2 shadow-xs'
                  : 'bg-black/[0.02] border border-black/5'
              }`}
              style={{
                borderColor: isFilled
                  ? `${accentColor}40`
                  : isCurrent
                  ? accentColor
                  : undefined,
              }}
            >
              {isFilled ? (
                <div className="flex flex-col items-center justify-center animate-in zoom-in-75 duration-150">
                  <span
                    className="w-2.5 h-2.5 rounded-full shadow-xs transition-transform duration-200"
                    style={{ backgroundColor: accentColor }}
                  />
                  <span className="text-[10px] font-mono font-black text-[#1D1D1F] mt-1">
                    {char}
                  </span>
                </div>
              ) : isCurrent ? (
                <span
                  className="w-1.5 h-4 rounded-full animate-pulse"
                  style={{ backgroundColor: accentColor }}
                />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-black/15" />
              )}
            </div>
          );
        })}
      </div>

      {/* Streaming SHA-256 Cipher & Quick-AutoKey Banner */}
      <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-black/[0.02] border border-black/5 text-[9.5px] font-mono text-[#6E6E73]">
        <div className="flex items-center gap-1.5 min-w-0">
          <Hash className="w-3 h-3 shrink-0" style={{ color: accentColor }} />
          <span className="text-black/30 shrink-0">SHA-256:</span>
          <span className="truncate font-medium text-[#1D1D1F]/75">{hashPreview}</span>
        </div>

        <button
          type="button"
          onClick={handleAutoType}
          disabled={disabled}
          title="Click to auto-fill preset key"
          className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider text-[8.5px] transition-all hover:scale-105 cursor-pointer shadow-xs"
          style={{
            backgroundColor: `${accentColor}15`,
            color: accentColor,
            border: `1px solid ${accentColor}30`,
          }}
        >
          <Sparkles className="w-2.5 h-2.5" />
          <span>Fill {presetCode}</span>
        </button>
      </div>

      {/* Tactile Synchronized On-Screen Keyboard */}
      <div className="space-y-1">
        <div className="grid grid-cols-3 gap-1.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'backspace'].map((key) => {
            const isAction = key === 'clear' || key === 'backspace';
            const isActive = activeKey === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleNumpadClick(key)}
                disabled={disabled}
                className={`py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-150 flex items-center justify-center cursor-pointer select-none ${
                  isActive
                    ? 'scale-95 shadow-inner text-white'
                    : 'hover:scale-[1.02] active:scale-95'
                }`}
                style={{
                  backgroundColor: isActive
                    ? accentColor
                    : isAction
                    ? 'rgba(0, 0, 0, 0.03)'
                    : 'rgba(255, 255, 255, 0.9)',
                  color: isActive
                    ? '#FFFFFF'
                    : isAction
                    ? '#6E6E73'
                    : '#1D1D1F',
                  border: `1px solid ${isActive ? accentColor : 'rgba(0, 0, 0, 0.08)'}`,
                  boxShadow: isActive
                    ? `0 0 14px ${accentColor}60, inset 0 2px 4px rgba(0,0,0,0.2)`
                    : '0 2px 5px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                }}
              >
                {key === 'clear' ? (
                  <span className="text-[10px] tracking-wider">CLR</span>
                ) : key === 'backspace' ? (
                  <Delete className="w-4 h-4" />
                ) : (
                  <span>{key}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Input Ergonomics Subtitle */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6E6E73] font-medium pt-1">
          <ShieldCheck className="w-3 h-3 text-[#34C759]" />
          <span>Type on physical keyboard or click tactical keys above</span>
        </div>
      </div>
    </div>
  );
};
