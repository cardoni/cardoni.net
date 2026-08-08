import type { Metadata } from 'next';
import CollectionPageJsonLd from '@/components/CollectionPageJsonLd';
import TaxonomyDirectory from '@/components/TaxonomyDirectory';
import { getAllPosts } from '@/lib/mdx';
import { buildPageMetadata } from '@/lib/site';
import { getTaxonomyTerms } from '@/lib/taxonomy';

const description = 'Browse Greg Cardoni’s essays and technical notes by tag.';

export const metadata: Metadata = buildPageMetadata({
  title: 'Tags',
  openGraphTitle: 'Writing by tag',
  description,
  pathname: '/tags',
  keywords: ['essay tags', 'software topics', 'technology topics'],
});

export default async function TagsPage() {
  const posts = await getAllPosts();
  const terms = getTaxonomyTerms(posts, 'tag');

  return (
    <>
      <CollectionPageJsonLd
        name="Writing by tag"
        description={description}
        pathname="/tags"
        items={terms.map((term) => ({ name: term.name, pathname: term.href }))}
        breadcrumbs={[
          { name: 'Home', pathname: '/' },
          { name: 'Tags', pathname: '/tags' },
        ]}
      />
      <TaxonomyDirectory
        eyebrow="Browse by tag"
        title="Tags"
        description="The tools, techniques, and ideas named across the archive."
        terms={terms}
      />
    </>
  );
}
