import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { compile } from '@mdx-js/mdx';
import { BlogPost } from '@/types/blog';

const contentDirectory = path.join(process.cwd(), 'content/posts');

// Helper function to generate excerpt from content
function generateExcerpt(content: string): string {
  // Remove frontmatter and clean up content
  const cleaned = content
    .replace(/^---[\s\S]*?---\n?/, '') // Remove frontmatter
    .replace(/#{1,6}\s+/g, '') // Remove markdown headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/`([^`]+)`/g, '$1') // Remove inline code formatting
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold formatting
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic formatting
    .trim();
  
  // Get first meaningful paragraph
  const firstParagraph = cleaned.split('\n\n')[0];
  
  // Truncate to reasonable length
  if (firstParagraph && firstParagraph.length > 20) {
    return firstParagraph.length > 150 
      ? firstParagraph.substring(0, 150) + '...'
      : firstParagraph;
  }
  
  return 'Read more...';
}

export async function getAllPosts(): Promise<BlogPost[]> {
  // Get all MDX files
  const fileNames = fs.readdirSync(contentDirectory);
  const mdxFiles = fileNames.filter(name => name.endsWith('.mdx'));

  const posts = await Promise.all(mdxFiles.map(async fileName => {
    const id = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(contentDirectory, fileName);
    let fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Fix frontmatter format - add missing opening --- if needed
    if (!fileContents.startsWith('---')) {
      fileContents = '---\n' + fileContents;
    }
    
    // Parse frontmatter and content
    const { data, content } = matter(fileContents);
    
    // Calculate reading time
    const readTimeResult = readingTime(content);
    
    // Generate excerpt from content
    const excerpt = generateExcerpt(content);
    
    // Compile MDX content
    const compiledContent = await compile(content, {
      outputFormat: 'function-body',
      development: process.env.NODE_ENV === 'development',
    });
    
    return {
      id,
      title: data.title,
      tags: data.tags || [],
      categories: data.categories || [],
      keywords: data.keywords || [],
      date: data.date,
      content: content, // Keep raw content for simple rendering
      excerpt,
      readTime: readTimeResult.text,
      compiledContent: String(compiledContent), // Compiled MDX
    } as BlogPost & { compiledContent: string };
  }));

  // Sort posts by date (newest first)
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