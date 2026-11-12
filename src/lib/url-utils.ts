/**
 * URL normalization utilities for handling spaces and dashes in URLs
 */

/**
 * Convert a string with spaces to a URL-friendly slug with dashes
 */
export function stringToSlug(str: string): string {
  return str
    .trim()
    .replace(/[\\/]+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

/**
 * Check if a URL parameter needs to be redirected to the canonical dash format
 */
export function needsRedirect(param: string): boolean {
  const decoded = decodeURIComponent(param);
  const normalized = stringToSlug(decoded);
  
  // If the parameter contains %20 or spaces, it needs redirect
  if (param.includes('%20') || decoded.includes(' ')) {
    return true;
  }
  
  // If it doesn't match the normalized version, it needs redirect
  return param !== normalized;
}

/**
 * Get the canonical URL for a parameter (dash format)
 */
export function getCanonicalParam(param: string): string {
  const decoded = decodeURIComponent(param);
  return stringToSlug(decoded);
}
