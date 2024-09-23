const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fotballdb.no',
      },
      {
        protocol: 'https',
        hostname: 'www.fotballdb.no',
      },
     
      {
        protocol: 'https',
        hostname: 'forsoker-ny-botte.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SERVER_URL:
      process.env.NEXT_PUBLIC_SERVER_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://fotballdb.no'
        : 'http://localhost:3000'),
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/sell',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/admin`,
      },
    ];
  },
};

module.exports = nextConfig;
