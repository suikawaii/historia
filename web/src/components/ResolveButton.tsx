'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { resolveEvent } from '@/lib/wallet';

interface ResolveButtonProps {
  eventId: string;
  revealEndTimestamp?: number;
  onSuccess?: () => void;
}

export function ResolveButton({ eventId, onSuccess, revealEndTimestamp }: ResolveButtonProps) {
  const { connected, address } = useWallet();
  const [isResolving, setIsResolving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (revealEndTimestamp) {
      const diff = Date.now() - revealEndTimestamp;
      if (diff <= 0) {
        setError(`Confirmation phase not yet ended. Wait ${Math.ceil(-diff / 60000)} minute(s).`);
      }
    }
  }, [revealEndTimestamp]);

  const handleResolve = async () => {
    if (!connected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    setIsResolving(true);
    setError(null);

    try {
      await resolveEvent(BigInt(eventId));
      onSuccess?.();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to resolve';
      let detailedError = errorMsg;

      if (errorMsg.includes('ERevealNotEnded')) {
        const timeLeft = revealEndTimestamp ? revealEndTimestamp - Date.now() : 0;
        detailedError = `Confirmation phase not yet ended. Wait ${Math.ceil(timeLeft / 60000)} more minute(s).`;
      } else if (errorMsg.includes('EAlreadyFinalized')) {
        detailedError = 'This claim has already been resolved.';
      }

      setError(detailedError);
    } finally {
      setIsResolving(false);
    }
  };

  return (
    <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] p-8 shadow-[var(--shadow-sm)]">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-[var(--surface-raised)] flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-bold text-[var(--foreground)] mb-1 tracking-tight">Ready to Finalize</h3>
          <p className="text-sm text-[var(--muted)]">
            The confirmation phase has ended. Finalize the results to distribute stakes to the winning side.
          </p>
        </div>
      </div>

      {!connected && (
        <div className="p-4 rounded-[var(--radius-sm)] bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium mb-5">
          Connect your wallet to finalize this claim
        </div>
      )}

      {error && (
        <div className="p-4 rounded-[var(--radius-sm)] bg-[var(--no-bg)] border border-[var(--no-border)] text-[var(--no-light)] text-sm font-medium mb-5">
          {error}
        </div>
      )}

      <button
        onClick={handleResolve}
        disabled={isResolving || !connected || !address}
        className="w-full py-3 bg-[var(--accent)] text-white font-bold text-sm rounded-[var(--radius-sm)] hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isResolving ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Finalizing...
          </>
        ) : !connected ? 'Connect Wallet First' : 'Finalize Results'}
      </button>
    </div>
  );
}
