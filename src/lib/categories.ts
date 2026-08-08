import { getAllPosts } from './mdx';
import { getTaxonomyTerms } from './taxonomy';

export interface CategoryWithCount {
  name: string;
  count: number;
  href: string;
}

export async function getTopCategories(limit: number = 5): Promise<CategoryWithCount[]> {
  const posts = await getAllPosts();
  return getTaxonomyTerms(posts, 'category')
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit)
    .map(({ name, count, href }) => ({ name, count, href }));
}
