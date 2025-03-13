import { getSortedPostsData } from '@/lib/markdown';
import PostCard from '@/components/PostCard';

export const metadata = {
  title: 'Blog | Cardoni.net',
  description: 'Articles and thoughts by Greg Cardoni',
};

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights on technology, programming, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPostsData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 