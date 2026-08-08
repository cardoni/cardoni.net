import { describe, expect, it } from 'vitest';
import {
  SITE_URL,
  SOCIAL_IMAGE_ORIGIN,
  SOCIAL_IMAGE_VERSION,
  absoluteUrl,
  buildPageMetadata,
  legacyDisqusThreadUrl,
  metadataImage,
  siteConfig,
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

  it('builds matching absolute canonical and Open Graph URLs', () => {
    const metadata = buildPageMetadata({
      title: 'Heroku',
      openGraphTitle: 'Heroku writing by Greg Cardoni',
      description: 'Essays tagged Heroku.',
      pathname: '/tag/heroku',
      keywords: ['heroku'],
    });

    expect(metadata.alternates?.canonical).toBe('https://cardoni.net/tag/heroku');
    expect(metadata.openGraph).toMatchObject({
      url: 'https://cardoni.net/tag/heroku',
      siteName: siteConfig.name,
      locale: siteConfig.openGraphLocale,
      type: 'website',
    });
    expect(metadata.twitter).toMatchObject({
      site: siteConfig.author.handle,
      creator: siteConfig.author.handle,
    });
    expect(metadata.keywords).toContain('heroku');
    expect(metadata.keywords).toContain('Greg Cardoni');
  });

  it('includes article-specific Open Graph metadata', () => {
    const metadata = buildPageMetadata({
      title: 'An essay',
      openGraphTitle: 'An essay',
      description: 'An essay description.',
      pathname: '/an-essay',
      article: {
        publishedTime: '2026-01-01T00:00:00.000Z',
        modifiedTime: '2026-01-02T00:00:00.000Z',
        authors: [siteConfig.author.url],
        section: 'technology',
        tags: ['systems'],
      },
    });

    expect(metadata.openGraph).toMatchObject({
      type: 'article',
      publishedTime: '2026-01-01T00:00:00.000Z',
      modifiedTime: '2026-01-02T00:00:00.000Z',
      section: 'technology',
      tags: ['systems'],
    });
  });

  it('sets the correct social image MIME type', () => {
    expect(metadataImage('/images/card.jpg', 'JPEG card').type).toBe('image/jpeg');
    expect(metadataImage('/images/card.webp', 'WebP card').type).toBe('image/webp');
    expect(metadataImage('/an-essay/opengraph-image', 'Generated card').type).toBe('image/png');
  });
});
