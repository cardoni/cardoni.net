import Link from 'next/link';
import type { TaxonomyTerm } from '@/lib/taxonomy';

interface TaxonomyLinksProps {
  categories?: TaxonomyTerm[];
  className?: string;
  tags?: TaxonomyTerm[];
  title: string;
}

export default function TaxonomyLinks({
  categories = [],
  className = '',
  tags = [],
  title,
}: TaxonomyLinksProps) {
  if (categories.length === 0 && tags.length === 0) {
    return null;
  }

  return (
    <nav className={`taxonomy-links ${className}`.trim()} aria-label={title}>
      <p className="eyebrow">{title}</p>
      <div className="taxonomy-link-groups">
        {categories.length > 0 && (
          <div className="taxonomy-link-group">
            <p>Categories</p>
            <div>
              {categories.map((term) => (
                <Link key={term.slug} href={term.href}>
                  <span>{term.name}</span>
                  <small>{term.count} {term.count === 1 ? 'essay' : 'essays'}</small>
                </Link>
              ))}
            </div>
          </div>
        )}
        {tags.length > 0 && (
          <div className="taxonomy-link-group">
            <p>Topics</p>
            <div>
              {tags.map((term) => (
                <Link key={term.slug} href={term.href} rel="tag">
                  <span>{term.name}</span>
                  <small>{term.count} {term.count === 1 ? 'essay' : 'essays'}</small>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
