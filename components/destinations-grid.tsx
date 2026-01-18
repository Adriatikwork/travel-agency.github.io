"use client"

import { MapPin, ArrowRight, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import destinationsData from "@/data/destinations"
import { UnifiedCard } from "@/components/unified-card"

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
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

  const nextSlide = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = container.offsetWidth * 0.85
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
    setCurrentIndex((prev) => Math.min(prev + 1, destinations.length - 1))
  }

  const prevSlide = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = container.offsetWidth * 0.85
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    }
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const renderCard = (destination: Destination) => {
    const badges = []
    if (destination.featured) {
      badges.push({ text: ui.featured[language], color: "yellow" as const })
    }
    if (destination.isNew) {
      badges.push({ text: ui.new[language], color: "green" as const })
    }

    return (
      <UnifiedCard
        image={destination.primaryImage || "/placeholder.svg"}
        imageAlt={destination.name}
        badges={badges}
        rating={destination.rating || undefined}
        location={
          <>
            <MapPin className="w-4 h-4 inline mr-1.5" />
            {destination.city}, {destination.country[language]}
          </>
        }
        title={destination.name}
        subtitle={destination.tagline[language]}
        description={destination.descriptionShort[language]}
        tags={destination.themes}
        duration={destination.duration.minNights}
        durationLabel={ui.nights[language]}
        price={destination.pricing.from}
        currency={currency}
        priceLabel={ui.from[language]}
        hoverContent={
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
        }
        className="w-full h-full"
      />
    )
  }

  return (
    <>
      {/* Mobile/Tablet Carousel (< lg) */}
      <div className="lg:hidden relative max-w-7xl mx-auto px-4">
        {destinations.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2.5 hover:bg-gray-50 transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous destination"
            >
              <ChevronLeft className="w-5 h-5 text-[#38b6ff]" />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentIndex >= destinations.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2.5 hover:bg-gray-50 transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next destination"
            >
              <ChevronRight className="w-5 h-5 text-[#38b6ff]" />
            </button>
          </>
        )}

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-4 pb-4">
            {destinations.map((destination) => (
              <div key={destination.id} className="flex-shrink-0 w-[85%] sm:w-[70%] snap-center">
                {renderCard(destination)}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {destinations.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {destinations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "bg-[#38b6ff] w-8" : "bg-gray-300 w-2"
                }`}
                aria-label={`Go to destination ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop Grid (>= lg) */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-6">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
            >
              {renderCard(destination)}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
