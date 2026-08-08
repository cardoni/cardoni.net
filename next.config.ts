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
    ];
  },
};

export default nextConfig;
