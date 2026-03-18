"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  // Scroll lock — apply to <html> element, most reliable cross-browser approach
  useEffect(() => {
    const html = document.documentElement
    if (isMobileMenuOpen) {
      html.style.overflow = "hidden"
      html.style.height = "100%"
    } else {
      html.style.overflow = ""
      html.style.height = ""
    }
    return () => {
      html.style.overflow = ""
      html.style.height = ""
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const id = window.location.hash.slice(1)
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) element.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }, [isHomePage, pathname])

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false)
    if (isHomePage) {
      const element = document.getElementById(id)
      if (element) element.scrollIntoView({ behavior: "smooth" })
    } else {
      router.push(`/#${id}`)
    }
  }

  const navLinks = [
    { name: language === "en" ? "Destinations" : "Destinacionet", id: "destinations" },
    { name: language === "en" ? "Travel Packages" : "Paketat", id: "packages" },
    { name: language === "en" ? "Our Services" : "Shërbimet", id: "services" },
    { name: language === "en" ? "About Us" : "Rreth Nesh", id: "about" },
    { name: language === "en" ? "Contact" : "Kontakt", id: "contact" },
  ]

  const socialLinks = siteData.footer.social

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 transition-all duration-300 w-[100vw] ${
          isMobileMenuOpen
            ? "bg-transparent"
            : isScrolled
            ? "bg-[#38b6ff]/95 backdrop-blur-md shadow-xl"
            : isHomePage
            ? "bg-transparent"
            : isDestinationPage
            ? "bg-background/40 backdrop-blur-xl shadow-sm border-b border-border/20"
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

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-7">
              <ul className="flex items-center gap-4 xl:gap-7 list-none m-0 p-0">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="font-semibold text-sm transition-all hover:scale-105 relative group leading-relaxed py-1 text-white/90 hover:text-white"
                      aria-label={`Navigate to ${link.name}`}
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all group-hover:w-full bg-white" />
                    </button>
                  </li>
                ))}
              </ul>
              <LanguageSwitcher />
              <Button
                onClick={() => scrollToSection("contact")}
                className="rounded-full px-6 py-4 font-bold text-sm border-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-white hover:bg-white/90 text-[#38b6ff] border-white/30"
              >
                {language === "en" ? "Book Now" : "Rezervoni Tani"}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full transition-all z-[60] ${
                isMobileMenuOpen ? "bg-white/20" : "hover:bg-white/20"
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "w-5 rotate-45 translate-y-2 bg-white" : "w-5 bg-white"}`} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "w-0 opacity-0 bg-white" : "w-3.5 bg-white"}`} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "w-5 -rotate-45 -translate-y-2 bg-white" : "w-5 bg-white"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#0a2540]" />

        {/* Ambient glow top-right */}
        <div
          className={`absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#38b6ff]/20 blur-3xl transition-transform duration-700 ${
            isMobileMenuOpen ? "scale-100" : "scale-0"
          }`}
        />
        {/* Ambient glow bottom-left */}
        <div
          className={`absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-[#38b6ff]/10 blur-2xl transition-transform duration-700 delay-100 ${
            isMobileMenuOpen ? "scale-100" : "scale-0"
          }`}
        />

        <div className="relative h-full flex flex-col px-8 pt-28 pb-10">
          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center" aria-label="Mobile navigation">
            <ul className="list-none m-0 p-0 space-y-1">
              {navLinks.map((link, index) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className={`group flex items-center gap-4 w-full text-left transition-all duration-300 py-3 border-b border-white/5 hover:border-white/20 ${
                      isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: isMobileMenuOpen ? `${150 + index * 70}ms` : "0ms" }}
                    aria-label={`Navigate to ${link.name}`}
                  >
                    <span className="text-white text-3xl font-bold tracking-tight leading-tight group-hover:text-[#38b6ff] transition-colors flex-1">
                      {link.name}
                    </span>
                    <span className="text-white/20 group-hover:text-[#38b6ff]/60 group-hover:translate-x-1 transition-all text-lg" aria-hidden="true">
                      →
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom section */}
          <div
            className={`space-y-6 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? "500ms" : "0ms" }}
          >
            {/* Book Now CTA */}
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full bg-[#38b6ff] hover:bg-[#1da6f0] text-white font-bold rounded-2xl py-4 text-base transition-all active:scale-95"
            >
              {language === "en" ? "Book Your Trip" : "Rezervoni Udhëtimin"}
            </button>

            {/* Language + Socials row */}
            <div className="flex items-center justify-between">
              <LanguageSwitcher />
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                  >
                    {social.icon === "facebook" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    )}
                    {social.icon === "instagram" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    )}
                    {social.icon === "tiktok" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
