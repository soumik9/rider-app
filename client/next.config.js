/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'render.com', 'rider-app.onrender.com'],
  },
};

module.exports = nextConfig;
