import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { SITE_LAST_MODIFIED, SITE_URL, versionedSocialImageUrl } from '@/lib/site';
import { getTaxonomyTerms } from '@/lib/taxonomy';

function latestArchiveDate(posts: Awaited<ReturnType<typeof getAllPosts>>): Date {
  return new Date(Math.max(
    new Date(SITE_LAST_MODIFIED).getTime(),
    ...posts.map((post) => new Date(post.updated || post.date).getTime()),
  ));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const categories = getTaxonomyTerms(posts, 'category');
  const tags = getTaxonomyTerms(posts, 'tag');
  const archiveLastModified = latestArchiveDate(posts);

  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: archiveLastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(SITE_LAST_MODIFIED),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: archiveLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/tags`,
      lastModified: archiveLastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  const postRoutes = posts.map((post) => ({
    url: `${SITE_URL}/${post.id}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    images: [versionedSocialImageUrl(post.image || `/${post.id}/opengraph-image`)],
  }));

  const categoryRoutes = categories.map((term) => {
    return {
      url: `${SITE_URL}${term.href}`,
      lastModified: latestArchiveDate(term.posts),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    };
  });

  const tagRoutes = tags.map((term) => {
    return {
      url: `${SITE_URL}${term.href}`,
      lastModified: latestArchiveDate(term.posts),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    };
  });

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes];
}
