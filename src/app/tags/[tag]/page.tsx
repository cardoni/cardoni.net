import { getPostsByTag, getAllTags } from '@/lib/markdown';
import PostCard from '@/components/PostCard';
import { Metadata } from 'next';

interface TagPageParams {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateMetadata(
  { params }: TagPageParams
): Promise<Metadata> {
  // Properly await the params object
  const tag = await Promise.resolve(params).then(p => p.tag);
  return {
    title: `Posts tagged with ${tag} | Cardoni.net`,
    description: `All posts tagged with ${tag}`,
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag,
  }));
}

export default async function TagPage({ params }: TagPageParams) {
  // Properly await the params object
  const tag = await Promise.resolve(params).then(p => p.tag);
  const posts = await getPostsByTag(tag);

  return (
    <div className="tag-page">
      <h1 className="text-3xl font-bold mb-6">Posts tagged with &ldquo;{tag}&rdquo;</h1>
      {posts.length === 0 ? (
        <p>No posts found with this tag.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
} 