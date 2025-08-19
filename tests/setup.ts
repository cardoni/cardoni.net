import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
  redirect: vi.fn(),
  notFound: vi.fn(),
}))

// Mock Next.js Link component
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: any) => {
      const React = require('react')
      return React.createElement('a', { href, ...props }, children)
    },
  }
})

// Mock motion components
vi.mock('motion/react', () => {
  const React = require('react')
  return {
    motion: {
      div: ({ children, ...props }: any) => React.createElement('div', props, children),
      article: ({ children, ...props }: any) => React.createElement('article', props, children),
      span: ({ children, ...props }: any) => React.createElement('span', props, children),
    },
  }
})