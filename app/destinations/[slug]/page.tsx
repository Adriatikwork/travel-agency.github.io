import { notFound } from "next/navigation"
import destinationsData from "@/data/destinations"
import { DestinationPageClient } from "./page-client"

// Generate static params for all destinations at build time
export async function generateStaticParams() {
  return destinationsData.destinations.map((dest) => ({
    slug: dest.slug,
  }))
}

// Ensure this page is statically generated
export const dynamicParams = false

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  // Handle both Promise and direct params (Next.js 15+ compatibility)
  const resolvedParams = params instanceof Promise ? await params : params
  const destination = destinationsData.destinations.find((d) => d.slug === resolvedParams.slug)

  if (!destination) {
    notFound()
    return null
  }

  return <DestinationPageClient slug={resolvedParams.slug} />
}
