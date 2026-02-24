import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@wedding/ui",
    "@wedding/actions",
    "@wedding/auth",
    "@wedding/config",
    "@wedding/database",
    "@wedding/email-templates",
  ],
};

export default nextConfig;
