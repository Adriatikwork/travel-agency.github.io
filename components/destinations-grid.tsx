"use client"

import { Star, MapPin, Clock, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImagePath } from "@/lib/image-path"
import { useState } from "react"
import Link from "next/link"

interface Destination {
  id: string
  slug: string
  name: string
  city: string
  country: string
  continent: string
  tagline: string
  descriptionShort: string
  descriptionLong: string
  primaryImage: string
  pricing: {
    from: number
    currency: string
    perPerson: boolean
    priceCategory: string
    note?: string
  }
  duration: {
    minNights: number
    maxNights: number
    specificDates?: string
  }
  mealPlan?: string
  rating: number | null
  featured: boolean
  isNew: boolean
  themes: string[]
  tags: string[]
  included?: string[]
  highlights?: string[]
  availableDepartureIds: string[]
}

interface DestinationsGridProps {
  destinations: Destination[]
  departures: Array<{
    id: string
    city: string
    country: string
  }>
  currency: string
}

export function DestinationsGrid({ destinations, departures, currency }: DestinationsGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  if (destinations.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">No destinations found matching your criteria.</p>
        <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            onMouseEnter={() => setHoveredCard(destination.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={getImagePath(destination.primaryImage || "/placeholder.svg")}
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {destination.featured && (
                  <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-semibold rounded-full">
                    Featured
                  </span>
                )}
                {destination.isNew && (
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">New</span>
                )}
              </div>

              {/* Rating */}
              {destination.rating && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-900">{destination.rating}</span>
                </div>
              )}

              {/* Location */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {destination.city}, {destination.country}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-sky-600 transition-colors">{destination.name}</h3>
                <p className="text-sm text-gray-600 italic mb-2">{destination.tagline}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{destination.descriptionShort}</p>
              </div>

              {/* Themes */}
              <div className="flex flex-wrap gap-2">
                {destination.themes.slice(0, 3).map((theme) => (
                  <span key={theme} className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded-full capitalize">
                    {theme}
                  </span>
                ))}
              </div>

              {/* Duration and Price */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>
                    {destination.duration.minNights === destination.duration.maxNights
                      ? `${destination.duration.minNights} nights`
                      : `${destination.duration.minNights}-${destination.duration.maxNights} nights`}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">From</div>
                  <div className="text-2xl font-bold text-sky-600">
                    {currency}
                    {destination.pricing.from}
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-600/95 to-sky-500/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 gap-4">
              <div className="text-white text-center space-y-3">
                <h4 className="text-3xl font-bold">{destination.name}</h4>
                <p className="text-sm leading-relaxed line-clamp-4">{destination.descriptionLong}</p>
                <div className="flex items-center justify-center gap-2 text-sm pt-2">
                  <Info className="w-4 h-4" />
                  <span>Available from {destination.availableDepartureIds.length} airports</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                <Button
                  className="flex-1 bg-white text-sky-600 hover:bg-white/90 font-semibold rounded-xl shadow-lg"
                  asChild
                >
                  <Link href={`/destinations/${destination.slug}`}>
                    <Info className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                </Button>
                <Button
                  className="flex-1 bg-sky-700 text-white hover:bg-sky-800 font-semibold rounded-xl shadow-lg border-2 border-white/20"
                  asChild
                >
                  <Link href={`/destinations/${destination.slug}`}>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Book Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Removed DestinationDetailModal as it's not part of the updates */}
    </>
  )
}
