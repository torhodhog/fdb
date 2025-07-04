const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["sharp", "node-fetch", "payload"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fotballdb.no",
      },
      {
        protocol: "https",
        hostname: "www.fotballdb.no",
      },
      {
        protocol: "https",
        hostname: "forsoker-ny-botte.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "fdb-storage.s3.eu-north-1.amazonaws.com",
        pathname: "/**",
      },
      ...(!isProduction
        ? [
            {
              protocol: "http",
              hostname: "localhost",
            },
          ]
        : []),
    ],
  },
  env: {
    NEXT_PUBLIC_SERVER_URL:
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  },
  async rewrites() {
    return [
      {
        source: "/sell",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/admin`,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Mark sharp as an external module so it doesn't get bundled
    if (isServer) {
      config.externals.push("sharp");
    }

    // Disable webpack caching to prevent stale builds
    config.cache = false;

    return config;
  },
};

module.exports = nextConfig;
