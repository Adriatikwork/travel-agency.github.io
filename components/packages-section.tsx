"use client"

import { Check, Tag, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Packages</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Carefully curated travel packages with everything included for your perfect vacation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={getImagePath(pkg.image || "/placeholder.svg")}
                  alt={pkg.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t transition-all duration-300 ${
                    hoveredCard === pkg.id
                      ? "from-black/70 via-black/30 to-transparent"
                      : "from-black/50 to-transparent"
                  }`}
                />

                <div className="absolute top-3 left-3 flex gap-2">
                  {pkg.isFeatured && <Badge className="bg-sky-500 text-white border-0 shadow-lg">Featured</Badge>}
                  {pkg.isOnSale && (
                    <Badge className="bg-red-500 text-white border-0 shadow-lg">
                      <Tag className="h-3 w-3 mr-1" />
                      On Sale
                    </Badge>
                  )}
                </div>

                {pkg.destinationName && (
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-semibold text-sm drop-shadow-lg">{pkg.destinationName}</p>
                  </div>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{pkg.summary}</p>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <Badge variant="outline" className="capitalize">
                    {pkg.duration} nights
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {pkg.packageType.replace("-", " ")}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Includes:</p>
                  <ul className="space-y-1">
                    {pkg.inclusions.slice(0, 4).map((inclusion, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{inclusion}</span>
                      </li>
                    ))}
                    {pkg.inclusions.length > 4 && (
                      <li className="text-sm text-gray-500 ml-6">+{pkg.inclusions.length - 4} more</li>
                    )}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">From</p>
                  <p className="text-3xl font-bold text-sky-600">
                    {currency}
                    {pkg.price}
                  </p>
                </div>
                <Button className="bg-sky-500 hover:bg-sky-600 shadow-lg hover:shadow-xl transition-all group">
                  View Details
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
