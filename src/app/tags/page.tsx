import type { Metadata } from 'next';
import CollectionPageJsonLd from '@/components/CollectionPageJsonLd';
import TaxonomyDirectory from '@/components/TaxonomyDirectory';
import { getAllPosts } from '@/lib/mdx';
import { buildPageMetadata } from '@/lib/site';
import { stringToSlug } from '@/lib/url-utils';

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
  const counts = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    });
  });

  const terms = Array.from(counts, ([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <CollectionPageJsonLd
        name="Writing by tag"
        description={description}
        pathname="/tags"
        items={terms.map((term) => ({ name: term.name, pathname: `/tag/${stringToSlug(term.name)}` }))}
        breadcrumbs={[
          { name: 'Home', pathname: '/' },
          { name: 'Tags', pathname: '/tags' },
        ]}
      />
      <TaxonomyDirectory
        eyebrow="Browse by tag"
        title="Tags"
        description="The tools, techniques, and ideas named across the archive."
        basePath="/tag"
        terms={terms}
      />
    </>
  );
}
