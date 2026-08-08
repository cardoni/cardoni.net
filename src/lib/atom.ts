import { marked } from 'marked';
import type { BlogPost } from '@/types/blog';
import { SITE_URL, siteConfig } from '@/lib/site';

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function atomDate(value: string) {
  return new Date(value).toISOString();
}

function categoryElements(post: BlogPost) {
  const categories = post.categories.map((category) => (
    `    <category term="${escapeXml(category)}" scheme="${SITE_URL}/categories" label="${escapeXml(category)}" />`
  ));
  const tags = post.tags.map((tag) => (
    `    <category term="${escapeXml(tag)}" scheme="${SITE_URL}/tags" label="${escapeXml(tag)}" />`
  ));

  return [...categories, ...tags].join('\n');
}

export function buildAtomFeed(posts: BlogPost[]) {
  const orderedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const latestUpdated = orderedPosts.reduce((latest, post) => {
    const timestamp = new Date(post.updated || post.date).getTime();
    return Math.max(latest, timestamp);
  }, 0);
  const feedUpdated = latestUpdated > 0
    ? new Date(latestUpdated).toISOString()
    : new Date(0).toISOString();

  const entries = orderedPosts.map((post) => {
    const url = `${SITE_URL}/${post.id}`;
    const content = marked.parse(post.content, { async: false, gfm: true }) as string;
    const summary = post.excerpt || `An essay by ${siteConfig.author.name}.`;
    const categories = categoryElements(post);

    return [
      '  <entry>',
      `    <title type="text">${escapeXml(post.title)}</title>`,
      `    <link rel="alternate" type="text/html" href="${url}" />`,
      `    <id>${url}</id>`,
      `    <published>${atomDate(post.date)}</published>`,
      `    <updated>${atomDate(post.updated || post.date)}</updated>`,
      `    <summary type="text">${escapeXml(summary)}</summary>`,
      categories,
      `    <content type="html" xml:base="${SITE_URL}/">${escapeXml(content)}</content>`,
      '  </entry>',
    ].filter(Boolean).join('\n');
  }).join('\n');

  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="en-US">',
    `  <title type="text">${escapeXml(siteConfig.feed.title)}</title>`,
    `  <subtitle type="text">${escapeXml(siteConfig.description)}</subtitle>`,
    `  <link rel="alternate" type="text/html" href="${SITE_URL}" />`,
    `  <link rel="self" type="application/atom+xml" href="${siteConfig.feed.url}" />`,
    `  <id>${SITE_URL}/</id>`,
    `  <updated>${feedUpdated}</updated>`,
    '  <author>',
    `    <name>${escapeXml(siteConfig.author.name)}</name>`,
    `    <uri>${siteConfig.author.url}</uri>`,
    `    <email>${escapeXml(siteConfig.author.email)}</email>`,
    '  </author>',
    '  <generator uri="https://nextjs.org/">Next.js</generator>',
    entries,
    '</feed>',
    '',
  ].join('\n');
}
