/**
 * Utility functions for processing markdown content
 */

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Decode HTML entities back to characters for length calculation
 */
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&');
}

/**
 * Strip markdown formatting from text to create clean excerpts.
 * Note: This function handles MDX content which doesn't contain raw HTML.
 * Any HTML-like syntax in MDX is JSX components processed separately.
 */
export function stripMarkdown(text: string): string {
  return text
    // Remove frontmatter
    .replace(/^---[\s\S]*?---\n?/g, '')
    // Remove fenced code blocks before processing inline code
    .replace(/```[\s\S]*?```/g, '')
    // Remove headers (# ## ### etc)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic (**text** *text*)
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
    // Remove strikethrough (~~text~~)
    .replace(/~~([^~]+)~~/g, '$1')
    // Remove inline code (`code`)
    .replace(/`([^`]+)`/g, '$1')
    // Remove images before links so the leading ! is not left behind
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/!\[[^\]]*\]/g, '') // Remove any remaining ![...]
    // Remove links ([text](url))
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove blockquotes (> text)
    .replace(/^>\s+/gm, '')
    // Remove list markers (- item, 1. item)
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Clean up multiple whitespace and trim
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generate a clean excerpt from markdown content
 */
export function generateExcerpt(content: string, maxLength: number = 150): string {
  const cleanText = stripMarkdown(content);
  
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  // Try to break at word boundary
  const truncated = cleanText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > maxLength * 0.8) {
    return `${truncated.substring(0, lastSpace).trimEnd()} ...`;
  }
  
  return truncated + '...';
}

/**
 * Render inline markdown to safe HTML for display in excerpts/decks.
 * Only renders strikethrough; all other markdown is stripped to plain text.
 * HTML is escaped FIRST to prevent XSS, then markdown is processed.
 */
export function renderInlineMarkdown(text: string): string {
  // SECURITY: Escape HTML first, before any other processing.
  // This ensures no malicious HTML can survive, regardless of markdown processing.
  const escaped = escapeHtml(text);

  const withoutMarkdown = escaped
    // Remove frontmatter (escaped --- becomes ---)
    .replace(/^---[\s\S]*?---\n?/g, '')
    // Remove fenced code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic (keep text)
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
    // Remove inline code (keep text)
    .replace(/`([^`]+)`/g, '$1')
    // Remove images (keep alt text) - note: [] and () are not escaped
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/!\[[^\]]*\]/g, '')
    // Remove links (keep link text)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove blockquotes
    .replace(/^&gt;\s+/gm, '') // > is now &gt;
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Clean up whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Now render strikethrough: ~~ is not affected by HTML escaping
  // Replace ~~text~~ with <del>text</del>
  return withoutMarkdown.replace(/~~([^~]+)~~/g, '<del>$1</del>');
}

/**
 * Generate an HTML excerpt from markdown content for display in decks/cards.
 * Renders strikethrough as <del> tags; strips all other markdown.
 */
export function generateExcerptHtml(content: string, maxLength: number = 150): string {
  const rendered = renderInlineMarkdown(content);
  
  // Calculate visual length (decode entities, strip tags)
  const textOnly = decodeHtmlEntities(rendered.replace(/<[^>]+>/g, ''));
  
  if (textOnly.length <= maxLength) {
    return rendered;
  }

  // Truncate while preserving HTML tags and counting entities as single chars
  let visualLength = 0;
  let result = '';
  let i = 0;
  const openTags: string[] = [];

  while (i < rendered.length && visualLength < maxLength) {
    const char = rendered[i];

    // Handle HTML tags
    if (char === '<') {
      const tagEnd = rendered.indexOf('>', i);
      if (tagEnd !== -1) {
        const tag = rendered.slice(i, tagEnd + 1);
        result += tag;
        // Track open/close tags
        if (tag.startsWith('</')) {
          openTags.pop();
        } else if (!tag.endsWith('/>')) {
          const tagName = tag.match(/<(\w+)/)?.[1];
          if (tagName) {
            openTags.push(tagName);
          }
        }
        i = tagEnd + 1;
        continue;
      }
    }

    // Handle HTML entities (count as 1 visual character)
    if (char === '&') {
      const entityEnd = rendered.indexOf(';', i);
      if (entityEnd !== -1 && entityEnd - i <= 8) {
        const entity = rendered.slice(i, entityEnd + 1);
        result += entity;
        visualLength++;
        i = entityEnd + 1;
        continue;
      }
    }

    // Regular character
    result += char;
    visualLength++;
    i++;
  }

  // Truncated - try to break at word boundary
  if (visualLength >= maxLength) {
    const lastSpace = result.lastIndexOf(' ');
    if (lastSpace > result.length * 0.7) {
      result = result.slice(0, lastSpace).trimEnd();
    }
    result += ' ...';
  }

  // Close any open tags
  while (openTags.length > 0) {
    const tag = openTags.pop();
    result += `</${tag}>`;
  }

  return result;
}
