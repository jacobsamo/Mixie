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
      'media4.giphy.com',
    ],
  },
};

module.exports = nextConfig;
