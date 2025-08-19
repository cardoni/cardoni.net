import { describe, it, expect } from 'vitest'
import { stripMarkdown, generateExcerpt } from '@/lib/markdown-utils'

describe('markdown-utils', () => {
  describe('stripMarkdown', () => {
    it('removes frontmatter', () => {
      const input = `---
title: Test Post
date: 2023-01-01
---
This is content`
      expect(stripMarkdown(input)).toBe('This is content')
    })

    it('removes headers of all levels', () => {
      const input = `# H1 Header
## H2 Header
### H3 Header
#### H4 Header
##### H5 Header
###### H6 Header`
      expect(stripMarkdown(input)).toBe('H1 Header H2 Header H3 Header H4 Header H5 Header H6 Header')
    })

    it('removes bold and italic formatting', () => {
      expect(stripMarkdown('This is **bold** and *italic* text')).toBe('This is bold and italic text')
      expect(stripMarkdown('This is ***bold italic*** text')).toBe('This is *bold italic* text')
    })

    it('removes inline code', () => {
      expect(stripMarkdown('Use the `npm install` command')).toBe('Use the npm install command')
    })

    it('removes code blocks', () => {
      const input = `Here's some code:

\`\`\`javascript
console.log('hello');
\`\`\`

And more text`
      const result = stripMarkdown(input)
      expect(result).toContain("Here's some code:")
      expect(result).toContain("And more text")
      expect(result).not.toContain('```')
      expect(result).not.toContain('console.log')
    })

    it('removes links but keeps link text', () => {
      expect(stripMarkdown('Check out [my blog](https://example.com)')).toBe('Check out my blog')
    })

    it('removes images but keeps alt text', () => {
      expect(stripMarkdown('![Screenshot](image.png)')).toBe('Screenshot')
      expect(stripMarkdown('![](image.png)')).toBe('')
    })

    it('removes blockquotes', () => {
      const input = `> This is a quote
> with multiple lines
Regular text`
      expect(stripMarkdown(input)).toBe('This is a quote with multiple lines Regular text')
    })

    it('removes list markers', () => {
      const input = `- Item 1
- Item 2
1. Numbered item
2. Another numbered item`
      expect(stripMarkdown(input)).toBe('Item 1 Item 2 Numbered item Another numbered item')
    })

    it('removes HTML tags', () => {
      expect(stripMarkdown('This is <strong>bold</strong> text')).toBe('This is bold text')
      expect(stripMarkdown('<div class="test">Content</div>')).toBe('Content')
    })

    it('normalizes whitespace', () => {
      expect(stripMarkdown('Multiple    spaces\n\nand   newlines')).toBe('Multiple spaces and newlines')
    })

    it('handles complex markdown content', () => {
      const input = `---
title: Complex Post
---
# Main Title

This is a **complex** post with *formatting*. Here's some code:

\`\`\`bash
npm install express
\`\`\`

And a [link to Google](https://google.com).

> This is a blockquote with important information.

## List of items:
- First item
- Second item with \`inline code\`

![Image description](image.jpg)`

      const result = stripMarkdown(input)
      expect(result).toContain('Main Title')
      expect(result).toContain('complex post with formatting')
      expect(result).toContain('link to Google')
      expect(result).toContain('blockquote with important information')
      expect(result).toContain('First item')
      expect(result).toContain('inline code')
      expect(result).toContain('Image description')
      expect(result).not.toContain('```')
      expect(result).not.toContain('npm install')
      expect(result).not.toContain('**')
      expect(result).not.toContain('https://')
    })

    it('handles empty strings', () => {
      expect(stripMarkdown('')).toBe('')
    })

    it('handles strings with no markdown', () => {
      expect(stripMarkdown('Plain text content')).toBe('Plain text content')
    })
  })

  describe('generateExcerpt', () => {
    it('returns full text if under max length', () => {
      const input = 'Short text'
      expect(generateExcerpt(input, 150)).toBe('Short text')
    })

    it('truncates at word boundary when possible', () => {
      const input = 'This is a longer piece of text that needs to be truncated at a reasonable point'
      const result = generateExcerpt(input, 50)
      expect(result).toMatch(/\.\.\.$/)
      expect(result.length).toBeLessThanOrEqual(53) // 50 + '...'
      expect(result.endsWith(' ...')).toBe(true) // Should break at word boundary
    })

    it('hard truncates if no good word boundary', () => {
      const input = 'Verylongwordwithoutspacesorbreaksthatcannotbetruncatedatwordboundary'
      const result = generateExcerpt(input, 30)
      expect(result).toBe('Verylongwordwithoutspacesorbre...')
    })

    it('strips markdown before generating excerpt', () => {
      const input = `---
title: Test
---
# Header
This is **bold** text with \`code\` and [links](url).`
      const result = generateExcerpt(input, 50)
      expect(result).toBe('Header This is bold text with code and links.')
    })

    it('handles content exactly at max length', () => {
      const input = 'A'.repeat(150)
      expect(generateExcerpt(input, 150)).toBe(input)
    })

    it('uses default max length of 150', () => {
      const input = 'A'.repeat(200)
      const result = generateExcerpt(input)
      expect(result.length).toBeLessThanOrEqual(153) // 150 + '...'
    })

    it('handles real blog post content', () => {
      const input = `---
title: Installing Homebrew on Mac OS X
date: 2013-03-15
categories:
  - nginx
---

# Installing Homebrew on Mac OS X 10.7

Homebrew is a **package manager** for Mac OS X that makes installing software much easier.

## Installation Steps

First, you need to install Xcode from the App Store.

\`\`\`bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
\`\`\`

This will download and install Homebrew on your system.`

      const result = generateExcerpt(input, 100)
      expect(result).toMatch(/^Installing Homebrew on Mac OS X 10\.7/)
      expect(result).toMatch(/\.\.\.$/)
      expect(result.length).toBeLessThanOrEqual(103)
      expect(result).not.toContain('```')
      expect(result).not.toContain('**')
      expect(result).not.toContain('#')
    })

    it('handles empty content', () => {
      expect(generateExcerpt('', 150)).toBe('')
    })

    it('handles whitespace-only content', () => {
      expect(generateExcerpt('   \n\n   ', 150)).toBe('')
    })
  })

  // Integration tests
  describe('integration scenarios', () => {
    it('processes typical blog post frontmatter and content', () => {
      const blogPost = `---
title: Getting Started with Next.js
date: 2023-12-01
categories:
  - web development
  - react
tags:
  - nextjs
  - tutorial
---

# Getting Started with Next.js

Next.js is a **powerful** React framework that makes building web applications easier. In this post, we'll explore:

- Setting up a new project
- Understanding the file structure
- Creating your first page

## Installation

First, create a new Next.js app:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

This will start the development server on [http://localhost:3000](http://localhost:3000).`

      const excerpt = generateExcerpt(blogPost, 100)
      
      // Should start with the main content, not frontmatter
      expect(excerpt).toMatch(/^Getting Started with Next\.js/)
      
      // Should be clean of markdown
      expect(excerpt).not.toContain('#')
      expect(excerpt).not.toContain('**')
      expect(excerpt).not.toContain('```')
      expect(excerpt).not.toContain('[')
      
      // Should end with ellipsis due to length
      expect(excerpt).toMatch(/\.\.\.$/)
      
      // Should be within length limit
      expect(excerpt.length).toBeLessThanOrEqual(103)
    })
  })
})