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
  }
};

module.exports = nextConfig;