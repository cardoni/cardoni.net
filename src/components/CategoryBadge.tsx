import Link from 'next/link';
import { getTaxonomyHref } from '@/lib/taxonomy';

interface CategoryBadgeProps {
  category: string;
  variant?: 'default' | 'compact';
  clickable?: boolean;
  className?: string;
}

export default function CategoryBadge({
  category,
  variant = 'default',
  clickable = true,
  className = ''
}: CategoryBadgeProps) {
  const baseClasses = variant === 'compact'
    ? 'category-badge category-badge-compact'
    : 'category-badge';

  const content = <span>{category}</span>;

  if (!clickable) {
    return (
      <span className={`${baseClasses} ${className}`}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={getTaxonomyHref('category', category)}
      className={`${baseClasses} ${className}`}
    >
      {content}
    </Link>
  );
}
