import { describe, expect, it } from 'vitest';
import {
  SITE_URL,
  SOCIAL_IMAGE_ORIGIN,
  SOCIAL_IMAGE_VERSION,
  absoluteUrl,
  legacyDisqusThreadUrl,
  versionedSocialImageUrl,
} from '@/lib/site';

describe('site URL helpers', () => {
  it('keeps canonical URLs on cardoni.net', () => {
    expect(absoluteUrl('/an-essay')).toBe('https://cardoni.net/an-essay');
  });

  it('serves versioned social images from the canonical domain', () => {
    expect(SOCIAL_IMAGE_ORIGIN).toBe(SITE_URL);
    expect(versionedSocialImageUrl('/an-essay/opengraph-image')).toBe(
      `${SOCIAL_IMAGE_ORIGIN}/an-essay/opengraph-image?v=${SOCIAL_IMAGE_VERSION}`,
    );
  });

  it('replaces an existing image version', () => {
    expect(versionedSocialImageUrl('/images/editorial-hero.jpg?v=old')).toBe(
      `${SOCIAL_IMAGE_ORIGIN}/images/editorial-hero.jpg?v=${SOCIAL_IMAGE_VERSION}`,
    );
  });

  it('preserves the trailing-slash URL used by historical Disqus threads', () => {
    expect(legacyDisqusThreadUrl('an-essay')).toBe('https://cardoni.net/an-essay/');
  });
});
