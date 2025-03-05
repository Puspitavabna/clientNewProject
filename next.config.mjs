/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Add By me
  images: {
    // domains: ['s3-alpha-sig.figma.com'],
    domains: [
      "s3-alpha-sig.figma.com",
      "localhost",
      "v5.backend.truzz.online",
      "backend.truzz.online",
      "www.flaticon.com",
      "www.youtube.com",
      "img.youtube.com",
      "i.postimg.cc",
      "media.istockphoto.com",
      "https://example.com"
    ],
  },
};

export default nextConfig;
