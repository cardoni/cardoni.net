import type { Metadata } from 'next';
import CollectionPageJsonLd from '@/components/CollectionPageJsonLd';
import TaxonomyDirectory from '@/components/TaxonomyDirectory';
import { getAllPosts } from '@/lib/mdx';
import { buildPageMetadata } from '@/lib/site';
import { stringToSlug } from '@/lib/url-utils';

const description = 'Browse Greg Cardoni’s essays and technical notes by category.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Categories',
  openGraphTitle: 'Writing by category',
  description,
  pathname: '/categories',
  keywords: ['essay categories', 'software topics', 'technology topics'],
});

export default async function CategoriesPage() {
  const posts = await getAllPosts();
  const counts = new Map<string, number>();

  posts.forEach((post) => {
    post.categories.forEach((category) => {
      counts.set(category, (counts.get(category) || 0) + 1);
    });
  });

  const terms = Array.from(counts, ([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <CollectionPageJsonLd
        name="Writing by category"
        description={description}
        pathname="/categories"
        items={terms.map((term) => ({ name: term.name, pathname: `/categories/${stringToSlug(term.name)}` }))}
        breadcrumbs={[
          { name: 'Home', pathname: '/' },
          { name: 'Categories', pathname: '/categories' },
        ]}
      />
      <TaxonomyDirectory
        eyebrow="Browse by category"
        title="Categories"
        description="Broad subjects running through the archive."
        basePath="/categories"
        terms={terms}
      />
    </>
  );
}
