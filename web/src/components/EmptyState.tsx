import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="py-20 text-center bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] border-dashed">
      <div className="mb-5">
        <div className="w-px h-8 bg-[var(--border)] mx-auto mb-4" />
        <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-tight">{title}</h3>
        {description && (
          <p className="text-sm text-[var(--subtle)] mt-2 max-w-xs mx-auto leading-relaxed">{description}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white text-xs font-semibold rounded-[var(--radius-sm)] hover:bg-[var(--accent-hover)] transition-all tracking-wide"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
