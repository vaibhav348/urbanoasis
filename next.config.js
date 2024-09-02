/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.oyoroomscdn.com",
      "www.google.com",
      "img.icons8.com"  // Add this line
    ],
  },
}

module.exports = nextConfig;
