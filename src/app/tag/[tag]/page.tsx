import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import AnimatedCard from '@/components/AnimatedCard';
import CollectionPageJsonLd from '@/components/CollectionPageJsonLd';
import TaxonomyLinks from '@/components/TaxonomyLinks';
import { getAllPosts } from '@/lib/mdx';
import { buildPageMetadata } from '@/lib/site';
import { getCanonicalParam, needsRedirect } from '@/lib/url-utils';
import {
  getRelatedTaxonomyTerms,
  getTaxonomyTermByParam,
  getTaxonomyTerms,
} from '@/lib/taxonomy';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return getTaxonomyTerms(posts, 'tag').map((term) => ({ tag: term.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const posts = await getAllPosts();
  const term = getTaxonomyTermByParam(getTaxonomyTerms(posts, 'tag'), tag);

  if (!term) {
    notFound();
  }

  const description = `Essays and technical notes by Greg Cardoni tagged ${term.name}.`;

  return buildPageMetadata({
    title: term.name,
    openGraphTitle: `${term.name} writing by Greg Cardoni`,
    description,
    pathname: term.href,
    keywords: [term.name],
  });
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;

  if (needsRedirect(tag)) {
    permanentRedirect(`/tag/${getCanonicalParam(tag)}`);
  }

  const allPosts = await getAllPosts();
  const term = getTaxonomyTermByParam(getTaxonomyTerms(allPosts, 'tag'), tag);

  if (!term) {
    notFound();
  }

  const posts = term.posts;
  const description = `Essays and technical notes by Greg Cardoni tagged ${term.name}.`;
  const relatedCategories = getRelatedTaxonomyTerms({
    posts: allPosts,
    sourceKind: 'tag',
    sourceTerm: term.name,
    targetKind: 'category',
  });
  const relatedTags = getRelatedTaxonomyTerms({
    posts: allPosts,
    sourceKind: 'tag',
    sourceTerm: term.name,
    targetKind: 'tag',
  });

  return (
    <>
      <CollectionPageJsonLd
        name={`${term.name} writing by Greg Cardoni`}
        description={description}
        pathname={term.href}
        items={posts.map((post) => ({ name: post.title, pathname: `/${post.id}` }))}
        breadcrumbs={[
          { name: 'Home', pathname: '/' },
          { name: 'Tags', pathname: '/tags' },
          { name: term.name, pathname: term.href },
        ]}
      />
      <div className="category-page site-shell">
        <header className="category-header">
          <p className="eyebrow">Tag archive / {term.count} {term.count === 1 ? 'essay' : 'essays'}</p>
          <h1 className="font-reading">{term.name}</h1>
          <p>Technical notes and essays tagged {term.name}.</p>
        </header>

        <div className="post-list">
          {posts.map((post, index) => (
            <AnimatedCard key={post.id} post={post} delay={index * 0.05} index={index + 1} />
          ))}
        </div>
        <TaxonomyLinks
          className="taxonomy-related"
          title="Related categories and topics"
          categories={relatedCategories}
          tags={relatedTags}
        />
      </div>
    </>
  );
}
