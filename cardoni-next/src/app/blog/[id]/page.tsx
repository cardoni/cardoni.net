import { getAllPostIds, getPostData } from '@/lib/markdown';
import { format } from 'date-fns';
import { Metadata } from 'next';

interface BlogPostParams {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: BlogPostParams): Promise<Metadata> {
  const post = await getPostData(params.id);
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

export default async function BlogPost({ params }: BlogPostParams) {
  const post = await getPostData(params.id);
  
  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <div className="text-gray-500 mb-4">
          {post.date && (
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags && post.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </header>
      
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
      />
    </article>
  );
} 