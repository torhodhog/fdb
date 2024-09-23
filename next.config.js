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
      // Hvis "localhost" kun er nødvendig for utvikling, kan du vurdere å fjerne denne fra produksjonsmiljøet.
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
    NEXT_PUBLIC_SERVER_URL: process.env.NODE_ENV === 'production' 
      ? 'https://fotballdb.no' 
      : 'http://localhost:3000',
    // Legg til andre miljøvariabler hvis nødvendig
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
        destination: 'https://fotballdb.no/admin', // Endret for å bruke direkte produksjons-URL
      },
    ];
  },
};

module.exports = nextConfig;
