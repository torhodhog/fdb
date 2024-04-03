const nextConfig = {
   images: {
      remotePatterns: [
         'fotballdb.no/*',
         'localhost/*',
         // Legg til riktig URL for S3-bøtten din her
         'forsoker-ny-botte.s3.amazonaws.com/*',
      ],
   },
};

module.exports = nextConfig;