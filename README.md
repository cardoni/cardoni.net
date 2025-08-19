# [Cardoni.net](http://cardoni.net)

Hi there, I'm Greg. This is my personal site and blog.

**Project Status: Fully Operational (next-gen branch)**

A complete rebuild of cardoni.net using Next.js 15 with App Router. All content has been migrated and the site is fully functional with categories, posts, navigation, and responsive design.

## Features

- 📝 **Blog posts** with categories and tags
- 🏷️ **Category pages** with clean URLs and redirects
- 📱 **Responsive design** with dark mode support
- ⚡ **Static generation** for optimal performance
- 🔍 **SEO-friendly** URLs and metadata
- 🎨 **Modern UI** with Tailwind CSS and animations
- 🧪 **Comprehensive testing** with 90%+ coverage

## Tech Stack

- **Framework**: Next.js 15 with App Router and Turbopack
- **Styling**: Tailwind CSS v4
- **Content**: MDX with gray-matter frontmatter parsing
- **Language**: TypeScript
- **Testing**: Vitest with Testing Library
- **Deployment**: Vercel/static hosting ready

## Content Structure

- `content/posts/` - MDX blog posts with YAML frontmatter
- `content/media/` - Images and media files for posts
- `src/` - Next.js application source code
- `src/app/` - App Router pages and layouts
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions and MDX processing
- `tests/` - Test files for components and utilities

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Run tests
npm test

# Run tests in watch mode  
npm run test:watch

# Run tests with UI
npm run test:ui
```

The site will be available at `http://localhost:3000` (or next available port).

## Content Management

All blog posts are stored as MDX files in `content/posts/`. The system automatically:
- Parses YAML frontmatter for metadata
- Generates category pages from post categories  
- Creates clean excerpts by stripping markdown formatting
- Handles URL encoding for categories with spaces (e.g., `personal pivot` ↔ `personal-pivot`)
- Supports automatic redirects from URL-encoded to canonical dash formats

## Testing

The project includes comprehensive test coverage:
- **Unit tests** for utilities (URL handling, markdown processing)
- **Component tests** for React components (rendering, interactions, accessibility)  
- **Integration tests** with realistic blog data
- **Mocking** for Next.js router and motion components
- Run tests with `npm test` or use `npm run test:watch` for development

## License

This project is licensed under the MIT License.