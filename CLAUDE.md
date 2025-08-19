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
8. **Testing suite** ✅ - Comprehensive test coverage with Vitest and Testing Library

## Development Commands

```bash
npm run dev          # Start development server with Turbopack on http://localhost:3000
npm run build        # Build for production (includes --debug --profile flags for visibility)
npm run start        # Start production server (after build)
npm run lint         # Run ESLint for code quality
npm test             # Run test suite with Vitest
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Run tests with Vitest UI
npm run test:coverage # Run tests with coverage reporting
```

### Testing Framework
This project uses **Vitest** with **Testing Library** for comprehensive test coverage:

- **Library tests**: URL utilities, markdown processing, MDX content handling
- **Component tests**: React component rendering, interactions, and accessibility
- **Integration tests**: Real-world data scenarios and edge cases
- **Coverage**: 90%+ test success rate across core functionality
- **Mocking**: Next.js router, Link components, and motion animations configured
- **Test files**: Located in `tests/unit/` with `.test.ts` and `.test.tsx` extensions

## Key Architecture Details

### Content Processing System
- **Entry point**: `src/lib/mdx.ts` - Core MDX processing and post fetching
- **Types**: `src/types/blog.ts` - BlogPost interface definition
- **URL handling**: `src/lib/url-utils.ts` - Category URL normalization (spaces ↔ dashes)
- **Category utilities**: `src/lib/categories.ts` - Category-related functions
- **Markdown utilities**: `src/lib/markdown-utils.ts` - Clean excerpt generation with markdown stripping

### Routing Structure
- **Dynamic post pages**: `src/app/[slug]/page.tsx` - Individual blog posts
- **Category pages**: `src/app/categories/[category]/page.tsx` - Posts by category
- **Static pages**: `src/app/about/page.tsx` and root `src/app/page.tsx`

### Component Architecture
- **Markdown rendering**: `EnhancedMarkdownRenderer.tsx` - MDX content display
- **Navigation**: `DynamicNavigation.tsx` + `ClientNavigation.tsx` - Category navigation
- **Animations**: `AnimatedCard.tsx`, `AnimatedHeader.tsx`, `PageTransition.tsx` - Motion components
- **Layout**: `BlogSidebar.tsx` - Sidebar with category links

## Key Principles
- `content/` directory is the single source of truth for all blog content
- MDX processing handles legacy frontmatter format automatically (missing opening `---` handled)
- Category URLs support both `/categories/personal-pivot` and `/categories/personal%20pivot` formats with automatic redirects
- Post excerpts are automatically generated with markdown formatting stripped for clean previews
- All content metadata and structure preserved during migration from Hexo
- TypeScript aliases use `@/*` for `src/*` paths
- Code blocks use flush-left formatting (no indentation on ``` markers or content)