import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'u-mercari-images.mercdn.net',
        port: '',
      },
    ],
  },
}

export default nextConfig
