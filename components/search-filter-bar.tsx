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
    <div className="sticky top-20 z-40 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center max-w-5xl mx-auto">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search destinations, cities, themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base border-2 border-gray-200 rounded-xl focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
            />
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-52 h-14 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
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
              <Button className="h-14 px-8 bg-sky-500 hover:bg-sky-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all relative font-semibold">
                <SlidersHorizontal className="mr-2 h-5 w-5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 bg-white text-sky-600 rounded-full min-w-[24px] h-6 px-2 flex items-center justify-center text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
              <SheetHeader className="border-b border-gray-100 pb-4">
                <SheetTitle className="flex items-center justify-between text-2xl">
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="h-6 w-6 text-sky-500" />
                    Filters
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-sky-600 hover:text-sky-700 hover:bg-sky-50"
                  >
                    Reset All
                  </Button>
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-6 pt-6">
                {/* Price Range */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-900 uppercase tracking-wide text-xs">
                    Price Range (EUR)
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        id="priceMin"
                        type="number"
                        placeholder="Min"
                        value={filters.priceMin}
                        onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
                        className="h-11 rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-200"
                      />
                    </div>
                    <div>
                      <Input
                        id="priceMax"
                        type="number"
                        placeholder="Max"
                        value={filters.priceMax}
                        onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                        className="h-11 rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Duration */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-900 uppercase tracking-wide text-xs">
                    Duration (nights)
                  </Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        id="durationMin"
                        type="number"
                        placeholder="Min"
                        value={filters.durationMin}
                        onChange={(e) => setFilters({ ...filters, durationMin: Number(e.target.value) })}
                        className="h-11 rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-200"
                      />
                    </div>
                    <div>
                      <Input
                        id="durationMax"
                        type="number"
                        placeholder="Max"
                        value={filters.durationMax}
                        onChange={(e) => setFilters({ ...filters, durationMax: Number(e.target.value) })}
                        className="h-11 rounded-lg border-gray-300 focus:border-sky-500 focus:ring-sky-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Rating */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-900 uppercase tracking-wide text-xs">
                    Minimum Rating
                  </Label>
                  <Select
                    value={filters.minRating.toString()}
                    onValueChange={(value) => setFilters({ ...filters, minRating: Number(value) })}
                  >
                    <SelectTrigger className="h-11 rounded-lg border-gray-300 hover:border-gray-400">
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="0">Any rating</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.7">4.7+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Departure City */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-900 uppercase tracking-wide text-xs">
                    Departure City
                  </Label>
                  <Select
                    value={filters.departureId}
                    onValueChange={(value) => setFilters({ ...filters, departureId: value })}
                  >
                    <SelectTrigger className="h-11 rounded-lg border-gray-300 hover:border-gray-400">
                      <SelectValue placeholder="Any departure" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg">
                      <SelectItem value="any">Any departure</SelectItem>
                      {departures.map((dep) => (
                        <SelectItem key={dep.id} value={dep.id}>
                          {dep.city} ({dep.airportCode})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Themes */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-900 uppercase tracking-wide text-xs">
                    Themes
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((theme) => (
                      <div key={theme} className="flex items-center space-x-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                        <Checkbox
                          id={theme}
                          checked={filters.themes.includes(theme)}
                          onCheckedChange={() => handleThemeToggle(theme)}
                          className="data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
                        />
                        <Label htmlFor={theme} className="text-sm font-medium capitalize cursor-pointer flex-1">
                          {theme}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200"></div>

                {/* Featured Only */}
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Checkbox
                    id="featured"
                    checked={filters.featuredOnly}
                    onCheckedChange={(checked) => setFilters({ ...filters, featuredOnly: checked as boolean })}
                    className="data-[state=checked]:bg-sky-500 data-[state=checked]:border-sky-500"
                  />
                  <Label htmlFor="featured" className="text-sm font-medium cursor-pointer flex-1">
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
