import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import EnhancedMarkdownRenderer from '@/components/EnhancedMarkdownRenderer';

describe('EnhancedMarkdownRenderer', () => {
  it('renders paragraphs and removes frontmatter', () => {
    const content = `---
title: Test Post
date: 2023-12-01
---
This is the actual content.`;

    render(<EnhancedMarkdownRenderer content={content} />);

    expect(screen.getByText('This is the actual content.')).toBeInTheDocument();
    expect(screen.queryByText('title: Test Post')).not.toBeInTheDocument();
  });

  it('demotes article headings so the page title remains the only h1', () => {
    render(<EnhancedMarkdownRenderer content={'# Main heading\n\n## Section heading'} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Main heading' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Section heading' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });

  it('renders semantic lists and blockquotes', () => {
    render(
      <EnhancedMarkdownRenderer
        content={'- First item\n- Second item\n\n1. First step\n2. Second step\n\n> A useful quotation.'}
      />,
    );

    expect(screen.getAllByRole('list')).toHaveLength(2);
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByRole('blockquote')).toHaveTextContent('A useful quotation.');
  });

  it('renders fenced code with language metadata', () => {
    const { container } = render(
      <EnhancedMarkdownRenderer content={'```javascript\nconst answer = 42;\n```'} />,
    );

    const code = container.querySelector('code');
    expect(code).toHaveTextContent('const answer = 42;');
    expect(code).toHaveAttribute('data-language', 'javascript');
    expect(code?.closest('pre')).toHaveClass('article-code-block');
  });

  it('renders standard inline Markdown formatting', () => {
    render(<EnhancedMarkdownRenderer content={'**bold** and *italic* with `inline code` and ~~removed~~'} />);

    expect(screen.getByText('bold').tagName).toBe('STRONG');
    expect(screen.getByText('italic').tagName).toBe('EM');
    expect(screen.getByText('inline code').tagName).toBe('CODE');
    expect(screen.getByText('removed').tagName).toBe('DEL');
  });

  it('opens external links in a separate browsing context', () => {
    render(<EnhancedMarkdownRenderer content={'Read [the source](https://example.com).'} />);

    const link = screen.getByRole('link', { name: 'the source' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('keeps internal links in the same browsing context', () => {
    render(<EnhancedMarkdownRenderer content={'Read [another essay](/another-essay).'} />);

    const link = screen.getByRole('link', { name: 'another essay' });
    expect(link).toHaveAttribute('href', '/another-essay');
    expect(link).not.toHaveAttribute('target');
  });

  it('supports author-defined hover definitions', () => {
    render(
      <EnhancedMarkdownRenderer
        content={'The Greeks called practical craft [[technē|art, craft, or practical know-how]].'}
      />,
    );

    expect(
      screen.getByLabelText('technē: art, craft, or practical know-how'),
    ).toBeInTheDocument();
  });

  it('preserves text inside legacy span markup without injecting raw HTML', () => {
    render(
      <EnhancedMarkdownRenderer
        content={'Keep <span style="text-decoration: underline">this text</span>. <script>alert(1)</script>'}
      />,
    );

    expect(screen.getByText(/Keep this text/)).toBeInTheDocument();
    expect(screen.queryByText('alert(1)')).not.toBeInTheDocument();
    expect(document.querySelector('script')).not.toBeInTheDocument();
  });

  it('renders GFM tables', () => {
    render(
      <EnhancedMarkdownRenderer
        content={'| Idea | Tool |\n| --- | --- |\n| Logic | Types |'}
      />,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Idea' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Types' })).toBeInTheDocument();
  });

  it('keeps an empty semantic wrapper for empty content', () => {
    const { container } = render(<EnhancedMarkdownRenderer content="" />);

    const wrapper = container.querySelector('.article-prose');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toBeEmptyDOMElement();
  });
});
