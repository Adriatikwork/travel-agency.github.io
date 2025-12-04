"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "sq"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (en: string, sq: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("fluturo_language") as Language
    if (saved && (saved === "en" || saved === "sq")) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("fluturo_language", lang)
  }

  const t = (en: string, sq: string): string => {
    return language === "sq" ? sq : en
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "en", setLanguage: handleSetLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
