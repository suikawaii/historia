import Link from 'next/link';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: { label: string; href: string };
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-7">
      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-sm text-[var(--subtle)] mt-1 font-normal">{subtitle}</p>
        )}
      </div>
      {action && (
        <Link
          href={action.href}
          className="text-[11px] font-semibold text-[var(--subtle)] hover:text-[var(--foreground)] transition-colors uppercase tracking-[0.1em]"
        >
          {action.label} →
        </Link>
      )}
    </div>
  );
}
