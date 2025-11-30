"use client"

import { useState, useCallback, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { SearchFilterBar, type FilterState } from "@/components/search-filter-bar"
import { DestinationsGrid } from "@/components/destinations-grid"
import { PackagesSection } from "@/components/packages-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSlider } from "@/components/testimonials-slider"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"
import siteData from "@/data/site-data.json"
import destinationsData from "@/data/destinations.json"
import packagesData from "@/data/packages.json"
import statsData from "@/data/stats.json"
import testimonialsData from "@/data/testimonials.json"

export default function HomePage() {
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

  // Filter and sort destinations
  const filteredDestinations = useMemo(() => {
    let results = [...destinationsData.destinations]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter((dest) => {
        return (
          dest.name.toLowerCase().includes(query) ||
          dest.city.toLowerCase().includes(query) ||
          dest.country.toLowerCase().includes(query) ||
          dest.continent.toLowerCase().includes(query) ||
          dest.tagline.toLowerCase().includes(query) ||
          dest.themes.some((theme) => theme.toLowerCase().includes(query)) ||
          dest.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          destinationsData.departures.some(
            (dep) =>
              dest.availableDepartureIds.includes(dep.id) &&
              (dep.city.toLowerCase().includes(query) || dep.airportCode.toLowerCase().includes(query)),
          )
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
      results = results.filter((dest) => dest.rating >= filters.minRating)
    }

    // Themes filter
    if (filters.themes.length > 0) {
      results = results.filter((dest) => filters.themes.some((theme) => dest.themes.includes(theme)))
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
        results.sort((a, b) => b.rating - a.rating)
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
  }, [searchQuery, filters, sortBy])

  // Filter packages based on current destination filters
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

  // Enrich testimonials with destination names
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
        />

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Destinations</h2>
              <p className="text-xl text-gray-600">
                {filteredDestinations.length} {filteredDestinations.length === 1 ? "destination" : "destinations"} found
              </p>
            </div>
            <DestinationsGrid destinations={filteredDestinations} currency={destinationsData.meta.currency} />
          </div>
        </section>
      </div>

      {filteredPackages.length > 0 && (
        <div id="packages">
          <PackagesSection packages={filteredPackages} currency={destinationsData.meta.currency} />
        </div>
      )}

      <div id="stats">
        <StatsSection stats={statsData.stats} whyChoose={statsData.whyChoose} />
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
            city: d.city,
            country: d.country,
          }))}
        />
      </div>

      <Footer data={siteData.footer} />
    </main>
  )
}
