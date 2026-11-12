/**
 * URL normalization utilities for handling spaces and dashes in URLs
 */

/**
 * Convert a string with spaces to a URL-friendly slug with dashes
 */
export function slugify(str: string): string {
  return str
    .trim()
    .replace(/[\\/]+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

/**
 * Convert a URL parameter (raw, %20-encoded, or mixed case) to its canonical
 * dash-format slug.
 */
export function canonicalizeParam(param: string): string {
  return slugify(decodeURIComponent(param));
}

/**
 * True when a URL parameter differs from its canonical slug and should be
 * redirected, e.g. `personal%20pivot` or `Personal-Pivot`.
 */
export function isNonCanonicalParam(param: string): boolean {
  return param !== canonicalizeParam(param);
}
