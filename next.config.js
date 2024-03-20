const nextConfig = {
   images: {
      domains: ['fdb-production-6f13.up.railway.app'],
   },
   webpack: (config, { isServer }) => {
      if (!isServer) {
         config.resolve.fallback.fs = false;
         config.resolve.fallback.readline = false;
      }

      return config;
   },
};

module.exports = nextConfig;