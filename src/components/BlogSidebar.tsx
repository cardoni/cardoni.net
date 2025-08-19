'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogSidebarProps {
  currentPostId: string;
  allPosts: BlogPost[];
}

export default function BlogSidebar({ currentPostId, allPosts }: BlogSidebarProps) {
  // Filter out current post and limit to 5 other posts
  const otherPosts = allPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, 5);

  const philosophyPosts = otherPosts.filter(post => post.category === 'philosophy');
  const techPosts = otherPosts.filter(post => post.category === 'tech');

  return (
    <motion.aside 
      className="lg:sticky lg:top-24 space-y-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Other Posts Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Other Posts
        </h3>
        <div className="space-y-4">
          {otherPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Link 
                href={`/posts/${post.id}`}
                className="block group"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {post.readTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* View All Posts Link */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link 
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 inline-flex items-center group"
          >
            View all posts
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Categories
        </h3>
        <div className="space-y-3">
          <Link 
            href="/philosophy"
            className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
          >
            <span>Philosophy</span>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {philosophyPosts.length + (allPosts.find(p => p.id === currentPostId)?.category === 'philosophy' ? 1 : 0)}
            </span>
          </Link>
          <Link 
            href="/tech"
            className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group"
          >
            <span>Technology</span>
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {techPosts.length + (allPosts.find(p => p.id === currentPostId)?.category === 'tech' ? 1 : 0)}
            </span>
          </Link>
        </div>
      </div>

      {/* Newsletter/Connect Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Connect
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Follow for more thoughts on philosophy and technology.
        </p>
        <div className="flex space-x-3">
          <a 
            href="#" 
            className="flex-1 text-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Follow on X"
          >
            X
          </a>
          <a 
            href="#" 
            className="flex-1 text-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Follow on GitHub"
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.aside>
  );
} 