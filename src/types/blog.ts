export interface BlogPost {
  id: string;
  title: string;
  description?: string; // Hand-written SEO meta description from frontmatter
  tags: string[];
  categories: string[];
  keywords: string[];
  date: string;
  updated?: string;
  content: string;
  excerpt?: string; // Generated from content
  readTime?: string; // Generated from content
  image?: string;
  imageAlt?: string;
}
