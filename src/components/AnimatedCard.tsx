'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface AnimatedCardProps {
  post: BlogPost;
  delay?: number;
}

export default function AnimatedCard({ post, delay = 0 }: AnimatedCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group"
    >
      <Link href={`/posts/${post.id}`}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden h-full">
          {/* Category Badges */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link 
                    key={category}
                    href={`/categories/${encodeURIComponent(category)}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {category}
                  </Link>
                ))}
              </div>
              <time className="text-sm text-gray-500 dark:text-gray-400" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            
            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200 line-clamp-2">
              {post.title}
            </h2>
            
            {/* Excerpt */}
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          </div>
          
          {/* Footer */}
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {post.readTime}
              </span>
              <motion.span 
                className="text-gray-900 dark:text-white text-sm font-medium inline-flex items-center"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
} 