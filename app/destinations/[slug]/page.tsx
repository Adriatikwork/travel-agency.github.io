import { notFound } from "next/navigation"
import type { Metadata } from "next"
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params
  const destination = destinationsData.destinations.find((d) => d.slug === resolvedParams.slug)

  if (!destination) {
    return {
      title: "Destination Not Found | Fluturo Travel Agency",
    }
  }

  const title = `${destination.name} Travel Package | Fluturo Travel Agency`
  const description =
    typeof destination.descriptionLong === "object"
      ? destination.descriptionLong.en
      : typeof destination.descriptionShort === "object"
      ? destination.descriptionShort.en
      : `Discover ${destination.name} with Fluturo Travel Agency. From €${destination.pricing.from} per person.`

  const image = destination.primaryImage || "/images/logo_landscape.png"
  const country = typeof destination.country === "object" ? destination.country.en : destination.country
  const canonicalUrl = `https://fluturo.co/destinations/${destination.slug}/`

  return {
    title,
    description,
    keywords: [
      destination.name,
      country,
      "travel package",
      "vacation",
      "fluturo",
      ...(destination.themes || []),
      ...(Array.isArray(destination.tags) ? destination.tags : destination.tags?.en || []),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalUrl,
      siteName: "Fluturo Travel Agency",
      images: [
        {
          url: image,
          width: 1200,
          height: 800,
          alt: `${destination.name} - Fluturo Travel Agency`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const resolvedParams = params instanceof Promise ? await params : params
  const destination = destinationsData.destinations.find((d) => d.slug === resolvedParams.slug)

  if (!destination) {
    notFound()
    return null
  }

  const country = typeof destination.country === "object" ? destination.country.en : destination.country
  const description =
    typeof destination.descriptionLong === "object"
      ? destination.descriptionLong.en
      : typeof destination.descriptionShort === "object"
      ? destination.descriptionShort.en
      : ""

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: `${destination.name} Travel Package`,
    description,
    url: `https://fluturo.co/destinations/${destination.slug}/`,
    image: destination.primaryImage,
    touristType: destination.themes || [],
    provider: {
      "@type": "TravelAgency",
      name: "Fluturo Travel Agency",
      url: "https://fluturo.co",
    },
    offers: {
      "@type": "Offer",
      price: destination.pricing.from,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `https://fluturo.co/destinations/${destination.slug}/`,
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: (
        Array.isArray(destination.highlights)
          ? destination.highlights
          : destination.highlights?.en || []
      ).map((h: string, i: number) => ({
        "@type": "ListItem",
        position: i + 1,
        name: h,
      })),
    },
    ...(destination.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: destination.rating,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    location: {
      "@type": "Place",
      name: destination.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: destination.city,
        addressCountry: country,
      },
      ...(destination.coordinates
        ? {
            geo: {
              "@type": "GeoCoordinates",
              latitude: destination.coordinates.lat,
              longitude: destination.coordinates.lon,
            },
          }
        : {}),
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DestinationPageClient slug={resolvedParams.slug} />
    </>
  )
}
