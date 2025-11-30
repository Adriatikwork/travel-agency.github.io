"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"

interface ContactFormProps {
  destinations: Array<{ id: string; name: string }>
  departures: Array<{ id: string; city: string; country: string }>
}

export function ContactForm({ destinations, departures }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    departureCity: "",
    destination: "",
    dateFrom: "",
    dateTo: "",
    travelers: "2",
    tripType: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Client-side only - show success message
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        departureCity: "",
        destination: "",
        dateFrom: "",
        dateTo: "",
        travelers: "2",
        tripType: "",
        message: "",
      })
    }, 3000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
            <p className="text-xl text-gray-600">
              Your inquiry has been received. Our travel experts will contact you shortly to plan your perfect trip.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Plan Your Trip</h2>
            <p className="text-xl text-gray-600">Tell us about your dream vacation and we'll make it happen</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+383 44 123 456"
                />
              </div>

              {/* Departure City */}
              <div className="space-y-2">
                <Label htmlFor="departureCity">Departure City *</Label>
                <Select
                  value={formData.departureCity}
                  onValueChange={(value) => handleChange("departureCity", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select departure" />
                  </SelectTrigger>
                  <SelectContent>
                    {departures.map((dep) => (
                      <SelectItem key={dep.id} value={dep.id}>
                        {dep.city}, {dep.country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination">Desired Destination *</Label>
                <Select
                  value={formData.destination}
                  onValueChange={(value) => handleChange("destination", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((dest) => (
                      <SelectItem key={dest.id} value={dest.id}>
                        {dest.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Trip Type */}
              <div className="space-y-2">
                <Label htmlFor="tripType">Trip Type *</Label>
                <Select value={formData.tripType} onValueChange={(value) => handleChange("tripType", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="honeymoon">Honeymoon</SelectItem>
                    <SelectItem value="family">Family Vacation</SelectItem>
                    <SelectItem value="romantic">Romantic Getaway</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                    <SelectItem value="luxury">Luxury Experience</SelectItem>
                    <SelectItem value="group">Group Travel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div className="space-y-2">
                <Label htmlFor="dateFrom">Travel Date From *</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  required
                  value={formData.dateFrom}
                  onChange={(e) => handleChange("dateFrom", e.target.value)}
                />
              </div>

              {/* Date To */}
              <div className="space-y-2">
                <Label htmlFor="dateTo">Travel Date To *</Label>
                <Input
                  id="dateTo"
                  type="date"
                  required
                  value={formData.dateTo}
                  onChange={(e) => handleChange("dateTo", e.target.value)}
                />
              </div>

              {/* Travelers */}
              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers *</Label>
                <Select value={formData.travelers} onValueChange={(value) => handleChange("travelers", value)} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Person" : "People"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Additional Information</Label>
              <Textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Tell us about your preferences, special requests, or any questions you have..."
              />
            </div>

            <Button type="submit" size="lg" className="w-full bg-sky-500 hover:bg-sky-600 text-lg py-6">
              Submit Inquiry
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
