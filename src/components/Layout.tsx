import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/markdown';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Get all posts data
  const allPosts = getSortedPostsData();
  
  // Extract unique categories
  const categories = Array.from(
    new Set(
      allPosts
        .flatMap(post => post.categories || [])
        .filter(Boolean)
    )
  );
  
  // Extract unique tags
  const tags = Array.from(
    new Set(
      allPosts
        .flatMap(post => post.tags || [])
        .filter(Boolean)
    )
  );
  
  // Get recent posts (top 3)
  const recentPosts = allPosts.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div id="content" className="inner flex-grow py-8 px-4">
        <div id="main-col" className="float-left w-3/4 pr-8">
          <div id="wrapper">
            {children}
          </div>
        </div>
        <aside id="sidebar" className="float-right w-1/4">
          <div className="widget">
            <h3 className="title">Categories</h3>
            <div className="entry">
              <ul>
                {categories.length > 0 ? (
                  categories.map(category => (
                    <li key={category}>
                      <Link href={`/categories/${category}`}>{category}</Link>
                    </li>
                  ))
                ) : (
                  <li>No categories found</li>
                )}
              </ul>
            </div>
          </div>
          <div className="widget">
            <h3 className="title">Tags</h3>
            <div className="entry">
              <ul className="tag-list">
                {tags.length > 0 ? (
                  tags.map(tag => (
                    <li key={tag}>
                      <Link href={`/tags/${tag}`}>{tag}</Link>
                    </li>
                  ))
                ) : (
                  <li>No tags found</li>
                )}
              </ul>
            </div>
          </div>
          <div className="widget">
            <h3 className="title">Recent Posts</h3>
            <div className="entry">
              <ul>
                {recentPosts.map(post => (
                  <li key={post.id}>
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
        <div className="clearfix"></div>
      </div>
      <Footer />
    </div>
  );
} 