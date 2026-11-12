import { describe, it, expect } from 'vitest'
import {
  slugify,
  isNonCanonicalParam,
  canonicalizeParam,
} from '@/lib/url-utils'

describe('url-utils', () => {
  describe('slugify', () => {
    it('converts spaces to dashes', () => {
      expect(slugify('personal pivot')).toBe('personal-pivot')
    })

    it('converts multiple spaces to single dash', () => {
      expect(slugify('multiple   spaces')).toBe('multiple-spaces')
    })

    it('converts to lowercase', () => {
      expect(slugify('Personal Pivot')).toBe('personal-pivot')
    })

    it('handles mixed case and spaces', () => {
      expect(slugify('Web Development Tips')).toBe('web-development-tips')
    })

    it('handles strings with no spaces', () => {
      expect(slugify('nginx')).toBe('nginx')
    })

    it('handles empty strings', () => {
      expect(slugify('')).toBe('')
    })

    it('keeps slash-containing terms in one URL segment', () => {
      expect(slugify('a/b testing')).toBe('a-b-testing')
    })
  })

  describe('isNonCanonicalParam', () => {
    it('returns true for URL-encoded spaces', () => {
      expect(isNonCanonicalParam('personal%20pivot')).toBe(true)
    })

    it('returns true for regular spaces', () => {
      expect(isNonCanonicalParam('personal pivot')).toBe(true)
    })

    it('returns false for dash format', () => {
      expect(isNonCanonicalParam('personal-pivot')).toBe(false)
    })

    it('returns false for single words', () => {
      expect(isNonCanonicalParam('nginx')).toBe(false)
    })

    it('returns true for uppercase that needs normalization', () => {
      expect(isNonCanonicalParam('Personal-Pivot')).toBe(true)
    })

    it('handles edge cases', () => {
      expect(isNonCanonicalParam('')).toBe(false)
      expect(isNonCanonicalParam('test-test')).toBe(false)
      expect(isNonCanonicalParam('Test-Test')).toBe(true)
    })
  })

  describe('canonicalizeParam', () => {
    it('returns canonical dash format for URL-encoded spaces', () => {
      expect(canonicalizeParam('personal%20pivot')).toBe('personal-pivot')
    })

    it('returns canonical dash format for regular spaces', () => {
      expect(canonicalizeParam('personal pivot')).toBe('personal-pivot')
    })

    it('normalizes case and format', () => {
      expect(canonicalizeParam('Personal%20Pivot')).toBe('personal-pivot')
    })

    it('leaves proper format unchanged', () => {
      expect(canonicalizeParam('personal-pivot')).toBe('personal-pivot')
    })

    it('handles single words', () => {
      expect(canonicalizeParam('nginx')).toBe('nginx')
    })
  })

  // Integration tests for real-world category scenarios
  describe('category URL scenarios', () => {
    const categories = ['personal pivot', 'nginx', 'regex', 'security']

    it('slugs all known categories without changing single words', () => {
      expect(categories.map(slugify)).toEqual(['personal-pivot', 'nginx', 'regex', 'security'])
    })

    it('correctly identifies redirect needs for all categories', () => {
      expect(isNonCanonicalParam('personal%20pivot')).toBe(true) // needs redirect
      expect(isNonCanonicalParam('personal-pivot')).toBe(false) // canonical
      expect(isNonCanonicalParam('nginx')).toBe(false) // single word
      expect(isNonCanonicalParam('regex')).toBe(false) // single word
      expect(isNonCanonicalParam('security')).toBe(false) // single word
    })

    it('produces correct canonical URLs for all formats', () => {
      expect(canonicalizeParam('personal%20pivot')).toBe('personal-pivot')
      expect(canonicalizeParam('personal pivot')).toBe('personal-pivot')
      expect(canonicalizeParam('personal-pivot')).toBe('personal-pivot')
      expect(canonicalizeParam('nginx')).toBe('nginx')
    })
  })
})
