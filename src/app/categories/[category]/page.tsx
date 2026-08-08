import { notFound, redirect } from 'next/navigation';
import { getAllCategories, getPostsByCategory } from '@/lib/mdx';
import AnimatedCard from '@/components/AnimatedCard';
import { needsRedirect, getCanonicalParam, slugToString } from '@/lib/url-utils';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({ category: getCanonicalParam(category) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  
  // If this URL needs redirect, we'll handle it in the component
  // For metadata generation, use the canonical form
  const decodedCategory = slugToString(getCanonicalParam(category));
  
  return {
    title: decodedCategory,
    description: `Essays and technical notes by Greg Cardoni about ${decodedCategory}.`,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    alternates: {
      canonical: `/categories/${getCanonicalParam(category)}`,
      types: { 'application/atom+xml': siteConfig.feed.url },
    },
    openGraph: {
      title: `${decodedCategory} writing by Greg Cardoni`,
      description: `Essays and technical notes about ${decodedCategory}.`,
      type: 'website',
      url: `/categories/${getCanonicalParam(category)}`,
      images: [siteConfig.socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${decodedCategory} writing by Greg Cardoni`,
      description: `Essays and technical notes about ${decodedCategory}.`,
      creator: siteConfig.author.handle,
      images: [{ url: siteConfig.socialImage.url, alt: siteConfig.socialImage.alt }],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  
  // Check if this URL needs to be redirected to the canonical dash format
  if (needsRedirect(category)) {
    const canonicalParam = getCanonicalParam(category);
    redirect(`/categories/${canonicalParam}`);
  }
  
  // Convert dash format to spaces for category lookup
  const decodedCategory = slugToString(category);
  const posts = await getPostsByCategory(decodedCategory);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="category-page site-shell">
      <header className="category-header">
        <p className="eyebrow">Subject archive / {posts.length} {posts.length === 1 ? 'essay' : 'essays'}</p>
        <h1 className="font-reading">{decodedCategory}</h1>
        <p>Technical notes and essays filed under {decodedCategory}.</p>
      </header>

      <div className="post-list">
        {posts.map((post, index) => (
          <AnimatedCard key={post.id} post={post} delay={index * 0.05} index={index + 1} />
        ))}
      </div>
    </div>
  );
}
