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
  } catch (error) {
    try {
      // If that fails, try with regular Date constructor
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (error) {
      // If all parsing fails, return the original string
      return dateString;
    }
  }
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="post mb-8">
      <div className="post-content">
        <header>
          <div className="icon"></div>
          <time dateTime={post.date}>
            <Link href={`/blog/${post.id}`}>
              {post.date ? formatDate(post.date) : 'No date'}
            </Link>
          </time>
          <h2 className="title">
            <Link href={`/blog/${post.id}`} className="hover:text-blue-600">
              {post.title}
            </Link>
          </h2>
        </header>
        <div className="entry">
          <p>{post.excerpt}</p>
        </div>
        <footer>
          <div className="alignleft">
            <Link href={`/blog/${post.id}`} className="more-link">
              Read More →
            </Link>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="alignright">
              {post.tags.map((tag) => (
                <span key={tag} className="tag mr-2">
                  <Link href={`/tags/${tag}`} className="text-xs text-gray-600">
                    #{tag}
                  </Link>
                </span>
              ))}
            </div>
          )}
          <div className="clearfix"></div>
        </footer>
      </div>
    </article>
  );
} 