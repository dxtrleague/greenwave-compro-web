import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "greenwave-compro-web";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  // GitHub Pages need assetPrefix for static files to be correctly resolved in sub-folders
  assetPrefix: isProd ? `/${repoName}` : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};


export default nextConfig;