'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialIcon from './SocialIcon';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { href: '/', label: 'Posts' },
  { href: '/about', label: 'About' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-shell">
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/" className="wordmark" aria-label="Cardoni.net home">
            Cardoni<span aria-hidden="true">·</span>net
          </Link>

          <div className="nav-actions">
            <div className="nav-links">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="nav-link"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="nav-utilities">
              <SocialIcon platform="x" variant="icon-only" size="md" className="p-2" />
              <SocialIcon platform="github" variant="icon-only" size="md" className="p-2" />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
