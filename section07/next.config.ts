import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //logging data fetching
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
