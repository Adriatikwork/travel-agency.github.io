"use client"

import { Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import packagesData from "@/data/packages"
import { UnifiedCard } from "@/components/unified-card"
import { useState, useRef } from "react"

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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const ui = packagesData.ui

  if (packages.length === 0) {
    return null
  }

  const nextSlide = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = container.offsetWidth * 0.85
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
    setCurrentIndex((prev) => Math.min(prev + 1, packages.length - 1))
  }

  const prevSlide = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollAmount = container.offsetWidth * 0.85
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    }
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const renderCard = (pkg: Package) => {
    const badges = []
    if (pkg.isFeatured) {
      badges.push({ text: ui.featured[language], color: "yellow" as const })
    }
    if (pkg.isOnSale) {
      badges.push({ text: ui.onSale[language], color: "blue" as const })
    }

    return (
      <UnifiedCard
        image={pkg.image || "/placeholder.svg"}
        imageAlt={pkg.title[language]}
        badges={badges}
        location={pkg.destinationName}
        title={pkg.title[language]}
        description={
          <div className="space-y-3">
            <p className="text-sm leading-relaxed line-clamp-2">{pkg.summary[language]}</p>
            <div className="space-y-2">
              <div className="text-xs font-semibold text-foreground">{ui.whatsIncluded[language]}</div>
              <div className="space-y-1.5">
                {pkg.inclusions[language].slice(0, 3).map((inclusion, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-xs text-foreground/80">
                    <Check className="w-3.5 h-3.5 text-sky-600 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{inclusion}</span>
                  </div>
                ))}
                {pkg.inclusions[language].length > 3 && (
                  <div className="text-xs text-muted-foreground ml-5">
                    +{pkg.inclusions[language].length - 3} {ui.moreInclusions[language]}
                  </div>
                )}
              </div>
            </div>
          </div>
        }
        duration={pkg.duration}
        durationLabel={ui.nights[language]}
        price={pkg.price}
        currency={currency}
        priceLabel={ui.from[language]}
        ctaButton={
          <Button className="w-full bg-[#38b6ff] hover:bg-[#2a9de8] text-white rounded-xl shadow-lg py-2 text-sm transition-colors">
            {ui.bookPackage[language]}
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Button>
        }
      />
    )
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-balance">{ui.title[language]}</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto text-pretty">{ui.subtitle[language]}</p>
        </div>

        <div className="lg:hidden relative max-w-7xl mx-auto px-4">
          {packages.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2.5 hover:bg-gray-50 transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous package"
              >
                <ChevronLeft className="w-5 h-5 text-[#38b6ff]" />
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex >= packages.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-2.5 hover:bg-gray-50 transition-all hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next package"
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
              {packages.map((pkg) => (
                <div key={pkg.id} className="flex-shrink-0 w-[85%] sm:w-[70%] snap-center">
                  {renderCard(pkg)}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          {packages.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {packages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? "bg-[#38b6ff] w-8" : "bg-gray-300 w-2"
                  }`}
                  aria-label={`Go to package ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="hidden lg:block max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
              >
                {renderCard(pkg)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
