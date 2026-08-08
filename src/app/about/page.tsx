import type { Metadata } from 'next';
import Link from 'next/link';
import { serializeJsonLd, siteConfig, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Greg Cardoni, a software engineer and philosophy graduate writing about technology, systems, and ideas.',
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  alternates: {
    canonical: '/about',
    types: { 'application/atom+xml': siteConfig.feed.url },
  },
  openGraph: {
    title: 'About Greg Cardoni',
    description:
      'Software engineer and philosophy graduate writing about technology, systems, and ideas.',
    type: 'website',
    url: '/about',
    images: [siteConfig.socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Greg Cardoni',
    description: 'Software engineer and philosophy graduate writing about technology, systems, and ideas.',
    creator: siteConfig.author.handle,
    images: [{ url: siteConfig.socialImage.url, alt: siteConfig.socialImage.alt }],
  },
};

const profileJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/about#profile`,
  url: `${SITE_URL}/about`,
  name: 'About Greg Cardoni',
  mainEntity: {
    '@type': 'Person',
    '@id': siteConfig.author.id,
    name: siteConfig.author.name,
    url: SITE_URL,
    email: `mailto:${siteConfig.author.email}`,
    description: 'Software engineer and philosophy graduate writing about technology, systems, and ideas.',
    sameAs: siteConfig.author.sameAs,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'California State University, Northridge',
    },
    knowsAbout: ['Software engineering', 'Technology', 'Philosophy', 'Startups'],
  },
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(profileJsonLd) }}
      />
      <header className="site-shell about-header">
        <p className="eyebrow">About / Greg Cardoni</p>
        <h1 className="font-reading">Engineer by practice. Philosopher by training.</h1>
        <p className="font-reading">
          I write to understand the systems we build, the assumptions inside them, and what they ask of the people who use them.
        </p>
      </header>

      <main className="site-shell about-grid">
        <article className="about-story font-reading">
          <p>
            I&apos;m a software engineer and longtime startup technologist. My work has moved between early-stage companies
            and enterprise-scale financial technology, but the thread has stayed the same: make complicated systems useful,
            legible, and humane.
          </p>
          <p>
            Before software, I studied philosophy in the Honors Program at California State University, Northridge,
            graduating cum laude. That training still shapes how I approach engineering—define terms, inspect assumptions,
            follow an argument all the way through, and remain suspicious of easy certainty.
          </p>
          <p>
            Cardoni.net is where those two practices meet. You&apos;ll find technical notes from the archive alongside new essays
            on software craft, technology ethics, systems thinking, and the philosophical questions that keep resurfacing in code.
          </p>
        </article>

        <aside className="about-facts" aria-label="About Greg at a glance">
          <section>
            <p className="eyebrow">Practice</p>
            <h2 className="font-reading">Software engineering</h2>
            <p>Startup-honed product and systems work, now applied at enterprise scale.</p>
          </section>
          <section>
            <p className="eyebrow">Study</p>
            <h2 className="font-reading">B.A. in Philosophy</h2>
            <p>CSUN Honors Program · Cum laude · University Dean&apos;s List.</p>
          </section>
          <section>
            <p className="eyebrow">Questions</p>
            <h2 className="font-reading">Craft, agency, consequences</h2>
            <p>How tools encode values—and how careful engineering can leave room for human judgment.</p>
          </section>
        </aside>
      </main>

      <section className="site-shell about-contact">
        <p className="eyebrow">Conversation welcome</p>
        <h2 className="font-reading">Have an argument, an idea, or an interesting system?</h2>
        <div>
          <a href={`mailto:${siteConfig.author.email}`}>{siteConfig.author.email}</a>
          <Link href="/#writing">Read the archive</Link>
        </div>
      </section>
    </div>
  );
}
