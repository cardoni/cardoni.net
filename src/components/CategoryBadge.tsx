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
    ? 'inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
    : 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200';

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

