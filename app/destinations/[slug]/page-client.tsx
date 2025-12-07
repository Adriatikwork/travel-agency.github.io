"use client"

import { notFound } from "next/navigation"
import { ArrowLeft, Plane, Clock, ChevronLeft, ChevronRight, Calendar, Users, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import destinationsData from "@/data/destinations"
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

  // Use gallery images from destination data, or fallback to placeholder
  const galleryImages =
    destination.gallery && destination.gallery.length > 0
      ? destination.gallery
      : [
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

      <div className="container mx-auto px-4 pt-24 sm:pt-28 pb-4 sm:pb-6">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-3 sm:mb-4 group transition-all touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-xs sm:text-sm">
            {language === "en" ? "Back to Destinations" : "Kthehu te Destinacionet"}
          </span>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-12 sm:pb-16 md:pb-20">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="relative aspect-[16/9] sm:aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden group bg-muted">
                <img
                  src={galleryImages[currentImageIndex] || "/placeholder.svg"}
                  alt={getText(destination.name, language)}
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 touch-manipulation"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 touch-manipulation"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/60 backdrop-blur-sm text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden transition-all touch-manipulation ${
                      currentImageIndex === index
                        ? "ring-2 sm:ring-4 ring-primary scale-105"
                        : "ring-1 sm:ring-2 ring-transparent hover:ring-primary/50 opacity-70 hover:opacity-100"
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

            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                {destination.themes.map((theme) => (
                  <Badge
                    key={theme}
                    variant="secondary"
                    className="capitalize text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                  >
                    {theme}
                  </Badge>
                ))}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-3 text-balance">
                {getText(destination.name, language)}
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground italic mb-3 sm:mb-4 text-pretty">
                {getText(destination.tagline, language)}
              </p>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed text-pretty">
                {getText(destination.descriptionLong, language)}
              </p>
            </div>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
                  {language === "en" ? "Trip Details" : "Detajet e Udhëtimit"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-start gap-3 p-3 sm:p-4 bg-accent/40 rounded-xl border border-border">
                    <div className="bg-primary/15 p-2 sm:p-2.5 rounded-xl flex-shrink-0">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                        {language === "en" ? "Duration" : "Kohëzgjatja"}
                      </p>
                      <p className="font-bold text-foreground text-sm sm:text-base text-balance">
                        {destination.duration.minNights} {language === "en" ? "Nights" : "Netë"}
                      </p>
                      {destination.duration.specificDates && (
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                          {getText(destination.duration.specificDates, language)}
                        </p>
                      )}
                    </div>
                  </div>

                  {destination.mealPlan && (
                    <div className="flex items-start gap-3 p-3 sm:p-4 bg-accent/40 rounded-xl border border-border">
                      <div className="bg-primary/15 p-2 sm:p-2.5 rounded-xl flex-shrink-0">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                          {language === "en" ? "Meal Plan" : "Planifikimi i Ushqimit"}
                        </p>
                        <p className="font-bold text-foreground text-sm sm:text-base text-balance">
                          {getText(destination.mealPlan, language)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {destination.highlights && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
                    {language === "en" ? "Highlights" : "Pikat Kryesore"}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {getArray(destination.highlights, language).map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                        <div className="bg-primary/15 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                        </div>
                        <span className="text-foreground/90 text-balance">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {destination.included && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
                    {language === "en" ? "What's Included" : "Çfarë Përfshihet"}
                  </h2>

                  <div className="space-y-2 sm:space-y-3">
                    {getArray(destination.included, language).map((item, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                        <div className="bg-green-500/15 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                          <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                        </div>
                        <span className="text-foreground/90 capitalize text-balance">{item.replace(/-/g, " ")}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 text-balance">
                  {language === "en" ? "Available Departures" : "Nisjet e Disponueshme"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {departures.map((departure) => (
                    <div
                      key={departure.id}
                      className="flex items-center p-3 sm:p-4 bg-accent/40 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group cursor-pointer"
                    >
                      <div className="bg-primary/15 p-2 sm:p-2.5 rounded-xl mr-2.5 sm:mr-3 group-hover:bg-primary/25 transition-colors flex-shrink-0">
                        <Plane className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm sm:text-base text-balance">
                          {getText(departure.city, language)}
                        </p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground font-semibold">
                          {departure.airportCode}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:hidden border-0 shadow-xl overflow-hidden bg-gradient-to-br from-card via-card to-accent/20">
              <CardContent className="p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-bold text-foreground mb-3 text-center uppercase tracking-wide">
                  {language === "en" ? "Your Destination" : "Destinacioni Juaj"}
                </h3>
                <div className="aspect-square w-full max-w-[320px] sm:max-w-[380px] mx-auto">
                  <InteractiveGlobe
                    targetLat={destination.coordinates?.lat || 0}
                    targetLon={destination.coordinates?.lon || 0}
                    autoAnimate={true}
                    destinationName={getText(destination.name, language)}
                    className="w-full h-full"
                  />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground text-center mt-3 leading-tight text-pretty">
                  {language === "en"
                    ? "Watch as the globe locates your destination"
                    : "Shikoni ndërsa globi gjen destinacionin tuaj"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="hidden lg:block lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-3 sm:space-y-4">
              {/* Globe Animation */}
              <Card className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-card via-card to-accent/20">
                <CardContent className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-bold text-foreground mb-2 text-center uppercase tracking-wide">
                    {language === "en" ? "Your Destination" : "Destinacioni Juaj"}
                  </h3>
                  <div className="aspect-square w-full max-w-[280px] sm:max-w-[320px] mx-auto">
                    <InteractiveGlobe
                      targetLat={destination.coordinates?.lat || 0}
                      targetLon={destination.coordinates?.lon || 0}
                      autoAnimate={true}
                      destinationName={getText(destination.name, language)}
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-2 leading-tight text-pretty">
                    {language === "en"
                      ? "Watch as the globe locates your destination"
                      : "Shikoni ndërsa globi gjen destinacionin tuaj"}
                  </p>
                </CardContent>
              </Card>

              {/* Booking Card */}
              <Card className="border-0 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-br from-primary via-primary to-primary/90 p-4 sm:p-5 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
                  <p className="text-[10px] font-bold text-primary-foreground/90 mb-1 uppercase tracking-wider relative z-10">
                    {language === "en" ? "Starting From" : "Duke filluar nga"}
                  </p>
                  <p className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-1 relative z-10 drop-shadow-lg">
                    {destinationsData.meta.currency}
                    {destination.pricing.from}
                  </p>
                  {destination.pricing.perPerson && (
                    <p className="text-xs text-primary-foreground/90 uppercase tracking-wide font-semibold relative z-10">
                      {language === "en" ? "per person" : "për person"}
                    </p>
                  )}
                  {destination.pricing.note && (
                    <p className="text-[10px] text-primary-foreground/90 mt-2 leading-relaxed font-medium relative z-10 text-pretty">
                      {getText(destination.pricing.note, language)}
                    </p>
                  )}
                </div>

                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="space-y-3 pb-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">{language === "en" ? "Duration" : "Kohëzgjatja"}</span>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {destination.duration.minNights} {language === "en" ? "nights" : "netë"}
                      </span>
                    </div>

                    {destination.mealPlan && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span className="text-sm font-medium">{language === "en" ? "Meals" : "Ushqimi"}</span>
                        </div>
                        <span className="text-sm font-bold text-foreground">
                          {getText(destination.mealPlan, language)}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span className="text-sm font-medium">{language === "en" ? "Category" : "Kategoria"}</span>
                      </div>
                      <span className="text-sm font-bold text-foreground capitalize">{destination.category}</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-foreground hover:bg-foreground/90 text-background text-base sm:text-lg font-bold py-5 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all touch-manipulation"
                  >
                    {language === "en" ? "Book This Trip" : "Rezervo Këtë Udhëtim"}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full font-semibold py-4 sm:py-5 rounded-xl transition-all touch-manipulation hover:bg-accent bg-transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {language === "en" ? "Call to Book" : "Telefono për Rezervim"}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full font-semibold py-4 sm:py-5 rounded-xl transition-all touch-manipulation hover:bg-accent bg-transparent"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    {language === "en" ? "Email Inquiry" : "Pyetje me Email"}
                  </Button>

                  <div className="pt-4 border-t border-border text-center space-y-2">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {language === "en" ? "Questions? We're here to help" : "Pyetje? Jemi këtu për t'ju ndihmuar"}
                    </p>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-foreground">044 66 33 44</p>
                      <p className="text-sm text-muted-foreground">info@fluturo.co</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground pt-2">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-balance">
                      {language === "en" ? "Instant confirmation" : "Konfirmim i menjëhershëm"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-background via-background to-transparent pt-4 pb-safe">
          <div className="container mx-auto px-4">
            <Card className="border-0 shadow-2xl">
              <CardContent className="p-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {language === "en" ? "From" : "Nga"}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground">
                    {destinationsData.meta.currency}
                    {destination.pricing.from}
                  </p>
                </div>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-6 sm:px-8 py-5 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transition-all touch-manipulation flex-shrink-0"
                >
                  {language === "en" ? "Book Now" : "Rezervo"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
