"use client"

import { Button } from "@/components/ui/button"
import RotatingText from "./rotating-text"
import { Plane, Star } from "lucide-react"

interface HeroData {
  title: string
  rotatingTexts: string[]
  subtitle: string
  ctaText: string
}

export function HeroSection({ data }: { data: HeroData }) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#30b2f5] via-[#2da9ed] to-[#4abef0] pt-20">
      <img
        src="/images/cloud.png"
        alt=""
        className="absolute bottom-24 right-16 w-[400px] h-auto opacity-70 animate-float-slow pointer-events-none"
      />
      <img
        src="/images/cloud.png"
        alt=""
        className="absolute bottom-8 right-64 w-[320px] h-auto opacity-50 animate-float-slower pointer-events-none"
      />
      <img
        src="/images/cloud.png"
        alt=""
        className="absolute bottom-40 right-96 w-[280px] h-auto opacity-40 animate-float-medium pointer-events-none"
      />

      {/* Background decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-sky-300/15 rounded-full blur-2xl" />
      <div className="absolute bottom-1/4 right-1/2 w-80 h-80 bg-white/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-10 w-56 h-56 bg-sky-200/10 rounded-full blur-2xl" />

      {/* Dotted line decoration */}
      <svg className="absolute top-40 right-1/4 w-96 h-64 opacity-30" viewBox="0 0 400 200">
        <path
          d="M 0 100 Q 100 50, 200 100 T 400 100"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="8,8"
          fill="none"
        />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-5rem)] py-12">
          {/* Left Content Area */}
          <div className="space-y-6 md:space-y-8">
            <p className="text-white/80 text-sm md:text-base font-medium tracking-widest uppercase">
              PREMIUM TRAVEL AGENCY
            </p>

            {/* Hero Title with Rotating Text */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Fly{" "}
                <span className="inline-block">
                  <RotatingText
                    texts={data.rotatingTexts}
                    mainClassName="px-3 md:px-4 bg-white text-[#30b2f5] overflow-hidden py-1.5 md:py-2 justify-center rounded-xl inline-block"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-1"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={3000}
                  />
                </span>
              </h1>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Feel lighter.
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-lg pt-4">
                Fluturo takes care of flights, stays and experiences, so you just enjoy the journey.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => scrollToSection("destinations")}
                size="lg"
                className="bg-white hover:bg-white/90 text-[#30b2f5] px-8 py-6 text-lg rounded-full shadow-xl font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                Start your journey
              </Button>
              <Button
                onClick={() => scrollToSection("packages")}
                size="lg"
                className="bg-white hover:bg-white/90 text-[#30b2f5] px-8 py-6 text-lg rounded-full shadow-xl font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                View top deals
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-8 text-white">
              <div className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                <span className="text-lg font-medium">120+ destinations</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-white" />
                <span className="text-lg font-medium">4.9/5 traveler rating</span>
              </div>
            </div>
          </div>

          {/* Right Side - Airplane */}
          <div className="relative hidden lg:block">
            <img
              src="/images/AirplaneFinal.png"
              alt="Fluturo Airplane"
              className="w-full max-w-3xl h-auto object-contain drop-shadow-2xl relative z-10 -mr-32"
            />
          </div>

          {/* Mobile: Airplane as watermark */}
          <div className="absolute lg:hidden top-1/2 -translate-y-1/2 right-0 w-full opacity-15 pointer-events-none">
            <img src="/images/AirplaneFinal.png" alt="Fluturo Airplane" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}
