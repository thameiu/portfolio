/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cyber.dabamos.de",
        pathname: "/88x31/**",
      },
    ],
  },
};

module.exports = nextConfig;
