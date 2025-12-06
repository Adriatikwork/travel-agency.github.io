"use client"

import { notFound } from "next/navigation"
import {
  MapPin,
  Calendar,
  Users,
  Utensils,
  Check,
  Phone,
  Mail,
  ArrowLeft,
  Plane,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import destinationsData from "@/data/destinations"
import siteData from "@/data/site-data.json"
import { InteractiveGlobe } from "@/components/interactive-globe"
import { useState } from "react"

// Helper function to get text value (handles both string and multilingual object)
function getText(value: string | { en: string; sq: string } | null | undefined, language: "en" | "sq"): string {
  if (!value) {
    return ""
  }
  if (typeof value === "string") {
    return value
  }
  return value[language]
}

// Helper function to get array value (handles both array and multilingual array object)
function getArray(
  value: string[] | { en: string[]; sq: string[] } | null | undefined,
  language: "en" | "sq",
): string[] {
  if (!value) {
    return []
  }
  if (Array.isArray(value)) {
    return value
  }
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

  const destination = destinationsData.destinations.find((d) => d.slug === slug)

  if (!destination) {
    notFound()
    return null
  }

  const departures = destinationsData.departures.filter((dep) => destination.availableDepartureIds.includes(dep.id))

  const galleryImages = [
    `${basePath}/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(getText(destination.name, language) + " landscape")}`,
    `${basePath}/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(getText(destination.name, language) + " cityscape")}`,
    `${basePath}/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(getText(destination.name, language) + " architecture")}`,
    `${basePath}/placeholder.svg?height=800&width=1200&query=${encodeURIComponent(getText(destination.name, language) + " culture")}`,
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-6">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4 group transition-all"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm">
            {language === "en" ? "Back to Destinations" : "Kthehu te Destinacionet"}
          </span>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Column - Main Content (7/12 width for better balance) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              {/* Main Large Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden group bg-muted">
                <img
                  src={galleryImages[currentImageIndex] || "/placeholder.svg"}
                  alt={getText(destination.name, language)}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden transition-all ${
                      currentImageIndex === index
                        ? "ring-4 ring-primary scale-105"
                        : "ring-2 ring-transparent hover:ring-primary/50 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${getText(destination.name, language)} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Header */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {destination.themes.map((theme) => (
                  <Badge key={theme} variant="secondary" className="capitalize text-xs font-semibold px-3 py-1">
                    {theme}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
                {getText(destination.name, language)}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground italic mb-5 font-light">
                {getText(destination.tagline, language)}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-semibold">
                    {getText(destination.city, language)}, {getText(destination.country, language)}
                  </span>
                </div>
                {destination.duration.specificDates && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-semibold">{getText(destination.duration.specificDates, language)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-semibold">
                    {destination.duration.minNights === destination.duration.maxNights
                      ? `${destination.duration.minNights} ${language === "en" ? "nights" : "netë"}`
                      : `${destination.duration.minNights}-${destination.duration.maxNights} ${language === "en" ? "nights" : "netë"}`}
                  </span>
                </div>
              </div>
            </div>

            {/* About Section */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  {language === "en" ? "About This Destination" : "Rreth Destinacionit"}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {getText(destination.descriptionLong, language)}
                </p>
              </CardContent>
            </Card>

            {/* Highlights */}
            {destination.highlights && getArray(destination.highlights, language).length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="bg-primary/10 p-2 rounded-xl">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                      {language === "en" ? "Trip Highlights" : "Thekset e Udhëtimit"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getArray(destination.highlights, language).map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 rounded-xl border border-border hover:border-primary/30 hover:bg-accent/50 transition-all duration-300 group"
                      >
                        <div className="bg-primary/10 p-1.5 rounded-lg mr-2.5 mt-0.5 flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Check className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-xs md:text-sm text-foreground leading-relaxed font-medium">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* What's Included */}
            {destination.included && getArray(destination.included, language).length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                    {language === "en" ? "What's Included" : "Çfarë Përfshihet"}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getArray(destination.included, language).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start p-3 rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 group"
                      >
                        <div className="bg-green-500/20 p-1.5 rounded-lg mr-2.5 mt-0.5 flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                          <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="capitalize leading-relaxed text-foreground text-xs md:text-sm font-medium">
                          {item.replace(/-/g, " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Departure Cities */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {language === "en" ? "Available Departures" : "Nisjet e Disponueshme"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {departures.map((departure) => (
                    <div
                      key={departure.id}
                      className="flex items-center p-4 bg-accent/40 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group cursor-pointer"
                    >
                      <div className="bg-primary/15 p-2.5 rounded-xl mr-3 group-hover:bg-primary/25 transition-colors">
                        <Plane className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-base">{getText(departure.city, language)}</p>
                        <p className="text-xs text-muted-foreground font-semibold">{departure.airportCode}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sticky Sidebar (5/12 width for compact look) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              {/* Globe Animation - Compact Version */}
              <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-card via-card to-accent/20">
                <CardContent className="p-4">
                  <h3 className="text-sm font-bold text-foreground mb-2 text-center uppercase tracking-wide">
                    {language === "en" ? "Your Destination" : "Destinacioni Juaj"}
                  </h3>
                  <div className="aspect-square w-full max-w-[280px] mx-auto">
                    <InteractiveGlobe
                      targetLat={destination.coordinates?.lat || 0}
                      targetLon={destination.coordinates?.lon || 0}
                      autoAnimate={true}
                      destinationName={getText(destination.name, language)}
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center mt-2 leading-tight">
                    {language === "en"
                      ? "Watch as the globe locates your destination"
                      : "Shikoni ndërsa globi gjen destinacionin tuaj"}
                  </p>
                </CardContent>
              </Card>

              {/* Booking Card - More Compact */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-primary via-primary to-primary/90 p-5 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
                  <p className="text-[10px] font-bold text-primary-foreground/90 mb-1 uppercase tracking-wider relative z-10">
                    {language === "en" ? "Starting From" : "Duke filluar nga"}
                  </p>
                  <p className="text-4xl font-bold text-primary-foreground mb-1 relative z-10 drop-shadow-lg">
                    {destinationsData.meta.currency}
                    {destination.pricing.from}
                  </p>
                  {destination.pricing.perPerson && (
                    <p className="text-xs text-primary-foreground/90 uppercase tracking-wide font-semibold relative z-10">
                      {language === "en" ? "per person" : "për person"}
                    </p>
                  )}
                  {destination.pricing.note && (
                    <p className="text-[10px] text-primary-foreground/90 mt-2 leading-relaxed font-medium relative z-10">
                      {getText(destination.pricing.note, language)}
                    </p>
                  )}
                </div>

                <CardContent className="p-4 space-y-3">
                  {/* Trip Details - Compact */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-accent/60 rounded-lg">
                      <span className="text-muted-foreground flex items-center font-semibold text-xs">
                        <Calendar className="h-3.5 w-3.5 mr-2 text-primary" />
                        {language === "en" ? "Duration" : "Kohëzgjatja"}
                      </span>
                      <span className="font-bold text-foreground text-xs">
                        {destination.duration.minNights === destination.duration.maxNights
                          ? `${destination.duration.minNights} ${language === "en" ? "nights" : "netë"}`
                          : `${destination.duration.minNights}-${destination.duration.maxNights} ${language === "en" ? "nights" : "netë"}`}
                      </span>
                    </div>

                    {destination.mealPlan && (
                      <div className="flex items-center justify-between p-3 bg-accent/60 rounded-lg">
                        <span className="text-muted-foreground flex items-center font-semibold text-xs">
                          <Utensils className="h-3.5 w-3.5 mr-2 text-primary" />
                          {language === "en" ? "Meals" : "Ushqimi"}
                        </span>
                        <span className="font-bold text-foreground text-xs">
                          {getText(destination.mealPlan, language)}
                        </span>
                      </div>
                    )}

                    {destination.pricing.priceCategory && (
                      <div className="flex items-center justify-between p-3 bg-accent/60 rounded-lg">
                        <span className="text-muted-foreground flex items-center font-semibold text-xs">
                          <Users className="h-3.5 w-3.5 mr-2 text-primary" />
                          {language === "en" ? "Category" : "Kategoria"}
                        </span>
                        <span className="font-bold text-foreground text-xs capitalize">
                          {destination.pricing.priceCategory}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-3">
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground py-5 text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                      {language === "en" ? "Book This Trip" : "Rezervo këtë Udhëtim"}
                    </Button>

                    <a href={`tel:${siteData.footer.contact.phone}`}>
                      <Button
                        variant="outline"
                        className="w-full py-4 text-xs border-2 hover:bg-accent font-semibold rounded-lg transition-all bg-transparent"
                      >
                        <Phone className="h-3.5 w-3.5 mr-2" />
                        {language === "en" ? "Call to Book" : "Telefono për Rezervim"}
                      </Button>
                    </a>

                    <a href={`mailto:${siteData.footer.contact.email}`}>
                      <Button
                        variant="outline"
                        className="w-full py-4 text-xs border-2 hover:bg-accent font-semibold rounded-lg transition-all bg-transparent"
                      >
                        <Mail className="h-3.5 w-3.5 mr-2" />
                        {language === "en" ? "Email Inquiry" : "Dërgo Email"}
                      </Button>
                    </a>
                  </div>

                  <div className="pt-4 border-t border-border text-center">
                    <p className="text-[10px] text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
                      {language === "en" ? "Questions? We're here to help" : "Pyetje? Jemi këtu për t'ju ndihmuar"}
                    </p>
                    <p className="font-bold text-foreground text-sm mb-1">{siteData.footer.contact.phone}</p>
                    <p className="text-muted-foreground text-xs font-medium">{siteData.footer.contact.email}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
