'use client';

import { motion } from 'motion/react';
import { SOCIAL_LINKS, SOCIAL_ICONS } from '@/lib/social-links';

type SocialPlatform = keyof typeof SOCIAL_LINKS;
type IconVariant = 'icon-only' | 'button' | 'text-button';

interface SocialIconProps {
  platform: SocialPlatform;
  variant?: IconVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export default function SocialIcon({
  platform,
  variant = 'icon-only',
  className = '',
  size = 'md'
}: SocialIconProps) {
  const link = SOCIAL_LINKS[platform];
  const iconPath = SOCIAL_ICONS[platform];

  const sharedProps = {
    href: link.url,
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': link.ariaLabel,
  };

  const baseIcon = (
    <svg className={sizeClasses[size]} fill="currentColor" viewBox="0 0 24 24">
      <path d={iconPath} />
    </svg>
  );

  // Icon-only variant (for headers, footers)
  if (variant === 'icon-only') {
    return (
      <motion.a
        {...sharedProps}
        className={`text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {baseIcon}
      </motion.a>
    );
  }

  // Text button variant (for sidebars, about page)
  if (variant === 'text-button') {
    return (
      <a
        {...sharedProps}
        className={`inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 ${className}`}
      >
        {baseIcon}
        <span className="ml-2">{link.label}</span>
      </a>
    );
  }

  // Button variant (compact buttons like in sidebar)
  return (
    <a
      {...sharedProps}
      className={`flex-1 text-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 ${className}`}
    >
      {link.label}
    </a>
  );
}
