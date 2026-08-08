import type { Metadata } from 'next';
import CollectionPageJsonLd from '@/components/CollectionPageJsonLd';
import TaxonomyDirectory from '@/components/TaxonomyDirectory';
import { getAllPosts } from '@/lib/mdx';
import { buildPageMetadata } from '@/lib/site';
import { getTaxonomyTerms } from '@/lib/taxonomy';

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
  const terms = getTaxonomyTerms(posts, 'category');

  return (
    <>
      <CollectionPageJsonLd
        name="Writing by category"
        description={description}
        pathname="/categories"
        items={terms.map((term) => ({ name: term.name, pathname: term.href }))}
        breadcrumbs={[
          { name: 'Home', pathname: '/' },
          { name: 'Categories', pathname: '/categories' },
        ]}
      />
      <TaxonomyDirectory
        eyebrow="Browse by category"
        title="Categories"
        description="Broad subjects running through the archive."
        terms={terms}
      />
    </>
  );
}
