import bundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";
import "./env.mjs";
import { env } from "./env.mjs";
import nextMdx from "@next/mdx";
import remarkGfm from "remark-gfm";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = nextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*" }],
  },
  pageExtensions: ["js", "jsx", "mdx", "md", "ts", "tsx"],
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
  async rewrites() {
    return [
      // for posthog proxy
      {
        source: "/_proxy/posthog/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/_proxy/posthog/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default withSentryConfig(withBundleAnalyzer(withMDX(nextConfig)), {
  org: env.SENTRY_ORG,
  project: env.SENTRY_PROJECT,
  authToken: env.SENTRY_AUTH_TOKEN,
  telemetry: false,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
});
