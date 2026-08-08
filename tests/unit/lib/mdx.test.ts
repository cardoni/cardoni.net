import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'fs'
import path from 'path'

// Mock the markdown-utils module
vi.mock('@/lib/markdown-utils', () => ({
  generateExcerpt: vi.fn((content: string, length: number) => {
    // Simple mock implementation
    const clean = content.replace(/[#*`]/g, '').trim()
    return clean.length > length ? clean.substring(0, length) + '...' : clean
  })
}))

// Mock fs to control file system operations
vi.mock('fs')
vi.mock('path')

const mockFs = vi.mocked(fs)
const mockPath = vi.mocked(path)

// Import after mocking
import { getAllPosts, getPostById, getPostsByCategory, getAllCategories } from '@/lib/mdx'

describe('mdx', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Mock path.join to return predictable paths
    mockPath.join.mockImplementation((...args) => args.filter(Boolean).join('/'))
    
    // Mock process.cwd()
    vi.spyOn(process, 'cwd').mockReturnValue('/mock/project')
  })

  describe('getAllPosts', () => {
    it('reads and processes MDX files correctly', async () => {
      const mockFileContent = `---
title: Test Post
date: 2023-12-01
categories:
  - test
tags:
  - sample
keywords:
  - testing
---

# Test Content

This is a test post with **bold** text.`

      mockFs.readdirSync.mockReturnValue(['test-post.mdx', 'another-post.mdx', 'not-mdx.txt'] as any)
      mockFs.readFileSync.mockReturnValue(mockFileContent)

      const posts = await getAllPosts()

      expect(mockFs.readdirSync).toHaveBeenCalled()
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(2) // Only MDX files
      expect(posts).toHaveLength(2)
      
      const post = posts[0]
      expect(post.id).toBe('test-post')
      expect(post.title).toBe('Test Post')
      expect(post.categories).toEqual(['test'])
      expect(post.tags).toEqual(['sample'])
      expect(post.keywords).toEqual(['testing'])
      expect(post.date).toBe('2023-12-01')
      expect(post.content).toContain('This is a test post')
      expect(post.excerpt).toBeDefined()
      expect(post.readTime).toMatch(/\d+ min read/)
    })

    it('handles posts with missing optional fields', async () => {
      const mockFileContent = `---
title: Minimal Post
date: 2023-12-01
---

Basic content here.`

      mockFs.readdirSync.mockReturnValue(['minimal.mdx'] as any)
      mockFs.readFileSync.mockReturnValue(mockFileContent)

      const posts = await getAllPosts()
      const post = posts[0]

      expect(post.tags).toEqual([])
      expect(post.categories).toEqual([])
      expect(post.keywords).toEqual([])
    })

    it('sorts posts by date in descending order', async () => {
      mockFs.readdirSync.mockReturnValue(['old.mdx', 'new.mdx'] as any)
      
      let callCount = 0
      mockFs.readFileSync.mockImplementation(() => {
        callCount++
        if (callCount === 1) {
          return `---
title: Old Post
date: 2023-01-01
---
Old content`
        } else {
          return `---
title: New Post
date: 2023-12-01
---
New content`
        }
      })

      const posts = await getAllPosts()

      expect(posts[0].title).toBe('New Post')
      expect(posts[1].title).toBe('Old Post')
    })

    it('calculates read time based on word count', async () => {
      const longContent = 'word '.repeat(1000) // 1000 words
      const mockFileContent = `---
title: Long Post
date: 2023-12-01
---

${longContent}`

      mockFs.readdirSync.mockReturnValue(['long.mdx'] as any)
      mockFs.readFileSync.mockReturnValue(mockFileContent)

      const posts = await getAllPosts()
      const post = posts[0]

      // 1000+ words (including frontmatter) / 200 words per minute = ~6 minutes
      expect(post.readTime).toBe('6 min read')
    })

    it('filters out non-MDX files', async () => {
      mockFs.readdirSync.mockReturnValue([
        'post1.mdx',
        'post2.md',
        'image.jpg',
        'post3.mdx',
        'readme.txt'
      ] as any)
      
      mockFs.readFileSync.mockReturnValue(`---
title: Test
date: 2023-12-01
---
Content`)

      const posts = await getAllPosts()

      expect(posts).toHaveLength(2) // Only MDX files processed
      expect(mockFs.readFileSync).toHaveBeenCalledTimes(2)
    })
  })

  describe('getPostById', () => {
    it('returns post with matching ID', async () => {
      mockFs.readdirSync.mockReturnValue(['target-post.mdx', 'other-post.mdx'] as any)
      
      let callCount = 0
      mockFs.readFileSync.mockImplementation(() => {
        callCount++
        if (callCount === 1) {
          return `---
title: Target Post
date: 2023-12-01
---
Target content`
        } else {
          return `---
title: Other Post
date: 2023-11-01
---
Other content`
        }
      })

      const post = await getPostById('target-post')

      expect(post).toBeTruthy()
      expect(post?.title).toBe('Target Post')
      expect(post?.id).toBe('target-post')
    })

    it('returns null for non-existent post', async () => {
      mockFs.readdirSync.mockReturnValue(['existing-post.mdx'] as any)
      mockFs.readFileSync.mockReturnValue(`---
title: Existing Post
date: 2023-12-01
---
Content`)

      const post = await getPostById('non-existent')

      expect(post).toBeNull()
    })
  })

  describe('getPostsByCategory', () => {
    it('returns posts with matching category', async () => {
      mockFs.readdirSync.mockReturnValue(['post1.mdx', 'post2.mdx', 'post3.mdx'] as any)
      
      let callCount = 0
      mockFs.readFileSync.mockImplementation(() => {
        callCount++
        switch (callCount) {
          case 1:
            return `---
title: Post 1
date: 2023-12-01
categories: [test, example]
---
Content 1`
          case 2:
            return `---
title: Post 2
date: 2023-11-01
categories: [other]
---
Content 2`
          case 3:
            return `---
title: Post 3
date: 2023-10-01
categories: [test]
---
Content 3`
          default:
            return ''
        }
      })

      const posts = await getPostsByCategory('test')

      expect(posts).toHaveLength(2)
      expect(posts[0].title).toBe('Post 1') // Most recent first
      expect(posts[1].title).toBe('Post 3')
    })

    it('returns empty array for non-existent category', async () => {
      mockFs.readdirSync.mockReturnValue(['post1.mdx'] as any)
      mockFs.readFileSync.mockReturnValue(`---
title: Post 1
date: 2023-12-01
categories: [other]
---
Content`)

      const posts = await getPostsByCategory('non-existent')

      expect(posts).toEqual([])
    })
  })

  describe('getAllCategories', () => {
    it('returns unique categories from all posts', async () => {
      mockFs.readdirSync.mockReturnValue(['post1.mdx', 'post2.mdx'] as any)
      
      let callCount = 0
      mockFs.readFileSync.mockImplementation(() => {
        callCount++
        if (callCount === 1) {
          return `---
title: Post 1
date: 2023-12-01
categories: [web, javascript, react]
---
Content 1`
        } else {
          return `---
title: Post 2
date: 2023-11-01
categories: [web, python]
---
Content 2`
        }
      })

      const categories = await getAllCategories()

      expect(categories).toEqual(['javascript', 'python', 'react', 'web']) // Sorted alphabetically
      expect(categories).toHaveLength(4)
    })

    it('handles posts with no categories', async () => {
      mockFs.readdirSync.mockReturnValue(['post1.mdx', 'post2.mdx'] as any)
      
      let callCount = 0
      mockFs.readFileSync.mockImplementation(() => {
        callCount++
        if (callCount === 1) {
          return `---
title: Post 1
date: 2023-12-01
categories: [test]
---
Content 1`
        } else {
          return `---
title: Post 2
date: 2023-11-01
---
Content 2`
        }
      })

      const categories = await getAllCategories()

      expect(categories).toEqual(['test'])
    })

    it('returns empty array when no posts exist', async () => {
      mockFs.readdirSync.mockReturnValue([] as any)

      const categories = await getAllCategories()

      expect(categories).toEqual([])
    })
  })

  // Integration test scenarios
  describe('integration scenarios', () => {
    it('handles real-world blog post structure', async () => {
      const realPostContent = `---
title: Installing Homebrew on Mac OS X 10.7
date: 2013-03-15
categories:
  - nginx
tags:
  - homebrew
  - installation
  - mac
keywords:
  - homebrew install
  - mac package manager
---

# Installing Homebrew on Mac OS X 10.7

Homebrew is the missing package manager for Mac OS X. It's written in **Ruby** and makes installing packages super easy.

## Prerequisites

Before installing Homebrew, you need:
- Mac OS X 10.7 or later
- Xcode command line tools

\`\`\`bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
\`\`\`

This will download and install Homebrew to \`/usr/local\`.`

      mockFs.readdirSync.mockReturnValue(['homebrew-install.mdx'] as any)
      mockFs.readFileSync.mockReturnValue(realPostContent)

      const posts = await getAllPosts()
      const post = posts[0]

      expect(post.id).toBe('homebrew-install')
      expect(post.title).toBe('Installing Homebrew on Mac OS X 10.7')
      expect(post.categories).toEqual(['nginx'])
      expect(post.tags).toEqual(['homebrew', 'installation', 'mac'])
      expect(post.keywords).toEqual(['homebrew install', 'mac package manager'])
      expect(post.content).toContain('missing package manager')
      expect(post.excerpt).toBeDefined()
      expect(post.readTime).toMatch(/\d+ min read/)
    })
  })
})