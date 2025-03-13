import Link from 'next/link';
import { format } from 'date-fns';
import { PostData } from '@/lib/markdown';

interface PostCardProps {
  post: PostData;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <Link href={`/blog/${post.id}`}>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600">{post.title}</h2>
        </Link>
        <div className="text-sm text-gray-500 mb-4">
          {post.date && (
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
          )}
        </div>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags && post.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
          Read more →
        </Link>
      </div>
    </div>
  );
} 