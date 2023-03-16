/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['ui', 'libs'],

  images: {
    domains: [
      'img.taste.com.au',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'images.unsplash.com',
      'unsplash.com',
      'media4.giphy.com',
    ],
  },
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
};

module.exports = nextConfig;
