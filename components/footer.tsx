"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter, Linkedin, ArrowUp, Mail, Phone, MapPin } from "lucide-react"
import { useState, useEffect } from "react"

// Helper to get base path, handling v0.dev edge cases
const getBasePath = () => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH;
  // Return empty string if undefined, empty, or contains quotes
  if (!base || base === "''" || base === '""' || base.trim() === '') return '';
  return base;
};

interface FooterData {
  tagline: string
  contact: {
    email: string
    phone: string
    address: string
  }
  social: Array<{
    name: string
    url: string
    icon: string
  }>
  legal: Array<{
    name: string
    url: string
  }>
}

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
}

export function Footer({ data }: { data: FooterData }) {
  const basePath = getBasePath();
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-12 sm:py-16 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <img src={`${basePath}/images/image.png`} alt="Fluturo" className="h-20 w-auto sm:h-24 sm:w-auto object-contain" />
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xs text-pretty">{data.tagline}</p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm sm:text-base">
              <a
                href={`mailto:${data.contact.email}`}
                className="flex items-start gap-3 text-gray-400 hover:text-sky-400 transition-colors group"
              >
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="break-all">{data.contact.email}</span>
              </a>
              <a
                href={`tel:${data.contact.phone}`}
                className="flex items-start gap-3 text-gray-400 hover:text-sky-400 transition-colors group"
              >
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>{data.contact.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-pretty">{data.contact.address}</span>
              </div>
            </div>
          </div>

          {/* Social & Legal Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {data.social.map((social) => {
                  const Icon = socialIcons[social.icon as keyof typeof socialIcons]
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-sky-500 p-3 rounded-full transition-all duration-300 hover:scale-110"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Legal</h3>
              <div className="flex flex-wrap gap-4 text-sm">
                {data.legal.map((link) => (
                  <a key={link.name} href={link.url} className="text-gray-400 hover:text-sky-400 transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Fluturo Travel Agency. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-sky-500 hover:bg-sky-600 text-white shadow-lg rounded-full h-12 w-12 sm:h-14 sm:w-14 z-50 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </footer>
  )
}
