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
      <div className="page-title mb-8">
        <h1 className="title">Blog Archives</h1>
        <div className="subtitle text-gray-600">
          All posts and articles
        </div>
      </div>

      <div className="posts">
        {allPostsData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 