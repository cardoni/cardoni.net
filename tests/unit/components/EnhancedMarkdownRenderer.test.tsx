import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EnhancedMarkdownRenderer from '@/components/EnhancedMarkdownRenderer'

describe('EnhancedMarkdownRenderer', () => {
  it('renders plain text content', () => {
    const content = 'This is plain text content.'
    render(<EnhancedMarkdownRenderer content={content} />)
    
    expect(screen.getByText('This is plain text content.')).toBeInTheDocument()
  })

  it('removes frontmatter from content', () => {
    const content = `---
title: Test Post
date: 2023-12-01
---
This is the actual content.`
    
    render(<EnhancedMarkdownRenderer content={content} />)
    
    expect(screen.getByText('This is the actual content.')).toBeInTheDocument()
    expect(screen.queryByText('title: Test Post')).not.toBeInTheDocument()
    expect(screen.queryByText('date: 2023-12-01')).not.toBeInTheDocument()
  })

  describe('headings', () => {
    it('renders h1 headings correctly', () => {
      const content = '# Main Heading'
      render(<EnhancedMarkdownRenderer content={content} />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Main Heading')
      expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold')
    })

    it('renders h2 headings correctly', () => {
      const content = '## Section Heading'
      render(<EnhancedMarkdownRenderer content={content} />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('Section Heading')
      expect(heading).toHaveClass('text-2xl', 'md:text-3xl', 'font-bold')
    })

    it('renders h3 through h6 headings', () => {
      const content = `### Subsection
#### Sub-subsection  
##### Small Heading
###### Smallest Heading`
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Subsection')
      expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('Sub-subsection')
      expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('Small Heading')
      expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent('Smallest Heading')
    })
  })

  describe('code blocks', () => {
    it('renders code blocks without language', () => {
      const content = `\`\`\`
console.log('hello world');
const x = 42;
\`\`\``
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      const codeElement = screen.getByText("console.log('hello world');\nconst x = 42;")
      expect(codeElement).toBeInTheDocument()
      expect(codeElement.closest('pre')).toHaveClass('bg-gray-900', 'dark:bg-gray-950', 'rounded-lg')
    })

    it('renders code blocks with language label', () => {
      const content = `\`\`\`javascript
console.log('hello world');
\`\`\``
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByText('javascript')).toBeInTheDocument()
      expect(screen.getByText("console.log('hello world');")).toBeInTheDocument()
    })

    it('handles empty code blocks', () => {
      const content = `\`\`\`bash
\`\`\``
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByText('bash')).toBeInTheDocument()
      const codeElement = screen.getByRole('group', { hidden: true }).querySelector('code')
      expect(codeElement).toHaveTextContent('')
    })
  })

  describe('lists', () => {
    it('renders unordered lists', () => {
      const content = `- First item
- Second item
- Third item`
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByText('First item')).toBeInTheDocument()
      expect(screen.getByText('Second item')).toBeInTheDocument()
      expect(screen.getByText('Third item')).toBeInTheDocument()
      
      const list = screen.getByText('First item').closest('ul')
      expect(list).toHaveClass('list-none', 'space-y-3')
    })

    it('renders ordered lists', () => {
      const content = `1. First numbered item
2. Second numbered item
3. Third numbered item`
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByText('First numbered item')).toBeInTheDocument()
      expect(screen.getByText('Second numbered item')).toBeInTheDocument()
      expect(screen.getByText('Third numbered item')).toBeInTheDocument()
      
      // Check for numbered circles
      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('handles lists with inline formatting', () => {
      const content = `- Item with **bold** text
- Item with *italic* text
- Item with \`code\``
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByText('bold')).toBeInTheDocument()
      expect(screen.getByText('italic')).toBeInTheDocument()
      expect(screen.getByText('code')).toBeInTheDocument()
    })
  })

  describe('blockquotes', () => {
    it('renders single line blockquotes', () => {
      const content = '> This is a quote'
      render(<EnhancedMarkdownRenderer content={content} />)
      
      const blockquote = screen.getByText('This is a quote').closest('blockquote')
      expect(blockquote).toBeInTheDocument()
      expect(blockquote).toHaveClass('border-l-4', 'border-gray-300', 'dark:border-gray-600')
    })

    it('renders multi-line blockquotes', () => {
      const content = `> This is a longer quote
> that spans multiple lines
> and should be joined together`
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByText('This is a longer quote that spans multiple lines and should be joined together')).toBeInTheDocument()
    })
  })

  describe('inline formatting', () => {
    it('renders bold text', () => {
      const content = 'This has **bold text** in it.'
      render(<EnhancedMarkdownRenderer content={content} />)
      
      const boldElement = screen.getByText('bold text')
      expect(boldElement).toBeInTheDocument()
      expect(boldElement.tagName).toBe('STRONG')
      expect(boldElement).toHaveClass('font-bold')
    })

    it('renders italic text', () => {
      const content = 'This has *italic text* in it.'
      render(<EnhancedMarkdownRenderer content={content} />)
      
      const italicElement = screen.getByText('italic text')
      expect(italicElement).toBeInTheDocument()
      expect(italicElement.tagName).toBe('EM')
      expect(italicElement).toHaveClass('italic')
    })

    it('renders inline code', () => {
      const content = 'Use the `npm install` command.'
      render(<EnhancedMarkdownRenderer content={content} />)
      
      const codeElement = screen.getByText('npm install')
      expect(codeElement).toBeInTheDocument()
      expect(codeElement.tagName).toBe('CODE')
      expect(codeElement).toHaveClass('bg-gray-100', 'dark:bg-gray-800', 'font-mono')
    })

    it('renders links', () => {
      const content = 'Check out [my blog](https://example.com) for more.'
      render(<EnhancedMarkdownRenderer content={content} />)
      
      const linkElement = screen.getByRole('link', { name: 'my blog' })
      expect(linkElement).toBeInTheDocument()
      expect(linkElement).toHaveAttribute('href', 'https://example.com')
      expect(linkElement).toHaveAttribute('target', '_blank')
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer')
      expect(linkElement).toHaveClass('underline', 'hover:text-gray-600')
    })

    it('handles mixed inline formatting', () => {
      const content = 'This has **bold** and *italic* and `code` and [links](https://example.com).'
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByText('bold')).toBeInTheDocument()
      expect(screen.getByText('italic')).toBeInTheDocument()
      expect(screen.getByText('code')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'links' })).toBeInTheDocument()
    })
  })

  describe('paragraphs', () => {
    it('renders multiple paragraphs', () => {
      const content = `First paragraph here.

Second paragraph here.

Third paragraph here.`
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByText('First paragraph here.')).toBeInTheDocument()
      expect(screen.getByText('Second paragraph here.')).toBeInTheDocument()
      expect(screen.getByText('Third paragraph here.')).toBeInTheDocument()
    })

    it('handles paragraphs with inline formatting', () => {
      const content = 'This paragraph has **bold**, *italic*, and `code` formatting.'
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByText('bold')).toBeInTheDocument()
      expect(screen.getByText('italic')).toBeInTheDocument()
      expect(screen.getByText('code')).toBeInTheDocument()
    })
  })

  describe('complex content', () => {
    it('renders mixed markdown content correctly', () => {
      const content = `---
title: Complex Post
---
# Main Title

This is a paragraph with **bold** text.

## Section

Here's a list:
- Item 1
- Item 2

And some code:

\`\`\`javascript
console.log('hello');
\`\`\`

> This is a blockquote.`

      render(<EnhancedMarkdownRenderer content={content} />)
      
      // Check all elements are rendered
      expect(screen.getByRole('heading', { level: 1, name: 'Main Title' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2, name: 'Section' })).toBeInTheDocument()
      expect(screen.getByText('bold')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('javascript')).toBeInTheDocument()
      expect(screen.getByText("console.log('hello');")).toBeInTheDocument()
      expect(screen.getByText('This is a blockquote.')).toBeInTheDocument()
    })

    it('handles realistic blog post content', () => {
      const content = `# Installing Homebrew on Mac OS X 10.7

Homebrew is the **missing package manager** for Mac OS X. It's written in *Ruby* and makes installing packages super easy.

## Prerequisites

Before installing Homebrew, you need:
1. Mac OS X 10.7 or later
2. Xcode command line tools

## Installation

Run this command:

\`\`\`bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
\`\`\`

> This will download and install Homebrew to /usr/local.`

      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByRole('heading', { level: 1, name: 'Installing Homebrew on Mac OS X 10.7' })).toBeInTheDocument()
      expect(screen.getByText('missing package manager')).toBeInTheDocument()
      expect(screen.getByText('Ruby')).toBeInTheDocument()
      expect(screen.getByText('Prerequisites')).toBeInTheDocument()
      expect(screen.getByText('Mac OS X 10.7 or later')).toBeInTheDocument()
      expect(screen.getByText('Xcode command line tools')).toBeInTheDocument()
      expect(screen.getByText('bash')).toBeInTheDocument()
      expect(screen.getByText('This will download and install Homebrew to /usr/local.')).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('handles empty content', () => {
      const { container } = render(<EnhancedMarkdownRenderer content="" />)
      
      const proseDiv = container.querySelector('.prose')
      expect(proseDiv).toBeInTheDocument()
      expect(proseDiv).toBeEmptyDOMElement()
    })

    it('handles content with only frontmatter', () => {
      const content = `---
title: Only Frontmatter
---`
      
      const { container } = render(<EnhancedMarkdownRenderer content={content} />)
      
      const proseDiv = container.querySelector('.prose')
      expect(proseDiv).toBeInTheDocument()
      expect(proseDiv).toBeEmptyDOMElement()
    })

    it('handles malformed markdown gracefully', () => {
      const content = `# Incomplete heading
**incomplete bold
\`incomplete code
> incomplete quote`
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      // Should still render what it can
      expect(screen.getByRole('heading', { level: 1, name: 'Incomplete heading' })).toBeInTheDocument()
      
      // The processing may transform the text, so let's check for parts
      expect(screen.getByText(/incomplete bold/)).toBeInTheDocument()
      expect(screen.getByText(/incomplete code/)).toBeInTheDocument()  
      expect(screen.getByText('incomplete quote')).toBeInTheDocument()
    })

    it('skips empty lines appropriately', () => {
      const content = `First paragraph.


Second paragraph.



Third paragraph.`
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByText('First paragraph.')).toBeInTheDocument()
      expect(screen.getByText('Second paragraph.')).toBeInTheDocument()
      expect(screen.getByText('Third paragraph.')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('uses semantic HTML elements', () => {
      const content = `# Heading
This is a paragraph.
> This is a quote`
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByText('This is a paragraph.')).toBeInTheDocument()
      expect(screen.getByRole('blockquote')).toBeInTheDocument()
    })

    it('provides proper code block structure', () => {
      const content = `\`\`\`javascript
const x = 42;
\`\`\``
      
      render(<EnhancedMarkdownRenderer content={content} />)
      
      const preElement = screen.getByText('const x = 42;').closest('pre')
      const codeElement = screen.getByText('const x = 42;')
      
      expect(preElement).toBeInTheDocument()
      expect(codeElement.tagName).toBe('CODE')
      expect(codeElement).toHaveClass('font-mono')
    })
  })
})