import { getSortedPostsData } from '@/lib/markdown';
import PostCard from '@/components/PostCard';
import { Metadata } from 'next';

interface CategoryPageParams {
  params: {
    category: string;
  };
}

export async function generateMetadata(
  { params }: CategoryPageParams
): Promise<Metadata> {
  const decodedCategory = decodeURIComponent(await Promise.resolve(params).then(p => p.category));
  return {
    title: `${decodedCategory} | Cardoni.net`,
    description: `Articles and posts in the ${decodedCategory} category`,
  };
}

export default async function CategoryPage(
  { params }: CategoryPageParams
) {
  const decodedCategory = decodeURIComponent(await Promise.resolve(params).then(p => p.category));
  const allPostsData = getSortedPostsData();
  
  // Filter posts by category
  const categoryPosts = allPostsData.filter(post => 
    post.categories && post.categories.some(category => 
      category.toLowerCase() === decodedCategory.toLowerCase()
    )
  );

  return (
    <div className="archives">
      <div className="page-title mb-8">
        <h1 className="title">{decodedCategory}</h1>
        <div className="subtitle text-gray-600">
          {categoryPosts.length} {categoryPosts.length === 1 ? 'post' : 'posts'} in this category
        </div>
      </div>

      {categoryPosts.length > 0 ? (
        <div className="posts">
          {categoryPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="no-posts">
          <p>No posts found in this category.</p>
        </div>
      )}
    </div>
  );
} 