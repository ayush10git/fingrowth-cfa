/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: "standalone", // Ensures the app runs as a server, preventing static rendering issues
};

export default nextConfig;
