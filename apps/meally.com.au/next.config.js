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
      'dr.savee-cdn.com'
    ],
  },
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
};

module.exports = nextConfig;
