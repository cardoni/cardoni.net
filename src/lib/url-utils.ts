/**
 * URL normalization utilities for handling spaces and dashes in URLs
 */

/**
 * Convert a string with spaces to a URL-friendly slug with dashes
 */
export function stringToSlug(str: string): string {
  return str.replace(/\s+/g, '-').toLowerCase();
}

/**
 * Convert a slug with dashes back to a string with spaces
 */
export function slugToString(slug: string): string {
  return slug.replace(/-/g, ' ');
}

/**
 * Check if a URL parameter contains URL-encoded spaces (%20)
 */
export function hasUrlEncodedSpaces(param: string): boolean {
  return param.includes('%20') || decodeURIComponent(param).includes(' ');
}

/**
 * Normalize a URL parameter to the preferred dash format
 * Handles both %20 encoded and dash formats, returns dash format
 */
export function normalizeUrlParam(param: string): string {
  const decoded = decodeURIComponent(param);
  return stringToSlug(decoded);
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