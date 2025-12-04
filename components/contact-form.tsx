"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import contactData from "@/data/contact.json"

interface ContactFormProps {
  destinations: Array<{ id: string; name: string }>
  departures: Array<{ id: string; city: string; country: string }>
}

export function ContactForm({ destinations, departures }: ContactFormProps) {
  const { language } = useLanguage()
  const { section, form, success } = contactData
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
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{success.title[language]}</h3>
            <p className="text-xl text-gray-600">{success.message[language]}</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{section.title[language]}</h2>
            <p className="text-xl text-gray-600">{section.subtitle[language]}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">{form.fullName[language]} *</Label>
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
                <Label htmlFor="email">{form.email[language]} *</Label>
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
                <Label htmlFor="phone">{form.phone[language]} *</Label>
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
                <Label htmlFor="departureCity">{form.departureCity[language]} *</Label>
                <Select
                  value={formData.departureCity}
                  onValueChange={(value) => handleChange("departureCity", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={form.selectDeparture[language]} />
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
                <Label htmlFor="destination">{form.destination[language]} *</Label>
                <Select
                  value={formData.destination}
                  onValueChange={(value) => handleChange("destination", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={form.selectDestination[language]} />
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
                <Label htmlFor="tripType">{form.tripType[language]} *</Label>
                <Select value={formData.tripType} onValueChange={(value) => handleChange("tripType", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder={form.selectType[language]} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="honeymoon">{form.tripTypes.honeymoon[language]}</SelectItem>
                    <SelectItem value="family">{form.tripTypes.family[language]}</SelectItem>
                    <SelectItem value="romantic">{form.tripTypes.romantic[language]}</SelectItem>
                    <SelectItem value="adventure">{form.tripTypes.adventure[language]}</SelectItem>
                    <SelectItem value="luxury">{form.tripTypes.luxury[language]}</SelectItem>
                    <SelectItem value="group">{form.tripTypes.group[language]}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date From */}
              <div className="space-y-2">
                <Label htmlFor="dateFrom">{form.dateFrom[language]} *</Label>
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
                <Label htmlFor="dateTo">{form.dateTo[language]} *</Label>
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
                <Label htmlFor="travelers">{form.travelers[language]} *</Label>
                <Select value={formData.travelers} onValueChange={(value) => handleChange("travelers", value)} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? form.person[language] : form.people[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">{form.additionalInfo[language]}</Label>
              <Textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder={form.additionalInfoPlaceholder[language]}
              />
            </div>

            <Button type="submit" size="lg" className="w-full bg-sky-500 hover:bg-sky-600 text-lg py-6">
              {form.submit[language]}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
