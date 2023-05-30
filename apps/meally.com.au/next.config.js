/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['shared', 'libs'],

  images: {
    domains: [
      'img.taste.com.au',
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'facebook.com',
      'media4.giphy.com',
      // good free images websites
      'unsplash.com',
      'source.unsplash.com',
      'images.unsplash.com',
      'isorepublic.com',
      'pixabay.com',
      'pexels.com',
      'savee.com',
      'dr.savee-cdn.com',
    ],
  },
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = withPWA(nextConfig);
