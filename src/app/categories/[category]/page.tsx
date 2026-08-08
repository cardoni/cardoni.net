import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import CollectionPageJsonLd from '@/components/CollectionPageJsonLd';
import TaxonomyLinks from '@/components/TaxonomyLinks';
import { getAllPosts } from '@/lib/mdx';
import AnimatedCard from '@/components/AnimatedCard';
import { getCanonicalParam, needsRedirect } from '@/lib/url-utils';
import { buildPageMetadata } from '@/lib/site';
import {
  getRelatedTaxonomyTerms,
  getTaxonomyTermByParam,
  getTaxonomyTerms,
} from '@/lib/taxonomy';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return getTaxonomyTerms(posts, 'category').map((term) => ({ category: term.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const posts = await getAllPosts();
  const term = getTaxonomyTermByParam(getTaxonomyTerms(posts, 'category'), category);

  if (!term) {
    notFound();
  }

  return buildPageMetadata({
    title: term.name,
    openGraphTitle: `${term.name} writing by Greg Cardoni`,
    description: `Essays and technical notes by Greg Cardoni about ${term.name}.`,
    pathname: term.href,
    keywords: [term.name],
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  // Check if this URL needs to be redirected to the canonical dash format
  if (needsRedirect(category)) {
    const canonicalParam = getCanonicalParam(category);
    permanentRedirect(`/categories/${canonicalParam}`);
  }

  const allPosts = await getAllPosts();
  const term = getTaxonomyTermByParam(getTaxonomyTerms(allPosts, 'category'), category);

  if (!term) {
    notFound();
  }

  const posts = term.posts;
  const description = `Essays and technical notes by Greg Cardoni about ${term.name}.`;
  const relatedCategories = getRelatedTaxonomyTerms({
    posts: allPosts,
    sourceKind: 'category',
    sourceTerm: term.name,
    targetKind: 'category',
  });
  const relatedTags = getRelatedTaxonomyTerms({
    posts: allPosts,
    sourceKind: 'category',
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
          { name: 'Categories', pathname: '/categories' },
          { name: term.name, pathname: term.href },
        ]}
      />
      <div className="category-page site-shell">
        <header className="category-header">
          <p className="eyebrow">Category archive / {term.count} {term.count === 1 ? 'essay' : 'essays'}</p>
          <h1 className="font-reading">{term.name}</h1>
          <p>Technical notes and essays filed under {term.name}.</p>
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
