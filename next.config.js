/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true,
      // allowFutureImage: true
    }
  }
}

module.exports = nextConfig
