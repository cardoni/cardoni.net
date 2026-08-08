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
vi.mock('next/link', async () => {
  const React = await import('react')

  return {
    default: ({ children, href, ...props }: any) => {
      return React.createElement('a', { href, ...props }, children)
    },
  }
})

// Mock motion components
vi.mock('motion/react', async () => {
  const React = await import('react')
  const motionComponent = (tag: string) => {
    const MotionComponent = (props: any) => {
      const domProps = { ...props }
      const children = domProps.children

      for (const prop of ['children', 'initial', 'animate', 'transition', 'whileHover', 'whileTap', 'layoutId']) {
        delete domProps[prop]
      }

      return React.createElement(tag, domProps, children)
    }

    MotionComponent.displayName = `Motion(${tag})`
    return MotionComponent
  }

  return {
    motion: {
      a: motionComponent('a'),
      article: motionComponent('article'),
      aside: motionComponent('aside'),
      button: motionComponent('button'),
      div: motionComponent('div'),
      header: motionComponent('header'),
      p: motionComponent('p'),
      span: motionComponent('span'),
      svg: motionComponent('svg'),
    },
  }
})
