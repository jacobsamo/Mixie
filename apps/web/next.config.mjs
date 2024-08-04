import "./env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*" }],
  },
  experimental: {
    instrumentationHook: true,
    serverActions: {
      bodySizeLimit: "3mb",
    },
    serverComponentsExternalPackages: [
      "pino",
      "pino-pretty",
      "@baselime/pino-transport",
    ],
    optimizePackageImports: ["posthog-js", "@supabase/ssr"],
  },
  transpilePackages: ["@mixie/tailwind-config", "@mixie/supabase"],
};

export default nextConfig;
