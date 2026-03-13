"use client"

import { Plane, Users, Briefcase, Car, Sparkles } from "lucide-react"
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
    <section id="services" className="py-16 sm:py-20 bg-brand relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05)_0%,transparent_40%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center px-4 py-1.5 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-full text-primary-foreground/90 text-xs font-semibold tracking-widest uppercase mb-4">
              {ui.sectionLabel[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 text-balance">
              {ui.title[language]}
            </h2>
            <p className="text-base sm:text-lg text-primary-foreground/75 max-w-xl mx-auto text-pretty">{ui.subtitle[language]}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {servicesData.services.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Plane
              return (
                <button
                  key={service.id}
                  onClick={scrollToContact}
                  className="group relative bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-5 sm:p-6 hover:bg-primary-foreground/20 transition-all duration-300 hover:-translate-y-1 text-left"
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 bg-primary-foreground/15 rounded-xl flex items-center justify-center group-hover:bg-primary-foreground/25 transition-colors">
                      <Icon className="h-6 w-6 text-primary-foreground" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary-foreground text-sm mb-1.5 text-balance">
                        {service.title[language]}
                      </h3>
                      <p className="text-xs text-primary-foreground/65 leading-relaxed text-pretty">
                        {service.description[language]}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
