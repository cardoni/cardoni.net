import { MetadataRoute } from 'next';
import { getAllCategories, getAllPosts } from '@/lib/mdx';
import { stringToSlug } from '@/lib/url-utils';
import { SITE_URL, versionedSocialImageUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()]);

  const staticRoutes = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  const postRoutes = posts.map((post) => ({
    url: `${SITE_URL}/${post.id}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    images: [versionedSocialImageUrl(`/${post.id}/opengraph-image`)],
  }));

  const categoryRoutes = categories.map((category) => ({
    url: `${SITE_URL}/categories/${stringToSlug(category)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes];
}
