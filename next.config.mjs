/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.google.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'res.cloudinary.com',
      'i.imgur.com',
      'localhost'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;