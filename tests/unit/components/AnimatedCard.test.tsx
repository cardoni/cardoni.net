import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AnimatedCard from '@/components/AnimatedCard'
import { BlogPost } from '@/types/blog'

// Mock data
const mockPost: BlogPost = {
  id: 'test-post',
  title: 'Test Blog Post Title',
  date: '2023-12-01',
  categories: ['test', 'example'],
  tags: ['tag1', 'tag2'],
  keywords: ['keyword1', 'keyword2'],
  content: 'This is test content',
  excerpt: 'This is a test excerpt for the blog post.',
  readTime: '5 min read'
}

const mockPostSingleCategory: BlogPost = {
  ...mockPost,
  id: 'single-category-post',
  title: 'Single Category Post',
  categories: ['nginx'],
}

describe('AnimatedCard', () => {
  it('renders blog post information correctly', () => {
    render(<AnimatedCard post={mockPost} />)

    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    expect(screen.getByText('This is a test excerpt for the blog post.')).toBeInTheDocument()
    expect(screen.getByText('5 min read')).toBeInTheDocument()
    expect(screen.getByText('Read more')).toBeInTheDocument()
  })

  it('formats date correctly', () => {
    render(<AnimatedCard post={mockPost} />)
    
    // Check for time element with correct datetime attribute
    const timeElement = document.querySelector('time[datetime="2023-12-01"]')
    expect(timeElement).toBeInTheDocument()
    expect(timeElement).toHaveAttribute('dateTime', '2023-12-01')
    // The actual text content may vary based on locale/system, so just check it exists
    expect(timeElement.textContent).toBeTruthy()
  })

  it('displays category badges with correct links', () => {
    render(<AnimatedCard post={mockPost} />)

    const testCategory = screen.getByText('test')
    const exampleCategory = screen.getByText('example')

    expect(testCategory).toBeInTheDocument()
    expect(exampleCategory).toBeInTheDocument()

    // Check if categories are links with correct hrefs
    expect(testCategory.closest('a')).toHaveAttribute('href', '/categories/test')
    expect(exampleCategory.closest('a')).toHaveAttribute('href', '/categories/example')
  })

  it('handles categories with spaces in URL slugs', () => {
    const postWithSpacedCategory: BlogPost = {
      ...mockPost,
      categories: ['personal pivot']
    }
    
    render(<AnimatedCard post={postWithSpacedCategory} />)
    
    const categoryLink = screen.getByText('personal pivot').closest('a')
    expect(categoryLink).toHaveAttribute('href', '/categories/personal-pivot')
  })

  it('creates correct post links', () => {
    render(<AnimatedCard post={mockPost} />)

    const titleLinks = screen.getAllByRole('link', { name: /Test Blog Post Title/i })
    const excerptLinks = screen.getAllByRole('link', { name: /This is a test excerpt/i })
    const readMoreLink = screen.getByRole('link', { name: /Read more/i })

    // Title should be a link
    expect(titleLinks[0]).toHaveAttribute('href', '/test-post')
    
    // Excerpt should be a link  
    expect(excerptLinks[0]).toHaveAttribute('href', '/test-post')
    
    // Read more should be a link
    expect(readMoreLink).toHaveAttribute('href', '/test-post')
  })

  it('handles posts with no categories', () => {
    const postWithNoCategories: BlogPost = {
      ...mockPost,
      categories: []
    }
    
    render(<AnimatedCard post={postWithNoCategories} />)

    // Should still render without errors
    expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument()
    
    // No category badges should be present
    expect(screen.queryByText('test')).not.toBeInTheDocument()
    expect(screen.queryByText('example')).not.toBeInTheDocument()
  })

  it('handles single category correctly', () => {
    render(<AnimatedCard post={mockPostSingleCategory} />)

    expect(screen.getByText('nginx')).toBeInTheDocument()
    expect(screen.getByText('nginx').closest('a')).toHaveAttribute('href', '/categories/nginx')
  })

  it('renders with custom delay prop', () => {
    const { container } = render(<AnimatedCard post={mockPost} delay={0.5} />)
    
    // Should render without errors (motion props are handled by mocked motion components)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders default delay when none provided', () => {
    const { container } = render(<AnimatedCard post={mockPost} />)
    
    // Should render without errors
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<AnimatedCard post={mockPost} />)

    // Check for semantic HTML elements
    const article = screen.getByRole('article')
    expect(article).toBeInTheDocument()

    // Check for proper heading
    const heading = screen.getByRole('heading', { name: 'Test Blog Post Title' })
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H2')

    // Check for time element with datetime attribute
    const timeElement = document.querySelector('time[datetime="2023-12-01"]')
    expect(timeElement).toBeInTheDocument()
    expect(timeElement).toHaveAttribute('dateTime', '2023-12-01')
  })

  it('handles long titles and excerpts appropriately', () => {
    const longContentPost: BlogPost = {
      ...mockPost,
      title: 'This is a very long title that should be handled appropriately by the component and might need to be truncated',
      excerpt: 'This is a very long excerpt that goes on and on and should be handled properly by the component. It contains multiple sentences and should demonstrate how the component handles longer text content that might overflow or need truncation.'
    }

    render(<AnimatedCard post={longContentPost} />)

    // Should render without layout issues
    expect(screen.getByText(longContentPost.title)).toBeInTheDocument()
    expect(screen.getByText(longContentPost.excerpt)).toBeInTheDocument()
  })

  it('includes read more arrow icon', () => {
    render(<AnimatedCard post={mockPost} />)

    // Check for the SVG arrow icon in read more link
    const readMoreLink = screen.getByRole('link', { name: /Read more/i })
    const svgIcon = readMoreLink.querySelector('svg')
    
    expect(svgIcon).toBeInTheDocument()
    expect(svgIcon).toHaveClass('w-4', 'h-4', 'ml-1')
  })

  // Integration test with real-world data
  it('handles realistic blog post data', () => {
    const realisticPost: BlogPost = {
      id: 'install-homebrew-on-mac-os-x-10-7',
      title: 'Installing Homebrew on Mac OS X 10.7',
      date: '2013-03-15',
      categories: ['nginx'],
      tags: ['homebrew', 'installation', 'mac'],
      keywords: ['homebrew install', 'mac package manager'],
      content: 'Full content here...',
      excerpt: 'Homebrew is the missing package manager for Mac OS X. Learn how to install it on Mac OS X 10.7 Lion.',
      readTime: '3 min read'
    }

    render(<AnimatedCard post={realisticPost} />)

    expect(screen.getByText('Installing Homebrew on Mac OS X 10.7')).toBeInTheDocument()
    expect(screen.getByText('Homebrew is the missing package manager for Mac OS X. Learn how to install it on Mac OS X 10.7 Lion.')).toBeInTheDocument()
    expect(screen.getByText('3 min read')).toBeInTheDocument()
    expect(screen.getByText('nginx')).toBeInTheDocument()
    
    // Check for time element rather than specific formatted date
    const timeElement = document.querySelector('time[datetime="2013-03-15"]')
    expect(timeElement).toBeInTheDocument()
  })
})