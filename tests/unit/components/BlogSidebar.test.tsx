import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlogSidebar from '@/components/BlogSidebar'
import { BlogPost } from '@/types/blog'

// Mock data
const mockPosts: BlogPost[] = [
  {
    id: 'current-post',
    title: 'Current Post Title',
    date: '2023-12-01',
    categories: ['nginx', 'web'],
    tags: ['tag1'],
    keywords: ['keyword1'],
    content: 'Content',
    excerpt: 'Current post excerpt',
    readTime: '5 min read'
  },
  {
    id: 'other-post-1',
    title: 'Other Post 1',
    date: '2023-11-30',
    categories: ['nginx'],
    tags: ['tag2'],
    keywords: ['keyword2'],
    content: 'Content',
    excerpt: 'Other post 1 excerpt',
    readTime: '3 min read'
  },
  {
    id: 'other-post-2',
    title: 'Other Post 2',
    date: '2023-11-29',
    categories: ['regex', 'programming'],
    tags: ['tag3'],
    keywords: ['keyword3'],
    content: 'Content',
    excerpt: 'Other post 2 excerpt',
    readTime: '7 min read'
  },
  {
    id: 'other-post-3',
    title: 'Other Post 3 with a Very Long Title That Should Be Handled Properly',
    date: '2023-11-28',
    categories: ['nginx', 'security'],
    tags: ['tag4'],
    keywords: ['keyword4'],
    content: 'Content',
    excerpt: 'Other post 3 excerpt that is also quite long and should be truncated appropriately',
    readTime: '4 min read'
  },
  {
    id: 'post-with-spaces',
    title: 'Post About Personal Pivot',
    date: '2023-11-27',
    categories: ['personal pivot'],
    tags: ['life'],
    keywords: ['personal'],
    content: 'Content',
    excerpt: 'Post about personal changes',
    readTime: '6 min read'
  }
]

describe('BlogSidebar', () => {
  it('renders all main sections', () => {
    render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

    expect(screen.getByText('Other Posts')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  describe('Other Posts section', () => {
    it('excludes current post from other posts list', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      expect(screen.queryByText('Current Post Title')).not.toBeInTheDocument()
      expect(screen.getByText('Other Post 1')).toBeInTheDocument()
      expect(screen.getByText('Other Post 2')).toBeInTheDocument()
    })

    it('limits other posts to 5 items', () => {
      const manyPosts = Array.from({ length: 10 }, (_, i) => ({
        id: i === 0 ? 'current-post' : `post-${i}`,
        title: `Post ${i}`,
        date: `2023-11-${30 - i}`,
        categories: ['test'],
        tags: [],
        keywords: [],
        content: 'Content',
        excerpt: `Excerpt ${i}`,
        readTime: '2 min read'
      }))

      render(<BlogSidebar currentPostId="current-post" allPosts={manyPosts} />)

      // Should show 5 other posts (excluding current)
      const postLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.startsWith('/post-')
      )
      expect(postLinks).toHaveLength(5)
    })

    it('displays post information correctly', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      // Check post title
      expect(screen.getByText('Other Post 1')).toBeInTheDocument()
      
      // Check excerpt
      expect(screen.getByText('Other post 1 excerpt')).toBeInTheDocument()
      
      // Check read time
      expect(screen.getByText('3 min read')).toBeInTheDocument()
      
      // Check categories
      expect(screen.getByText('nginx')).toBeInTheDocument()
    })

    it('creates correct links for other posts', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      const post1Link = screen.getByText('Other Post 1').closest('a')
      expect(post1Link).toHaveAttribute('href', '/other-post-1')

      const post2Link = screen.getByText('Other Post 2').closest('a')
      expect(post2Link).toHaveAttribute('href', '/other-post-2')
    })

    it('displays "View all posts" link', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      const viewAllLink = screen.getByRole('link', { name: /View all posts/ })
      expect(viewAllLink).toHaveAttribute('href', '/')
    })

    it('handles posts with multiple categories', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      // Other Post 2 has categories: ['regex', 'programming']
      expect(screen.getByText('regex')).toBeInTheDocument()
      expect(screen.getByText('programming')).toBeInTheDocument()
    })
  })

  describe('Categories section', () => {
    it('displays categories with correct counts', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      // nginx appears in 3 posts (current-post, other-post-1, other-post-3)
      const nginxCount = screen.getByText('3')
      expect(nginxCount).toBeInTheDocument()
      expect(nginxCount.closest('a')).toHaveAttribute('href', '/categories/nginx')
    })

    it('sorts categories by count (descending)', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      const categoryLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.startsWith('/categories/')
      )
      
      expect(categoryLinks.length).toBeGreaterThan(0)
      
      // nginx (count: 3) should appear before others
      const nginxLink = screen.getByText('nginx').closest('a')
      expect(nginxLink).toHaveAttribute('href', '/categories/nginx')
    })

    it('limits categories to top 5', () => {
      const postsWithManyCategories = Array.from({ length: 10 }, (_, i) => ({
        id: `post-${i}`,
        title: `Post ${i}`,
        date: `2023-11-${30 - i}`,
        categories: [`category-${i}`],
        tags: [],
        keywords: [],
        content: 'Content',
        excerpt: `Excerpt ${i}`,
        readTime: '2 min read'
      }))

      render(<BlogSidebar currentPostId="current-post" allPosts={postsWithManyCategories} />)

      const categoryLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.startsWith('/categories/')
      )
      expect(categoryLinks).toHaveLength(5)
    })

    it('handles categories with spaces in URLs', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      const personalPivotLink = screen.getByText('personal pivot').closest('a')
      expect(personalPivotLink).toHaveAttribute('href', '/categories/personal-pivot')
    })

    it('displays category counts in badges', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      const countBadges = screen.getAllByText(/^\d+$/)
      expect(countBadges.length).toBeGreaterThan(0)
      
      // Check that badges have correct styling
      countBadges.forEach(badge => {
        expect(badge).toHaveClass('text-xs', 'bg-gray-100', 'dark:bg-gray-700', 'px-2', 'py-1', 'rounded-full')
      })
    })
  })

  describe('Connect section', () => {
    it('displays social links correctly', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      const xLink = screen.getByRole('link', { name: 'Follow on X' })
      const githubLink = screen.getByRole('link', { name: 'Follow on GitHub' })

      expect(xLink).toHaveAttribute('href', '//x.com/cardoni')
      expect(xLink).toHaveAttribute('target', '_blank')
      expect(xLink).toHaveAttribute('rel', 'noopener noreferrer')

      expect(githubLink).toHaveAttribute('href', '//github.com/cardoni')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('displays connect message', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      expect(screen.getByText('Follow for more thoughts on philosophy and technology.')).toBeInTheDocument()
    })

    it('displays social platform names', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      expect(screen.getByText('X')).toBeInTheDocument()
      expect(screen.getByText('GitHub')).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('handles when current post is not in allPosts array', () => {
      render(<BlogSidebar currentPostId="non-existent-post" allPosts={mockPosts} />)

      // Should still render all posts except the "current" one that doesn't exist
      expect(screen.getByText('Current Post Title')).toBeInTheDocument()
      expect(screen.getByText('Other Post 1')).toBeInTheDocument()
    })

    it('handles empty allPosts array', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={[]} />)

      // Should render sections but with no content
      expect(screen.getByText('Other Posts')).toBeInTheDocument()
      expect(screen.getByText('Categories')).toBeInTheDocument()
      expect(screen.getByText('Connect')).toBeInTheDocument()
      
      // Should still have view all posts link
      expect(screen.getByRole('link', { name: /View all posts/ })).toBeInTheDocument()
    })

    it('handles posts with no categories', () => {
      const postsWithNoCategories: BlogPost[] = [
        {
          id: 'current-post',
          title: 'Current Post',
          date: '2023-12-01',
          categories: [],
          tags: [],
          keywords: [],
          content: 'Content',
          excerpt: 'Excerpt',
          readTime: '5 min read'
        },
        {
          id: 'other-post',
          title: 'Other Post',
          date: '2023-11-30',
          categories: [],
          tags: [],
          keywords: [],
          content: 'Content',
          excerpt: 'Other excerpt',
          readTime: '3 min read'
        }
      ]

      render(<BlogSidebar currentPostId="current-post" allPosts={postsWithNoCategories} />)

      expect(screen.getByText('Categories')).toBeInTheDocument()
      expect(screen.getByText('Other Post')).toBeInTheDocument()
    })

    it('handles posts with very long titles and excerpts', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      expect(screen.getByText('Other Post 3 with a Very Long Title That Should Be Handled Properly')).toBeInTheDocument()
      expect(screen.getByText('Other post 3 excerpt that is also quite long and should be truncated appropriately')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('uses semantic HTML elements', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      expect(screen.getByRole('complementary')).toBeInTheDocument() // aside element
      expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3) // Three section headings
    })

    it('provides proper aria labels for social links', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      expect(screen.getByLabelText('Follow on X')).toBeInTheDocument()
      expect(screen.getByLabelText('Follow on GitHub')).toBeInTheDocument()
    })

    it('ensures all interactive elements are accessible', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      const links = screen.getAllByRole('link')
      
      // All links should have meaningful text or aria-label
      links.forEach(link => {
        const hasText = link.textContent && link.textContent.trim().length > 0
        const hasAriaLabel = link.getAttribute('aria-label')
        expect(hasText || hasAriaLabel).toBeTruthy()
      })
    })
  })

  describe('responsive behavior', () => {
    it('has sticky positioning for larger screens', () => {
      const { container } = render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)
      
      const aside = container.firstChild as HTMLElement
      expect(aside).toHaveClass('lg:sticky', 'lg:top-24')
    })

    it('handles category and excerpt truncation', () => {
      render(<BlogSidebar currentPostId="current-post" allPosts={mockPosts} />)

      // Check for line-clamp classes that handle truncation
      const longTitle = screen.getByText('Other Post 3 with a Very Long Title That Should Be Handled Properly')
      expect(longTitle).toHaveClass('line-clamp-2')

      const longExcerpt = screen.getByText('Other post 3 excerpt that is also quite long and should be truncated appropriately')
      expect(longExcerpt).toHaveClass('line-clamp-2')
    })
  })
})