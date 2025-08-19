# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

**Currently in development on `next-gen` branch**

This is a complete rebuild of cardoni.net. The previous Next.js implementation has been removed and we're starting fresh with new Next.js architecture while preserving all existing content.

## Content Structure

### Source of Truth
- **Blog posts**: `content/posts/` - Markdown files with frontmatter metadata
- **Media files**: `content/media/` - Images and assets referenced by posts
- All content has been migrated from the previous Hexo-based implementation

### Content Format
- Posts use standard markdown with YAML frontmatter
- Media assets are preserved in their original structure
- Posts contain historical content dating back to early blog entries

## Development Approach

### Current Phase
1. **Content preserved** ✅ - All posts and media migrated to `content/` directory
2. **Clean slate** ✅ - Previous implementation removed
3. **New architecture** 🔄 - Awaiting new Next.js theme/template integration
4. **Integration** ⏳ - Will integrate content with new markdown processing system

### Next Steps
- Integrate new Next.js source code (to be placed in `src/`)
- Build markdown processing system to work with `content/` directory
- Implement static site generation for blog posts
- Configure deployment pipeline

## Key Principles
- `content/` directory is the single source of truth for all blog content
- New implementation should read from this directory structure
- Preserve all existing post metadata and content during integration