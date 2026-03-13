"use client"

import { Button } from "@/components/ui/button"
import RotatingText from "./rotating-text"
import { Plane, MapPin, Star, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

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
  const { language } = useLanguage()

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#38b6ff]">
      {/* Transparent Background with clouds/airplane on top of blue */}
      <div className="absolute inset-0">
        <img
          src={`${basePath}/images/background-transparent.png`}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-5xl mx-auto py-20 sm:py-24">

          {/* Badge */}
          <div className="animate-fade-in-up mb-6" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-xs font-semibold tracking-wide uppercase">
              <Plane className="w-3.5 h-3.5" />
              {language === "en" ? "Premium Travel Agency" : "Agjenci Udhëtimi Premium"}
            </span>
          </div>

          {/* Main Headline */}
          <div className="animate-fade-in-up mb-6" style={{ animationDelay: "120ms" }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3">
              {language === "en" ? "Your Next Adventure Awaits in" : "Aventura Juaj e Radhës Ju Pret në"}
            </h1>

            {/* Rotating Text */}
            <div className="flex justify-center mb-3">
              <RotatingText
                texts={data.rotatingTexts[language]}
                mainClassName="px-5 md:px-6 bg-white text-[#38b6ff] overflow-hidden py-2 md:py-3 justify-center rounded-xl inline-flex text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold shadow-xl"
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
          </div>

          {/* Subtitle */}
          <div className="animate-fade-in-up mb-8" style={{ animationDelay: "280ms" }}>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              {language === "en"
                ? "Discover amazing destinations, unforgettable experiences, and create memories that last a lifetime"
                : "Zbuloni destinacione mahnitëse, përvoja të paharrueshme dhe krijoni kujtime që zgjasin përjetë"}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up mb-12" style={{ animationDelay: "400ms" }}>
            <Button
              onClick={() => scrollToSection("destinations")}
              size="lg"
              className="bg-white hover:bg-white/90 text-[#38b6ff] px-8 py-6 text-base rounded-full shadow-xl font-bold transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto group"
            >
              <span>{language === "en" ? "Explore Destinations" : "Shiko Destinacionet"}</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollToSection("packages")}
              size="lg"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-8 py-6 text-base rounded-full font-bold transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 w-full sm:w-auto"
            >
              {language === "en" ? "View Packages" : "Shiko Paketat"}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 animate-fade-in-up" style={{ animationDelay: "550ms" }}>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">100+</div>
                <div className="text-xs text-white/80 font-medium">{language === "en" ? "Destinations" : "Destinacione"}</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-white/30" />

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">15K+</div>
                <div className="text-xs text-white/80 font-medium">{language === "en" ? "Happy Travelers" : "Udhëtarë të Lumtur"}</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-white/30" />

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-xs text-white/80 font-medium">{language === "en" ? "Rating" : "Vlerësim"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 80V40C240 10 480 0 720 20C960 40 1200 50 1440 30V80H0Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
