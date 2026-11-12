export interface BlogPost {
  slug: string; // Filename without .mdx; also the post URL path
  title: string;
  description?: string; // Hand-written SEO meta description from frontmatter
  tags: string[];
  categories: string[];
  keywords: string[];
  date: string;
  updated?: string;
  content: string;
  excerpt?: string; // Plain text excerpt for meta descriptions and feeds
  excerptHtml?: string; // HTML excerpt with inline formatting (e.g. strikethrough)
  readTime?: string; // Generated from content
  image?: string;
  imageAlt?: string;
}
