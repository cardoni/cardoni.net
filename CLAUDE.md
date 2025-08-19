# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (Note: ESLint errors are ignored during builds per next.config.ts)
- `npm run import-posts` - Import blog posts from old_stuff/source/_posts to src/content/posts

## Project Architecture

This is a **Next.js 15.2.2** personal blog and website using the App Router architecture. Key architectural decisions:

### Content Management
- **Markdown-based blog posts** stored in `src/content/posts/` with frontmatter metadata
- **Static site generation** for optimal performance
- Content processed using `gray-matter` for frontmatter parsing and `remark`/`rehype` for HTML conversion
- Post data interface defined in `src/lib/markdown.ts` with normalized date handling

### Routing Structure
- `/` - Homepage
- `/blog` - Blog listing page
- `/blog/[id]` - Individual blog posts (dynamic routes)
- `/categories/[category]` - Posts filtered by category
- `/tags/[tag]` - Posts filtered by tag
- `/about` - About page

### Data Flow
- `src/lib/markdown.ts` contains all post data fetching logic:
  - `getSortedPostsData()` - Returns all posts sorted by date
  - `getPostData(id)` - Returns single post with HTML content
  - `getAllTags()` - Extracts unique tags from all posts
  - `getPostsByTag(tag)` - Filters posts by tag

### Layout Architecture
- `src/app/layout.tsx` - Root layout with metadata
- `src/components/Layout.tsx` - Main layout with Header/Footer and sidebar
- Sidebar dynamically generates categories, tags, and recent posts from all available content
- Uses float-based layout (3/4 main content, 1/4 sidebar)

### Styling
- **Tailwind CSS v4** with `@tailwindcss/typography` plugin for markdown content
- Global styles in `src/app/globals.css`
- TypeScript path alias `@/*` maps to `src/*`

## Content Migration
The `scripts/import-posts.js` script migrates content from the old Hexo-based blog (`old_stuff/source/_posts`) to the new Next.js structure. This is a one-time migration utility.

## Deployment
- Configured for **Vercel** deployment with `vercel.json`
- Static site generation enables optimal performance
- ESLint errors are ignored during production builds