import Link from 'next/link';
import { stringToSlug } from '@/lib/url-utils';

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
      href={`/categories/${stringToSlug(category)}`}
      className={`${baseClasses} ${className}`}
    >
      {content}
    </Link>
  );
}
