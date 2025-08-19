import { getAllPosts } from '@/lib/mdx';

// Export the async function for components that can handle it
export { getAllPosts, getPostById, getPostsByCategory, getAllCategories } from '@/lib/mdx';

// For components that need sync access, we'll need to handle this differently
// This is a placeholder that shouldn't be used directly
export const posts: any[] = []; 