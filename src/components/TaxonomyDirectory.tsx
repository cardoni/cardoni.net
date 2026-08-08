import Link from 'next/link';
import type { TaxonomyTerm } from '@/lib/taxonomy';

interface TaxonomyDirectoryProps {
  eyebrow: string;
  title: string;
  description: string;
  terms: TaxonomyTerm[];
}

export default function TaxonomyDirectory({
  eyebrow,
  title,
  description,
  terms,
}: TaxonomyDirectoryProps) {
  return (
    <div className="taxonomy-page site-shell">
      <header className="category-header">
        <p className="eyebrow">{eyebrow} / {terms.length} terms</p>
        <h1 className="font-reading">{title}</h1>
        <p>{description}</p>
      </header>

      <ul className="taxonomy-grid">
        {terms.map((term) => (
          <li key={term.name}>
            <Link href={term.href}>
              <span className="font-reading">{term.name}</span>
              <small>{term.count} {term.count === 1 ? 'essay' : 'essays'}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
