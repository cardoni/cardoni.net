import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TaxonomyLinks from '@/components/TaxonomyLinks';

describe('TaxonomyLinks', () => {
  it('links category and topic labels to their canonical archives with counts', () => {
    render(
      <TaxonomyLinks
        title="Related categories and topics"
        categories={[{
          name: 'personal pivot',
          slug: 'personal-pivot',
          href: '/categories/personal-pivot',
          count: 2,
          posts: [],
        }]}
        tags={[{
          name: 'proper nouns',
          slug: 'proper-nouns',
          href: '/tag/proper-nouns',
          count: 1,
          posts: [],
        }]}
      />,
    );

    expect(screen.getByRole('link', { name: /personal pivot 2 essays/i }))
      .toHaveAttribute('href', '/categories/personal-pivot');
    expect(screen.getByRole('link', { name: /proper nouns 1 essay/i }))
      .toHaveAttribute('href', '/tag/proper-nouns');
  });

  it('does not render an empty navigation landmark', () => {
    const { container } = render(<TaxonomyLinks title="Related categories and topics" />);

    expect(container).toBeEmptyDOMElement();
  });
});
