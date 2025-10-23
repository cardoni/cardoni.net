import Link from 'next/link';
import { stringToSlug } from '@/lib/url-utils';
import { getAllPosts } from '@/lib/mdx';

export async function CategoryList() {
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
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);

  return (
    <ul className="space-y-2">
      {sortedCategories.map((category) => (
        <li key={category}>
          <Link
            href={`/categories/${stringToSlug(category)}`}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors duration-200"
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}

