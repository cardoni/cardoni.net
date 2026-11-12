import { BlogPost } from '@/types/blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { generateExcerpt } from './markdown-utils';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

function normalizeDate(value: unknown): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString().replace(/T00:00:00\.000Z$/, '');
  }

  const date = new Date(String(value));
  return Number.isNaN(date.getTime())
    ? String(value)
    : date.toISOString().replace(/T00:00:00\.000Z$/, '');
}

export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const date = normalizeDate(data.date) || '';
      
      return {
        slug,
        title: data.title,
        description: data.description ? String(data.description) : undefined,
        tags: data.tags || [],
        categories: data.categories || [],
        keywords: data.keywords || [],
        date,
        updated: normalizeDate(data.updated),
        content,
        excerpt: generateExcerpt(content, 150),
        readTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`,
        image: data.image ? String(data.image) : undefined,
        imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
      } as BlogPost;
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug) || null;
}
