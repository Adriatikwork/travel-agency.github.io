"use client"

import { notFound } from "next/navigation"
import { MapPin, Calendar, Users, Utensils, Check, Phone, Mail, ArrowLeft, Plane, Clock, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { Navbar } from "@/components/navbar"
import destinationsData from "@/data/destinations"
import siteData from "@/data/site-data.json"

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

  const destination = destinationsData.destinations.find((d) => d.slug === slug)

  if (!destination) {
    notFound()
    return null
  }

  const departures = destinationsData.departures.filter((dep) => destination.availableDepartureIds.includes(dep.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
      <Navbar />

      <div className="relative h-[70vh] mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${basePath}/placeholder.svg?height=1200&width=2000&query=${encodeURIComponent(
              getText(destination.name, language),
            )}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        <div className="relative h-full flex items-end pb-16">
          <div className="container mx-auto px-4">
            <Link
              href="/"
              className="inline-flex items-center text-white/95 hover:text-white mb-6 group transition-all bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold text-sm">
                {language === "en" ? "Back to Destinations" : "Kthehu te Destinacionet"}
              </span>
            </Link>

            <div className="max-w-6xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
                {getText(destination.name, language)}
              </h1>
              <p className="text-xl md:text-2xl text-white/95 italic mb-8 font-light max-w-3xl drop-shadow-lg">
                {getText(destination.tagline, language)}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-white">
                <div className="flex items-center bg-white/20 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/30 shadow-lg hover:bg-white/25 transition-all">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="font-semibold text-sm">
                    {getText(destination.city, language)}, {getText(destination.country, language)}
                  </span>
                </div>
                {destination.duration.specificDates && (
                  <div className="flex items-center bg-white/20 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/30 shadow-lg hover:bg-white/25 transition-all">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="font-semibold text-sm">{getText(destination.duration.specificDates, language)}</span>
                  </div>
                )}
                <div className="flex items-center bg-white/20 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/30 shadow-lg hover:bg-white/25 transition-all">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="font-semibold text-sm">
                    {destination.duration.minNights === destination.duration.maxNights
                      ? `${destination.duration.minNights} ${language === "en" ? "nights" : "netë"}`
                      : `${destination.duration.minNights}-${destination.duration.maxNights} ${language === "en" ? "nights" : "netë"}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-shadow">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {language === "en" ? "About This Destination" : "Rreth Destinacionit"}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  {getText(destination.descriptionLong, language)}
                </p>

                <div className="flex flex-wrap gap-2">
                  {destination.themes.map((theme) => (
                    <Badge
                      key={theme}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground border-0 capitalize text-sm px-4 py-1.5 font-semibold transition-all hover:scale-105 shadow-md"
                    >
                      {theme}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            {destination.highlights && getArray(destination.highlights, language).length > 0 && (
              <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/15 p-2 rounded-xl">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                      {language === "en" ? "Trip Highlights" : "Thekset e Udhëtimit"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getArray(destination.highlights, language).map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start group p-4 rounded-lg hover:bg-accent/60 transition-all duration-300 border border-transparent hover:border-primary/20"
                      >
                        <div className="bg-primary/15 p-2 rounded-lg mr-3 mt-0.5 flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm md:text-base text-foreground leading-relaxed">
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
              <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                    {language === "en" ? "What's Included" : "Çfarë Përfshihet"}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getArray(destination.included, language).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start group p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 border border-transparent hover:border-green-200 dark:hover:border-green-900/50"
                      >
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg mr-3 mt-0.5 flex-shrink-0 group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="capitalize leading-relaxed text-foreground text-sm md:text-base">
                          {item.replace(/-/g, " ")}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Departure Cities */}
            <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-shadow">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                  {language === "en" ? "Available Departures" : "Nisjet e Disponueshme"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {departures.map((departure) => (
                    <div
                      key={departure.id}
                      className="flex items-center p-4 bg-gradient-to-br from-accent/40 to-accent/20 rounded-xl border border-border hover:border-primary/60 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    >
                      <div className="bg-primary/20 p-3 rounded-xl mr-4 group-hover:bg-primary/30 transition-colors">
                        <Plane className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-base">{getText(departure.city, language)}</p>
                        <p className="text-sm text-muted-foreground font-semibold">{departure.airportCode}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-32 shadow-xl border-0 bg-card/80 backdrop-blur-sm overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="bg-gradient-to-br from-primary via-primary to-primary/90 p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
                <p className="text-xs font-bold text-primary-foreground/90 mb-2 uppercase tracking-wide relative z-10">
                  {language === "en" ? "Starting From" : "Duke filluar nga"}
                </p>
                <p className="text-5xl font-bold text-primary-foreground mb-2 relative z-10 drop-shadow-lg">
                  {destinationsData.meta.currency}
                  {destination.pricing.from}
                </p>
                {destination.pricing.perPerson && (
                  <p className="text-sm text-primary-foreground/90 uppercase tracking-wide font-semibold relative z-10">
                    {language === "en" ? "per person" : "për person"}
                  </p>
                )}
                {destination.pricing.note && (
                  <p className="text-xs text-primary-foreground/90 mt-3 leading-relaxed font-medium relative z-10">
                    {getText(destination.pricing.note, language)}
                  </p>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Trip Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-accent/60 rounded-lg hover:bg-accent/80 transition-colors">
                    <span className="text-muted-foreground flex items-center font-semibold text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {language === "en" ? "Duration" : "Kohëzgjatja"}
                    </span>
                    <span className="font-bold text-foreground text-sm">
                      {destination.duration.minNights === destination.duration.maxNights
                        ? `${destination.duration.minNights} ${language === "en" ? "nights" : "netë"}`
                        : `${destination.duration.minNights}-${destination.duration.maxNights} ${language === "en" ? "nights" : "netë"}`}
                    </span>
                  </div>

                  {destination.mealPlan && (
                    <div className="flex items-center justify-between p-4 bg-accent/60 rounded-lg hover:bg-accent/80 transition-colors">
                      <span className="text-muted-foreground flex items-center font-semibold text-sm">
                        <Utensils className="h-4 w-4 mr-2 text-primary" />
                        {language === "en" ? "Meals" : "Ushqimi"}
                      </span>
                      <span className="font-bold text-foreground text-sm">
                        {getText(destination.mealPlan, language)}
                      </span>
                    </div>
                  )}

                  {destination.pricing.priceCategory && (
                    <div className="flex items-center justify-between p-4 bg-accent/60 rounded-lg hover:bg-accent/80 transition-colors">
                      <span className="text-muted-foreground flex items-center font-semibold text-sm">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        {language === "en" ? "Category" : "Kategoria"}
                      </span>
                      <span className="font-bold text-foreground text-sm capitalize">
                        {destination.pricing.priceCategory}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-4">
                  <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground py-6 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg hover:scale-105">
                    {language === "en" ? "Book This Trip" : "Rezervo këtë Udhëtim"}
                  </Button>

                  <a href={`tel:${siteData.footer.contact.phone}`}>
                    <Button
                      variant="outline"
                      className="w-full py-5 text-sm border-2 hover:bg-accent font-semibold rounded-lg transition-all bg-transparent hover:scale-105"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {language === "en" ? "Call to Book" : "Telefono për Rezervim"}
                    </Button>
                  </a>

                  <a href={`mailto:${siteData.footer.contact.email}`}>
                    <Button
                      variant="outline"
                      className="w-full py-5 text-sm border-2 hover:bg-accent font-semibold rounded-lg transition-all bg-transparent hover:scale-105"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {language === "en" ? "Email Inquiry" : "Dërgo Email"}
                    </Button>
                  </a>
                </div>

                <div className="pt-6 border-t border-border text-center">
                  <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wide">
                    {language === "en" ? "Questions? We're here to help" : "Pyetje? Jemi këtu për t'ju ndihmuar"}
                  </p>
                  <p className="font-bold text-foreground text-lg mb-2">{siteData.footer.contact.phone}</p>
                  <p className="text-muted-foreground text-sm font-medium">{siteData.footer.contact.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

