"use client"

import { MapPin, ArrowRight, Info, Plane, Facebook, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import destinationsData from "@/data/destinations"
import siteData from "@/data/site-data.json"
import { UnifiedCard } from "@/components/unified-card"

interface Destination {
  id: string
  slug: string
  name: string
  city: string
  country: { en: string; sq: string }
  continent: string
  tagline: { en: string; sq: string }
  descriptionShort: { en: string; sq: string }
  descriptionLong: { en: string; sq: string }
  primaryImage: string
  pricing: {
    from: number
    currency: string
    perPerson: boolean
    priceCategory: string
    note?: { en: string; sq: string }
  }
  duration: {
    minNights: number
    maxNights: number
    specificDates?: { en: string; sq: string }
  }
  mealPlan?: { en: string; sq: string } | null
  rating: number | null
  featured: boolean
  isNew: boolean
  themes: string[]
  tags: { en: string[]; sq: string[] }
  included?: { en: string[]; sq: string[] } | null
  highlights?: { en: string[]; sq: string[] }
  availableDepartureIds: string[]
}

interface DestinationsGridProps {
  destinations: Destination[]
  departures: Array<{
    id: string
    city: { en: string; sq: string }
    country: { en: string; sq: string }
  }>
  currency: string
}

export function DestinationsGrid({ destinations, departures, currency }: DestinationsGridProps) {
  const { language } = useLanguage()
  const ui = destinationsData.ui

  const emptyStateText = {
    title: {
      en: "New Destinations Coming Soon",
      sq: "Destinacione te Reja Se Shpejti"
    },
    subtitle: {
      en: "We're curating exciting new travel experiences for you. Follow us on social media to be the first to know when we launch new destinations!",
      sq: "Po pergatisim pervoja te reja udhëtimi per ju. Na ndiqni ne rrjetet sociale per te qene te paret qe mesoni kur lançojme destinacione te reja!"
    },
    followUs: {
      en: "Follow Us",
      sq: "Na Ndiqni"
    }
  }

  const socialLinks = siteData.footer.social

  if (destinations.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 px-6">
        <div className="bg-gradient-to-br from-[#38b6ff]/10 to-[#38b6ff]/5 rounded-3xl p-8 sm:p-12 border border-[#38b6ff]/20">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#38b6ff]/15 rounded-full flex items-center justify-center">
            <Plane className="w-10 h-10 text-[#38b6ff]" />
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
                  className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#38b6ff] hover:bg-[#38b6ff] hover:text-white transition-all hover:scale-110 hover:shadow-lg"
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
    )
  }

  const renderCard = (destination: Destination) => {
    const badges = []
    if (destination.featured) {
      badges.push({ text: ui.featured[language], color: "yellow" as const })
    }
    if (destination.isNew) {
      badges.push({ text: ui.new[language], color: "green" as const })
    }

    return (
      <UnifiedCard
        image={destination.primaryImage || "/placeholder.svg"}
        imageAlt={destination.name}
        badges={badges}
        rating={destination.rating || undefined}
        location={
          <>
            <MapPin className="w-4 h-4 inline mr-1.5" />
            {destination.city}, {destination.country[language]}
          </>
        }
        title={destination.name}
        subtitle={destination.tagline[language]}
        description={destination.descriptionShort[language]}
        tags={destination.themes}
        duration={destination.duration.minNights}
        durationLabel={ui.nights[language]}
        price={destination.pricing.from}
        currency={currency}
        priceLabel={ui.from[language]}
        hoverContent={
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-between px-4 sm:px-6 py-6 sm:py-8 text-center">
            <div className="flex-1 flex flex-col items-center justify-center space-y-2 sm:space-y-3 w-full max-w-[90%]">
              <h4 className="text-xl sm:text-2xl font-bold text-white leading-tight text-balance">
                {destination.name}
              </h4>
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed line-clamp-2 sm:line-clamp-3 text-pretty">
                {destination.descriptionLong[language]}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-white/90">
                <Info className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-pretty">
                  {ui.availableFrom[language]} {destination.availableDepartureIds.length} {ui.airports[language]}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full max-w-[90%] pt-3">
              <Button
                className="w-full bg-white text-sky-600 hover:bg-white/90 font-semibold rounded-lg shadow-lg h-9 sm:h-10 text-xs sm:text-sm touch-manipulation"
                asChild
              >
                <Link href={`/destinations/${destination.slug}`}>
                  <Info className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                  <span>{ui.viewDetails[language]}</span>
                </Link>
              </Button>
              <Button
                className="w-full bg-sky-700 text-white hover:bg-sky-800 font-semibold rounded-lg shadow-lg border-2 border-white/20 h-9 sm:h-10 text-xs sm:text-sm touch-manipulation"
                asChild
              >
                <Link href={`/destinations/${destination.slug}`}>
                  <ArrowRight className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                  <span>{ui.bookNow[language]}</span>
                </Link>
              </Button>
            </div>
          </div>
        }
        className="w-full h-full"
      />
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Mobile & Tablet: 2-column grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
        {destinations.map((destination) => (
          <div key={destination.id} className="flex flex-col">
            {renderCard(destination)}
          </div>
        ))}
      </div>

      {/* Desktop: centered flex grid */}
      <div className="hidden lg:flex flex-wrap justify-center gap-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)]"
          >
            {renderCard(destination)}
          </div>
        ))}
      </div>
    </div>
  )
}
