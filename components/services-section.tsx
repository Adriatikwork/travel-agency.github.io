"use client"

import { Plane, Users, Briefcase, Car, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import ElectricBorder from "./electric-border"
import { useState } from "react"
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { language } = useLanguage()
  const ui = servicesData.ui

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="services" className="py-16 bg-gradient-to-br from-[#38b6ff] to-[#2a9de6]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">{ui.sectionLabel[language]}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{ui.title[language]}</h2>
            <p className="text-white/90">{ui.subtitle[language]}</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {servicesData.services.map((service, idx) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Plane
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {hoveredIndex === idx ? (
                    <ElectricBorder color="#38b6ff" speed={1.5} chaos={0.5} thickness={3} style={{ borderRadius: 12 }}>
                      <div className="group relative bg-white rounded-xl p-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="w-12 h-12 bg-[#38b6ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-sm mb-1">{service.title[language]}</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">{service.description[language]}</p>
                          </div>
                          <Button
                            onClick={scrollToContact}
                            className="group/btn bg-white hover:bg-gray-50 text-[#38b6ff] rounded-full px-4 py-2 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 border border-[#38b6ff]/20"
                          >
                            {ui.learnMore[language]}
                            <Icon className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </ElectricBorder>
                  ) : (
                    <div className="group relative bg-white rounded-xl p-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="w-12 h-12 bg-[#38b6ff] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm mb-1">{service.title[language]}</h3>
                          <p className="text-xs text-gray-600 leading-relaxed">{service.description[language]}</p>
                        </div>
                        <Button
                          onClick={scrollToContact}
                          className="group/btn bg-white hover:bg-gray-50 text-[#38b6ff] rounded-full px-4 py-2 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 border border-[#38b6ff]/20"
                        >
                          {ui.learnMore[language]}
                          <Icon className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
