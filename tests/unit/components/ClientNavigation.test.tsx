import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import ClientNavigation from '@/components/ClientNavigation'

// Mock usePathname
vi.mock('next/navigation', async () => ({
  ...(await vi.importActual('next/navigation')),
  usePathname: vi.fn()
}))

const mockUsePathname = vi.mocked(usePathname)

const defaultNavItems = [
  { href: '/', label: 'Posts' },
  { href: '/about', label: 'About' }
]

const extendedNavItems = [
  { href: '/', label: 'Posts' },
  { href: '/about', label: 'About' },
  { href: '/categories/nginx', label: 'Nginx', count: 5 }
]

describe('ClientNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUsePathname.mockReturnValue('/')
  })

  it('renders site title correctly', () => {
    render(<ClientNavigation navItems={defaultNavItems} />)

    const titleElement = screen.getByRole('heading', { level: 1, name: 'Cardoni.net' })
    expect(titleElement).toBeInTheDocument()
    expect(titleElement.closest('a')).toHaveAttribute('href', '/')
  })

  it('renders navigation items', () => {
    render(<ClientNavigation navItems={defaultNavItems} />)

    expect(screen.getByRole('link', { name: /Posts/ })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /About/ })).toHaveAttribute('href', '/about')
  })

  it('highlights active navigation item', () => {
    mockUsePathname.mockReturnValue('/')
    render(<ClientNavigation navItems={defaultNavItems} />)

    const postsLink = screen.getByRole('link', { name: /Posts/ })
    const aboutLink = screen.getByRole('link', { name: /About/ })

    // Active item should have specific classes
    expect(postsLink).toHaveClass('text-gray-900', 'dark:text-white')
    expect(aboutLink).toHaveClass('text-gray-600', 'dark:text-gray-400')
  })

  it('handles different active paths correctly', () => {
    mockUsePathname.mockReturnValue('/about')
    render(<ClientNavigation navItems={defaultNavItems} />)

    const postsLink = screen.getByRole('link', { name: /Posts/ })
    const aboutLink = screen.getByRole('link', { name: /About/ })

    expect(postsLink).toHaveClass('text-gray-600', 'dark:text-gray-400')
    expect(aboutLink).toHaveClass('text-gray-900', 'dark:text-white')
  })

  it('handles sub-paths as active for non-root items', () => {
    mockUsePathname.mockReturnValue('/about/some-subpage')
    render(<ClientNavigation navItems={defaultNavItems} />)

    const aboutLink = screen.getByRole('link', { name: /About/ })
    expect(aboutLink).toHaveClass('text-gray-900', 'dark:text-white')
  })

  it('renders social links correctly', () => {
    render(<ClientNavigation navItems={defaultNavItems} />)

    const xLink = screen.getByLabelText('Follow on X')
    const githubLink = screen.getByLabelText('Follow on GitHub')

    expect(xLink).toHaveAttribute('href', '//x.com/cardoni')
    expect(xLink).toHaveAttribute('target', '_blank')
    expect(xLink).toHaveAttribute('rel', 'noopener noreferrer')

    expect(githubLink).toHaveAttribute('href', '//github.com/cardoni')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders both desktop and mobile social links', () => {
    render(<ClientNavigation navItems={defaultNavItems} />)

    // Should have multiple X links (desktop and mobile)
    const xLinks = screen.getAllByLabelText('Follow on X')
    const githubLinks = screen.getAllByLabelText('Follow on GitHub')

    expect(xLinks).toHaveLength(2) // Desktop and mobile
    expect(githubLinks).toHaveLength(2) // Desktop and mobile
  })

  it('handles responsive text display', () => {
    render(<ClientNavigation navItems={defaultNavItems} />)

    const postsLink = screen.getByRole('link', { name: /Posts/ })
    
    // Check for responsive classes (hidden sm:inline and sm:hidden)
    expect(postsLink.querySelector('.hidden.sm\\:inline')).toBeInTheDocument()
    expect(postsLink.querySelector('.sm\\:hidden')).toBeInTheDocument()
  })

  it('displays active indicator for current page', () => {
    mockUsePathname.mockReturnValue('/')
    render(<ClientNavigation navItems={defaultNavItems} />)

    // The active indicator is rendered as a motion.div with specific classes
    const activeIndicator = document.querySelector('.absolute.-bottom-1.left-0.right-0.h-0\\.5.bg-gray-900.dark\\:bg-white')
    expect(activeIndicator).toBeInTheDocument()
  })

  it('handles items with count property', () => {
    render(<ClientNavigation navItems={extendedNavItems} />)

    expect(screen.getByRole('link', { name: /Nginx/ })).toHaveAttribute('href', '/categories/nginx')
    expect(screen.getByRole('link', { name: /Posts/ })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /About/ })).toHaveAttribute('href', '/about')
  })

  it('uses semantic HTML structure', () => {
    render(<ClientNavigation navItems={defaultNavItems} />)

    expect(screen.getByRole('banner')).toBeInTheDocument() // header element
    expect(screen.getByRole('navigation')).toBeInTheDocument() // nav element
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument() // h1 element
  })

  it('has proper accessibility attributes for social links', () => {
    render(<ClientNavigation navItems={defaultNavItems} />)

    const xLinks = screen.getAllByLabelText('Follow on X')
    const githubLinks = screen.getAllByLabelText('Follow on GitHub')

    xLinks.forEach(link => {
      expect(link).toHaveAttribute('aria-label', 'Follow on X')
    })

    githubLinks.forEach(link => {
      expect(link).toHaveAttribute('aria-label', 'Follow on GitHub')
    })
  })

  describe('edge cases', () => {
    it('handles empty navItems array', () => {
      render(<ClientNavigation navItems={[]} />)

      expect(screen.getByRole('heading', { name: 'Cardoni.net' })).toBeInTheDocument()
      expect(screen.getAllByLabelText('Follow on X')).toHaveLength(2) // Social links still render
    })

    it('handles single navigation item', () => {
      const singleNavItem = [{ href: '/', label: 'Home' }]
      render(<ClientNavigation navItems={singleNavItem} />)

      expect(screen.getByRole('link', { name: /Home/ })).toHaveAttribute('href', '/')
      expect(screen.queryByRole('link', { name: /About/ })).not.toBeInTheDocument()
    })

    it('handles complex pathname matching', () => {
      mockUsePathname.mockReturnValue('/categories/nginx/some-post')
      const categoryNavItems = [
        { href: '/', label: 'Posts' },
        { href: '/categories', label: 'Categories' },
        { href: '/about', label: 'About' }
      ]
      
      render(<ClientNavigation navItems={categoryNavItems} />)

      const categoriesLink = screen.getByRole('link', { name: /Categories/ })
      expect(categoriesLink).toHaveClass('text-gray-900', 'dark:text-white')
    })

    it('handles root path matching correctly', () => {
      mockUsePathname.mockReturnValue('/some-post')
      render(<ClientNavigation navItems={defaultNavItems} />)

      const postsLink = screen.getByRole('link', { name: /Posts/ })
      const aboutLink = screen.getByRole('link', { name: /About/ })

      // Root path should not match sub-paths
      expect(postsLink).toHaveClass('text-gray-600', 'dark:text-gray-400')
      expect(aboutLink).toHaveClass('text-gray-600', 'dark:text-gray-400')
    })
  })

  describe('mobile responsive behavior', () => {
    it('shows mobile-specific social links', () => {
      render(<ClientNavigation navItems={defaultNavItems} />)

      // Check for mobile-specific classes
      const mobileXLink = document.querySelector('.flex.sm\\:hidden .p-1\\.5[aria-label="Follow on X"]')
      const mobileGithubLink = document.querySelector('.flex.sm\\:hidden .p-1\\.5[aria-label="Follow on GitHub"]')

      expect(mobileXLink).toBeInTheDocument()
      expect(mobileGithubLink).toBeInTheDocument()
    })

    it('has different styling for mobile vs desktop social links', () => {
      render(<ClientNavigation navItems={defaultNavItems} />)

      const allXLinks = screen.getAllByLabelText('Follow on X')
      
      // One should have mobile classes (p-1.5) and one desktop classes (p-2)
      expect(allXLinks[0]).toHaveClass('p-2') // Desktop
      expect(allXLinks[1]).toHaveClass('p-1.5') // Mobile
    })
  })
})