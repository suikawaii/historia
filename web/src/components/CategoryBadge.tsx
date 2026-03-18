import { Category } from '@/lib/types';

interface CategoryBadgeProps {
  category: Category | string;
  className?: string;
}

const CATEGORY_STYLES: Record<string, string> = {
  Science:    'bg-slate-50 text-slate-500 border-slate-200',
  Economics:  'bg-stone-50 text-stone-500 border-stone-200',
  Politics:   'bg-red-50 text-red-500 border-red-200',
  Society:    'bg-violet-50 text-violet-500 border-violet-200',
  Technology: 'bg-teal-50 text-teal-600 border-teal-200',
};

export function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const style = CATEGORY_STYLES[category] ?? 'bg-gray-50 text-gray-500 border-gray-200';

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full border ${style} ${className}`}
    >
      {category}
    </span>
  );
}
