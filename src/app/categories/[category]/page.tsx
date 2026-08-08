import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import CollectionPageJsonLd from '@/components/CollectionPageJsonLd';
import { getAllCategories, getPostsByCategory } from '@/lib/mdx';
import AnimatedCard from '@/components/AnimatedCard';
import { findTermByParam, getCanonicalParam, needsRedirect, stringToSlug } from '@/lib/url-utils';
import { buildPageMetadata } from '@/lib/site';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ category: getCanonicalParam(category) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categories = await getAllCategories();
  const categoryName = findTermByParam(categories, category);

  if (!categoryName) {
    notFound();
  }

  return buildPageMetadata({
    title: categoryName,
    openGraphTitle: `${categoryName} writing by Greg Cardoni`,
    description: `Essays and technical notes by Greg Cardoni about ${categoryName}.`,
    pathname: `/categories/${stringToSlug(categoryName)}`,
    keywords: [categoryName],
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  // Check if this URL needs to be redirected to the canonical dash format
  if (needsRedirect(category)) {
    const canonicalParam = getCanonicalParam(category);
    permanentRedirect(`/categories/${canonicalParam}`);
  }

  const categories = await getAllCategories();
  const categoryName = findTermByParam(categories, category);

  if (!categoryName) {
    notFound();
  }

  const posts = await getPostsByCategory(categoryName);

  const canonicalPath = `/categories/${stringToSlug(categoryName)}`;
  const description = `Essays and technical notes by Greg Cardoni about ${categoryName}.`;

  return (
    <>
      <CollectionPageJsonLd
        name={`${categoryName} writing by Greg Cardoni`}
        description={description}
        pathname={canonicalPath}
        items={posts.map((post) => ({ name: post.title, pathname: `/${post.id}` }))}
        breadcrumbs={[
          { name: 'Home', pathname: '/' },
          { name: 'Categories', pathname: '/categories' },
          { name: categoryName, pathname: canonicalPath },
        ]}
      />
      <div className="category-page site-shell">
        <header className="category-header">
          <p className="eyebrow">Category archive / {posts.length} {posts.length === 1 ? 'essay' : 'essays'}</p>
          <h1 className="font-reading">{categoryName}</h1>
          <p>Technical notes and essays filed under {categoryName}.</p>
        </header>

        <div className="post-list">
          {posts.map((post, index) => (
            <AnimatedCard key={post.id} post={post} delay={index * 0.05} index={index + 1} />
          ))}
        </div>
      </div>
    </>
  );
}
