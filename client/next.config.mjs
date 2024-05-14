/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Specify remote patterns to allow any hostname
    // In this case, it allows all hostnames for images
    domains: ["127.0.0.1"], // Add the hostname here
  },
};

export default nextConfig;
