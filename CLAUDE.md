# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

**Fully functional Next.js blog on `next-gen` branch**

This is a complete rebuild of cardoni.net using Next.js 15 with App Router. All content has been migrated and the site is fully operational with categories, posts, and navigation working correctly.

## Content Structure

### Source of Truth
- **Blog posts**: `content/posts/` - MDX files with YAML frontmatter metadata
- **Media files**: `content/media/` - Images and assets referenced by posts
- All content migrated from previous Hexo-based implementation

### Content Format
- Posts use MDX format with YAML frontmatter (frontmatter parsing automatically handles missing opening `---`)
- Categories, tags, dates, and other metadata preserved
- Posts contain historical content dating back to early blog entries
- Media assets preserved in original structure

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Styling**: Tailwind CSS v4
- **Content**: MDX with gray-matter for frontmatter parsing
- **Components**: TypeScript React components with animations
- **Deployment**: Configured for Vercel/static deployment

### Key Features
- **Dynamic routing**: `/categories/[category]` with support for both dash and URL-encoded formats
- **Static generation**: Pre-builds all category and post pages
- **Responsive design**: Mobile-first with dark mode support
- **Category navigation**: Auto-generated from post metadata
- **Search-friendly URLs**: Clean URLs with proper encoding

### Implementation Status
1. **Content preserved** ✅ - All posts and media in `content/` directory
2. **Clean slate** ✅ - Previous implementation removed
3. **New architecture** ✅ - Next.js 15 with App Router implemented
4. **Integration** ✅ - Content fully integrated with MDX processing system
5. **Categories** ✅ - Working category pages with proper URL handling
6. **Navigation** ✅ - Dynamic navigation with category links
7. **Static generation** ✅ - All pages pre-built for optimal performance

## Development Commands

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Key Principles
- `content/` directory is the single source of truth for all blog content
- MDX processing handles legacy frontmatter format automatically
- Category URLs support both `/categories/personal-pivot` and `/categories/personal%20pivot` formats
- All content metadata and structure preserved during migration