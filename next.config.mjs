/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
// Use NEXT_PUBLIC_BASE_PATH from environment, or default to empty for root domain
// For project pages: set NEXT_PUBLIC_BASE_PATH=/your-repo-name in GitHub Actions
// For user/org pages: leave empty or set to empty string
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? '' : '');

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
  basePath: basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
