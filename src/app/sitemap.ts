import { MetadataRoute } from 'next';
import { posts } from '@/data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cardoni.net';
  
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
} 