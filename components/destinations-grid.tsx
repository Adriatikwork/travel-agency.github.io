"use client"

import { Star, MapPin, Clock, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImagePath } from "@/lib/image-path"
import { useState } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import destinationsData from "@/data/destinations"

interface Destination {
  id: string
  slug: string
  name: string
  city: string
  country: { en: string; sq: string }
  continent: string
  tagline: { en: string; sq: string }
  descriptionShort: { en: string; sq: string }
  descriptionLong: { en: string; sq: string }
  primaryImage: string
  pricing: {
    from: number
    currency: string
    perPerson: boolean
    priceCategory: string
    note?: { en: string; sq: string }
  }
  duration: {
    minNights: number
    maxNights: number
    specificDates?: { en: string; sq: string }
  }
  mealPlan?: { en: string; sq: string } | null
  rating: number | null
  featured: boolean
  isNew: boolean
  themes: string[]
  tags: { en: string[]; sq: string[] }
  included?: { en: string[]; sq: string[] } | null
  highlights?: { en: string[]; sq: string[] }
  availableDepartureIds: string[]
}

interface DestinationsGridProps {
  destinations: Destination[]
  departures: Array<{
    id: string
    city: { en: string; sq: string }
    country: { en: string; sq: string }
  }>
  currency: string
}

export function DestinationsGrid({ destinations, departures, currency }: DestinationsGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const { language } = useLanguage()
  const ui = destinationsData.ui

  if (destinations.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">{ui.noDestinations[language]}</p>
        <p className="text-sm text-gray-400 mt-2">{ui.tryAdjusting[language]}</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center max-w-7xl mx-auto px-2 sm:px-0">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 w-full max-w-[340px]"
            onMouseEnter={() => setHoveredCard(destination.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img
                src={getImagePath(destination.primaryImage || "/placeholder.svg")}
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Badges - Use translated text */}
              <div className="absolute top-4 left-4 flex gap-2">
                {destination.featured && (
                  <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-semibold rounded-full">
                    {ui.featured[language]}
                  </span>
                )}
                {destination.isNew && (
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    {ui.new[language]}
                  </span>
                )}
              </div>

              {/* Rating */}
              {destination.rating && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-900">{destination.rating}</span>
                </div>
              )}

              {/* Location - Use translated country */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {destination.city}, {destination.country[language]}
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 group-hover:text-sky-600 transition-colors text-balance">
                  {destination.name}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 italic mb-2 line-clamp-1">
                  {destination.tagline[language]}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed text-pretty">
                  {destination.descriptionShort[language]}
                </p>
              </div>

              {/* Themes */}
              <div className="flex flex-wrap gap-1.5">
                {destination.themes.slice(0, 3).map((theme) => (
                  <span
                    key={theme}
                    className="px-2 sm:px-2.5 py-0.5 bg-sky-100 text-sky-700 text-[10px] sm:text-xs font-medium rounded-full capitalize"
                  >
                    {theme}
                  </span>
                ))}
              </div>

              {/* Duration and Price */}
              <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-200">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="text-[10px] sm:text-xs">
                    {destination.duration.minNights === destination.duration.maxNights
                      ? `${destination.duration.minNights} ${ui.nights[language]}`
                      : `${destination.duration.minNights}-${destination.duration.maxNights} ${ui.nights[language]}`}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-[10px] sm:text-xs text-gray-500">{ui.from[language]}</div>
                  <div className="text-lg sm:text-xl font-bold text-sky-600">
                    {currency}
                    {destination.pricing.from}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-sky-600/95 to-sky-500/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-full h-full flex flex-col items-center justify-center px-6 sm:px-8 py-4 sm:py-6 text-center">
                <div className="flex-1 flex flex-col items-center justify-center space-y-2 sm:space-y-4 max-w-[280px]">
                  <h4 className="text-2xl sm:text-3xl font-bold text-white leading-tight text-balance">
                    {destination.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/95 leading-relaxed line-clamp-3 text-pretty">
                    {destination.descriptionLong[language]}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-white/90">
                    <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="text-pretty">
                      {ui.availableFrom[language]} {destination.availableDepartureIds.length} {ui.airports[language]}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3 w-full max-w-[280px] mt-auto pt-3 sm:pt-4">
                  <Button
                    className="flex-1 bg-white text-sky-600 hover:bg-white/90 font-semibold rounded-xl shadow-lg h-10 sm:h-11 text-xs sm:text-sm touch-manipulation"
                    asChild
                  >
                    <Link href={`/destinations/${destination.slug}`}>
                      <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      {ui.viewDetails[language]}
                    </Link>
                  </Button>
                  <Button
                    className="flex-1 bg-sky-700 text-white hover:bg-sky-800 font-semibold rounded-xl shadow-lg border-2 border-white/20 h-10 sm:h-11 text-xs sm:text-sm touch-manipulation"
                    asChild
                  >
                    <Link href={`/destinations/${destination.slug}`}>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      {ui.bookNow[language]}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
