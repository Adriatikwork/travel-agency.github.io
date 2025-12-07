"use client"

import { Plane, Users, Briefcase, Car, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import servicesData from "@/data/services.json"

const iconMap = {
  Plane,
  Users,
  Briefcase,
  Car,
  Sparkles,
}

export function ServicesSection() {
  const { language } = useLanguage()
  const ui = servicesData.ui

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="services" className="py-12 sm:py-16 bg-gradient-to-br from-[#38b6ff] to-[#2a9de6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">{ui.sectionLabel[language]}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 text-balance">
              {ui.title[language]}
            </h2>
            <p className="text-sm sm:text-base text-white/90 text-pretty">{ui.subtitle[language]}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {servicesData.services.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Plane
              return (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-xl p-4 sm:p-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#38b6ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 text-balance">
                        {service.title[language]}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed text-pretty">
                        {service.description[language]}
                      </p>
                    </div>
                    <Button
                      onClick={scrollToContact}
                      className="group/btn bg-white hover:bg-gray-50 text-[#38b6ff] rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 border border-[#38b6ff]/20 touch-manipulation"
                    >
                      {ui.learnMore[language]}
                      <Icon className="ml-1.5 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
