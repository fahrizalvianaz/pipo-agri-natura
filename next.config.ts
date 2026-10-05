import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // The site is a single landing page; old section URLs land on the matching section.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/product", destination: "/#product", permanent: false },
      { source: "/sustainability", destination: "/#sustainability", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ];
  },
};

export default nextConfig;
