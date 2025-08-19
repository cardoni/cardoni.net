// Temporarily disabled imports for stable build
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import readingTime from 'reading-time';
// import { compile } from '@mdx-js/mdx';
import { BlogPost } from '@/types/blog';

// const contentDirectory = path.join(process.cwd(), 'content/posts');
// Simple in-memory cache (will work within a single build process)
// let cachedPosts: BlogPost[] | null = null;

// Temporarily disabled helper function for build fix
// function generateExcerpt(content: string): string {
//   // Remove frontmatter and clean up content
//   const cleaned = content
//     .replace(/^---[\s\S]*?---\n?/, '') // Remove frontmatter
//     .replace(/#{1,6}\s+/g, '') // Remove markdown headers
//     .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
//     .replace(/`([^`]+)`/g, '$1') // Remove inline code formatting
//     .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold formatting
//     .replace(/\*([^*]+)\*/g, '$1') // Remove italic formatting
//     .trim();
//   
//   // Get first meaningful paragraph
//   const firstParagraph = cleaned.split('\n\n')[0];
//   
//   // Truncate to reasonable length
//   if (firstParagraph && firstParagraph.length > 20) {
//     return firstParagraph.length > 150 
//       ? firstParagraph.substring(0, 150) + '...'
//       : firstParagraph;
//   }
//   
//   return 'Read more...';
// }

export async function getAllPosts(): Promise<BlogPost[]> {
  // Use working mock data for now to keep build stable
  // TODO: The full MDX processing causes infinite loops during build
  return [
    {
      id: 'parsing-proper-nouns-with-regex',
      title: 'Parsing Proper Nouns',
      tags: ['regex', 'parsing'],
      categories: ['regex'],
      keywords: ['regex', 'parsing'],
      date: '2015-02-28',
      content: 'Recently, I was working on parsing proper nouns from text...',
      excerpt: 'Learn how to parse proper nouns from text using regular expressions.',
      readTime: '5 min read',
    },
    {
      id: 'how-to-install-postgresql-os-x-mac-rails-3-heroku',
      title: 'Setting up PostgreSQL on Mac OS X',
      tags: ['postgres', 'rails'],
      categories: ['personal pivot'],
      keywords: ['postgres', 'postgresql'],
      date: '2012-03-08',
      content: 'What\'s that? You\'re making a Rails app, planning on eventually pushing it to Heroku...',
      excerpt: 'Quick guide to installing PostgreSQL on Mac for Rails development.',
      readTime: '4 min read',
    },
    {
      id: 'a-b-testing-with-nginx',
      title: 'A/B Testing With Nginx',
      tags: ['nginx', 'testing'],
      categories: ['nginx'],
      keywords: ['nginx', 'a/b testing'],
      date: '2015-01-30',
      content: 'A/B testing is crucial for product validation...',
      excerpt: 'Learn how to implement A/B testing using Nginx.',
      readTime: '6 min read',
    }
  ];
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