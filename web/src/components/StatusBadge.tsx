import { ClaimStatus, Outcome } from '@/lib/types';

interface StatusBadgeProps {
  status: ClaimStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'VOTING') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-[var(--surface-raised)] text-[var(--foreground)] border border-[var(--border)]">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot flex-shrink-0" />
        Voting
      </span>
    );
  }

  if (status === 'REVEALING') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse-dot flex-shrink-0" />
        Reveal
      </span>
    );
  }

  if (status === 'RESOLVED') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full bg-[var(--surface-raised)] text-[var(--subtle)] border border-[var(--border)]">
        Archived
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full bg-[var(--surface-raised)] text-[var(--subtle)] border border-[var(--border)]">
      Voided
    </span>
  );
}

interface OutcomeBadgeProps {
  outcome: Outcome;
}

export function OutcomeBadge({ outcome }: OutcomeBadgeProps) {
  if (outcome === 'ACCEPTED') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-[var(--yes-bg)] text-[var(--yes)] border border-[var(--yes-border)] tracking-wide uppercase">
        True
      </span>
    );
  }

  if (outcome === 'REJECTED') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-[var(--no-bg)] text-[var(--no)] border border-[var(--no-border)] tracking-wide uppercase">
        False
      </span>
    );
  }

  if (outcome === 'TIED') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-[var(--surface-raised)] text-[var(--muted)] border border-[var(--border)]">
        Tied
      </span>
    );
  }

  return null;
}
