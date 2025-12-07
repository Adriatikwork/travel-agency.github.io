"use client"

import { Check, Tag, ArrowRight, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getImagePath } from "@/lib/image-path"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import packagesData from "@/data/packages"

interface Package {
  id: string
  title: { en: string; sq: string }
  destinationId: string
  destinationName?: string
  summary: { en: string; sq: string }
  image: string
  price: number
  duration: number
  inclusions: { en: string[]; sq: string[] }
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const { language } = useLanguage()
  const ui = packagesData.ui

  if (packages.length === 0) {
    return null
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % packages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + packages.length) % packages.length)
  }

  const getVisiblePackages = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % packages.length
      visible.push({ ...packages[index], position: i })
    }
    return visible
  }

  const visiblePackages = getVisiblePackages()

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-balance">{ui.title[language]}</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto text-pretty">{ui.subtitle[language]}</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={prevSlide}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110"
            aria-label="Previous package"
          >
            <ChevronLeft className="w-6 h-6 text-[#38b6ff]" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all hover:scale-110"
            aria-label="Next package"
          >
            <ChevronRight className="w-6 h-6 text-[#38b6ff]" />
          </button>

          <div className="overflow-hidden px-2 sm:px-4">
            <div className="flex gap-4 sm:gap-6 transition-transform duration-500">
              {visiblePackages.map((pkg, idx) => (
                <div
                  key={`${pkg.id}-${idx}`}
                  className="flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#38b6ff] shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden">
                    <img
                      src={getImagePath(pkg.image || "/placeholder.svg")}
                      alt={pkg.title[language]}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                    <div className="absolute top-4 left-4 flex gap-2">
                      {pkg.isFeatured && (
                        <span className="px-3 py-1 bg-yellow-400 text-gray-900 text-xs font-semibold rounded-full">
                          {ui.featured[language]}
                        </span>
                      )}
                      {pkg.isOnSale && (
                        <span className="px-3 py-1 bg-[#38b6ff] text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {ui.onSale[language]}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 text-white">
                      {pkg.destinationName && <div className="text-sm opacity-90">{pkg.destinationName}</div>}
                      <div className="text-2xl font-bold">{pkg.title[language]}</div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{pkg.summary[language]}</p>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-gray-900">{ui.whatsIncluded[language]}</div>
                      <div className="space-y-1">
                        {pkg.inclusions[language].slice(0, 3).map((inclusion, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                            <Check className="w-3.5 h-3.5 text-[#38b6ff] mt-0.5 flex-shrink-0" />
                            <span>{inclusion}</span>
                          </div>
                        ))}
                        {pkg.inclusions[language].length > 3 && (
                          <div className="text-xs text-gray-500 ml-5">
                            +{pkg.inclusions[language].length - 3} {ui.moreInclusions[language]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="text-xs">
                          {pkg.duration} {ui.nights[language]}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{ui.from[language]}</div>
                        <div className="text-xl font-bold text-[#38b6ff]">
                          {currency}
                          {pkg.price}
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-[#38b6ff] hover:bg-[#2a9de8] text-white rounded-xl shadow-lg py-2 text-sm transition-colors">
                      {ui.bookPackage[language]}
                      <ArrowRight className="w-3.5 h-3.5 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {packages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 sm:h-2.5 rounded-full transition-all touch-manipulation ${
                  idx === currentIndex ? "bg-[#38b6ff] w-8 sm:w-10" : "bg-gray-300 w-2 sm:w-2.5"
                }`}
                aria-label={`Go to package ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
