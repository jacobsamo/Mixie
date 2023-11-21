import "./env.mjs";
import { env } from "./env.mjs";

if (env.NODE_ENV === "development") {
  process.env.VERCEL_URL = "http://localhost:3000";
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["tailwind-config"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*" }],
  },
};

export default nextConfig;
