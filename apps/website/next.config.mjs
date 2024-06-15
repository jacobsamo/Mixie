import "./env.mjs";
import { env } from "./env.mjs";

if (env.NODE_ENV === "development") {
  process.env.VERCEL_URL = "http://localhost:3000";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*" }],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
};

export default nextConfig;
