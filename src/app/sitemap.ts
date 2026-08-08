import { MetadataRoute } from 'next';
import { getAllCategories, getAllPosts, getAllTags } from '@/lib/mdx';
import { stringToSlug } from '@/lib/url-utils';
import { SITE_LAST_MODIFIED, SITE_URL, versionedSocialImageUrl } from '@/lib/site';

function latestArchiveDate(posts: Awaited<ReturnType<typeof getAllPosts>>): Date {
  return new Date(Math.max(
    new Date(SITE_LAST_MODIFIED).getTime(),
    ...posts.map((post) => new Date(post.updated || post.date).getTime()),
  ));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, tags] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
    getAllTags(),
  ]);
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

  const categoryRoutes = categories.map((category) => {
    const categoryPosts = posts.filter((post) => post.categories.includes(category));

    return {
      url: `${SITE_URL}/categories/${stringToSlug(category)}`,
      lastModified: latestArchiveDate(categoryPosts),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    };
  });

  const tagRoutes = tags.map((tag) => {
    const tagPosts = posts.filter((post) => post.tags.includes(tag));

    return {
      url: `${SITE_URL}/tag/${stringToSlug(tag)}`,
      lastModified: latestArchiveDate(tagPosts),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    };
  });

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes];
}
