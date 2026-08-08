import { describe, expect, it } from 'vitest';
import type { BlogPost } from '@/types/blog';
import {
  getRelatedTaxonomyTerms,
  getTaxonomyHref,
  getTaxonomyTermByParam,
  getTaxonomyTerms,
} from '@/lib/taxonomy';

const posts: BlogPost[] = [
  {
    id: 'proper-nouns',
    title: 'Parsing Proper Nouns',
    categories: ['regex', 'regex'],
    tags: ['regex', 'parsing', 'parsing'],
    keywords: [],
    date: '2026-01-03',
    content: '',
  },
  {
    id: 'parsing-tools',
    title: 'Parsing Tools',
    categories: ['personal pivot'],
    tags: ['parsing', 'tools'],
    keywords: [],
    date: '2026-01-02',
    content: '',
  },
  {
    id: 'tooling',
    title: 'Tooling',
    categories: ['nginx'],
    tags: ['tools'],
    keywords: [],
    date: '2026-01-01',
    content: '',
  },
];

describe('taxonomy', () => {
  it('builds canonical archive links and counts each term once per post', () => {
    const categories = getTaxonomyTerms(posts, 'category');
    const tags = getTaxonomyTerms(posts, 'tag');

    expect(categories.find((term) => term.name === 'regex')).toMatchObject({
      href: '/categories/regex',
      count: 1,
    });
    expect(tags.find((term) => term.name === 'parsing')).toMatchObject({
      href: '/tag/parsing',
      count: 2,
    });
    expect(getTaxonomyHref('tag', 'a/b testing')).toBe('/tag/a-b-testing');
  });

  it('finds the source term from a canonical or encoded URL parameter', () => {
    const categories = getTaxonomyTerms(posts, 'category');

    expect(getTaxonomyTermByParam(categories, 'personal-pivot')?.name).toBe('personal pivot');
    expect(getTaxonomyTermByParam(categories, 'personal%20pivot')?.href).toBe('/categories/personal-pivot');
  });

  it('finds related tags and categories from shared post metadata', () => {
    const relatedTags = getRelatedTaxonomyTerms({
      posts,
      sourceKind: 'category',
      sourceTerm: 'regex',
      targetKind: 'tag',
    });
    const relatedCategories = getRelatedTaxonomyTerms({
      posts,
      sourceKind: 'category',
      sourceTerm: 'regex',
      targetKind: 'category',
    });

    expect(relatedTags.map((term) => term.href)).toEqual(['/tag/parsing', '/tag/regex']);
    expect(relatedCategories.map((term) => term.href)).toEqual(['/categories/personal-pivot']);
  });

  it('does not include the current tag among related tags', () => {
    const relatedTags = getRelatedTaxonomyTerms({
      posts,
      sourceKind: 'tag',
      sourceTerm: 'parsing',
      targetKind: 'tag',
    });

    expect(relatedTags.map((term) => term.name)).toEqual(['tools', 'regex']);
  });
});
