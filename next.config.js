const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
      ...(!isProduction
        ? [
            {
              protocol: "http",
              hostname: "localhost",
            },
          ]
        : []),
    ],
    domains: ["localhost"], // Legg til denne linjen for å støtte next/image med localhost
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
    if (!isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        sharp: "commonjs sharp",
      });
    }

    return config;
  },
};

module.exports = nextConfig;
