import { describe, expect, it } from 'vitest';
import { buildAtomFeed } from '@/lib/atom';
import type { BlogPost } from '@/types/blog';

const olderPost: BlogPost = {
  id: 'older-post',
  title: 'Older & wiser',
  tags: ['systems'],
  categories: ['philosophy'],
  keywords: [],
  date: '2024-01-01T12:00:00.000Z',
  content: 'A paragraph with **emphasis**.',
  excerpt: 'The older essay.',
};

const newerPost: BlogPost = {
  id: 'newer-post',
  title: 'Newer post',
  tags: ['typescript'],
  categories: ['technology'],
  keywords: [],
  date: '2025-02-03T12:00:00.000Z',
  content: 'Read the [source](/about).',
  excerpt: 'The newer essay.',
};

describe('buildAtomFeed', () => {
  it('creates valid Atom XML with every post newest first', () => {
    const feed = buildAtomFeed([olderPost, newerPost]);
    const document = new DOMParser().parseFromString(feed, 'application/xml');

    expect(document.querySelector('parsererror')).toBeNull();
    expect(document.querySelectorAll('entry')).toHaveLength(2);

    const titles = Array.from(document.querySelectorAll('entry > title'))
      .map((element) => element.textContent);
    expect(titles).toEqual(['Newer post', 'Older & wiser']);
  });

  it('includes self discovery, full HTML content, and category taxonomies', () => {
    const feed = buildAtomFeed([newerPost]);
    const document = new DOMParser().parseFromString(feed, 'application/xml');
    const entry = document.querySelector('entry');

    expect(document.querySelector('feed > link[rel="self"]')?.getAttribute('href')).toBe(
      'https://cardoni.net/atom.xml',
    );
    expect(entry?.querySelector('content')?.getAttribute('type')).toBe('html');
    expect(entry?.querySelector('content')?.textContent).toContain('<a href="/about">source</a>');
    expect(
      entry?.querySelector('category[scheme="https://cardoni.net/categories"]')?.getAttribute('term'),
    ).toBe('technology');
    expect(
      entry?.querySelector('category[scheme="https://cardoni.net/tags"]')?.getAttribute('term'),
    ).toBe('typescript');
  });
});
