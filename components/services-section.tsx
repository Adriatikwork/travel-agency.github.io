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
    if (element) element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#38b6ff]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="mb-10 sm:mb-14">
            <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-3">
              {ui.sectionLabel[language]}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-balance leading-tight">
              {ui.title[language]}
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {servicesData.services.map((service, index) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Plane
              const isLast = index === servicesData.services.length - 1
              const isLastOdd = isLast && servicesData.services.length % 3 !== 0

              return (
                <button
                  key={service.id}
                  onClick={scrollToContact}
                  className={`group bg-white/[0.07] hover:bg-white/[0.14] transition-colors duration-200 text-left p-7 sm:p-8 flex flex-col gap-5 ${
                    isLastOdd ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Icon */}
                  <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors">
                    <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                      {service.title[language]}
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed">
                      {service.description[language]}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {service.features[language].map((feature) => (
                      <span
                        key={feature}
                        className="text-[11px] font-medium text-white/50 bg-white/8 border border-white/10 rounded-md px-2 py-0.5 group-hover:text-white/70 group-hover:border-white/20 transition-colors"
                      >
                        {feature}
                      </span>
                    ))}
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
