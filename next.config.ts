// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**', },
      // Unsplash
      {
        protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**',
      },
      // BING 
      {
        protocol: 'https', hostname: 'th.bing.com', pathname: '/**',
      },
      {
        protocol: 'https', hostname: 'www.bing.com', pathname: '/**',
      },
      {
        protocol: 'https', hostname: 'bing.com', pathname: '/**',
      },

      // Google / Google Images
      { protocol: 'https', hostname: 'lh3.googleusercontent.com', pathname: '/**' },
      { protocol: 'https', hostname: 'google.com', pathname: '/**' },

      // GIPHY
      { protocol: 'https', hostname: 'media.giphy.com', pathname: '/**' },

      // Imgur
      { protocol: 'https', hostname: 'i.imgur.com', pathname: '/**' },

      // Cloudinary
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },

      // Wikipedia / Wikimedia
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/**' },

      // Placeholder services
      { protocol: 'https', hostname: 'via.placeholder.com', pathname: '/**' },
      {
        protocol: 'https', hostname: 'ui-avatars.com', pathname: '/**',
      },
    ],
  },
};

export default nextConfig;