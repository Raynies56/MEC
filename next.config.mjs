/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Security headers for production
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    
    // In development, we need 'unsafe-eval' for Fast Refresh and error source maps
    // React/Next.js will NEVER use eval in production.
    const scriptSrc = isDev 
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.google.com https://*.googleapis.com https://*.googletagmanager.com"
      : "script-src 'self' 'unsafe-inline' https://*.google.com https://*.googleapis.com https://*.googletagmanager.com";

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.google.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://*.google.com https://*.googleapis.com https://*.gstatic.com https://*.supabase.co",
              "frame-src 'self' https://*.google.com https://google.com https://*.google.com.do https://*.gstatic.com",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.googleapis.com https://*.google.com https://*.google-analytics.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
