import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  tags?: string[];
  categories?: string[];
  keywords?: string[];
  contentHtml: string;
  excerpt?: string;
  [key: string]: unknown;
}

// Helper function to normalize date format
const normalizeDate = (dateString: string | undefined): string => {
  if (!dateString) return new Date().toISOString();
  
  try {
    // Try to create a date object
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return new Date().toISOString();
    }
    
    // Return ISO string format
    return date.toISOString();
  } catch (_) {
    // If there's an error, return current date
    return new Date().toISOString();
  }
};

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Create excerpt from content (first 160 characters)
    const excerpt = matterResult.content
      .trim()
      .replace(/\n/g, ' ')
      .slice(0, 160) + '...';

    // Normalize the date format
    const normalizedDate = normalizeDate(matterResult.data.date);

    // Combine the data with the id
    return {
      id,
      excerpt,
      ...matterResult.data,
      date: normalizedDate,
    } as PostData;
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Normalize the date format
  const normalizedDate = normalizeDate(matterResult.data.date);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(matterResult.content);
  
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
    date: normalizedDate,
  } as PostData;
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  const allPosts = getSortedPostsData();
  const allTags = new Set<string>();
  
  allPosts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        allTags.add(tag);
      });
    }
  });
  
  return Array.from(allTags);
}

/**
 * Get all posts that have a specific tag
 */
export async function getPostsByTag(tag: string): Promise<PostData[]> {
  const allPosts = getSortedPostsData();
  const decodedTag = decodeURIComponent(tag);
  
  // Filter posts by tag
  return allPosts.filter(post => 
    post.tags && post.tags.some(postTag => 
      postTag.toLowerCase() === decodedTag.toLowerCase()
    )
  );
} 