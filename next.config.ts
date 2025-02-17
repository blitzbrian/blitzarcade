import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cache.downloadroms.io'], // Add the external CDN domain here
  },
};

export default nextConfig;
