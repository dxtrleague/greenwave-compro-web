import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // Menggunakan remotePatterns lebih aman daripada domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**", // Mengizinkan semua path gambar dari Unsplash
      },
    ],
  },
};

export default nextConfig;