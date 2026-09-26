import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: '/tag',
        destination: '/tags',
        permanent: true,
      },
      {
        source: '/tags/:tag',
        destination: '/tag/:tag',
        permanent: true,
      },
      // Consolidated tag synonyms (permanent redirects to canonical tags)
      {
        source: '/tag/postgres',
        destination: '/tag/postgresql',
        permanent: true,
      },
      {
        source: '/tag/databases',
        destination: '/tag/database',
        permanent: true,
      },
      {
        source: '/tag/regular-expression',
        destination: '/tag/regex',
        permanent: true,
      },
      {
        source: '/tag/brew',
        destination: '/tag/homebrew',
        permanent: true,
      },
      {
        source: '/tag/wordpos-module',
        destination: '/tag/wordpos',
        permanent: true,
      },
      {
        source: '/tag/button-to',
        destination: '/tag/button_to',
        permanent: true,
      },
      {
        source: '/tag/link-to',
        destination: '/tag/link_to',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
