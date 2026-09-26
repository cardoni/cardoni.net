import { describe, expect, it } from 'vitest';
import {
  headingTierClass,
  remarkRelevelHeadings,
  relevelHeading,
} from '@/lib/remark-relevel-headings';

describe('relevelHeading', () => {
  it('maps authored # and ## to h2', () => {
    expect(relevelHeading(1, 1)).toBe(2);
    expect(relevelHeading(2, 1)).toBe(2);
    expect(relevelHeading(2, 2)).toBe(2);
  });

  it('keeps deeper levels when they do not skip', () => {
    expect(relevelHeading(3, 2)).toBe(3);
    expect(relevelHeading(4, 3)).toBe(4);
  });

  it('clamps jumps to previous level + 1', () => {
    expect(relevelHeading(3, 1)).toBe(2);
    expect(relevelHeading(4, 2)).toBe(3);
    expect(relevelHeading(6, 2)).toBe(3);
  });

  it('allows stepping back down any number of levels', () => {
    expect(relevelHeading(2, 4)).toBe(2);
    expect(relevelHeading(3, 5)).toBe(3);
  });
});

describe('headingTierClass', () => {
  it('keys the visual tier to the authored markdown level', () => {
    expect(headingTierClass(1)).toBe('ht-2');
    expect(headingTierClass(2)).toBe('ht-3');
    expect(headingTierClass(3)).toBe('ht-4');
    expect(headingTierClass(4)).toBe('ht-5');
    expect(headingTierClass(6)).toBe('ht-5');
  });
});

describe('remarkRelevelHeadings', () => {
  it('rewrites heading depths and annotates tier classes in document order', () => {
    const tree = {
      type: 'root',
      children: [
        { type: 'heading', depth: 3, children: [] },
        { type: 'paragraph', children: [] },
        { type: 'heading', depth: 4, children: [] },
        { type: 'heading', depth: 2, children: [] },
      ],
    };

    remarkRelevelHeadings()(tree as never);

    const headings = tree.children.filter((node) => node.type === 'heading');
    expect(headings.map((node) => node.depth)).toEqual([2, 3, 2]);
    expect(headings.map((node) => node.data?.hProperties?.className)).toEqual([
      'ht-4',
      'ht-5',
      'ht-3',
    ]);
  });

  it('ignores non-heading nodes', () => {
    const tree = { type: 'root', children: [{ type: 'paragraph', children: [] }] };
    expect(() => remarkRelevelHeadings()(tree as never)).not.toThrow();
  });
});
