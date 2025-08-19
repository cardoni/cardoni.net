import { BlogPost } from '@/types/blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { generateExcerpt } from './markdown-utils';

const contentDirectory = path.join(process.cwd(), 'content', 'posts');

export async function getAllPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(contentDirectory);
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const id = fileName.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        id,
        title: data.title,
        tags: data.tags || [],
        categories: data.categories || [],
        keywords: data.keywords || [],
        date: data.date,
        content,
        excerpt: generateExcerpt(content, 150),
        readTime: `${Math.ceil(content.split(' ').length / 200)} min read`
      } as BlogPost;
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find(post => post.id === id) || null;
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.categories.includes(category));
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  const categories = new Set<string>();
  posts.forEach(post => {
    post.categories.forEach(category => categories.add(category));
  });
  return Array.from(categories).sort();
} 