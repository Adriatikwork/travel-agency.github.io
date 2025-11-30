/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: '/travel-agency.github.io',
  assetPrefix: '/travel-agency.github.io',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/travel-agency.github.io',
  },
}

export default nextConfig
