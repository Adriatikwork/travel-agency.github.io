import type { MetadataRoute } from "next"
import destinationsData from "@/data/destinations"

const BASE_URL = "https://fluturo.co"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const destinationUrls = destinationsData.destinations.map((dest) => ({
    url: `${BASE_URL}/destinations/${dest.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/privacy/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    ...destinationUrls,
  ]
}
