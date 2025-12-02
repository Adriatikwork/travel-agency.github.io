"use client"

import { Check, Tag, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImagePath } from "@/lib/image-path"
import { useState } from "react"

interface Package {
  id: string
  title: string
  destinationId: string
  destinationName?: string
  summary: string
  image: string
  price: number
  duration: number
  inclusions: string[]
  packageType: string
  themes: string[]
  isFeatured: boolean
  isOnSale: boolean
}

interface PackagesSectionProps {
  packages: Package[]
  currency: string
}

export function PackagesSection({ packages, currency }: PackagesSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  if (packages.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Curated Travel Packages</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All-inclusive experiences crafted for unforgettable journeys
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-[1020px] mx-auto">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-[310px]"
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={getImagePath(pkg.image || "/placeholder.svg")}
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
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      On Sale
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 text-white">
                  {pkg.destinationName && <div className="text-sm opacity-90">{pkg.destinationName}</div>}
                  <div className="text-2xl font-bold">{pkg.title}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{pkg.summary}</p>

                {/* Inclusions */}
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-900">What's Included:</div>
                  <div className="space-y-1">
                    {pkg.inclusions.slice(0, 3).map((inclusion, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                        <Check className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{inclusion}</span>
                      </div>
                    ))}
                    {pkg.inclusions.length > 3 && (
                      <div className="text-xs text-gray-500 ml-5">+{pkg.inclusions.length - 3} more inclusions</div>
                    )}
                  </div>
                </div>

                {/* Duration and Price */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs">{pkg.duration} nights</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">From</div>
                    <div className="text-xl font-bold text-blue-700">
                      {currency}
                      {pkg.price}
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg py-2 text-sm">
                  Book Package
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
