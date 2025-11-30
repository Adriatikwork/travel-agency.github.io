"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: string
  name: string
  location: string
  destinationId?: string
  destination?: string
  tripType: string
  rating: number
  reviewShort: string
  reviewLong: string
  image: string
  travelDate: string
  featured: boolean
}

export function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  if (testimonials.length === 0) return null

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-sky-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            What Our Travelers Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
            Real experiences from real travelers who trusted us with their adventures
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Card */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <Card className="w-full border-none shadow-2xl bg-white">
              <CardContent className="p-8 sm:p-10 md:p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Avatar */}
                  <img
                    src={currentTestimonial.image || `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/placeholder.svg`}
                    alt={currentTestimonial.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-sky-100"
                  />

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl text-pretty">
                    &quot;{currentTestimonial.reviewLong}&quot;
                  </p>

                  {/* Author Info */}
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-900 text-lg">{currentTestimonial.name}</p>
                    <p className="text-gray-600 text-sm">{currentTestimonial.location}</p>

                    {/* Destination Badge */}
                    {currentTestimonial.destination && (
                      <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mt-2">
                        <MapPin className="h-4 w-4" />
                        <span>Traveled to {currentTestimonial.destination}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:px-4 pointer-events-none">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="pointer-events-auto bg-white hover:bg-sky-50 border-sky-200 shadow-lg h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="pointer-events-auto bg-white hover:bg-sky-50 border-sky-200 shadow-lg h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "h-2 sm:h-3 rounded-full transition-all duration-300",
                      index === currentIndex ? "w-8 sm:w-10 bg-sky-500" : "w-2 sm:w-3 bg-gray-300 hover:bg-gray-400",
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
