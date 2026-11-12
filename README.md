# [cardoni.net](https://cardoni.net)

Hi, I'm Greg. This is the source for my personal site and blog.

It's a Next.js app (App Router, TypeScript, Tailwind CSS v4) that renders MDX posts from the `content/` directory into static pages. It also serves an Atom feed at `/atom.xml`, keeps the old Disqus threads attached to their original post URLs, and can report to Google Analytics.

## Running it locally

```bash
npm install
```

```bash
npm run dev
```

The dev server runs at `http://localhost:3000`. Other scripts:

- `npm run build` / `npm run start`: production build and server
- `npm run lint`: ESLint
- `npm test`: Vitest (`test:watch`, `test:ui`, and `test:coverage` are also available)

## Where things live

- `content/posts/`: posts, as MDX with YAML frontmatter
- `content/media/`: images and other files the posts reference
- `src/app/`: routes (posts, category and tag archives, the feed, sitemap)
- `src/components/`: React components
- `src/lib/`: content loading, MDX processing, and URL helpers
- `tests/`: unit and component tests

To publish a post, add an `.mdx` file to `content/posts/`. Categories and tags come from frontmatter, and their archive pages are generated automatically.

## URLs

Categories and tags with spaces use dashes in their URLs, so `personal pivot` lives at `/categories/personal-pivot`. The URL-encoded form (`/categories/personal%20pivot`) redirects there. Tag archives stay at the old `/tag/[tag]` path, and `/tags/[tag]` redirects to it.

## Analytics

Analytics are off unless `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` is set to a GA4 Measurement ID (`G-XXXXXXXXXX`). Set it in Vercel for Production and Preview, then redeploy, since the value is baked into the client bundle at build time. For local development, copy `.env.example` to `.env.local` and fill it in.

## License

MIT
