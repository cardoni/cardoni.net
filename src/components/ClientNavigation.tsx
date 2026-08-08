'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SocialIcon from './SocialIcon';
import ThemeToggle from './ThemeToggle';

interface NavItem {
  href: string;
  label: string;
  count?: number;
}

interface ClientNavigationProps {
  navItems: NavItem[];
}

export default function ClientNavigation({ navItems }: ClientNavigationProps) {
  const pathname = usePathname();

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Link href="/" className="group">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                Cardoni.net
              </h1>
            </Link>
          </motion.div>

          <div className="flex items-center space-x-4 sm:space-x-8">
            {/* Main Navigation */}
            <motion.div
              className="flex items-center space-x-4 sm:space-x-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {navItems.map((item, index) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`text-xs sm:text-sm font-medium transition-colors duration-200 relative ${
                        isActive
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <span className="hidden sm:inline">{item.label}</span>
                      <span className="sm:hidden">{item.label}</span>
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gray-900 dark:bg-white"
                          layoutId="activeTab"
                          initial={false}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Social Links - Hidden on very small screens */}
            <motion.div
              className="hidden sm:flex items-center space-x-3 pl-4 border-l border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <SocialIcon platform="x" variant="icon-only" size="md" className="p-2" />
              <SocialIcon platform="github" variant="icon-only" size="md" className="p-2" />
              <ThemeToggle />
            </motion.div>

            {/* Mobile Social Links - Compact version */}
            <motion.div
              className="flex sm:hidden items-center space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <SocialIcon platform="x" variant="icon-only" size="sm" className="p-1.5" />
              <SocialIcon platform="github" variant="icon-only" size="sm" className="p-1.5" />
              <ThemeToggle />
            </motion.div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
