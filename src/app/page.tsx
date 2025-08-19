import { getAllPosts } from '@/lib/mdx';
import AnimatedCard from '@/components/AnimatedCard';
import PageTransition from '@/components/PageTransition';
import AnimatedHeader from '@/components/AnimatedHeader';

export const metadata = {
  title: 'Cardoni.net - Tech Blog',
  description: 'Exploring the intersection of philosophy and technology through thoughtful writing.',
};

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <PageTransition>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <AnimatedHeader
            title="Welcome to Cardoni.net"
            subtitle="Exploring the intersection of philosophy and technology through thoughtful writing."
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
