import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostById, getAllPosts } from '@/lib/mdx';
import EnhancedMarkdownRenderer from '@/components/EnhancedMarkdownRenderer';
import PageTransition from '@/components/PageTransition';
import AnimatedHeader from '@/components/AnimatedHeader';
import BlogSidebar from '@/components/BlogSidebar';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);
  
  if (!post) {
    return {
      title: 'Post Not Found - Cardoni.net',
    };
  }

  return {
    title: `${post.title} - Cardoni.net`,
    description: post.excerpt || '',
    openGraph: {
      title: post.title,
      description: post.excerpt || '',
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);
  const allPosts = await getAllPosts();

  if (!post) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <AnimatedHeader
            title={post.title}
            subtitle={post.excerpt || ''}
            showBackButton={true}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <header className="p-8 md:p-12 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <time dateTime={post.date} className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <Link
                          key={category}
                          href={`/categories/${encodeURIComponent(category)}`}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                          {category}
                        </Link>
                      ))}
                    </div>
                  </div>
                </header>
                
                <div className="p-8 md:p-12">
                  <EnhancedMarkdownRenderer content={post.content} />
                </div>
              </article>
              
              <footer className="mt-12 text-center">
                <Link 
                  href="/"
                  className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 group"
                >
                  <svg 
                    className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  Back to all posts
                </Link>
              </footer>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar currentPostId={post.id} allPosts={allPosts} />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
} 