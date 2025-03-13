import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { PostData } from '@/lib/markdown';

interface PostCardProps {
  post: PostData;
}

// Helper function to safely format dates
const formatDate = (dateString: string) => {
  try {
    // Try to parse as ISO date first
    return format(parseISO(dateString), 'MMMM d, yyyy');
  } catch (_) {
    try {
      // If that fails, try with regular Date constructor
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (_) {
      // If all parsing fails, return the original string
      return dateString;
    }
  }
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="post-card mb-8 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
      <h2 className="text-3xl font-bold mb-3">
        <Link href={`/blog/${post.id}`} className="text-blue-700 hover:text-blue-900 transition-colors duration-200 hover:underline">
          {post.title}
        </Link>
      </h2>
      
      {post.date && (
        <div className="text-gray-600 mb-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      )}
      
      {post.excerpt && (
        <div className="text-gray-700 mb-4 text-lg">
          {post.excerpt}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100">
        {post.categories && post.categories.length > 0 && (
          <div className="categories mr-4">
            <span className="text-gray-600 mr-1">Categories:</span>
            {post.categories.map((category, index) => (
              <span key={category}>
                <Link href={`/categories/${category}`} className="text-blue-500 hover:text-blue-700 font-medium">
                  {category}
                </Link>
                {index < post.categories!.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}
        
        {post.tags && post.tags.length > 0 && (
          <div className="tags">
            <span className="text-gray-600 mr-1">Tags:</span>
            {post.tags.map((tag, index) => (
              <span key={tag}>
                <Link href={`/tags/${tag}`} className="text-blue-500 hover:text-blue-700 font-medium">
                  {tag}
                </Link>
                {index < post.tags!.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <Link href={`/blog/${post.id}`} className="inline-block text-blue-600 hover:text-blue-800 font-medium hover:underline">
          Read more →
        </Link>
      </div>
    </div>
  );
} 