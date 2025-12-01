"use client"

import { useMemo } from "react"
import { MapPin, Star, Calendar, Info, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DestinationsGridProps {
  destinations: any
  filters: any
}

export function DestinationsGrid({ destinations, filters }: DestinationsGridProps) {
  const filteredAndSorted = useMemo(() => {
    if (!destinations) return []

    let results = [...destinations.destinations]

    // Apply search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      results = results.filter(
        (dest: any) =>
          dest.name.toLowerCase().includes(searchLower) ||
          dest.city.toLowerCase().includes(searchLower) ||
          dest.country.toLowerCase().includes(searchLower) ||
          dest.continent.toLowerCase().includes(searchLower) ||
          dest.themes.some((t: string) => t.toLowerCase().includes(searchLower)) ||
          dest.tagline.toLowerCase().includes(searchLower),
      )
    }

    // Apply filters
    results = results.filter((dest: any) => {
      if (dest.pricing.from < filters.priceMin || dest.pricing.from > filters.priceMax) return false
      if (dest.duration.minNights > filters.durationMax || dest.duration.maxNights < filters.durationMin) return false
      if (dest.rating < filters.minRating) return false
      if (filters.featuredOnly && !dest.featured) return false
      if (filters.themes.length > 0 && !filters.themes.some((t: string) => dest.themes.includes(t))) return false
      return true
    })

    // Apply sorting
    results.sort((a: any, b: any) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.pricing.from - b.pricing.from
        case "price-high":
          return b.pricing.from - a.pricing.from
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        case "popularity":
        default:
          return b.popularityScore - a.popularityScore
      }
    })

    return results
  }, [destinations, filters])

  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Explore Dream Destinations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            From pristine beaches to vibrant cities, discover your perfect escape
          </p>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No destinations match your criteria. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSorted.map((dest: any, index: number) => (
              <div
                key={dest.id}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.primaryImage || "/placeholder.svg?height=300&width=400&query=travel destination"}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    {dest.featured && (
                      <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    )}
                    {dest.isNew && (
                      <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">New</span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900">{dest.rating}</span>
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {dest.city}, {dest.country}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{dest.name}</h3>
                    <p className="text-sm text-muted-foreground italic mb-2">{dest.tagline}</p>
                    <p className="text-muted-foreground text-sm line-clamp-2">{dest.descriptionShort}</p>
                  </div>

                  {/* Themes */}
                  <div className="flex flex-wrap gap-2">
                    {dest.themes.slice(0, 3).map((theme: string) => (
                      <span
                        key={theme}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </span>
                    ))}
                  </div>

                  {/* Duration and Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {dest.duration.minNights}-{dest.duration.maxNights} nights
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">From</div>
                      <div className="text-2xl font-bold text-primary">€{dest.pricing.from.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-accent/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 gap-4">
                  <div className="text-white text-center space-y-3">
                    <h4 className="text-3xl font-bold">{dest.name}</h4>
                    <p className="text-sm leading-relaxed line-clamp-4">{dest.descriptionLong}</p>
                    <div className="flex items-center justify-center gap-2 text-sm pt-2">
                      <Info className="w-4 h-4" />
                      <span>Available from {dest.availableDepartureIds?.length || 0} airports</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
                    <Button
                      variant="secondary"
                      className="flex-1 bg-white text-primary hover:bg-white/90 font-semibold rounded-xl shadow-lg"
                      asChild
                    >
                      <Link href={`/destination/${dest.slug || dest.id}`}>
                        <Info className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                    <Button
                      className="flex-1 bg-accent text-white hover:bg-accent/90 font-semibold rounded-xl shadow-lg border-2 border-white/20"
                      asChild
                    >
                      <Link href={`/book/${dest.slug || dest.id}`}>
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
