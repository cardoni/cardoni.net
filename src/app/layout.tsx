import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Newsreader } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import DynamicNavigation from '@/components/DynamicNavigation';
import SocialIcon from '@/components/SocialIcon';
import { ThemeProvider } from '@/components/ThemeProvider';
import EditorialProviders from '@/components/EditorialProviders';
import { siteConfig, SITE_URL, serializeJsonLd } from '@/lib/site';

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.author.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Greg Cardoni',
    'technology essays',
    'philosophy essays',
    'software engineering',
    'programming',
    'technology ethics',
    'personal blog',
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  category: 'Technology and philosophy',
  alternates: {
    canonical: '/',
    types: { 'application/atom+xml': siteConfig.feed.url },
  },
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    url: '/',
    siteName: siteConfig.name,
    locale: 'en_US',
    images: [siteConfig.socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.author.handle,
    images: [{ url: siteConfig.socialImage.url, alt: siteConfig.socialImage.alt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': siteConfig.author.id,
      name: siteConfig.author.name,
      url: SITE_URL,
      email: `mailto:${siteConfig.author.email}`,
      sameAs: siteConfig.author.sameAs,
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'California State University, Northridge',
      },
      knowsAbout: [
        'Software engineering',
        'Technology',
        'Philosophy',
        'Technology ethics',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: 'en-US',
      author: { '@id': siteConfig.author.id },
      publisher: { '@id': siteConfig.author.id },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(siteJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <EditorialProviders>
            <a className="skip-link" href="#main-content">
              Skip to the writing
            </a>
            <DynamicNavigation />
            <main id="main-content">{children}</main>
            <footer className="site-footer">
              <div className="site-shell footer-grid">
                <div>
                  <p className="eyebrow">Cardoni.net</p>
                  <p className="footer-statement font-reading">
                    Notes on making software—and making sense of it.
                  </p>
                </div>
                <div className="footer-contact">
                  <p>Written by {siteConfig.author.name}</p>
                  <a href={`mailto:${siteConfig.author.email}`}>{siteConfig.author.email}</a>
                  <div className="footer-socials" aria-label="Social links">
                    <SocialIcon platform="x" variant="icon-only" size="md" />
                    <SocialIcon platform="github" variant="icon-only" size="md" />
                    <SocialIcon platform="linkedin" variant="icon-only" size="md" />
                  </div>
                </div>
                <p className="footer-colophon">
                  © {new Date().getFullYear()} {siteConfig.author.name}. Set in Newsreader and Geist.
                </p>
              </div>
            </footer>
          </EditorialProviders>
        </ThemeProvider>
      </body>
      {googleAnalyticsId ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
    </html>
  );
}
