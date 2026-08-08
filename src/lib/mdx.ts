import { BlogPost } from '@/types/blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { generateExcerpt } from './markdown-utils';

const contentDirectory = path.join(process.cwd(), 'content', 'posts');

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
  const fileNames = fs.readdirSync(contentDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const date = normalizeDate(data.date) || '';
      
      return {
        id,
        title: data.title,
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

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.id === id) || null;
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.categories.includes(category));
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set<string>();
  posts.forEach(post => {
    post.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories).sort();
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}
