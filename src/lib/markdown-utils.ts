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
 * Strip markdown formatting from text to create clean excerpts
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
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up multiple whitespace
    .replace(/\s+/g, ' ')
    // Remove leading/trailing whitespace
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
 * Output is HTML-escaped except for the allowed tags.
 */
export function renderInlineMarkdown(text: string): string {
  const stripped = text
    // Remove frontmatter
    .replace(/^---[\s\S]*?---\n?/g, '')
    // Remove fenced code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic (keep text)
    .replace(/\*{1,2}([^*]+)\*{1,2}/g, '$1')
    // Remove inline code (keep text)
    .replace(/`([^`]+)`/g, '$1')
    // Remove images (keep alt text)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/!\[[^\]]*\]/g, '')
    // Remove links (keep link text)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Clean up whitespace
    .replace(/\s+/g, ' ')
    .trim();

  // Now render strikethrough safely:
  // 1. Split on strikethrough pattern
  // 2. Escape all parts
  // 3. Wrap strikethrough content in <del> tags
  const parts: string[] = [];
  let lastIndex = 0;
  const strikethroughRegex = /~~([^~]+)~~/g;
  let match;

  while ((match = strikethroughRegex.exec(stripped)) !== null) {
    // Add escaped text before this match
    if (match.index > lastIndex) {
      parts.push(escapeHtml(stripped.slice(lastIndex, match.index)));
    }
    // Add the strikethrough content wrapped in <del>
    parts.push(`<del>${escapeHtml(match[1])}</del>`);
    lastIndex = strikethroughRegex.lastIndex;
  }

  // Add any remaining text after the last match
  if (lastIndex < stripped.length) {
    parts.push(escapeHtml(stripped.slice(lastIndex)));
  }

  return parts.join('');
}

/**
 * Generate an HTML excerpt from markdown content for display in decks/cards.
 * Renders strikethrough as <del> tags; strips all other markdown.
 */
export function generateExcerptHtml(content: string, maxLength: number = 150): string {
  const rendered = renderInlineMarkdown(content);
  
  // Calculate length without HTML tags for truncation
  const textOnly = rendered.replace(/<[^>]+>/g, '');
  
  if (textOnly.length <= maxLength) {
    return rendered;
  }

  // Need to truncate while preserving HTML tags
  let textLength = 0;
  let result = '';
  let inTag = false;
  let currentTag = '';
  const openTags: string[] = [];

  for (let i = 0; i < rendered.length; i++) {
    const char = rendered[i];

    if (char === '<') {
      inTag = true;
      currentTag = '<';
      continue;
    }

    if (inTag) {
      currentTag += char;
      if (char === '>') {
        inTag = false;
        result += currentTag;
        // Track open/close tags
        if (currentTag.startsWith('</')) {
          openTags.pop();
        } else if (!currentTag.endsWith('/>')) {
          const tagName = currentTag.match(/<(\w+)/)?.[1];
          if (tagName) {
            openTags.push(tagName);
          }
        }
        currentTag = '';
      }
      continue;
    }

    textLength++;
    result += char;

    if (textLength >= maxLength) {
      // Try to break at word boundary
      const lastSpace = result.lastIndexOf(' ');
      if (lastSpace > result.length * 0.8) {
        result = result.slice(0, lastSpace).trimEnd();
      }
      result += ' ...';
      break;
    }
  }

  // Close any open tags
  while (openTags.length > 0) {
    const tag = openTags.pop();
    result += `</${tag}>`;
  }

  return result;
}
