import { getAllPostIds, getPostData } from '@/lib/markdown';
import { format, parseISO } from 'date-fns';
import { Metadata } from 'next';
import Link from 'next/link';

interface BlogPostParams {
  params: {
    id: string;
  };
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

export async function generateMetadata(
  { params }: BlogPostParams
): Promise<Metadata> {
  // Properly await the params object
  const post = await getPostData(await Promise.resolve(params).then(p => p.id));
  return {
    title: `${post.title} | Cardoni.net`,
    description: post.excerpt || '',
    keywords: post.keywords || [],
  };
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default async function BlogPost(
  { params }: BlogPostParams
) {
  // Properly await the params object
  const post = await getPostData(await Promise.resolve(params).then(p => p.id));
  
  return (
    <article className="post">
      <div className="post-content">
        <header>
          <div className="icon"></div>
          <time dateTime={post.date}>
            {post.date && formatDate(post.date)}
          </time>
          <h1 className="title">{post.title}</h1>
        </header>
        
        <div className="entry prose prose-lg" 
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />
        
        <footer>
          {post.categories && post.categories.length > 0 && (
            <div className="categories mb-2">
              <span className="text-gray-600 mr-2">Categories:</span>
              {post.categories.map((category, index) => (
                <span key={category}>
                  <Link href={`/categories/${category}`} className="category-link">
                    {category}
                  </Link>
                  {index < (post.categories?.length || 0) - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          )}
          
          {post.tags && post.tags.length > 0 && (
            <div className="tags">
              <span className="text-gray-600 mr-2">Tags:</span>
              {post.tags.map((tag, index) => (
                <span key={tag}>
                  <Link href={`/tags/${tag}`} className="tag-link">
                    {tag}
                  </Link>
                  {index < (post.tags?.length || 0) - 1 ? ', ' : ''}
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