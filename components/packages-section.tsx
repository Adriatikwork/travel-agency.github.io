"use client"

import { Check, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getImagePath } from "@/lib/image-path"

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
            <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-56 overflow-hidden">
                <img src={getImagePath(pkg.image || '/placeholder.svg')} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Labels */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {pkg.isFeatured && <Badge className="bg-sky-500 text-white border-0">Featured</Badge>}
                  {pkg.isOnSale && (
                    <Badge className="bg-red-500 text-white border-0">
                      <Tag className="h-3 w-3 mr-1" />
                      On Sale
                    </Badge>
                  )}
                </div>

                {/* Destination */}
                {pkg.destinationName && (
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-semibold text-sm">{pkg.destinationName}</p>
                  </div>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{pkg.summary}</p>
                </div>

                {/* Duration & Type */}
                <div className="flex items-center gap-3 text-sm">
                  <Badge variant="outline" className="capitalize">
                    {pkg.duration} nights
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {pkg.packageType.replace("-", " ")}
                  </Badge>
                </div>

                {/* Inclusions */}
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
                <Button className="bg-sky-500 hover:bg-sky-600">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
