/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  output: "standalone", // Ensures the app runs as a server, preventing static rendering issues
};

export default nextConfig;
