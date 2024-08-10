/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sinarbajakediri.my.id",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "@phosphor-icons/react",
      "@nextui-org/react",
      "@ckeditor/ckeditor5-react",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
