import './env.mjs';
import { env } from './env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["types", "tailwind-config"],
  images: {
    domains: [
      "img.taste.com.au",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "avatars.githubusercontent.com",
      "facebook.com",
      "media4.giphy.com",
      // good free images websites
      "unsplash.com",
      "source.unsplash.com",
      "images.unsplash.com",
      "isorepublic.com",
      "pixabay.com",
      "pexels.com",
      "savee.com",
      "dr.savee-cdn.com",
      "via.placeholder.com",
    ],
  },
  // headers: async () => {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value:
  //             process.env.NODE_ENV === "production"
  //               ? "https://www.meally.com.au"
  //               : "http://localhost:3000",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // experimental: {
  //   serverActions: true,
  // },
};

export default nextConfig;
