import type { Metadata } from 'next';
import Image from 'next/image';
import { getAllPosts } from '@/lib/mdx';
import AnimatedCard from '@/components/AnimatedCard';
import ArchiveTimeline from '@/components/ArchiveTimeline';
import DefinitionTerm from '@/components/DefinitionTerm';
import { buildPageMetadata, siteConfig } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: siteConfig.title },
  openGraphTitle: siteConfig.title,
  description: siteConfig.description,
  pathname: '/',
});

export default async function HomePage() {
  const posts = await getAllPosts();
  const timeline = Array.from(
    posts.reduce((years, post) => {
      const year = new Date(post.date).getUTCFullYear().toString();
      years.set(year, (years.get(year) || 0) + 1);
      return years;
    }, new Map<string, number>()),
  )
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, essays]) => ({ year, essays }));

  const categoryCount = new Set(posts.flatMap((post) => post.categories)).size;
  const yearRange = timeline.length > 0
    ? `${timeline[0].year}—${timeline[timeline.length - 1].year}`
    : 'Archive';

  return (
    <div className="home-page">
      <section className="site-shell home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Greg Cardoni / Essays &amp; field notes</p>
          <h1 className="font-reading">
            Technology is a human question.
          </h1>
          <p className="hero-deck font-reading">
            Writing about software, systems, and the old philosophical questions hiding inside new tools.
          </p>
          <p className="hero-note">
            From <DefinitionTerm definition="The Greek word for craft, art, or practical know-how—the root of technology.">technē</DefinitionTerm>{' '}
            to distributed systems: clear explanations, useful diagrams, and arguments worth sitting with.
          </p>
          <a className="text-link" href="#writing">
            Browse the writing <span aria-hidden="true">↓</span>
          </a>
        </div>

        <figure className="hero-figure">
          <Image
            src="/images/editorial-hero.jpg"
            alt={siteConfig.socialImage.alt}
            width={1200}
            height={630}
            sizes="(max-width: 900px) 100vw, 52vw"
            priority
          />
          <figcaption>
            Logic, craft, systems, first principles. Original editorial artwork.
          </figcaption>
        </figure>
      </section>

      <section className="site-shell archive-overview" aria-labelledby="archive-title">
        <div className="archive-copy">
          <p className="eyebrow">The archive / {yearRange}</p>
          <h2 id="archive-title" className="font-reading">A record of learning in public.</h2>
          <p>
            Early notes on building software, preserved as written. New essays will widen the lens toward philosophy,
            technology, and their consequences.
          </p>
          <dl className="archive-stats">
            <div>
              <dt>Essays</dt>
              <dd>{posts.length}</dd>
            </div>
            <div>
              <dt>Subjects</dt>
              <dd>{categoryCount}</dd>
            </div>
            <div>
              <dt>Author</dt>
              <dd>1</dd>
            </div>
          </dl>
        </div>
        <ArchiveTimeline data={timeline} />
      </section>

      <section id="writing" className="site-shell writing-section" aria-labelledby="writing-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">All writing</p>
            <h2 id="writing-title" className="font-reading">Notes, arguments, and how-tos.</h2>
          </div>
          <p>Newest first · {posts.length} entries</p>
        </div>

        <div className="post-list">
          {posts.map((post, index) => (
            <AnimatedCard key={post.id} post={post} delay={index * 0.04} index={index + 1} />
          ))}
        </div>
      </section>
    </div>
  );
}
