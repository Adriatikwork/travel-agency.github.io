"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import RotatingText from "./rotating-text"
import { Plane, Globe, Clock, MessageCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

interface HeroData {
  title: { en: string; sq: string }
  rotatingTexts: { en: string[]; sq: string[] }
  subtitle: { en: string; sq: string }
  ctaText: { en: string; sq: string }
  startJourney: { en: string; sq: string }
  viewTopDeals: { en: string; sq: string }
  nextDepartures: { en: string; sq: string }
  premiumAgency: { en: string; sq: string }
  feelLighter: { en: string; sq: string }
  destinations: { en: string; sq: string }
  localExperts: { en: string; sq: string }
  support247: { en: string; sq: string }
}

// Helper to get base path, handling v0.dev edge cases
const getBasePath = () => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH
  // Return empty string if undefined, empty, or contains quotes
  if (!base || base === "''" || base === '""' || base.trim() === "") return ""
  return base
}

export function HeroSection({ data }: { data: HeroData }) {
  const basePath = getBasePath()
  const [scrollY, setScrollY] = useState(0)
  const { language } = useLanguage()

  // Lightweight parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-br from-[#2aa1e0] via-[#30b2f5] to-[#40bff5] pt-20 md:pt-24 pb-12">
      <img
        src={`${basePath}/images/cloud.png`}
        alt=""
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        className="absolute top-20 left-20 w-[280px] h-auto opacity-20 animate-float-slow pointer-events-none transition-transform duration-100"
      />
      <img
        src={`${basePath}/images/cloud.png`}
        alt=""
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        className="absolute top-32 right-32 w-[240px] h-auto opacity-25 animate-float-medium pointer-events-none transition-transform duration-100"
      />

      {/* Existing bottom clouds with better positioning */}
      <img
        src={`${basePath}/images/cloud.png`}
        alt=""
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        className="absolute bottom-16 right-12 w-[420px] h-auto opacity-60 animate-float-slow pointer-events-none transition-transform duration-100"
      />
      <img
        src={`${basePath}/images/cloud.png`}
        alt=""
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        className="absolute bottom-4 right-72 w-[340px] h-auto opacity-45 animate-float-slower pointer-events-none transition-transform duration-100"
      />

      <div className="absolute top-10 right-16 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-sky-100/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

      <svg className="absolute top-24 right-1/4 w-[500px] h-64 opacity-20" viewBox="0 0 500 200">
        <path
          d="M 0 120 Q 150 40, 300 120 T 500 100"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="6,10"
          fill="none"
        />
      </svg>
      <svg className="absolute top-56 left-1/3 w-[400px] h-48 opacity-15" viewBox="0 0 400 150">
        <path d="M 0 80 Q 100 30, 200 80 T 400 70" stroke="white" strokeWidth="2" strokeDasharray="8,12" fill="none" />
      </svg>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(85vh-6rem)] py-8">
          {/* Left Content Area */}
          <div className="space-y-4 md:space-y-5 lg:pt-8">
            <p className="text-white/80 text-sm md:text-base font-medium tracking-widest uppercase">
              {data.premiumAgency[language]}
            </p>

            {/* Hero Title with Rotating Text */}
            <div className="space-y-1 md:space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {data.title[language]}{" "}
                <span className="inline-block">
                  <RotatingText
                    texts={data.rotatingTexts[language]}
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
                {data.feelLighter[language]}
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-lg pt-2">{data.subtitle[language]}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={() => scrollToSection("destinations")}
                size="lg"
                className="bg-white hover:bg-white/90 text-[#30b2f5] px-8 py-6 text-lg rounded-full shadow-xl font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                {data.startJourney[language]}
              </Button>
              <Button
                onClick={() => scrollToSection("packages")}
                size="lg"
                className="bg-white hover:bg-white/90 text-[#30b2f5] px-8 py-6 text-lg rounded-full shadow-xl font-semibold transition-all duration-300 w-full sm:w-auto"
              >
                {data.viewTopDeals[language]}
              </Button>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 max-w-md shadow-2xl border border-white/20 mt-6">
              <h3 className="text-[#30b2f5] font-semibold text-sm uppercase tracking-wide mb-3">
                {data.nextDepartures[language]}
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-[#30b2f5]" />
                    <span className="text-gray-700 font-medium">
                      {language === "sq" ? "Prishtinë" : "Prishtina"} → Paris
                    </span>
                  </div>
                  <span className="text-[#30b2f5] font-bold">{language === "sq" ? "nga" : "from"} €199</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-[#30b2f5]" />
                    <span className="text-gray-700 font-medium">
                      {language === "sq" ? "Shkup" : "Skopje"} → {language === "sq" ? "Vjenë" : "Vienna"}
                    </span>
                  </div>
                  <span className="text-[#30b2f5] font-bold">{language === "sq" ? "nga" : "from"} €89</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-[#30b2f5]" />
                    <span className="text-gray-700 font-medium">
                      {language === "sq" ? "Tiranë" : "Tirana"} → {language === "sq" ? "Londër" : "London"}
                    </span>
                  </div>
                  <span className="text-[#30b2f5] font-bold">{language === "sq" ? "nga" : "from"} €149</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 md:gap-8 text-white pt-4">
              <div className="flex items-center gap-2.5">
                <Globe className="h-6 w-6" />
                <span className="text-base md:text-lg font-semibold">{data.destinations[language]}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="h-6 w-6" />
                <span className="text-base md:text-lg font-semibold">{data.localExperts[language]}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-6 w-6" />
                <span className="text-base md:text-lg font-semibold">{data.support247[language]}</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block -ml-16 xl:-ml-24">
            <img
              src={`${basePath}/images/AirplaneFinal.png`}
              alt="Fluturo Airplane"
              style={{ transform: `translateY(${scrollY * 0.1}px) scale(1.15)` }}
              className="w-full max-w-4xl h-auto object-contain drop-shadow-2xl relative z-10 -mr-40 transition-transform duration-100"
            />
          </div>

          {/* Mobile: Airplane as watermark */}
          <div className="absolute lg:hidden top-1/2 -translate-y-1/2 right-0 w-full opacity-15 pointer-events-none">
            <img
              src={`${basePath}/images/AirplaneFinal.png`}
              alt="Fluturo Airplane"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
