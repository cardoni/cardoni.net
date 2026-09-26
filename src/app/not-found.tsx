import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you were looking for does not exist on cardoni.net.',
  // Next.js injects `<meta name="robots" content="noindex" />` on every
  // notFound() render. Clearing the robots inherited from the root layout
  // keeps this page to that single, non-conflicting directive instead of
  // emitting a second, contradictory "index, follow" tag.
  robots: null,
};

export default function NotFound() {
  return (
    <div className="not-found-page">
      <header className="site-shell not-found-header">
        <p className="eyebrow">404 / Page not found</p>
        <h1 className="font-reading">This page doesn&rsquo;t exist.</h1>
        <p className="not-found-copy">
          The link you followed may be outdated, or the page may have moved. Here are some
          places to continue from:
        </p>
        <nav className="not-found-nav" aria-label="Not found">
          <Link href="/">Home</Link>
          <Link href="/tags">Browse by tag</Link>
          <Link href="/categories">Browse by category</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>
    </div>
  );
}
