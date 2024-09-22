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
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'forsoker-ny-botte.s3.eu-north-1.amazonaws.com',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL || 
                            (process.env.NODE_ENV === 'production' 
                             ? 'https://fotballdb.no' 
                             : 'http://localhost:3000'),
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
