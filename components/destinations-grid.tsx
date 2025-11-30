"use client"

import { Star, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Destination {
  id: string
  slug: string
  name: string
  city: string
  country: string
  continent: string
  tagline: string
  descriptionShort: string
  primaryImage: string
  pricing: {
    from: number
    currency: string
  }
  duration: {
    minNights: number
    maxNights: number
  }
  rating: number
  featured: boolean
  isNew: boolean
  themes: string[]
  tags: string[]
}

interface DestinationsGridProps {
  destinations: Destination[]
  currency: string
}

export function DestinationsGrid({ destinations, currency }: DestinationsGridProps) {
  if (destinations.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">No destinations found matching your criteria.</p>
        <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <Card
          key={destination.id}
          className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-gray-200 cursor-pointer"
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={destination.primaryImage || "/placeholder.svg"}
              alt={destination.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {destination.featured && <Badge className="bg-sky-500 text-white border-0">Featured</Badge>}
              {destination.isNew && <Badge className="bg-green-500 text-white border-0">New</Badge>}
            </div>

            {/* Rating */}
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{destination.rating}</span>
            </div>

            {/* Destination Name */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-2xl font-bold text-white mb-1">{destination.name}</h3>
              <p className="text-sm text-white/90 italic">{destination.tagline}</p>
            </div>
          </div>

          <CardContent className="p-5 space-y-4">
            {/* Location */}
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {destination.city}, {destination.country}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed">{destination.descriptionShort}</p>

            {/* Themes */}
            <div className="flex flex-wrap gap-2">
              {destination.themes.slice(0, 3).map((theme) => (
                <Badge key={theme} variant="outline" className="text-xs capitalize border-sky-200 text-sky-700">
                  {theme}
                </Badge>
              ))}
            </div>

            {/* Price and Duration */}
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
                    {destination.duration.minNights}-{destination.duration.maxNights} nights
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
