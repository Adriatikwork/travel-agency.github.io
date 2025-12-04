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
    { name: siteData.nav.destinations[language], id: "destinations" },
    { name: siteData.nav.packages[language], id: "packages" },
    { name: siteData.nav.services[language], id: "services" },
    { name: siteData.nav.about[language], id: "about" },
    { name: siteData.nav.team[language], id: "team" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#38b6ff]/95 backdrop-blur-md shadow-xl" : "bg-[#38b6ff]"
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

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white/90 hover:text-white font-semibold text-base transition-all hover:scale-105 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
              </button>
            ))}
            <LanguageSwitcher />
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-white hover:bg-white/90 text-[#38b6ff] rounded-full px-7 py-5 font-bold text-base border-2 border-white/30 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              {siteData.nav.planTrip[language]}
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-white/80 transition-transform hover:scale-110"
          >
            {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 py-5 border-t border-white/20 space-y-1 animate-in slide-in-from-top">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-3 px-2 text-white/90 hover:text-white hover:bg-white/10 font-semibold text-base rounded-lg transition-all"
              >
                {link.name}
              </button>
            ))}
            <div className="py-3 px-2">
              <LanguageSwitcher />
            </div>
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-white hover:bg-white/90 text-[#38b6ff] rounded-full font-bold text-base py-6 mt-2"
            >
              {siteData.nav.planTrip[language]}
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
