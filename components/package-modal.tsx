"use client"

import { X, Check, Clock, Tag, Phone, Mail, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import packagesData from "@/data/packages"

interface Package {
  id: string
  title: { en: string; sq: string }
  destinationId: string
  destinationName?: string
  summary: { en: string; sq: string }
  image: string
  price: number
  duration: number
  inclusions: { en: string[]; sq: string[] }
  packageType: string
  themes: string[]
  isFeatured: boolean
  isOnSale: boolean
}

interface PackageModalProps {
  pkg: Package | null
  currency: string
  onClose: () => void
}

export function PackageModal({ pkg, currency, onClose }: PackageModalProps) {
  const { language } = useLanguage()
  const ui = packagesData.ui

  if (!pkg) return null

  const packageTypeLabels: Record<string, { en: string; sq: string }> = {
    "all-inclusive": { en: "All Inclusive", sq: "Gjithëpërfshirës" },
    "bed-breakfast": { en: "Bed & Breakfast", sq: "Natëzim & Mëngjes" },
    "half-board": { en: "Half Board", sq: "Gjysmë-Bord" },
    "full-board": { en: "Full Board", sq: "Bord i Plotë" },
  }

  const packageTypeLabel = packageTypeLabels[pkg.packageType]?.[language] ?? pkg.packageType

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={pkg.title[language]}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      >
        <div className="bg-background w-full sm:max-w-lg md:max-w-2xl max-h-[92dvh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl">

          {/* Hero image */}
          <div className="relative w-full h-48 sm:h-56 flex-shrink-0">
            <img
              src={pkg.image || "/placeholder.svg"}
              alt={pkg.title[language]}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {pkg.isFeatured && (
                <span className="bg-yellow-400 text-yellow-900 text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {ui.featured[language]}
                </span>
              )}
              {pkg.isOnSale && (
                <span className="bg-[#38b6ff] text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                  {ui.onSale[language]}
                </span>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Title over image */}
            <div className="absolute bottom-3 left-4 right-4">
              <h2 className="text-white text-xl sm:text-2xl font-bold text-balance leading-tight">
                {pkg.title[language]}
              </h2>
              {pkg.destinationName && (
                <p className="text-white/80 text-sm mt-0.5">{pkg.destinationName}</p>
              )}
            </div>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-5">

            {/* Price + quick stats row */}
            <div className="flex items-center justify-between bg-[#38b6ff]/10 rounded-2xl px-4 py-3 border border-[#38b6ff]/20">
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <Clock className="w-4 h-4 text-[#38b6ff]" />
                <span className="font-medium text-foreground">{pkg.duration} {ui.nights[language]}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                <Tag className="w-4 h-4 text-[#38b6ff]" />
                <span className="font-medium text-foreground">{packageTypeLabel}</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{ui.from[language]}</p>
                <p className="text-[#38b6ff] font-extrabold text-lg leading-tight">
                  {currency}{pkg.price}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div>
              <p className="text-foreground/80 text-sm leading-relaxed text-pretty">{pkg.summary[language]}</p>
            </div>

            {/* Themes */}
            {pkg.themes.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {pkg.themes.map((theme) => (
                  <span
                    key={theme}
                    className="bg-[#38b6ff]/10 text-[#38b6ff] text-[11px] font-medium px-2.5 py-1 rounded-full capitalize border border-[#38b6ff]/20"
                  >
                    {theme.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            )}

            {/* What's included */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-[#38b6ff]" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                  {ui.whatsIncluded[language]}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pkg.inclusions[language].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 bg-green-50 rounded-xl px-3 py-2 border border-green-100">
                    <div className="bg-green-500/20 rounded-full p-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm text-foreground/90">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky footer CTAs */}
          <div className="flex-shrink-0 border-t border-border p-4 sm:p-5 bg-background space-y-2.5">
            {/* Primary CTA — request by email/WhatsApp */}
            <a
              href={`mailto:info@fluturo.com?subject=Package Inquiry: ${pkg.title["en"]}&body=Hi, I'm interested in the ${pkg.title["en"]} package (${pkg.duration} nights from ${currency}${pkg.price}). Please send me more information.`}
              className="flex items-center justify-center gap-2 w-full bg-[#38b6ff] hover:bg-[#1da6f0] text-white rounded-xl py-3.5 text-sm font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" />
              {language === "en" ? "Request This Package" : "Kërko Këtë Paketë"}
            </a>

            {/* Secondary CTA — call */}
            <a
              href="tel:+383"
              className="flex items-center justify-center gap-2 w-full border border-border hover:bg-accent text-foreground rounded-xl py-3 text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-[#38b6ff]" />
              {language === "en" ? "Call Us Instead" : "Na Telefononi"}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
