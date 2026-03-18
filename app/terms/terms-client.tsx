"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import termsOfService from "@/data/terms-of-service"

export default function TermsOfServiceClient() {
  const { language } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Header with Logo and Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img
              src="/images/image.png"
              alt="Fluturo Travel Agency"
              className="h-8 w-auto object-contain"
            />
            <span className="font-bold text-gray-900 hidden sm:inline">Fluturo</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#38b6ff] font-semibold hover:text-[#1da6f0] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === "en" ? "Back to Home" : "Kthehu në Shtëpi"}
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
                {termsOfService.title[language]}
              </h1>
              <p className="text-sm text-gray-600">
                Last updated: {termsOfService.lastUpdated}
              </p>
              <div className="h-1 w-16 bg-gradient-to-r from-[#38b6ff] to-[#0ea5e9] mx-auto mt-6 rounded-full"></div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 border border-gray-100">
              <div className="prose prose-gray max-w-none space-y-8 text-gray-700 leading-relaxed">
                {termsOfService.sections.map((section) => (
                  <section key={section.id}>
                    <h2 className="text-xl font-bold text-gray-900 mb-3">
                      {section.title[language]}
                    </h2>
                    {Array.isArray(section.content[language]) ? (
                      (section.content[language] as string[]).map(
                        (paragraph: string, idx: number) => (
                          <p key={idx} className={idx > 0 ? "mt-3" : ""}>
                            {paragraph}
                          </p>
                        )
                      )
                    ) : (
                      <p>{section.content[language] as string}</p>
                    )}
                    {section.list && (
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {section.list[language].map(
                          (item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                          )
                        )}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
