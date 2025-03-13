import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import PostCard from '@/components/PostCard';

export default function Home() {
  const allPostsData = getSortedPostsData();
  const recentPosts = allPostsData.slice(0, 5);

  return (
    <div className="home">
      <div className="welcome mb-12 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to Cardoni.net</h1>
        <div className="entry text-lg">
          <p>
            Hi there, I&apos;m Greg. This is my personal site where I share my thoughts, 
            projects, and experiences. Check out some of my recent posts below.
          </p>
        </div>
      </div>

      <div className="recent-posts mb-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 border-b pb-2 border-gray-200">Recent Posts</h2>
        <div className="posts space-y-8">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      
      <div className="more-link text-center mt-10">
        <Link href="/blog" className="btn px-6 py-3 text-lg font-medium">
          View All Posts →
        </Link>
      </div>
    </div>
  );
}
