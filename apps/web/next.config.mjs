import "./env.mjs";
import { withAxiom } from "next-axiom";

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
    optimizePackageImports: ["posthog-js", "next-axiom"],
  },
  transpilePackages: ["@mixie/tailwind-config", "@mixie/supabase"]
};

export default withAxiom(nextConfig);
