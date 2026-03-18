import Link from 'next/link';

interface ProfileLinkProps {
  address: string;
  label?: string;
  className?: string;
}

export function ProfileLink({ address, label = 'Creator', className = '' }: ProfileLinkProps) {
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Link
      href={`/profile?address=${address}`}
      className={`inline-flex items-center gap-1.5 text-xs text-[var(--subtle)] hover:text-[var(--muted)] transition-colors group ${className}`}
    >
      <svg
        className="w-3 h-3 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      <span className="font-mono group-hover:underline underline-offset-2">{short}</span>
    </Link>
  );
}
