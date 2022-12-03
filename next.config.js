/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  assetPrefix: './',
  exportPathMap: async function (
    defaultPathMap, {
      dev,
      dir,
      outDir,
      distDir,
      buildId
    }
  ) {
    return {
      '/': {
        page: '/'

      },
      '/login': {
        page: '/login'

      },
      '/register': {
        page: '/register'

      },
    }
  },
  images: {
    domains: [
      "images.unsplash.com",
      "firebasestorage.googleapis.com"
    ],
    loader: 'akamai',
    path: '',
  },
  nextConfig
}