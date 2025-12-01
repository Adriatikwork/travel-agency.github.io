"use client"

import { X, MapPin, Clock, Star, Check, Plane, Utensils } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getImagePath } from "@/lib/image-path"

interface DestinationDetailProps {
  destination: {
    id: string
    name: string
    city: string
    country: string
    tagline: string
    descriptionShort: string
    descriptionLong: string
    primaryImage: string
    pricing: {
      from: number
      currency: string
      perPerson: boolean
      priceCategory: string
      note?: string
    }
    duration: {
      minNights: number
      maxNights: number
      specificDates?: string
    }
    mealPlan?: string
    rating: number | null
    themes: string[]
    tags: string[]
    included?: string[]
    highlights?: string[]
    availableDepartureIds: string[]
  } | null
  departures: Array<{
    id: string
    city: string
    country: string
  }>
  open: boolean
  onClose: () => void
  currency: string
}

export function DestinationDetailModal({ destination, departures, open, onClose, currency }: DestinationDetailProps) {
  if (!destination) return null

  const availableDepartures = departures.filter((dep) => destination.availableDepartureIds.includes(dep.id))

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header Image */}
        <div className="relative h-80 w-full">
          <img
            src={getImagePath(destination.primaryImage) || "/placeholder.svg"}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5 text-gray-800" />
          </button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{destination.name}</h2>
                <p className="text-xl text-white/90 italic mb-3">{destination.tagline}</p>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">
                    {destination.city}, {destination.country}
                  </span>
                </div>
              </div>
              {destination.rating && (
                <div className="bg-white rounded-xl px-4 py-2 flex items-center gap-2">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">{destination.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Price and Duration Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-sky-50 rounded-xl p-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Price From</p>
              <p className="text-3xl font-bold text-sky-600">
                {currency}
                {destination.pricing.from}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {destination.pricing.perPerson ? "Per Person" : "Total Price"}
              </p>
              {destination.pricing.note && (
                <p className="text-xs text-gray-600 mt-2 italic">{destination.pricing.note}</p>
              )}
            </div>

            <div className="text-center flex flex-col items-center justify-center">
              <Clock className="h-8 w-8 text-sky-500 mb-2" />
              <p className="text-lg font-semibold">
                {destination.duration.minNights === destination.duration.maxNights
                  ? `${destination.duration.minNights} Nights`
                  : `${destination.duration.minNights}-${destination.duration.maxNights} Nights`}
              </p>
              {destination.duration.specificDates && (
                <p className="text-sm text-gray-600 mt-1">{destination.duration.specificDates}</p>
              )}
            </div>

            <div className="text-center flex flex-col items-center justify-center">
              <Plane className="h-8 w-8 text-sky-500 mb-2" />
              <p className="text-sm font-semibold mb-1">Departures From</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {availableDepartures.map((dep) => (
                  <Badge key={dep.id} variant="outline" className="text-xs">
                    {dep.city}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Destination</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{destination.descriptionLong}</p>
          </div>

          {/* Meal Plan */}
          {destination.mealPlan && (
            <div className="bg-green-50 rounded-xl p-6 flex items-start gap-4">
              <Utensils className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Meal Plan</h4>
                <p className="text-gray-700">{destination.mealPlan}</p>
              </div>
            </div>
          )}

          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's Included */}
          {destination.included && destination.included.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {destination.included.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                    <Check className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 capitalize">{item.replace(/-/g, " ")}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Themes & Tags */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Travel Style</h3>
            <div className="flex flex-wrap gap-2">
              {destination.themes.map((theme) => (
                <Badge key={theme} className="bg-sky-100 text-sky-700 border-sky-200 capitalize px-3 py-1">
                  {theme}
                </Badge>
              ))}
              {destination.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="capitalize px-3 py-1">
                  {tag.replace(/-/g, " ")}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <Button size="lg" className="flex-1 bg-sky-500 hover:bg-sky-600 text-white text-lg py-6">
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-sky-500 text-sky-600 hover:bg-sky-50 text-lg py-6 bg-transparent"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
