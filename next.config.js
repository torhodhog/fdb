const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

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
      ...(!isProduction ? [
        {
          protocol: 'http',
          hostname: 'localhost',
        },
      ] : []),
    ],
  },
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  },
};

module.exports = nextConfig;