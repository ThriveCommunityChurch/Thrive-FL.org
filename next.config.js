/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    // Enable modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 1 year (31536000 seconds)
    minimumCacheTTL: 31536000,
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // Image sizes for srcset
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Custom headers for caching static assets
  async headers() {
    return [
      {
        // Cache all images in public folder for 1 year
        source: '/:path*.(jpg|jpeg|png|gif|webp|avif|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache Next.js static assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache optimized images from Next.js Image component
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Compiler optimizations
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
