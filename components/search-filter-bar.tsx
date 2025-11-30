"use client"

import { useState, useEffect } from "react"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface SearchFilterBarProps {
  onSearch: (query: string) => void
  onFilter: (filters: FilterState) => void
  onSort: (sort: string) => void
  departures: Array<{ id: string; city: string; country: string; airportCode: string }>
}

export interface FilterState {
  priceMin: number
  priceMax: number
  durationMin: number
  durationMax: number
  minRating: number
  themes: string[]
  featuredOnly: boolean
  departureId: string
}

export function SearchFilterBar({ onSearch, onFilter, onSort, departures }: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popularity")
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
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const themes = ["beach", "luxury", "adventure", "city-break", "romantic", "honeymoon", "family", "culture"]

  useEffect(() => {
    onSearch(searchQuery)
  }, [searchQuery, onSearch])

  useEffect(() => {
    onFilter(filters)
  }, [filters, onFilter])

  useEffect(() => {
    onSort(sortBy)
  }, [sortBy, onSort])

  const handleThemeToggle = (theme: string) => {
    setFilters((prev) => ({
      ...prev,
      themes: prev.themes.includes(theme) ? prev.themes.filter((t) => t !== theme) : [...prev.themes, theme],
    }))
  }

  const resetFilters = () => {
    setFilters({
      priceMin: 0,
      priceMax: 10000,
      durationMin: 0,
      durationMax: 30,
      minRating: 0,
      themes: [],
      featuredOnly: false,
      departureId: "",
    })
  }

  const activeFilterCount =
    (filters.priceMin > 0 ? 1 : 0) +
    (filters.priceMax < 10000 ? 1 : 0) +
    (filters.durationMin > 0 ? 1 : 0) +
    (filters.durationMax < 30 ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    filters.themes.length +
    (filters.featuredOnly ? 1 : 0) +
    (filters.departureId ? 1 : 0)

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search destinations, cities, themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base border-gray-300 focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 h-12 border-gray-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">A-Z</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter Button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 px-6 border-gray-300 relative bg-transparent">
                <SlidersHorizontal className="mr-2 h-5 w-5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 bg-sky-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <span>Filters</span>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset All
                  </Button>
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-6 pt-6">
                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Price Range (EUR)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="priceMin" className="text-sm text-gray-600">
                        Min
                      </Label>
                      <Input
                        id="priceMin"
                        type="number"
                        value={filters.priceMin}
                        onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priceMax" className="text-sm text-gray-600">
                        Max
                      </Label>
                      <Input
                        id="priceMax"
                        type="number"
                        value={filters.priceMax}
                        onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Duration (nights)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="durationMin" className="text-sm text-gray-600">
                        Min
                      </Label>
                      <Input
                        id="durationMin"
                        type="number"
                        value={filters.durationMin}
                        onChange={(e) => setFilters({ ...filters, durationMin: Number(e.target.value) })}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="durationMax" className="text-sm text-gray-600">
                        Max
                      </Label>
                      <Input
                        id="durationMax"
                        type="number"
                        value={filters.durationMax}
                        onChange={(e) => setFilters({ ...filters, durationMax: Number(e.target.value) })}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Minimum Rating</Label>
                  <Select
                    value={filters.minRating.toString()}
                    onValueChange={(value) => setFilters({ ...filters, minRating: Number(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any rating</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.7">4.7+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Departure City */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Departure City</Label>
                  <Select
                    value={filters.departureId}
                    onValueChange={(value) => setFilters({ ...filters, departureId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any departure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any departure</SelectItem>
                      {departures.map((dep) => (
                        <SelectItem key={dep.id} value={dep.id}>
                          {dep.city} ({dep.airportCode})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Themes */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Themes</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((theme) => (
                      <div key={theme} className="flex items-center space-x-2">
                        <Checkbox
                          id={theme}
                          checked={filters.themes.includes(theme)}
                          onCheckedChange={() => handleThemeToggle(theme)}
                        />
                        <Label htmlFor={theme} className="text-sm font-normal capitalize cursor-pointer">
                          {theme}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Only */}
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="featured"
                    checked={filters.featuredOnly}
                    onCheckedChange={(checked) => setFilters({ ...filters, featuredOnly: checked as boolean })}
                  />
                  <Label htmlFor="featured" className="text-sm font-normal cursor-pointer">
                    Show featured destinations only
                  </Label>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
