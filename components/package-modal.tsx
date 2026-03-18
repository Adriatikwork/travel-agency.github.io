"use client"

import { X, Check, Clock, Tag, Phone, Mail } from "lucide-react"
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
        className="fixed inset-0 bg-black/50 z-50"
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
        <div className="bg-white w-full sm:max-w-lg md:max-w-xl max-h-[92dvh] sm:max-h-[88vh] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl">

          {/* Hero image */}
          <div className="relative w-full h-44 sm:h-52 flex-shrink-0">
            <img
              src={pkg.image || "/placeholder.svg"}
              alt={pkg.title[language]}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white rounded-full p-1.5 transition-colors backdrop-blur-sm"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Title block */}
            <div className="absolute bottom-4 left-4 right-12">
              <div className="flex items-center gap-2 mb-1.5">
                {pkg.isFeatured && (
                  <span className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                    {ui.featured[language]}
                  </span>
                )}
                {pkg.isOnSale && (
                  <span className="bg-[#38b6ff] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                    {ui.onSale[language]}
                  </span>
                )}
              </div>
              <h2 className="text-white text-xl font-bold leading-tight text-balance">
                {pkg.title[language]}
              </h2>
              {pkg.destinationName && (
                <p className="text-white/70 text-xs mt-0.5 font-medium">{pkg.destinationName}</p>
              )}
            </div>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 p-5 sm:p-6">

            {/* Stats row */}
            <div className="flex items-center gap-6 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900">{pkg.duration}</span>
                <span>{ui.nights[language]}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Tag className="w-4 h-4 text-gray-400" />
                <span>{packageTypeLabel}</span>
              </div>
              <div className="ml-auto text-right">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">{ui.from[language]}</p>
                <p className="text-[#38b6ff] font-extrabold text-xl leading-none">
                  {currency}{pkg.price}
                </p>
              </div>
            </div>

            {/* Summary */}
            <p className="text-gray-600 text-sm leading-relaxed text-pretty mt-5">
              {pkg.summary[language]}
            </p>

            {/* Themes */}
            {pkg.themes.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {pkg.themes.map((theme) => (
                  <span
                    key={theme}
                    className="text-[11px] font-medium text-gray-500 px-2.5 py-1 rounded-full bg-gray-100 capitalize"
                  >
                    {theme.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            )}

            {/* What's included */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                {ui.whatsIncluded[language]}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                {pkg.inclusions[language].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-[#38b6ff] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Footer CTAs */}
          <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-5 flex flex-col gap-2.5 bg-white">
            <a
              href={`mailto:info@fluturo.com?subject=Package Inquiry: ${pkg.title["en"]}&body=Hi, I'm interested in the ${pkg.title["en"]} package (${pkg.duration} nights from ${currency}${pkg.price}). Please send me more information.`}
              className="flex items-center justify-center gap-2 w-full bg-[#38b6ff] hover:bg-[#1da6f0] active:bg-[#1a96d8] text-white rounded-xl py-3.5 text-sm font-semibold transition-colors"
            >
              <Mail className="w-4 h-4" />
              {language === "en" ? "Request This Package" : "Kërko Këtë Paketë"}
            </a>
            <a
              href="tel:+383"
              className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl py-3 text-sm font-medium transition-colors"
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
