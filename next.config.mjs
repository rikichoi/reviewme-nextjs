/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "zumfm6boirlwmnsj.public.blob.vercel-storage.com" },
    ],
  },
  serverExternalPackages: ["@node-rs/argon2"],
};

export default nextConfig;
