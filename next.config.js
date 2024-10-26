/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icons.iconarchive.com',
        pathname: '**',
      }
    ],
    domains: ['icons.iconarchive.com','source.unsplash.com']
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false
    
    return config
  }
}

module.exports = nextConfig
