import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';
import PostCard from '@/components/PostCard';

export default function Home() {
  const allPostsData = getSortedPostsData();
  const recentPosts = allPostsData.slice(0, 5);

  return (
    <div className="home">
      <div className="welcome mb-8">
        <h2 className="title">Welcome to Cardoni.net</h2>
        <div className="entry">
          <p>
            Hi there, I'm Greg. This is my personal site where I share my thoughts, 
            projects, and experiences. Check out some of my recent posts below.
          </p>
        </div>
      </div>

      <div className="posts">
        {recentPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      <div className="more-link text-center mt-8">
        <Link href="/blog" className="btn">
          View All Posts →
        </Link>
      </div>
    </div>
  );
}
