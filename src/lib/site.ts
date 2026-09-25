import type { Metadata } from 'next';

export const SITE_URL = 'https://cardoni.net';
export const SOCIAL_IMAGE_ORIGIN = SITE_URL;
export const SOCIAL_IMAGE_VERSION = '2026-08-08.1';
export const SITE_LAST_MODIFIED = '2026-08-08';
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
  locale: 'en-US',
  openGraphLocale: 'en_US',
  description:
    'Essays by Greg Cardoni on software engineering, technology, philosophy, and the human questions behind the tools we build. New notes on craft and ideas.',
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

interface SocialImageMetadata {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
}

interface ArticleMetadata {
  publishedTime: string;
  modifiedTime: string;
  authors: string[];
  section?: string;
  tags: string[];
}

interface PageMetadataOptions {
  title: NonNullable<Metadata['title']>;
  openGraphTitle: string;
  description: string;
  pathname: string;
  robots?: Metadata['robots'];
  image?: SocialImageMetadata;
  article?: ArticleMetadata;
  profile?: ProfileMetadata;
}

interface ProfileMetadata {
  firstName?: string;
  lastName?: string;
  username?: string;
}

const SOCIAL_IMAGE_MIME_TYPES: Record<string, string> = {
  avif: 'image/avif',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

export function metadataImage(pathname: string, alt: string): SocialImageMetadata {
  const extension = pathname.split(/[?#]/, 1)[0].split('.').pop()?.toLowerCase();
  const type = SOCIAL_IMAGE_MIME_TYPES[extension || ''] || 'image/png';

  return {
    url: versionedSocialImageUrl(pathname),
    width: 1200,
    height: 630,
    alt,
    type,
  };
}

export function buildPageMetadata({
  title,
  openGraphTitle,
  description,
  pathname,
  robots,
  image = siteConfig.socialImage,
  article,
  profile,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(pathname);
  const openGraph: Metadata['openGraph'] = {
    title: openGraphTitle,
    description,
    url: canonicalUrl,
    siteName: siteConfig.name,
    locale: siteConfig.openGraphLocale,
    images: [image],
    ...(article
      ? {
          type: 'article' as const,
          publishedTime: article.publishedTime,
          modifiedTime: article.modifiedTime,
          authors: article.authors,
          section: article.section,
          tags: article.tags,
        }
      : profile
        ? {
            type: 'profile' as const,
            firstName: profile.firstName,
            lastName: profile.lastName,
            username: profile.username,
          }
        : { type: 'website' as const }),
  };

  return {
    title,
    description,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    robots,
    alternates: {
      canonical: canonicalUrl,
      types: { 'application/atom+xml': siteConfig.feed.url },
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.author.handle,
      creator: siteConfig.author.handle,
      title: openGraphTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
