/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.taste.com.au', "lh3.googleusercontent.com"],
  },
}

module.exports = nextConfig
