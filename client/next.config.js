/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'rider-app.onrender.com', 'rider-app-delta.vercel.app'],
  },
};

module.exports = nextConfig;
