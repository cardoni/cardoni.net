import { BlogPost } from '@/types/blog';
import postsData from './posts.json';

export async function getAllPosts(): Promise<BlogPost[]> {
  // Use pre-generated posts data to avoid build issues
  return postsData as BlogPost[];
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