import { getSortedPostsData } from '@/lib/markdown';
import PostCard from '@/components/PostCard';

export const metadata = {
  title: 'Blog | Cardoni.net',
  description: 'Articles and thoughts by Greg Cardoni',
};

export default function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="archives">
      <div className="page-title mb-10 pb-6 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-blue-800 mb-2">Blog Archives</h1>
        <div className="subtitle text-gray-600 text-xl">
          All posts and articles
        </div>
      </div>

      <div className="posts space-y-8">
        {allPostsData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 