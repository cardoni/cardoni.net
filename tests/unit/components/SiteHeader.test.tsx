import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';

vi.mock('next/navigation', async () => ({
  ...(await vi.importActual('next/navigation')),
  usePathname: vi.fn(),
}));

const mockUsePathname = vi.mocked(usePathname);

describe('SiteHeader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePathname.mockReturnValue('/');
  });

  it('renders a semantic primary navigation and home wordmark', () => {
    render(<SiteHeader />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Cardoni.net home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('button', { name: /Switch to/ })).toBeInTheDocument();
  });

  it('renders the primary navigation links', () => {
    render(<SiteHeader />);

    expect(screen.getByRole('link', { name: 'Posts' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });

  it('marks the exact active page with aria-current', () => {
    mockUsePathname.mockReturnValue('/about');
    render(<SiteHeader />);

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Posts' })).not.toHaveAttribute('aria-current');
  });

  it('marks nested non-root routes as active', () => {
    mockUsePathname.mockReturnValue('/about/elsewhere');
    render(<SiteHeader />);

    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  });

  it('does not treat every post as the root route', () => {
    mockUsePathname.mockReturnValue('/an-essay');
    render(<SiteHeader />);

    expect(screen.getByRole('link', { name: 'Posts' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
  });

  it('uses canonical HTTPS social profile links with identity rel values', () => {
    render(<SiteHeader />);

    const xLink = screen.getByRole('link', { name: 'Follow on X' });
    const githubLink = screen.getByRole('link', { name: 'Follow on GitHub' });

    expect(xLink).toHaveAttribute('href', 'https://x.com/cardoni');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/cardoni');
    expect(xLink).toHaveAttribute('rel', 'me noopener noreferrer');
    expect(githubLink).toHaveAttribute('rel', 'me noopener noreferrer');
  });
});
