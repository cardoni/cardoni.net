import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CollectionPageJsonLd from '@/components/CollectionPageJsonLd';

describe('CollectionPageJsonLd', () => {
  it('describes the canonical collection, breadcrumbs, and listed pages', () => {
    const { container } = render(
      <CollectionPageJsonLd
        name="Heroku writing"
        description="Essays tagged Heroku."
        pathname="/tag/heroku"
        items={[{ name: 'Deploying to Heroku', pathname: '/deploying-to-heroku' }]}
        breadcrumbs={[
          { name: 'Home', pathname: '/' },
          { name: 'Tags', pathname: '/tags' },
          { name: 'Heroku', pathname: '/tag/heroku' },
        ]}
      />,
    );

    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script?.textContent || '{}');

    expect(data).toMatchObject({
      '@type': 'CollectionPage',
      '@id': 'https://cardoni.net/tag/heroku#collection',
      url: 'https://cardoni.net/tag/heroku',
      inLanguage: 'en-US',
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: 1,
      },
    });
    expect(data.breadcrumb.itemListElement).toHaveLength(3);
    expect(data.mainEntity.itemListElement[0]).toMatchObject({
      position: 1,
      name: 'Deploying to Heroku',
      url: 'https://cardoni.net/deploying-to-heroku',
    });
  });
});
