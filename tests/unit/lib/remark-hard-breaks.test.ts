import { describe, expect, it } from 'vitest';
import { remarkHardBreaks } from '@/lib/remark-hard-breaks';

describe('remarkHardBreaks', () => {
  it('splits single newlines in text into break nodes', () => {
    const tree = {
      type: 'root',
      children: [{ type: 'paragraph', children: [{ type: 'text', value: 'first line\nsecond line' }] }],
    };

    remarkHardBreaks()(tree);

    expect(tree.children[0].children).toEqual([
      { type: 'text', value: 'first line' },
      { type: 'break' },
      { type: 'text', value: 'second line' },
    ]);
  });

  it('handles text nested inside inline formatting and leaves code alone', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'strong', children: [{ type: 'text', value: 'a\nb' }] },
            { type: 'inlineCode', value: 'x\ny' },
            { type: 'text', value: 'no newline' },
          ],
        },
        { type: 'code', value: 'line 1\nline 2' },
      ],
    };

    remarkHardBreaks()(tree);

    const [paragraph, code] = tree.children;
    expect(paragraph.children?.[0]).toEqual({
      type: 'strong',
      children: [{ type: 'text', value: 'a' }, { type: 'break' }, { type: 'text', value: 'b' }],
    });
    expect(paragraph.children?.[1]).toEqual({ type: 'inlineCode', value: 'x\ny' });
    expect(paragraph.children?.[2]).toEqual({ type: 'text', value: 'no newline' });
    expect(code).toEqual({ type: 'code', value: 'line 1\nline 2' });
  });
});
