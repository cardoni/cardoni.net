'use client';

import { motion } from 'motion/react';

interface AnimatedHeaderProps {
  title: string;
  subtitle: string;
  showBackButton?: boolean;
  backHref?: string;
}

export default function AnimatedHeader({ title, subtitle, showBackButton = false, backHref = '/' }: AnimatedHeaderProps) {
  return (
    <motion.div 
      className="mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {showBackButton && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <a 
            href={backHref}
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 group transition-colors duration-200"
          >
            <motion.svg 
              className="w-4 h-4 mr-2"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              whileHover={{ x: -2 }}
              transition={{ duration: 0.2 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </motion.svg>
            Back to posts
          </a>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          {title}
        </h1>
      </motion.div>
      
      <motion.p 
        className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
} 