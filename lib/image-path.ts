/**
 * Get the full image path with basePath prefix for GitHub Pages
 * @param path - The image path (e.g., "/images/logo.png")
 * @returns The full path with basePath prefix
 */
export function getImagePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  // Handle undefined, empty string, whitespace, or literal quote strings
  if (!basePath || basePath.trim() === '' || basePath === "''" || basePath === '""') {
    return path;
  }
  return `${basePath}${path}`;
}

