import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://static.atlasacademy.io/JP/Items/**")],
  },
};

export default nextConfig;
