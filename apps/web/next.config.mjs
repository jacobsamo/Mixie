import { withSentryConfig } from "@sentry/nextjs";
import "./env.mjs";
import { env } from "./env.mjs";

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

export default withSentryConfig(nextConfig, {
  org: env.SENTRY_ORG,
  project: env.SENTRY_PROJECT,
  authToken: env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  telemetry: false,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
});
