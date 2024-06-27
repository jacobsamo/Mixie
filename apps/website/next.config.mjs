import "./env.mjs";
import { env } from "./env.mjs";
import { withAxiom } from "next-axiom";

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
    optimizePackageImports: ["posthog-js", "posthog-node", "next-axiom"],
  },
};

export default withAxiom(nextConfig);
