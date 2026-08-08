export const SITE_URL = 'https://cardoni.net';
export const SOCIAL_IMAGE_ORIGIN = 'https://cardoninet.vercel.app';
export const SOCIAL_IMAGE_VERSION = '2026-08-07.1';
export const DISQUS_SHORTNAME = 'cardoni';

export function versionedSocialImageUrl(pathname: string) {
  const url = new URL(pathname, SOCIAL_IMAGE_ORIGIN);
  url.searchParams.set('v', SOCIAL_IMAGE_VERSION);
  return url.toString();
}

export function legacyDisqusThreadUrl(slug: string) {
  return `${SITE_URL}/${slug}/`;
}

export const siteConfig = {
  name: 'Cardoni.net',
  title: 'Greg Cardoni — Technology & Philosophy',
  description:
    'Essays by Greg Cardoni on software, technology, philosophy, and the ideas that connect them.',
  feed: {
    title: 'Cardoni.net — Essays by Greg Cardoni',
    url: `${SITE_URL}/atom.xml`,
  },
  author: {
    name: 'Greg Cardoni',
    email: 'greg@cardoni.net',
    url: `${SITE_URL}/about`,
    id: `${SITE_URL}/#greg-cardoni`,
    handle: '@cardoni',
    sameAs: [
      'https://github.com/cardoni',
      'https://x.com/cardoni',
      'https://www.linkedin.com/in/cardoni',
    ],
  },
  socialImage: {
    url: versionedSocialImageUrl('/images/editorial-hero.jpg'),
    width: 1200,
    height: 630,
    alt: 'Abstract editorial collage connecting classical geometry, architecture, and computational systems.',
    type: 'image/jpeg',
  },
} as const;

export function absoluteUrl(pathname = '/') {
  return new URL(pathname, SITE_URL).toString();
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
