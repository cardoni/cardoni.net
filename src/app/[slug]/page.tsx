import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CategoryBadge from '@/components/CategoryBadge';
import DisqusComments from '@/components/DisqusComments';
import EnhancedMarkdownRenderer from '@/components/EnhancedMarkdownRenderer';
import TaxonomyLinks from '@/components/TaxonomyLinks';
import { getAllPosts, getPostById } from '@/lib/mdx';
import {
  absoluteUrl,
  buildPageMetadata,
  metadataImage,
  serializeJsonLd,
  siteConfig,
  versionedSocialImageUrl,
} from '@/lib/site';
import { getTaxonomyHref, getTaxonomyTermByName, getTaxonomyTerms } from '@/lib/taxonomy';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostById(slug);

  if (!post) {
    return {
      title: 'Post not found',
      robots: { index: false, follow: false },
    };
  }

  const description = post.excerpt || siteConfig.description;
  const imageAlt = post.imageAlt || `Editorial card for “${post.title}” by Greg Cardoni.`;
  const image = metadataImage(post.image || `/${post.id}/opengraph-image`, imageAlt);

  return buildPageMetadata({
    title: post.title,
    openGraphTitle: post.title,
    description,
    pathname: `/${post.id}`,
    keywords: Array.from(new Set([...post.keywords, ...post.tags, ...post.categories, 'Greg Cardoni'])),
    image,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      authors: [siteConfig.author.url],
      section: post.categories[0],
      tags: post.tags,
    },
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostById(slug), getAllPosts()]);

  if (!post) {
    notFound();
  }

  const categoryTerms = getTaxonomyTerms(allPosts, 'category');
  const tagTerms = getTaxonomyTerms(allPosts, 'tag');
  const postCategories = post.categories.flatMap((category) => {
    const term = getTaxonomyTermByName(categoryTerms, category);
    return term ? [term] : [];
  });
  const postTags = post.tags.flatMap((tag) => {
    const term = getTaxonomyTermByName(tagTerms, tag);
    return term ? [term] : [];
  });
  const relatedPosts = allPosts
    .filter((candidate) => candidate.id !== post.id)
    .map((candidate) => ({
      post: candidate,
      score: (
        candidate.categories.filter((category) => post.categories.includes(category)).length * 3
        + candidate.tags.filter((tag) => post.tags.includes(tag)).length * 2
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .map(({ post: candidate }) => candidate)
    .slice(0, 3);
  const headlineImage = post.image || `/${post.id}/opengraph-image`;
  const headlineAlt = post.imageAlt || `Editorial illustration for ${post.title}.`;
  const wordCount = post.content.trim().split(/\s+/).length;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${absoluteUrl(`/${post.id}`)}#article`,
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/${post.id}`),
    mainEntityOfPage: absoluteUrl(`/${post.id}`),
    image: versionedSocialImageUrl(headlineImage),
    datePublished: post.date,
    dateModified: post.updated || post.date,
    inLanguage: 'en-US',
    wordCount,
    articleSection: post.categories,
    keywords: [...post.keywords, ...post.tags].join(', '),
    author: {
      '@type': 'Person',
      '@id': siteConfig.author.id,
      name: siteConfig.author.name,
      url: siteConfig.author.url,
      email: `mailto:${siteConfig.author.email}`,
      sameAs: siteConfig.author.sameAs,
    },
    publisher: {
      '@type': 'Person',
      '@id': siteConfig.author.id,
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  };

  return (
    <div className="article-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
      <div className="reading-shell">
        <Link href="/#writing" className="article-back">
          <span aria-hidden="true">←</span> All writing
        </Link>

        <article>
          <header className="article-header">
            <div className="article-categories">
              {post.categories.map((category) => (
                <CategoryBadge key={category} category={category} />
              ))}
            </div>
            <h1 className="font-reading">{post.title}</h1>
            {post.excerpt && <p className="article-deck font-reading">{post.excerpt}</p>}
            <div className="article-byline">
              <span>
                By <Link href="/about" rel="author">{siteConfig.author.name}</Link>
              </span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  timeZone: 'UTC',
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <figure className="article-hero-image">
            <Image
              src={headlineImage}
              alt={headlineAlt}
              width={1200}
              height={630}
              sizes="(max-width: 860px) 100vw, 832px"
              priority
              unoptimized={!post.image}
            />
          </figure>

          <EnhancedMarkdownRenderer content={post.content} />

          <TaxonomyLinks
            className="article-tags"
            title="Explore this article"
            categories={postCategories}
            tags={postTags}
          />

          <footer className="article-author-card">
            <p className="eyebrow">About the author</p>
            <h2 className="font-reading">Greg Cardoni writes at the seam between systems and ideas.</h2>
            <p>
              A software engineer with a philosophy degree, Greg writes about technology, craft, and consequences.
            </p>
            <div>
              <Link href="/about">More about Greg</Link>
              <a href={`mailto:${siteConfig.author.email}`}>{siteConfig.author.email}</a>
            </div>
          </footer>

          <DisqusComments slug={post.id} title={post.title} />
        </article>
      </div>

      {relatedPosts.length > 0 && (
        <aside className="site-shell related-writing" aria-labelledby="related-title">
          <div>
            <p className="eyebrow">Keep reading</p>
            <h2 id="related-title" className="font-reading">From the same notebook.</h2>
          </div>
          <div className="related-links">
            {relatedPosts.map((related) => (
              <article key={related.id} className="related-link">
                {related.categories[0] && (
                  <Link
                    href={getTaxonomyHref('category', related.categories[0])}
                    className="related-category"
                  >
                    {related.categories[0]}
                  </Link>
                )}
                <Link href={`/${related.id}`} className="related-post-link">
                  <strong className="font-reading">{related.title}</strong>
                  <small>{related.readTime}</small>
                </Link>
              </article>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
