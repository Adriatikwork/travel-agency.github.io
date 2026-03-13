"use client"

import { Check, ArrowRight, Package, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import packagesData from "@/data/packages"
import siteData from "@/data/site-data.json"
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

  const emptyStateText = {
    title: {
      en: "Exciting Packages Coming Soon",
      sq: "Paketa Interesante Se Shpejti"
    },
    subtitle: {
      en: "We're putting together amazing all-inclusive travel packages just for you. Follow us on social media to stay updated on our latest offerings and exclusive deals!",
      sq: "Po pergatisim paketa te mahnitshme udhëtimi gjitheperfshirese vetem per ju. Na ndiqni ne rrjetet sociale per te qendruar te informuar mbi ofertat tona me te reja dhe ekskluzive!"
    },
    followUs: {
      en: "Follow Us",
      sq: "Na Ndiqni"
    }
  }

  const socialLinks = siteData.footer.social

  if (packages.length === 0) {
    return (
      <section className="py-16 sm:py-20 bg-surface-sunken">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-foreground text-balance">{ui.title[language]}</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">{ui.subtitle[language]}</p>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border shadow-sm">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#38b6ff]/15 rounded-full flex items-center justify-center">
                <Package className="w-10 h-10 text-[#38b6ff]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-balance">
                {emptyStateText.title[language]}
              </h3>
              <p className="text-muted-foreground text-base sm:text-lg mb-8 leading-relaxed text-pretty">
                {emptyStateText.subtitle[language]}
              </p>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  {emptyStateText.followUs[language]}
                </p>
                <div className="flex items-center justify-center gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-accent rounded-full shadow-sm flex items-center justify-center text-[#38b6ff] hover:bg-[#38b6ff] hover:text-white transition-all hover:scale-110 hover:shadow-md"
                      aria-label={social.name}
                    >
                      {social.icon === "facebook" && <Facebook className="w-5 h-5" />}
                      {social.icon === "instagram" && <Instagram className="w-5 h-5" />}
                      {social.icon === "twitter" && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      )}
                      {social.icon === "linkedin" && (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
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
