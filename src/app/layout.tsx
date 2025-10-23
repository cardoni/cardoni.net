import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import DynamicNavigation from '@/components/DynamicNavigation';
import SocialIcon from '@/components/SocialIcon';
import { CategoryList } from '@/components/CategoryList';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Cardoni.net - Tech Blog',
  description: 'Exploring the intersection of ancient wisdom and modern software engineering.',
  keywords: ['philosophy', 'technology', 'software engineering', 'stoicism', 'programming'],
  authors: [{ name: 'Craig' }],
  openGraph: {
    title: 'Cardoni.net - Tech Blog',
    description: 'Exploring the intersection of ancient wisdom and modern software engineering.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DynamicNavigation />
          <main>{children}</main>
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  About
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Software engineer and startup veteran exploring technology through a philosophical lens.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Categories
                </h3>
                <CategoryList />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Connect
                </h3>
                <div className="flex space-x-4">
                  <SocialIcon platform="x" variant="icon-only" size="lg" />
                  <SocialIcon platform="github" variant="icon-only" size="lg" />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8">
              <p className="text-center text-gray-500 dark:text-gray-500 text-sm">
                © 2025 Cardoni.net. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
