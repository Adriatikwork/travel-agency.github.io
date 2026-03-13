"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import siteData from "@/data/site-data.json"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const getBasePath = () => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH
  if (!base || base === "''" || base === '""' || base.trim() === "") return ""
  return base
}

export function Navbar() {
  const basePath = getBasePath()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"
  const isDestinationPage = pathname.startsWith("/destinations/")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const id = window.location.hash.slice(1)
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [isHomePage, pathname])

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false)
    if (isHomePage) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Navigate to home page with hash, then scroll
      router.push(`/#${id}`)
    }
  }

  const navLinks = [
    {
      name: language === "en" ? "Destinations" : "Destinacionet",
      id: "destinations"
    },
    {
      name: language === "en" ? "Travel Packages" : "Paketat",
      id: "packages"
    },
    {
      name: language === "en" ? "Our Services" : "Shërbimet",
      id: "services"
    },
    {
      name: language === "en" ? "About Us" : "Rreth Nesh",
      id: "about"
    },
    {
      name: language === "en" ? "Contact" : "Kontakt",
      id: "contact"
    },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 z-50 transition-all duration-300 w-[100vw] ${
        isDestinationPage
          ? "bg-background/40 backdrop-blur-xl shadow-lg border-b border-border/20"
          : isScrolled
          ? "bg-[#38b6ff]/95 backdrop-blur-md shadow-xl"
          : isHomePage
          ? "bg-transparent"
          : "bg-[#38b6ff]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group py-3">
            <img
              src={`${basePath}/images/logo_landscape.png`}
              alt="Fluturo Travel Agency"
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`font-semibold text-sm transition-all hover:scale-105 relative group leading-relaxed py-1 ${
                  isDestinationPage
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full ${
                  isDestinationPage ? "bg-brand" : "bg-white"
                }`}></span>
              </button>
            ))}
            <LanguageSwitcher />
            <Button
              onClick={() => scrollToSection("contact")}
              className={`rounded-full px-6 py-4 font-bold text-sm border-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
                isDestinationPage
                  ? "bg-brand hover:bg-brand-dark text-primary-foreground border-brand/30"
                  : "bg-white hover:bg-white/90 text-[#38b6ff] border-white/30"
              }`}
            >
              {language === "en" ? "Book Now" : "Rezervoni Tani"}
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2.5 rounded-lg transition-all hover:scale-105 active:scale-95 ${
              isDestinationPage
                ? "text-foreground hover:bg-foreground/10"
                : "text-white hover:bg-white/20"
            }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden overflow-hidden">
            <div className={`py-4 space-y-2 animate-in slide-in-from-top duration-300 ${
              isDestinationPage ? "border-t border-border/30" : "border-t border-white/30"
            }`}>
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left py-3 px-4 font-semibold text-sm rounded-xl transition-all duration-200 group animate-in slide-in-from-top leading-relaxed ${
                    isDestinationPage
                      ? "text-foreground/90 hover:text-foreground hover:bg-foreground/10 active:bg-foreground/20"
                      : "text-white/95 hover:text-white hover:bg-white/15 active:bg-white/25"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="flex items-center justify-between">
                    {link.name}
                    <span className={`group-hover:translate-x-1 transition-all ${
                      isDestinationPage ? "text-foreground/40 group-hover:text-foreground/70" : "text-white/40 group-hover:text-white/70"
                    }`}>
                      →
                    </span>
                  </span>
                </button>
              ))}

              <div className={`pt-3 pb-2 px-4 flex items-center justify-between mt-3 ${
                isDestinationPage ? "border-t border-border/30" : "border-t border-white/20"
              }`}>
                <span className={`text-sm font-medium ${
                  isDestinationPage ? "text-foreground/80" : "text-white/80"
                }`}>Language</span>
                <LanguageSwitcher />
              </div>

              <div className="pt-2 px-4">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full rounded-xl font-bold text-sm py-6 shadow-lg hover:shadow-xl transition-all active:scale-95 touch-manipulation leading-normal ${
                    isDestinationPage
                      ? "bg-brand hover:bg-brand-dark text-primary-foreground"
                      : "bg-white hover:bg-white/90 text-[#38b6ff]"
                  }`}
                >
                  {language === "en" ? "Book Your Trip" : "Rezervoni Udhëtimin"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
