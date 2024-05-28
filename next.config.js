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
  reactStrictMode: true, // Legg til dette for å aktivere strict mode
  swcMinify: true, // Legg til dette for å aktivere SWC minifier
};

module.exports = nextConfig;
