"use client"

import { useMemo } from "react"
import { Check, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PackagesSectionProps {
  packages: any[]
  destinations: any
  filters: any
}

export function PackagesSection({ packages, destinations, filters }: PackagesSectionProps) {
  const filteredPackages = useMemo(() => {
    if (!packages || !destinations) return []

    let results = [...packages]

    // Apply filters
    if (filters.themes.length > 0) {
      results = results.filter((pkg: any) => filters.themes.some((t: string) => pkg.themes.includes(t)))
    }

    if (filters.priceMin > 0 || filters.priceMax < 10000) {
      results = results.filter(
        (pkg: any) => pkg.price.amount >= filters.priceMin && pkg.price.amount <= filters.priceMax,
      )
    }

    return results.slice(0, 6)
  }, [packages, filters])

  const getDestinationName = (destId: string) => {
    const dest = destinations.destinations.find((d: any) => d.id === destId)
    return dest ? dest.name : "Unknown"
  }

  if (filteredPackages.length === 0) return null

  return (
    <section id="packages" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Curated Travel Packages</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            All-inclusive experiences crafted for unforgettable journeys
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg: any, index: number) => (
            <div
              key={pkg.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {pkg.isFeatured && (
                    <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                  {pkg.isOnSale && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">On Sale</span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm opacity-90">{getDestinationName(pkg.destinationId)}</div>
                  <div className="text-2xl font-bold">{pkg.title}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">{pkg.summary}</p>

                {/* Inclusions */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-900">What's Included:</div>
                  <div className="space-y-1">
                    {pkg.inclusions.slice(0, 4).map((inclusion: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{inclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Duration and Price */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{pkg.duration.nights} nights</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Per person</div>
                    <div className="text-2xl font-bold text-blue-700">€{pkg.price.amount.toLocaleString()}</div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl">
                  Book Package
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
