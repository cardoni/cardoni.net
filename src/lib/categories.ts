import { getAllPosts } from './mdx';

export interface CategoryWithCount {
  name: string;
  count: number;
  href: string;
}

export async function getTopCategories(limit: number = 5): Promise<CategoryWithCount[]> {
  const posts = await getAllPosts();
  const categoryCounts = new Map<string, number>();
  
  // Count posts per category
  posts.forEach(post => {
    post.categories.forEach(category => {
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    });
  });
  
  // Convert to array and sort by count (descending)
  const sortedCategories = Array.from(categoryCounts.entries())
    .map(([name, count]) => ({
      name,
      count,
      href: `/categories/${encodeURIComponent(name)}`
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
    
  return sortedCategories;
}