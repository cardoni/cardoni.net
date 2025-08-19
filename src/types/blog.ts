export interface BlogPost {
  id: string;
  title: string;
  tags: string[];
  categories: string[];
  keywords: string[];
  date: string;
  content: string;
  excerpt?: string; // Generated from content
  readTime?: string; // Generated from content
} 