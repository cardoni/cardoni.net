import { absoluteUrl, serializeJsonLd, siteConfig } from '@/lib/site';

interface CollectionItem {
  name: string;
  pathname: string;
}

interface CollectionPageJsonLdProps {
  name: string;
  description: string;
  pathname: string;
  items: CollectionItem[];
  breadcrumbs: CollectionItem[];
}

export default function CollectionPageJsonLd({
  name,
  description,
  pathname,
  items,
  breadcrumbs,
}: CollectionPageJsonLdProps) {
  const pageUrl = absoluteUrl(pathname);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collection`,
    url: pageUrl,
    name,
    description,
    inLanguage: siteConfig.locale,
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: absoluteUrl(breadcrumb.pathname),
      })),
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.pathname),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
    />
  );
}
