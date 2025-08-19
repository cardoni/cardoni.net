import { notFound, redirect } from 'next/navigation';
import { getPostsByCategory, getAllCategories } from '@/lib/mdx';
import AnimatedCard from '@/components/AnimatedCard';
import PageTransition from '@/components/PageTransition';
import AnimatedHeader from '@/components/AnimatedHeader';
import { needsRedirect, getCanonicalParam, slugToString } from '@/lib/url-utils';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  
  // Only generate canonical dash versions to avoid conflicts
  return categories.map((category) => ({
    category: category.replace(/\s+/g, '-').toLowerCase()
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  
  // If this URL needs redirect, we'll handle it in the component
  // For metadata generation, use the canonical form
  const decodedCategory = slugToString(getCanonicalParam(category));
  
  return {
    title: `${decodedCategory} - Cardoni.net`,
    description: `Posts about ${decodedCategory}`,
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
    <PageTransition>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <AnimatedHeader
            title={decodedCategory}
            subtitle={`Posts about ${decodedCategory}`}
            showBackButton={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <AnimatedCard key={post.id} post={post} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}