"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { SearchFilterBar, type FilterState } from "@/components/search-filter-bar"
import { DestinationsGrid } from "@/components/destinations-grid"
import { PackagesSection } from "@/components/packages-section"
import { ServicesSection } from "@/components/services-section"
import { AboutSection } from "@/components/about-section"
import { TeamSection } from "@/components/team-section"
import { TestimonialsSlider } from "@/components/testimonials-slider"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/lib/language-context"
import siteData from "@/data/site-data.json"
import destinationsData from "@/data/destinations"
import packagesData from "@/data/packages"
import testimonialsData from "@/data/testimonials.json"
import ComingSoonPage from "@/app/coming-soon/page"

export default function HomePage() {
  const searchParams = useSearchParams()
  const { language } = useLanguage()
  const [showActualSite, setShowActualSite] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    priceMin: 0,
    priceMax: 10000,
    durationMin: 0,
    durationMax: 30,
    minRating: 0,
    themes: [],
    featuredOnly: false,
    departureId: "",
  })
  const [sortBy, setSortBy] = useState("popularity")

  const filteredDestinations = useMemo(() => {
    let results = [...destinationsData.destinations]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter((dest) => {
        const tagline = typeof dest.tagline === "object" ? dest.tagline[language] : dest.tagline
        const country = typeof dest.country === "object" ? dest.country[language] : dest.country
        return (
          dest.name.toLowerCase().includes(query) ||
          dest.city.toLowerCase().includes(query) ||
          country.toLowerCase().includes(query) ||
          dest.continent.toLowerCase().includes(query) ||
          tagline.toLowerCase().includes(query) ||
          dest.themes.some((theme) => theme.toLowerCase().includes(query)) ||
          (Array.isArray(dest.tags) ? dest.tags : dest.tags?.[language] || []).some((tag: string) =>
            tag.toLowerCase().includes(query),
          ) ||
          destinationsData.departures.some((dep) => {
            const depCity = typeof dep.city === "object" ? dep.city[language] : dep.city
            return (
              dest.availableDepartureIds.includes(dep.id) &&
              (depCity.toLowerCase().includes(query) || dep.airportCode.toLowerCase().includes(query))
            )
          })
        )
      })
    }

    // Price filter
    results = results.filter((dest) => dest.pricing.from >= filters.priceMin && dest.pricing.from <= filters.priceMax)

    // Duration filter
    results = results.filter(
      (dest) => dest.duration.minNights >= filters.durationMin && dest.duration.maxNights <= filters.durationMax,
    )

    // Rating filter
    if (filters.minRating > 0) {
      results = results.filter((dest) => dest.rating !== null && dest.rating >= filters.minRating)
    }

    // Themes filter
    if (filters.themes.length > 0) {
      results = results.filter((dest) => filters.themes.some((theme: string) => dest.themes.includes(theme)))
    }

    // Featured filter
    if (filters.featuredOnly) {
      results = results.filter((dest) => dest.featured)
    }

    // Departure filter
    if (filters.departureId) {
      results = results.filter((dest) => dest.availableDepartureIds.includes(filters.departureId))
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => a.pricing.from - b.pricing.from)
        break
      case "price-high":
        results.sort((a, b) => b.pricing.from - a.pricing.from)
        break
      case "rating":
        results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        break
      case "name":
        results.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "popularity":
      default:
        results.sort((a, b) => b.popularityScore - a.popularityScore)
        break
    }

    return results
  }, [searchQuery, filters, sortBy, language])

  const filteredPackages = useMemo(() => {
    const visibleDestinationIds = new Set(filteredDestinations.map((d) => d.id))

    return packagesData.packages
      .filter((pkg) => visibleDestinationIds.has(pkg.destinationId))
      .map((pkg) => {
        const destination = destinationsData.destinations.find((d) => d.id === pkg.destinationId)
        return {
          ...pkg,
          destinationName: destination?.name,
        }
      })
      .slice(0, 6) // Show max 6 packages
  }, [filteredDestinations])

  const enrichedTestimonials = useMemo(() => {
    return testimonialsData.testimonials.map((testimonial) => {
      const destination = destinationsData.destinations.find((d) => d.id === testimonial.destinationId)
      return {
        ...testimonial,
        destination: destination?.name || "Unknown",
      }
    })
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  const handleFilter = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  const handleSort = useCallback((sort: string) => {
    setSortBy(sort)
  }, [])

  useEffect(() => {
    const urlToken = searchParams.get("token")
    const storedToken = typeof window !== "undefined" ? localStorage.getItem("site_access_token") : null

    // Secret token to access actual site
    const SECRET_TOKEN = "fluturo2025"

    if (urlToken === SECRET_TOKEN) {
      localStorage.setItem("site_access_token", SECRET_TOKEN)
      setShowActualSite(true)
    } else if (storedToken === SECRET_TOKEN) {
      setShowActualSite(true)
    }
  }, [searchParams])

  if (!showActualSite) {
    return <ComingSoonPage />
  }

  const { ui } = destinationsData

  return (
    <main className="min-h-screen">
      <Navbar />

      <HeroSection data={siteData.hero} />

      <div id="destinations">
        <SearchFilterBar
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          departures={destinationsData.departures}
          destinations={destinationsData.destinations}
        />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{ui.exploreDestinations[language]}</h2>
              <p className="text-xl text-gray-600">
                {filteredDestinations.length}{" "}
                {filteredDestinations.length === 1 ? ui.destinationFound[language] : ui.destinationsFound[language]}
              </p>
            </div>
            <DestinationsGrid
              destinations={filteredDestinations}
              departures={destinationsData.departures}
              currency={destinationsData.meta.currency}
            />
          </div>
        </section>
      </div>

      {filteredPackages.length > 0 && (
        <div id="packages">
          <PackagesSection packages={filteredPackages} currency={destinationsData.meta.currency} />
        </div>
      )}

      <div id="services">
        <ServicesSection />
      </div>

      <div id="about">
        <AboutSection stats={siteData.stats.numbers} whyChoose={siteData.whyChoose.reasons} />
      </div>

      <div id="team">
        <TeamSection />
      </div>

      <div id="testimonials">
        <TestimonialsSlider testimonials={enrichedTestimonials} />
      </div>

      <div id="contact">
        <ContactForm
          destinations={destinationsData.destinations.map((d) => ({
            id: d.id,
            name: d.name,
          }))}
          departures={destinationsData.departures.map((d) => ({
            id: d.id,
            city: typeof d.city === "object" ? d.city[language] : d.city,
            country: typeof d.country === "object" ? d.country[language] : d.country,
          }))}
        />
      </div>

      <Footer />
    </main>
  )
}
