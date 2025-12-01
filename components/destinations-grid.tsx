"use client"

import { Star, MapPin, Clock, ArrowRight, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getImagePath } from "@/lib/image-path"
import { useState } from "react"
import { DestinationDetailModal } from "./destination-detail-modal"

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
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = (destination: Destination) => {
    setSelectedDestination(destination)
    setIsModalOpen(true)
  }

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Card
            key={destination.id}
            className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-gray-200 cursor-pointer relative"
            onMouseEnter={() => setHoveredCard(destination.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleViewDetails(destination)}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={getImagePath(destination.primaryImage || "/placeholder.svg")}
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
                  hoveredCard === destination.id
                    ? "from-black/80 via-black/50 to-transparent"
                    : "from-black/60 via-black/20 to-transparent"
                }`}
              />

              <div
                className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                  hoveredCard === destination.id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 mx-4 text-center shadow-xl transform transition-all duration-300">
                  <Info className="h-6 w-6 text-sky-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-700 font-medium mb-3 line-clamp-2">{destination.descriptionShort}</p>
                  <div className="flex gap-2 justify-center">
                    <Button
                      size="sm"
                      className="bg-sky-500 hover:bg-sky-600 text-white shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleViewDetails(destination)
                      }}
                    >
                      View Details
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="absolute top-3 left-3 flex gap-2">
                {destination.featured && <Badge className="bg-sky-500 text-white border-0">Featured</Badge>}
                {destination.isNew && <Badge className="bg-green-500 text-white border-0">New</Badge>}
              </div>

              {destination.rating && (
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
                <p className="text-sm text-white/90 italic">{destination.tagline}</p>
              </div>
            </div>

            <CardContent className="p-5 space-y-4">
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {destination.city}, {destination.country}
                </span>
              </div>

              <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">{destination.descriptionShort}</p>

              <div className="flex flex-wrap gap-2">
                {destination.themes.slice(0, 3).map((theme) => (
                  <Badge key={theme} variant="outline" className="text-xs capitalize border-sky-200 text-sky-700">
                    {theme}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500">From</p>
                  <p className="text-2xl font-bold text-sky-600">
                    {currency}
                    {destination.pricing.from}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>
                      {destination.duration.minNights === destination.duration.maxNights
                        ? `${destination.duration.minNights} nights`
                        : `${destination.duration.minNights}-${destination.duration.maxNights} nights`}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DestinationDetailModal
        destination={selectedDestination}
        departures={departures}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currency={currency}
      />
    </>
  )
}
