import { buildAtomFeed } from '@/lib/atom';
import { getAllPosts } from '@/lib/mdx';

export const dynamic = 'force-static';

export async function GET() {
  const posts = await getAllPosts();
  const feed = buildAtomFeed(posts);

  return new Response(feed, {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
