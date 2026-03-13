"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import RotatingText from "./rotating-text"
import { Globe, MessageCircle, Shield } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
// import { HeroCinematicAnimation } from "./hero-cinematic-animation"

interface HeroData {
  title: { en: string; sq: string }
  rotatingTexts: { en: string[]; sq: string[] }
  subtitle: { en: string; sq: string }
  ctaText: { en: string; sq: string }
  startJourney: { en: string; sq: string }
  viewTopDeals: { en: string; sq: string }
  premiumAgency: { en: string; sq: string }
  feelLighter: { en: string; sq: string }
  destinations: { en: string; sq: string }
  localExperts: { en: string; sq: string }
}

const getBasePath = () => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH
  if (!base || base === "''" || base === '""' || base.trim() === "") return ""
  return base
}

export function HeroSection({ data }: { data: HeroData }) {
  const basePath = getBasePath()
  const [scrollY, setScrollY] = useState(0)
  const { language } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-brand">
      {/* Layered background depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(255,255,255,0.18)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(0,0,0,0.08)_0%,transparent_50%)]" />

      {/* Floating clouds - subtle depth */}
      <img
        src={`${basePath}/images/cloud.png`}
        alt=""
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        className="absolute top-16 left-[5%] w-56 h-auto opacity-10 animate-float-slow pointer-events-none"
      />
      <img
        src={`${basePath}/images/cloud.png`}
        alt=""
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
        className="absolute top-32 right-[8%] w-44 h-auto opacity-[0.07] animate-float-medium pointer-events-none"
      />
      <img
        src={`${basePath}/images/cloud.png`}
        alt=""
        style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        className="absolute bottom-32 left-[15%] w-72 h-auto opacity-[0.12] animate-float-slower pointer-events-none"
      />

      {/* Subtle flight path lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" viewBox="0 0 1440 900">
        <path d="M -100 600 Q 400 200, 720 450 T 1540 300" stroke="white" strokeWidth="1" fill="none" strokeDasharray="8,16" />
        <path d="M -100 300 Q 500 500, 900 250 T 1540 500" stroke="white" strokeWidth="1" fill="none" strokeDasharray="8,16" />
      </svg>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-4xl mx-auto py-20 sm:py-24">
          {/* Badge */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-full text-primary-foreground/90 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase mb-8">
              {data.premiumAgency[language]}
            </span>
          </div>

          {/* Main headline - centered with rotating text */}
          <div className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-primary-foreground leading-[0.9] tracking-tight mb-2">
              {data.title[language]}
            </h1>
            <div className="flex justify-center mb-2">
              <RotatingText
                texts={data.rotatingTexts[language]}
                mainClassName="px-4 md:px-6 bg-primary-foreground text-brand overflow-hidden py-1.5 md:py-3 justify-center rounded-2xl inline-flex text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-primary-foreground leading-[0.9] tracking-tight">
              {data.feelLighter[language]}
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-fade-in-up" style={{ animationDelay: "280ms" }}>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/70 max-w-xl mx-auto mt-8 mb-10 leading-relaxed font-sans text-pretty">
              {data.subtitle[language]}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <Button
              onClick={() => scrollToSection("destinations")}
              size="lg"
              className="bg-primary-foreground hover:bg-primary-foreground/95 text-brand px-8 py-6 text-sm rounded-full shadow-xl shadow-foreground/10 font-bold transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5 w-full sm:w-auto"
            >
              {data.startJourney[language]}
            </Button>
            <Button
              onClick={() => scrollToSection("packages")}
              size="lg"
              className="bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border border-primary-foreground/20 px-8 py-6 text-sm rounded-full font-bold transition-all duration-200 backdrop-blur-sm w-full sm:w-auto"
            >
              {data.viewTopDeals[language]}
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: "550ms" }}>
            <div className="flex items-center gap-2.5 text-primary-foreground/70">
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <Globe className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">{data.destinations[language]}</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-primary-foreground/20" />
            <div className="flex items-center gap-2.5 text-primary-foreground/70">
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <MessageCircle className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">{data.localExperts[language]}</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-primary-foreground/20" />
            <div className="flex items-center gap-2.5 text-primary-foreground/70">
              <div className="p-2 bg-primary-foreground/10 rounded-lg">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">{data.support247?.[language] || "24/7 Support"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80V40C240 10 480 0 720 20C960 40 1200 50 1440 30V80H0Z" fill="var(--background)" />
        </svg>
      </div>
    </section>
  )
}
