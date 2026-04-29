/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    // Allows images from any domain if needed, or specific domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
