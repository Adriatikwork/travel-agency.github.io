"use client"

import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import packagesData from "@/data/packages"
import { UnifiedCard } from "@/components/unified-card"

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
  const { language } = useLanguage()
  const ui = packagesData.ui

  if (packages.length === 0) {
    return null
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
          <div className="space-y-2.5">
            <p className="text-xs leading-relaxed line-clamp-2">{pkg.summary[language]}</p>
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold text-card-foreground uppercase tracking-wider">{ui.whatsIncluded[language]}</div>
              <div className="space-y-1">
                {pkg.inclusions[language].slice(0, 3).map((inclusion, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-[11px] text-card-foreground/70">
                    <Check className="w-3 h-3 text-brand mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{inclusion}</span>
                  </div>
                ))}
                {pkg.inclusions[language].length > 3 && (
                  <div className="text-[10px] text-muted-foreground ml-4">
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
          <Button className="w-full bg-brand hover:bg-brand-dark text-primary-foreground rounded-xl shadow-sm py-2.5 text-xs font-semibold transition-all">
            {ui.bookPackage[language]}
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </Button>
        }
      />
    )
  }

  return (
    <section className="py-16 sm:py-20 bg-surface-sunken">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-foreground text-balance">{ui.title[language]}</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{ui.subtitle[language]}</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {packages.map((pkg) => (
              <div key={pkg.id}>
                {renderCard(pkg)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
