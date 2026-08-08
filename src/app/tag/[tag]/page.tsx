import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import AnimatedCard from '@/components/AnimatedCard';
import CollectionPageJsonLd from '@/components/CollectionPageJsonLd';
import { getAllTags, getPostsByTag } from '@/lib/mdx';
import { buildPageMetadata } from '@/lib/site';
import { findTermByParam, getCanonicalParam, needsRedirect, stringToSlug } from '@/lib/url-utils';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag: stringToSlug(tag) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const tags = await getAllTags();
  const tagName = findTermByParam(tags, tag);

  if (!tagName) {
    notFound();
  }

  const canonicalPath = `/tag/${stringToSlug(tagName)}`;
  const description = `Essays and technical notes by Greg Cardoni tagged ${tagName}.`;

  return buildPageMetadata({
    title: tagName,
    openGraphTitle: `${tagName} writing by Greg Cardoni`,
    description,
    pathname: canonicalPath,
    keywords: [tagName],
  });
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;

  if (needsRedirect(tag)) {
    permanentRedirect(`/tag/${getCanonicalParam(tag)}`);
  }

  const tags = await getAllTags();
  const tagName = findTermByParam(tags, tag);

  if (!tagName) {
    notFound();
  }

  const posts = await getPostsByTag(tagName);
  const canonicalPath = `/tag/${stringToSlug(tagName)}`;
  const description = `Essays and technical notes by Greg Cardoni tagged ${tagName}.`;

  return (
    <>
      <CollectionPageJsonLd
        name={`${tagName} writing by Greg Cardoni`}
        description={description}
        pathname={canonicalPath}
        items={posts.map((post) => ({ name: post.title, pathname: `/${post.id}` }))}
        breadcrumbs={[
          { name: 'Home', pathname: '/' },
          { name: 'Tags', pathname: '/tags' },
          { name: tagName, pathname: canonicalPath },
        ]}
      />
      <div className="category-page site-shell">
        <header className="category-header">
          <p className="eyebrow">Tag archive / {posts.length} {posts.length === 1 ? 'essay' : 'essays'}</p>
          <h1 className="font-reading">{tagName}</h1>
          <p>Technical notes and essays tagged {tagName}.</p>
        </header>

        <div className="post-list">
          {posts.map((post, index) => (
            <AnimatedCard key={post.id} post={post} delay={index * 0.05} index={index + 1} />
          ))}
        </div>
      </div>
    </>
  );
}
