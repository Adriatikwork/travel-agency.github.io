import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Helper function to get correct asset paths for public folder assets.
 * Works automatically across all deployment scenarios:
 * - Local development: no prefix
 * - GitHub Pages: adds /repo-name prefix (if configured)
 * - Custom domain: no prefix
 *
 * Usage: assetPath('/images/photo.jpg') or assetPath('/logo.svg')
 */
export function assetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return `${basePath}${path}`
}
