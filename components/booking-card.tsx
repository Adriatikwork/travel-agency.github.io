"use client"

import { Calendar, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface BookingCardProps {
  destination: {
    name: string | { en: string; sq: string }
    pricing: {
      from: number
      currency: string
      perPerson?: boolean
      note?: string | { en: string; sq: string }
    }
    duration: {
      minNights: number
    }
    mealPlan?: string | { en: string; sq: string }
    category: string
  }
  currency: string
  language: "en" | "sq"
  getText: (value: string | { en: string; sq: string } | null | undefined, language: "en" | "sq") => string
  isCompact?: boolean
}

export function BookingCard({ destination, currency, language, getText, isCompact = false }: BookingCardProps) {
  const handleEmailInquiry = () => {
    const subject = encodeURIComponent(
      `Inquiry: ${getText(destination.name, language)} - ${currency}${destination.pricing.from}`,
    )
    const body = encodeURIComponent(
      `Hello,\n\nI would like more information about the ${getText(destination.name, language)} trip.\n\nPrice: ${currency}${destination.pricing.from} per person\nDuration: ${destination.duration.minNights} nights\n\nPlease provide additional details.\n\nThank you.`,
    )
    window.location.href = `mailto:info@fluturo.co?subject=${subject}&body=${body}`
  }

  const handlePhoneCall = () => {
    window.location.href = "tel:044663344"
  }

  return (
    <Card className={isCompact ? "xl:hidden border-0 shadow-xl overflow-hidden" : "border-0 shadow-xl overflow-hidden"}>
      <div className="bg-gradient-to-br from-[#38b6ff] via-[#30b2f5] to-[#2aa8eb] p-5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:radial-gradient(white,transparent_70%)]"></div>
        <p className="text-[10px] font-bold text-white/90 mb-1 uppercase tracking-wider relative z-10">
          {language === "en" ? "Starting From" : "Duke filluar nga"}
        </p>
        <p className={`${isCompact ? "text-3xl sm:text-4xl" : "text-3xl sm:text-4xl md:text-5xl"} font-bold text-white mb-1 relative z-10 drop-shadow-lg`}>
          {currency}
          {destination.pricing.from}
        </p>
        {destination.pricing.perPerson && (
          <p className="text-xs text-white/90 uppercase tracking-wide font-semibold relative z-10">
            {language === "en" ? "per person" : "për person"}
          </p>
        )}
        {destination.pricing.note && (
          <p className="text-[10px] text-white/80 mt-2 leading-relaxed font-medium relative z-10 text-pretty">
            {getText(destination.pricing.note, language)}
          </p>
        )}
      </div>

      <CardContent className={`${isCompact ? "p-4 sm:p-5 md:p-6" : "p-5"} space-y-4`}>
        <div className="space-y-3 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{language === "en" ? "Duration" : "Kohëzgjatja"}</span>
            </div>
            <span className="text-sm font-bold text-foreground">
              {destination.duration.minNights} {language === "en" ? "nights" : "netë"}
            </span>
          </div>

          {destination.mealPlan && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm font-medium">{language === "en" ? "Meals" : "Ushqimi"}</span>
              </div>
              <span className="text-sm font-bold text-foreground">{getText(destination.mealPlan, language)}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">{language === "en" ? "Category" : "Kategoria"}</span>
            </div>
            <span className="text-sm font-bold text-foreground capitalize">{destination.category}</span>
          </div>
        </div>

        <Button
          size="lg"
          className={`w-full bg-[#38b6ff] hover:bg-[#30b2f5] text-white ${isCompact ? "text-base" : "text-base sm:text-lg"} font-bold ${isCompact ? "py-5" : "py-5 sm:py-6"} rounded-xl shadow-lg hover:shadow-xl transition-all touch-manipulation`}
          onClick={handleEmailInquiry}
        >
          {language === "en" ? "Request Info" : "Kërko Informacion"}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className={`w-full font-semibold ${isCompact ? "py-4" : "py-4 sm:py-5"} rounded-xl transition-all touch-manipulation hover:bg-accent bg-transparent border-[#38b6ff]/30 hover:border-[#38b6ff]`}
          onClick={handlePhoneCall}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {language === "en" ? "Call Us" : "Na Telefononi"}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className={`w-full font-semibold ${isCompact ? "py-4" : "py-4 sm:py-5"} rounded-xl transition-all touch-manipulation hover:bg-accent bg-transparent border-[#38b6ff]/30 hover:border-[#38b6ff]`}
          onClick={handleEmailInquiry}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          {language === "en" ? "Email Inquiry" : "Pyetje me Email"}
        </Button>

        <div className="pt-4 border-t border-border text-center space-y-2">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            {language === "en" ? "Questions? We're here to help" : "Pyetje? Jemi këtu për t'ju ndihmuar"}
          </p>
          <div className="space-y-1">
            <p className="text-lg font-bold text-foreground">044 66 33 44</p>
            <p className="text-sm text-muted-foreground">info@fluturo.co</p>
          </div>
        </div>

        <div className={`flex items-center justify-center gap-2 ${isCompact ? "text-xs" : "text-xs sm:text-sm"} text-muted-foreground pt-2`}>
          <Clock className={`${isCompact ? "h-3.5 w-3.5" : "h-3.5 w-3.5 sm:h-4 sm:w-4"}`} />
          <span className="text-balance">
            {language === "en" ? "Instant confirmation" : "Konfirmim i menjëhershëm"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
