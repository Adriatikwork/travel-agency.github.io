"use client"

import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Plane,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Check,
  Phone,
  Mail,
  MapPin,
  Star,
  Tag,
  Utensils,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
  const [hasScrolled, setHasScrolled] = useState(false)
  const bookingSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [slug])

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 120)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const destination = destinationsData.destinations.find((d) => d.slug === slug)
  const departures = destinationsData.departures.filter((dep) => destination?.availableDepartureIds.includes(dep.id))

  const galleryImages =
    destination?.gallery && destination.gallery.length > 0
      ? destination.gallery
      : [
          `${basePath}/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(getText(destination?.name, language) + " landscape")}`,
          `${basePath}/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(getText(destination?.name, language) + " cityscape")}`,
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

      {/* Floating back button on mobile after scroll */}
      <div
        className={`lg:hidden fixed top-24 left-3 z-30 transition-all duration-300 ${
          hasScrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-gray-800 px-3 py-2 rounded-full text-xs font-semibold shadow-lg border border-gray-200/60 hover:bg-white transition-all active:scale-95"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {language === "en" ? "Back" : "Kthehu"}
        </Link>
      </div>

      {/* Hero */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[58vh] lg:h-[65vh] overflow-hidden bg-gray-100">
        <img
          src={galleryImages[currentImageIndex] || "/placeholder.svg"}
          alt={getText(destination.name, language)}
          className="w-full h-full object-cover cursor-pointer"
          fetchPriority="high"
          onClick={() => openLightbox()}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 pointer-events-none" />

        {/* Arrows */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-2.5 rounded-full backdrop-blur-sm transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-2.5 rounded-full backdrop-blur-sm transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </>
        )}

        {/* Back button in hero */}
        <div className="absolute top-24 left-3 sm:left-6 z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-white/25 transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {language === "en" ? "Back" : "Kthehu"}
          </Link>
        </div>

        {/* Rating */}
        {destination.rating && (
          <div className="absolute top-24 right-3 sm:right-6 flex items-center gap-1 bg-black/30 backdrop-blur-md px-2.5 py-1.5 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-white">{destination.rating}</span>
          </div>
        )}

        {/* Bottom overlay: tags, location, title */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-5 sm:pb-7">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-wrap gap-1 mb-2">
              {destination.themes.map((theme) => (
                <span
                  key={theme}
                  className="capitalize text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-white/20 text-white backdrop-blur-sm tracking-wide uppercase"
                >
                  {theme}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-white/70 text-xs mb-1.5">
              <MapPin className="h-3 w-3 shrink-0" />
              <span>{destination.city}, {getText(destination.country, language)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white tracking-tight text-balance leading-tight">
              {getText(destination.name, language)}
            </h1>
            {destination.tagline && (
              <p className="hidden sm:block text-sm text-white/60 mt-1 max-w-2xl italic text-pretty">
                {getText(destination.tagline, language)}
              </p>
            )}
            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-1.5 mt-3 items-center">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => openLightbox(index)}
                    className={`w-10 h-7 sm:w-14 sm:h-10 rounded overflow-hidden transition-all shrink-0 ${
                      currentImageIndex === index
                        ? "ring-2 ring-white ring-offset-1 ring-offset-transparent opacity-100"
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
                <span className="text-white/40 text-[10px] font-medium ml-1">
                  {currentImageIndex + 1}/{galleryImages.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Key details strip */}
      <div className="border-b border-border/60 bg-card">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 sm:gap-10 overflow-x-auto scrollbar-hide py-4">
            <div className="flex items-center gap-2 shrink-0">
              <Calendar className="h-4 w-4 text-[#38b6ff] shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">{language === "en" ? "Duration" : "Kohëzgjatja"}</p>
                <p className="text-sm font-bold text-foreground">{destination.duration.minNights} {language === "en" ? "nights" : "net"}</p>
              </div>
            </div>
            <div className="w-px bg-border/60 shrink-0" />
            <div className="flex items-center gap-2 shrink-0">
              <Tag className="h-4 w-4 text-[#38b6ff] shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">{language === "en" ? "From" : "Nga"}</p>
                <p className="text-sm font-bold text-foreground">{destinationsData.meta.currency}{destination.pricing.from} <span className="font-normal text-muted-foreground text-xs">/ {language === "en" ? "person" : "person"}</span></p>
              </div>
            </div>
            {destination.mealPlan && (
              <>
                <div className="w-px bg-border/60 shrink-0" />
                <div className="flex items-center gap-2 shrink-0">
                  <Utensils className="h-4 w-4 text-[#38b6ff] shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">{language === "en" ? "Meals" : "Ushqimi"}</p>
                    <p className="text-sm font-bold text-foreground">{getText(destination.mealPlan, language)}</p>
                  </div>
                </div>
              </>
            )}
            <div className="w-px bg-border/60 shrink-0" />
            <div className="flex items-center gap-2 shrink-0">
              <Shield className="h-4 w-4 text-[#38b6ff] shrink-0" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">{language === "en" ? "Type" : "Lloji"}</p>
                <p className="text-sm font-bold text-foreground capitalize">{destination.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col xl:grid xl:grid-cols-12 gap-8 xl:gap-12">

          {/* Left: Content */}
          <div className="xl:col-span-7 space-y-10">

            {/* About */}
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">
                {language === "en" ? "About this destination" : "Rreth destinacionit"}
              </h2>
              <p className="text-foreground/75 leading-relaxed text-sm sm:text-base text-pretty">
                {getText(destination.descriptionLong, language)}
              </p>
              {destination.duration.specificDates && (
                <div className="mt-4 flex items-center gap-2 text-sm text-foreground/70 border-l-2 border-[#38b6ff] pl-3">
                  <Calendar className="h-4 w-4 text-[#38b6ff] shrink-0" />
                  <span>{getText(destination.duration.specificDates, language)}</span>
                </div>
              )}
            </section>

            {/* Highlights */}
            {destination.highlights && getArray(destination.highlights, language).length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {language === "en" ? "Trip Highlights" : "Pikat Kryesore"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {getArray(destination.highlights, language).map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-[#38b6ff] shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80 leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* What's Included */}
            {destination.included && getArray(destination.included, language).length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {language === "en" ? "What's Included" : "Çfarë Përfshihet"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {getArray(destination.included, language).map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-[#38b6ff] shrink-0" />
                      <span className="text-sm text-foreground/80 capitalize">{item.replace(/-/g, " ")}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Departures */}
            {departures.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {language === "en" ? "Fly from" : "Fluturoni nga"}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {departures.map((departure) => (
                    <div
                      key={departure.id}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-border/60 hover:border-[#38b6ff]/40 transition-all bg-card"
                    >
                      <Plane className="h-3.5 w-3.5 text-[#38b6ff] shrink-0" />
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate">{getText(departure.city, language)}</p>
                        <p className="text-[10px] text-muted-foreground font-medium tracking-widest">{departure.airportCode}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
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
          <div className="hidden xl:block xl:col-span-5">
            <div className="sticky top-24">
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
        className={`xl:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-border/50 shadow-2xl transition-transform duration-300 z-30 ${
          isBookingSectionVisible ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="shrink-0 pr-3 border-r border-border/50">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                {language === "en" ? "From" : "Nga"}
              </p>
              <p className="text-lg font-extrabold text-[#38b6ff] leading-tight">
                {destinationsData.meta.currency}{destination.pricing.from}
              </p>
            </div>
            <div className="flex-1 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 font-semibold rounded-lg text-xs bg-transparent"
                onClick={() => (window.location.href = "tel:044663344")}
              >
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                {language === "en" ? "Call" : "Telefono"}
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-[#38b6ff] hover:bg-[#1da6f0] text-white font-bold rounded-lg text-xs"
                onClick={emailAction}
              >
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                {language === "en" ? "Request Info" : "Informacion"}
              </Button>
            </div>
          </div>
        </div>
      </div>

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

function BookingCard({
  destination,
  language,
  emailAction,
}: {
  destination: any
  language: "en" | "sq"
  emailAction: () => void
}) {
  const currency = destinationsData.meta.currency

  return (
    <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
      {/* Price */}
      <div className="px-6 py-6 border-b border-border/60">
        <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium mb-1">
          {language === "en" ? "Starting from" : "Duke filluar nga"}
        </p>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-extrabold text-foreground tracking-tight">
            {currency}{destination.pricing.from}
          </span>
          {destination.pricing.perPerson && (
            <span className="text-sm text-muted-foreground mb-1">/ {language === "en" ? "person" : "person"}</span>
          )}
        </div>
        {destination.pricing.note && (
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed text-pretty">
            {getText(destination.pricing.note, language)}
          </p>
        )}
      </div>

      {/* Details */}
      <div className="px-6 py-4 space-y-3 border-b border-border/60">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{language === "en" ? "Duration" : "Kohëzgjatja"}</span>
          <span className="font-semibold text-foreground">{destination.duration.minNights} {language === "en" ? "nights" : "net"}</span>
        </div>
        {destination.mealPlan && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{language === "en" ? "Meals" : "Ushqimi"}</span>
            <span className="font-semibold text-foreground">{getText(destination.mealPlan, language)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{language === "en" ? "Type" : "Lloji"}</span>
          <span className="font-semibold text-foreground capitalize">{destination.category}</span>
        </div>
      </div>

      {/* CTAs */}
      <div className="px-6 py-5 space-y-2.5">
        <Button
          className="w-full bg-[#38b6ff] hover:bg-[#1da6f0] text-white font-bold py-3 rounded-xl text-sm"
          onClick={emailAction}
        >
          <Mail className="w-4 h-4 mr-2" />
          {language === "en" ? "Request Information" : "Kërko Informacion"}
        </Button>
        <Button
          variant="outline"
          className="w-full font-semibold py-3 rounded-xl text-sm bg-transparent"
          onClick={() => (window.location.href = "tel:044663344")}
        >
          <Phone className="w-4 h-4 mr-2" />
          {language === "en" ? "Call: 044 66 33 44" : "Telefono: 044 66 33 44"}
        </Button>
      </div>
    </div>
  )
}
