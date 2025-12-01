import { notFound } from "next/navigation"
import { MapPin, Calendar, Users, Utensils, Check, Phone, Mail, ArrowLeft, Plane } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import destinationsData from "@/data/destinations.json"
import siteData from "@/data/site-data.json"

export async function generateStaticParams() {
  return destinationsData.destinations.map((dest) => ({
    slug: dest.slug,
  }))
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = destinationsData.destinations.find((d) => d.slug === params.slug)

  if (!destination) {
    notFound()
  }

  const departures = destinationsData.departures.filter((dep) => destination.availableDepartureIds.includes(dep.id))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-sky-500 to-sky-600">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url('/placeholder.svg?height=600&width=1200')` }}
        />
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <Link href="/" className="inline-flex items-center text-white mb-6 hover:underline">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Destinations
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{destination.name}</h1>
            <p className="text-2xl text-white/90 italic mb-6">{destination.tagline}</p>
            <div className="flex items-center gap-4 text-white">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>
                  {destination.city}, {destination.country}
                </span>
              </div>
              {destination.duration.specificDates && (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{destination.duration.specificDates}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Destination</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{destination.descriptionLong}</p>

                {/* Themes */}
                <div className="flex flex-wrap gap-2">
                  {destination.themes.map((theme) => (
                    <Badge key={theme} className="bg-sky-100 text-sky-700 border-0 capitalize text-sm px-3 py-1">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Highlights */}
            {destination.highlights && destination.highlights.length > 0 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* What's Included */}
            {destination.included && destination.included.length > 0 && (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
                  <ul className="space-y-3">
                    {destination.included.map((item, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="capitalize">{item.replace(/-/g, " ")}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Departure Cities */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Departures</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {departures.map((departure) => (
                    <div key={departure.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <Plane className="h-5 w-5 text-sky-500 mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900">{departure.city}</p>
                        <p className="text-sm text-gray-500">{departure.airportCode}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl">
              <CardContent className="p-8 space-y-6">
                {/* Price */}
                <div className="text-center border-b border-gray-200 pb-6">
                  <p className="text-sm text-gray-500 mb-2">Price from</p>
                  <p className="text-5xl font-bold text-sky-600">
                    {destinationsData.meta.currency}
                    {destination.pricing.from}
                  </p>
                  {destination.pricing.note && <p className="text-sm text-gray-600 mt-2">{destination.pricing.note}</p>}
                  {destination.pricing.perPerson && <p className="text-xs text-gray-500 mt-1">per person</p>}
                </div>

                {/* Trip Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Duration
                    </span>
                    <span className="font-semibold text-gray-900">
                      {destination.duration.minNights === destination.duration.maxNights
                        ? `${destination.duration.minNights} nights`
                        : `${destination.duration.minNights}-${destination.duration.maxNights} nights`}
                    </span>
                  </div>

                  {destination.mealPlan && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <Utensils className="h-4 w-4 mr-2" />
                        Meals
                      </span>
                      <span className="font-semibold text-gray-900">{destination.mealPlan}</span>
                    </div>
                  )}

                  {destination.pricing.priceCategory && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Category
                      </span>
                      <span className="font-semibold text-gray-900 capitalize">
                        {destination.pricing.priceCategory}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white py-6 text-lg font-semibold shadow-lg">
                    Book Now
                  </Button>
                  <a href={`tel:${siteData.contact.phone}`}>
                    <Button
                      variant="outline"
                      className="w-full py-6 text-lg border-sky-500 text-sky-600 hover:bg-sky-50 bg-transparent"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Call Us
                    </Button>
                  </a>
                  <a href={`mailto:${siteData.contact.email}`}>
                    <Button
                      variant="outline"
                      className="w-full py-6 text-lg border-gray-300 hover:bg-gray-50 bg-transparent"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Email Inquiry
                    </Button>
                  </a>
                </div>

                {/* Contact Info */}
                <div className="pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
                  <p className="mb-2">Need help? Contact us:</p>
                  <p className="font-semibold text-gray-900">{siteData.contact.phone}</p>
                  <p className="text-gray-500">{siteData.contact.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
