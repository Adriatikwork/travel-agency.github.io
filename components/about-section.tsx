"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import siteData from "@/data/site-data.json"

interface Stat {
  id: string
  label: { en: string; sq: string }
  value: number
  suffix: string
}

interface WhyChooseItem {
  title: { en: string; sq: string }
  description: { en: string; sq: string }
}

interface AboutSectionProps {
  stats: Stat[]
  whyChoose: WhyChooseItem[]
}

export function AboutSection({ stats, whyChoose }: AboutSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState<Record<string, number>>({})
  const sectionRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const initialCounts: Record<string, number> = {}
    stats.forEach((stat) => {
      initialCounts[stat.id] = 0
    })
    setCounts(initialCounts)

    stats.forEach((stat) => {
      const duration = 2000
      const steps = 60
      const increment = stat.value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          setCounts((prev) => ({ ...prev, [stat.id]: stat.value }))
          clearInterval(timer)
        } else {
          setCounts((prev) => ({ ...prev, [stat.id]: Math.floor(current * 10) / 10 }))
        }
      }, duration / steps)
    })
  }, [isVisible, stats])

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-flex items-center px-4 py-1.5 bg-brand-light rounded-full text-brand-darker text-xs font-semibold tracking-widest uppercase mb-4">
              {siteData.about.section.label[language]}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 text-balance">
              {siteData.about.section.title[language]}{" "}
              <span className="text-brand">{siteData.about.section.titleHighlight[language]}</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              {siteData.about.section.subtitle[language]}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 sm:mb-16">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center p-4 rounded-2xl bg-surface-sunken border border-border/50">
                <div className="text-3xl sm:text-4xl font-bold text-brand mb-1">
                  {stat.id === "stat-rating"
                    ? (counts[stat.id] || 0).toFixed(1)
                    : counts[stat.id]?.toLocaleString() || 0}
                  {stat.suffix}
                </div>
                <div className="text-xs text-muted-foreground font-medium text-balance">
                  {stat.label[language]}
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-border/50">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8 text-center text-balance">
              {siteData.whyChoose.section.title[language]}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {whyChoose.map((item, idx) => (
                <div key={idx} className="flex gap-3 p-3 rounded-xl hover:bg-surface-sunken transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm mb-1 text-balance">
                      {item.title[language]}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
                      {item.description[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
