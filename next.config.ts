import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/tropa",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
