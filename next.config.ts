import type { NextConfig } from "next";

// Deployed on Vercel, which runs a real Next.js server. The static export and
// basePath juggling below existed only because GitHub Pages serves the site
// from a subfolder and cannot run a server.
const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
