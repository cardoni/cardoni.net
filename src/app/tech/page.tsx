import { getPostsByCategory } from '@/lib/mdx';
import AnimatedCard from '@/components/AnimatedCard';
import PageTransition from '@/components/PageTransition';
import AnimatedHeader from '@/components/AnimatedHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tech - Craigoni',
  description: 'Insights on software engineering, system design, and technology trends.',
};

export default async function TechPage() {
  const posts = await getPostsByCategory('tech');

  return (
    <PageTransition>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <AnimatedHeader
            title="Technology"
            subtitle="Insights on software engineering, systems, and the digital world."
            showBackButton={true}
          />
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No tech posts found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <AnimatedCard key={post.id} post={post} delay={index * 0.1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
} 