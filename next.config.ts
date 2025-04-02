// next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'scontent-ord5-2.cdninstagram.com',
      'scontent-lga3-1.cdninstagram.com',
      'scontent-lga3-2.cdninstagram.com',
      'scontent-lga3-3.cdninstagram.com',
      'scontent-lga3-4.cdninstagram.com',
      'scontent-atl3-1.cdninstagram.com',  // Add the missing domain here
    ],
  },
};

export default nextConfig;

