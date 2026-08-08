'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import CategoryBadge from './CategoryBadge';

interface AnimatedCardProps {
  post: BlogPost;
  delay?: number;
  index?: number;
}

export default function AnimatedCard({ post, delay = 0, index }: AnimatedCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="post-row group"
    >
      <Link href={`/${post.id}`} className="post-row-link">
        <span className="post-index" aria-hidden="true">
          {String(index ?? 0).padStart(2, '0')}
        </span>
        <div className="post-row-main">
          <div className="post-meta">
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <CategoryBadge key={category} category={category} variant="compact" clickable={false} />
              ))}
            </div>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'UTC',
              })}
            </time>
          </div>
          <h2 className="font-reading">{post.title}</h2>
          <p>{post.excerpt}</p>
        </div>
        <span className="post-read-more">
          {post.readTime}
          <span className="read-more-label">
            Read more
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </span>
      </Link>
    </motion.article>
  );
}
