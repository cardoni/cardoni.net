import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import PostCard from '@/components/PostCard';

export default function Home() {
  const allPostsData = getSortedPostsData();
  const recentPosts = allPostsData.slice(0, 3);

  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Cardoni.net</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Hi there, I'm Greg. This is my personal site where I share my thoughts, projects, and experiences.
        </p>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Posts</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800">
            View all posts →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700 mb-4">
          I'm a software engineer passionate about web development, technology, and sharing knowledge.
        </p>
        <Link href="/about" className="text-blue-600 hover:text-blue-800 font-medium">
          Learn more about me →
        </Link>
      </section>
    </div>
  );
}
