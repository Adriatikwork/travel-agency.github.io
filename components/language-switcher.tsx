"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  variant?: "default" | "compact"
  className?: string
}

export function LanguageSwitcher({ variant = "default", className = "" }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "sq" : "en")
  }

  if (variant === "compact") {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className={`text-white/90 hover:text-white hover:bg-white/10 font-medium ${className}`}
      >
        <Globe className="h-4 w-4 mr-1.5" />
        {language.toUpperCase()}
      </Button>
    )
  }

  return (
    <div className={`flex items-center gap-1 bg-white/10 rounded-full p-1 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1 h-8 text-sm font-medium transition-all ${
          language === "en" ? "bg-white text-[#38b6ff] shadow-sm" : "text-white/80 hover:text-white hover:bg-white/10"
        }`}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("sq")}
        className={`rounded-full px-3 py-1 h-8 text-sm font-medium transition-all ${
          language === "sq" ? "bg-white text-[#38b6ff] shadow-sm" : "text-white/80 hover:text-white hover:bg-white/10"
        }`}
      >
        SQ
      </Button>
    </div>
  )
}
