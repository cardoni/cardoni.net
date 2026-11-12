import { describe, it, expect } from 'vitest'
import {
  stringToSlug,
  needsRedirect,
  getCanonicalParam,
} from '@/lib/url-utils'

describe('url-utils', () => {
  describe('stringToSlug', () => {
    it('converts spaces to dashes', () => {
      expect(stringToSlug('personal pivot')).toBe('personal-pivot')
    })

    it('converts multiple spaces to single dash', () => {
      expect(stringToSlug('multiple   spaces')).toBe('multiple-spaces')
    })

    it('converts to lowercase', () => {
      expect(stringToSlug('Personal Pivot')).toBe('personal-pivot')
    })

    it('handles mixed case and spaces', () => {
      expect(stringToSlug('Web Development Tips')).toBe('web-development-tips')
    })

    it('handles strings with no spaces', () => {
      expect(stringToSlug('nginx')).toBe('nginx')
    })

    it('handles empty strings', () => {
      expect(stringToSlug('')).toBe('')
    })

    it('keeps slash-containing terms in one URL segment', () => {
      expect(stringToSlug('a/b testing')).toBe('a-b-testing')
    })
  })

  describe('needsRedirect', () => {
    it('returns true for URL-encoded spaces', () => {
      expect(needsRedirect('personal%20pivot')).toBe(true)
    })

    it('returns true for regular spaces', () => {
      expect(needsRedirect('personal pivot')).toBe(true)
    })

    it('returns false for dash format', () => {
      expect(needsRedirect('personal-pivot')).toBe(false)
    })

    it('returns false for single words', () => {
      expect(needsRedirect('nginx')).toBe(false)
    })

    it('returns true for uppercase that needs normalization', () => {
      expect(needsRedirect('Personal-Pivot')).toBe(true)
    })

    it('handles edge cases', () => {
      expect(needsRedirect('')).toBe(false)
      expect(needsRedirect('test-test')).toBe(false)
      expect(needsRedirect('Test-Test')).toBe(true)
    })
  })

  describe('getCanonicalParam', () => {
    it('returns canonical dash format for URL-encoded spaces', () => {
      expect(getCanonicalParam('personal%20pivot')).toBe('personal-pivot')
    })

    it('returns canonical dash format for regular spaces', () => {
      expect(getCanonicalParam('personal pivot')).toBe('personal-pivot')
    })

    it('normalizes case and format', () => {
      expect(getCanonicalParam('Personal%20Pivot')).toBe('personal-pivot')
    })

    it('leaves proper format unchanged', () => {
      expect(getCanonicalParam('personal-pivot')).toBe('personal-pivot')
    })

    it('handles single words', () => {
      expect(getCanonicalParam('nginx')).toBe('nginx')
    })
  })

  // Integration tests for real-world category scenarios
  describe('category URL scenarios', () => {
    const categories = ['personal pivot', 'nginx', 'regex', 'security']

    it('slugs all known categories without changing single words', () => {
      expect(categories.map(stringToSlug)).toEqual(['personal-pivot', 'nginx', 'regex', 'security'])
    })

    it('correctly identifies redirect needs for all categories', () => {
      expect(needsRedirect('personal%20pivot')).toBe(true) // needs redirect
      expect(needsRedirect('personal-pivot')).toBe(false) // canonical
      expect(needsRedirect('nginx')).toBe(false) // single word
      expect(needsRedirect('regex')).toBe(false) // single word
      expect(needsRedirect('security')).toBe(false) // single word
    })

    it('produces correct canonical URLs for all formats', () => {
      expect(getCanonicalParam('personal%20pivot')).toBe('personal-pivot')
      expect(getCanonicalParam('personal pivot')).toBe('personal-pivot')
      expect(getCanonicalParam('personal-pivot')).toBe('personal-pivot')
      expect(getCanonicalParam('nginx')).toBe('nginx')
    })
  })
})
