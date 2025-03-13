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
    <div className="post-card mb-8 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-2">
        <Link href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
          {post.title}
        </Link>
      </h2>
      
      {post.date && (
        <div className="text-gray-600 mb-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      )}
      
      {post.excerpt && (
        <div className="text-gray-700 mb-4">
          {post.excerpt}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {post.categories && post.categories.length > 0 && (
          <div className="categories mr-4">
            <span className="text-gray-600 mr-1">Categories:</span>
            {post.categories.map((category, index) => (
              <span key={category}>
                <Link href={`/categories/${category}`} className="text-blue-500 hover:text-blue-700">
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
                <Link href={`/tags/${tag}`} className="text-blue-500 hover:text-blue-700">
                  {tag}
                </Link>
                {index < post.tags!.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 