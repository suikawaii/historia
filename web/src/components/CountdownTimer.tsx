'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endTimestamp: number;
  label: string;
  variant?: 'default' | 'reveal';
}

export function CountdownTimer({ endTimestamp, label, variant = 'default' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const calculate = () => {
      const diff = endTimestamp - Date.now();
      if (diff <= 0) return 'Ended';
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1_000);
      if (h > 0) return `${h}h ${m}m`;
      if (m > 0) return `${m}m ${s}s`;
      return `${s}s`;
    };

    setTimeLeft(calculate());
    const interval = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(interval);
  }, [endTimestamp]);

  const isEnded = !timeLeft || timeLeft === 'Ended';

  if (isEnded) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--subtle)] uppercase tracking-wide font-medium">{label}</span>
        <span className="text-sm font-semibold text-[var(--subtle)]">—</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <span className={`text-xs font-medium uppercase tracking-wide ${variant === 'reveal' ? 'text-amber-600' : 'text-[var(--muted)]'}`}>
        {label}
      </span>
      <span className={`text-lg font-bold tabular-nums tracking-tight ${variant === 'reveal' ? 'text-amber-700' : 'text-[var(--foreground)]'}`}>
        {timeLeft}
      </span>
    </div>
  );
}
