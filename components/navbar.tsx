"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const getBasePath = () => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH
  if (!base || base === "''" || base === '""' || base.trim() === "") return ""
  return base
}

export function Navbar() {
  const basePath = getBasePath()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { name: "Destinations", id: "destinations" },
    { name: "Packages", id: "packages" },
    { name: "Services", id: "services" },
    { name: "About", id: "about" },
    { name: "Team", id: "team" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#38b6ff] shadow-lg" : "bg-[#38b6ff]"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center group py-3"
          >
            <img
              src={`${basePath}/images/logo_landscape.png`}
              alt="Fluturo Travel Agency"
              className="h-14 w-auto object-contain"
            />
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-white/90 hover:text-white font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-white hover:bg-white/90 text-[#38b6ff] rounded-full px-6 font-semibold border-2 border-white/20"
            >
              Plan a trip
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-white/80"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-white/20 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-2 text-white/90 hover:text-white font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-white hover:bg-white/90 text-[#38b6ff] rounded-full font-semibold"
            >
              Plan a trip
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
