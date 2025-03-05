import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Add this line
  },
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "www.flaticon.com",
        pathname: "/**", // Allow all paths
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/**", // Allow all paths
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
