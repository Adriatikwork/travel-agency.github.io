"use client"

import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Plane,
  Clock,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Check,
  Phone,
  Mail,
  MapPin,
  Star,
  Shield,
  Utensils,
  Tag,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import { ImageLightbox } from "@/components/image-lightbox"
import destinationsData from "@/data/destinations"
import { useState, useRef, useEffect } from "react"

function getText(value: string | { en: string; sq: string } | null | undefined, language: "en" | "sq"): string {
  if (!value) return ""
  if (typeof value === "string") return value
  return value[language]
}

function getArray(
  value: string[] | { en: string[]; sq: string[] } | null | undefined,
  language: "en" | "sq",
): string[] {
  if (!value) return []
  if (Array.isArray(value)) return value
  return value[language]
}

const getBasePath = () => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH
  if (!base || base === "''" || base === '""' || base.trim() === "") return ""
  return base
}

export function DestinationPageClient({ slug }: { slug: string }) {
  const { language } = useLanguage()
  const basePath = getBasePath()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isBookingSectionVisible, setIsBookingSectionVisible] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const bookingSectionRef = useRef<HTMLDivElement>(null)

  const destination = destinationsData.destinations.find((d) => d.slug === slug)
  const departures = destinationsData.departures.filter((dep) => destination?.availableDepartureIds.includes(dep.id))

  const galleryImages =
    destination?.gallery && destination.gallery.length > 0
      ? destination.gallery
      : [
          `${basePath}/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(getText(destination?.name, language) + " landscape")}`,
          `${basePath}/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(getText(destination?.name, language) + " cityscape")}`,
          `${basePath}/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(getText(destination?.name, language) + " architecture")}`,
          `${basePath}/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(getText(destination?.name, language) + " culture")}`,
        ]

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)

  const openLightbox = (index?: number) => {
    if (index !== undefined) setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => setIsLightboxOpen(false)

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      if (!bookingSectionRef.current) return
      const observer = new IntersectionObserver(
        ([entry]) => setIsBookingSectionVisible(entry.isIntersecting),
        { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
      )
      observer.observe(bookingSectionRef.current)
      return () => observer.disconnect()
    })
    return () => cancelAnimationFrame(timer)
  }, [])

  if (!destination) {
    notFound()
    return null
  }

  const emailAction = () => {
    const subject = encodeURIComponent(
      `Inquiry: ${getText(destination.name, language)} - ${destinationsData.meta.currency}${destination.pricing.from}`,
    )
    const body = encodeURIComponent(
      `Hello,\n\nI would like more information about the ${getText(destination.name, language)} trip.\n\nPrice: ${destinationsData.meta.currency}${destination.pricing.from} per person\nDuration: ${destination.duration.minNights} nights\n\nPlease provide additional details.\n\nThank you.`,
    )
    window.location.href = `mailto:info@fluturo.co?subject=${subject}&body=${body}`
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero gallery - shorter on mobile so content isn't pushed down */}
      <div className="relative w-full h-[36vh] sm:h-[45vh] md:h-[55vh] lg:h-[62vh] overflow-hidden bg-foreground/5">
        <img
          src={galleryImages[currentImageIndex] || "/placeholder.svg"}
          alt={getText(destination.name, language)}
          className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
          fetchPriority="high"
          onClick={() => openLightbox()}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/5 pointer-events-none" />

        {/* Gallery nav arrows */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-primary-foreground/20 hover:bg-primary-foreground/40 text-primary-foreground p-2 sm:p-3 rounded-full backdrop-blur-md transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-primary-foreground/20 hover:bg-primary-foreground/40 text-primary-foreground p-2 sm:p-3 rounded-full backdrop-blur-md transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </>
        )}

        {/* Back + rating */}
        <div className="absolute top-16 sm:top-20 left-3 sm:left-5 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-primary-foreground/15 backdrop-blur-md text-primary-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-primary-foreground/25 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {language === "en" ? "Back" : "Kthehu"}
          </Link>
        </div>
        {destination.rating && (
          <div className="absolute top-16 sm:top-20 right-3 sm:right-5 flex items-center gap-1 bg-primary-foreground/15 backdrop-blur-md px-2.5 py-1.5 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-primary-foreground">{destination.rating}</span>
          </div>
        )}

        {/* Bottom overlay info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 lg:p-8">
          <div className="container mx-auto max-w-7xl">
            {/* Themes */}
            <div className="flex flex-wrap items-center gap-1 mb-2">
              {destination.themes.map((theme) => (
                <Badge
                  key={theme}
                  className="capitalize text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary-foreground/15 text-primary-foreground border-0 backdrop-blur-sm"
                >
                  {theme}
                </Badge>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-primary-foreground/80 text-xs mb-1">
              <MapPin className="h-3 w-3" />
              <span>{destination.city}, {getText(destination.country, language)}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-extrabold text-primary-foreground tracking-tight text-balance leading-tight">
              {getText(destination.name, language)}
            </h1>

            {/* Tagline - hide on very small screens to save space */}
            {destination.tagline && (
              <p className="hidden sm:block text-sm text-primary-foreground/70 mt-1 max-w-2xl italic text-pretty">
                {getText(destination.tagline, language)}
              </p>
            )}

            {/* Thumbnails - smaller on mobile */}
            {galleryImages.length > 1 && (
              <div className="flex gap-1.5 mt-3">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => openLightbox(index)}
                    className={`w-10 h-7 sm:w-16 sm:h-11 rounded-md sm:rounded-lg overflow-hidden transition-all shrink-0 hover:scale-110 ${
                      currentImageIndex === index
                        ? "ring-2 ring-primary-foreground ring-offset-1 ring-offset-transparent opacity-100"
                        : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${getText(destination.name, language)} ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
                <span className="flex items-center ml-1 text-primary-foreground/50 text-[10px] font-medium">
                  {currentImageIndex + 1}/{galleryImages.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick stat pills - compact on mobile, no overlap */}
      <div className="container mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 mt-3 sm:-mt-7 relative z-10">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <div className="flex items-center gap-2 bg-card border border-border/50 rounded-xl px-3 py-2 shadow-md shrink-0">
            <Calendar className="h-3.5 w-3.5 text-brand shrink-0" />
            <span className="text-xs font-bold text-foreground whitespace-nowrap">{destination.duration.minNights} {language === "en" ? "Nights" : "Net"}</span>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border/50 rounded-xl px-3 py-2 shadow-md shrink-0">
            <Tag className="h-3.5 w-3.5 text-brand shrink-0" />
            <span className="text-xs font-bold text-foreground whitespace-nowrap">{destinationsData.meta.currency}{destination.pricing.from} <span className="font-normal text-muted-foreground">/ {language === "en" ? "person" : "person"}</span></span>
          </div>
          {destination.mealPlan && (
            <div className="flex items-center gap-2 bg-card border border-border/50 rounded-xl px-3 py-2 shadow-md shrink-0">
              <Utensils className="h-3.5 w-3.5 text-brand shrink-0" />
              <span className="text-xs font-bold text-foreground whitespace-nowrap">{getText(destination.mealPlan, language)}</span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-card border border-border/50 rounded-xl px-3 py-2 shadow-md shrink-0">
            <Shield className="h-3.5 w-3.5 text-brand shrink-0" />
            <span className="text-xs font-bold text-foreground capitalize whitespace-nowrap">{destination.category}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-5 sm:gap-8">

          {/* Left: Content */}
          <div className="xl:col-span-8 space-y-4 sm:space-y-6">

            {/* About */}
            <div className="bg-card border border-border/50 rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2.5">
                {language === "en" ? "About this destination" : "Rreth ketij destinacioni"}
              </h2>
              <p className="text-foreground/80 leading-relaxed text-sm text-pretty">
                {getText(destination.descriptionLong, language)}
              </p>

              {destination.duration.specificDates && (
                <div className="mt-3 flex items-center gap-2 p-2.5 bg-brand-light rounded-xl">
                  <Calendar className="h-3.5 w-3.5 text-brand shrink-0" />
                  <span className="text-xs sm:text-sm text-foreground font-medium">{getText(destination.duration.specificDates, language)}</span>
                </div>
              )}
            </div>

            {/* Highlights */}
            {destination.highlights && (
              <div className="bg-card border border-border/50 rounded-2xl p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                  {language === "en" ? "Trip Highlights" : "Pikat Kryesore"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getArray(destination.highlights, language).map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2.5 p-2.5 bg-surface-sunken rounded-xl">
                      <div className="bg-brand-light p-1 rounded-md shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-brand" />
                      </div>
                      <span className="text-xs sm:text-sm text-foreground/80 leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {destination.included && (
              <div className="bg-card border border-border/50 rounded-2xl p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                  {language === "en" ? "What's Included" : "Cfare Perfshihet"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getArray(destination.included, language).map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                      <div className="bg-emerald-50 p-1 rounded-md shrink-0">
                        <Check className="h-3 w-3 text-emerald-600" />
                      </div>
                      <span className="text-foreground/80 capitalize">{item.replace(/-/g, " ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Departures */}
            {departures.length > 0 && (
              <div className="bg-card border border-border/50 rounded-2xl p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                  {language === "en" ? "Fly from" : "Fluturoni nga"}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {departures.map((departure) => (
                    <div
                      key={departure.id}
                      className="flex items-center gap-2.5 p-2.5 sm:p-3 bg-surface-sunken rounded-xl border border-border/30 hover:border-brand/30 transition-all"
                    >
                      <div className="bg-brand-light p-2 rounded-lg shrink-0">
                        <Plane className="h-3.5 w-3.5 text-brand" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-foreground text-xs sm:text-sm truncate">{getText(departure.city, language)}</p>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground font-semibold tracking-wide">{departure.airportCode}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile booking card */}
            <div ref={bookingSectionRef} className="xl:hidden">
              <BookingCard
                destination={destination}
                language={language}
                emailAction={emailAction}
              />
            </div>
          </div>

          {/* Right: Sticky Sidebar */}
          <div className="hidden xl:block xl:col-span-4">
            <div className="xl:sticky xl:top-24 space-y-4">
              <BookingCard
                destination={destination}
                language={language}
                emailAction={emailAction}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div
        className={`xl:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 shadow-2xl transition-transform duration-300 z-50 ${
          isBookingSectionVisible ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container mx-auto px-3 py-2.5">
          <div className="flex items-center gap-3">
            <div className="shrink-0 pr-3 border-r border-border/50">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                {language === "en" ? "From" : "Nga"}
              </p>
              <p className="text-lg font-extrabold text-brand leading-tight">
                {destinationsData.meta.currency}
                {destination.pricing.from}
              </p>
            </div>
            <div className="flex-1 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 font-semibold py-2.5 px-2 rounded-lg bg-transparent border-border hover:border-brand text-xs"
                onClick={() => (window.location.href = "tel:044663344")}
              >
                <Phone className="w-3.5 h-3.5 mr-1" />
                {language === "en" ? "Call" : "Telefono"}
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-brand hover:bg-brand-dark text-primary-foreground font-bold py-2.5 px-3 rounded-lg shadow-md text-xs"
                onClick={emailAction}
              >
                <Mail className="w-3.5 h-3.5 mr-1" />
                {language === "en" ? "Request Info" : "Informacion"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Lightbox */}
      {isLightboxOpen && (
        <ImageLightbox
          images={galleryImages}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
          alt={getText(destination.name, language)}
        />
      )}
    </div>
  )
}

/* Extracted BookingCard component */
function BookingCard({
  destination,
  language,
  emailAction,
}: {
  destination: any
  language: "en" | "sq"
  emailAction: () => void
}) {
  return (
    <Card className="border border-border/50 shadow-lg overflow-hidden rounded-2xl">
      {/* Price header */}
      <div className="bg-brand px-5 sm:px-6 py-6 sm:py-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12)_0%,transparent_60%)]" />
        <p className="text-[10px] font-bold text-primary-foreground/80 uppercase tracking-[0.2em] relative z-10">
          {language === "en" ? "Starting From" : "Duke filluar nga"}
        </p>
        <p className="text-4xl sm:text-5xl font-extrabold text-primary-foreground my-1 relative z-10">
          {destinationsData.meta.currency}
          {destination.pricing.from}
        </p>
        {destination.pricing.perPerson && (
          <p className="text-xs text-primary-foreground/75 uppercase tracking-wider font-medium relative z-10">
            {language === "en" ? "per person" : "per person"}
          </p>
        )}
        {destination.pricing.note && (
          <p className="text-[10px] text-primary-foreground/60 mt-2 leading-relaxed relative z-10 text-pretty">
            {getText(destination.pricing.note, language)}
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="p-4 sm:p-5 space-y-3">
        <Button
          className="w-full bg-brand hover:bg-brand-dark text-primary-foreground font-bold py-3 rounded-xl shadow-md text-sm"
          onClick={emailAction}
        >
          <Mail className="w-4 h-4 mr-2" />
          {language === "en" ? "Request Information" : "Kerko Informacion"}
        </Button>
        <Button
          variant="outline"
          className="w-full font-semibold py-3 rounded-xl text-sm bg-transparent border-border hover:border-brand"
          onClick={() => (window.location.href = "tel:044663344")}
        >
          <Phone className="w-4 h-4 mr-2" />
          {language === "en" ? "Call Us: 044 66 33 44" : "Na Telefononi: 044 66 33 44"}
        </Button>

        {/* Quick info */}
        <div className="pt-2 space-y-2 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{language === "en" ? "Duration" : "Kohezgjatja"}</span>
            <span className="font-bold text-foreground">{destination.duration.minNights} {language === "en" ? "nights" : "net"}</span>
          </div>
          {destination.mealPlan && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{language === "en" ? "Meals" : "Ushqimi"}</span>
              <span className="font-bold text-foreground">{getText(destination.mealPlan, language)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{language === "en" ? "Category" : "Kategoria"}</span>
            <span className="font-bold text-foreground capitalize">{destination.category}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
