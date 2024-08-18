const path = require('path');

const nextConfig = {
  images: {
    domains: [
      'fotballdb.no',
      'www.fotballdb.no',
      'localhost',
      'forsoker-ny-botte.s3.eu-north-1.amazonaws.com'
    ],
  },
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://fotballdb.no',
    // Legg til andre miljøvariabler hvis nødvendig
  },
  reactStrictMode: true, // Aktiverer strict mode for å fange opp potensielle problemer
  swcMinify: true, // Aktiverer SWC minifier for raskere builds
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;