import { getSortedPostsData } from '@/lib/markdown';
import PostCard from '@/components/PostCard';
import { Metadata } from 'next';

interface TagPageParams {
  params: {
    tag: string;
  };
}

export async function generateMetadata(
  { params }: TagPageParams
): Promise<Metadata> {
  const decodedTag = decodeURIComponent(await Promise.resolve(params).then(p => p.tag));
  return {
    title: `Posts tagged with "${decodedTag}" | Cardoni.net`,
    description: `Articles and posts tagged with ${decodedTag}`,
  };
}

export default async function TagPage(
  { params }: TagPageParams
) {
  const decodedTag = decodeURIComponent(await Promise.resolve(params).then(p => p.tag));
  const allPostsData = getSortedPostsData();
  
  // Filter posts by tag
  const taggedPosts = allPostsData.filter(post => 
    post.tags && post.tags.some(tag => 
      tag.toLowerCase() === decodedTag.toLowerCase()
    )
  );

  return (
    <div className="archives">
      <div className="page-title mb-8">
        <h1 className="title">Posts tagged with "{decodedTag}"</h1>
        <div className="subtitle text-gray-600">
          {taggedPosts.length} {taggedPosts.length === 1 ? 'post' : 'posts'} found
        </div>
      </div>

      {taggedPosts.length > 0 ? (
        <div className="posts">
          {taggedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="no-posts">
          <p>No posts found with this tag.</p>
        </div>
      )}
    </div>
  );
} 