/**
 * Utility functions for processing markdown content
 */

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
