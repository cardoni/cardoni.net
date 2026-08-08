import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DynamicNavigation from '@/components/DynamicNavigation'

// Mock the ClientNavigation component since DynamicNavigation is just a wrapper
vi.mock('@/components/ClientNavigation', () => ({
  default: ({ navItems }: { navItems: Array<{href: string, label: string}> }) => (
    <nav data-testid="client-navigation">
      {navItems.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  )
}))

describe('DynamicNavigation', () => {
  it('renders with correct navigation items', async () => {
    // DynamicNavigation is an async server component, so we need to await it
    const component = await DynamicNavigation()
    render(component)

    expect(screen.getByTestId('client-navigation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Posts' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
  })

  it('passes correct navItems structure to ClientNavigation', async () => {
    const component = await DynamicNavigation()
    render(component)

    const navigation = screen.getByTestId('client-navigation')
    expect(navigation).toBeInTheDocument()
    
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveTextContent('Posts')
    expect(links[1]).toHaveTextContent('About')
  })
})