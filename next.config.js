/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // experimental image setting is only used when transpiling to static html
  // experimental: {
    // images: {
      // unoptimized: true,
      // allowFutureImage: true
    // }
  // }
}

module.exports = nextConfig
