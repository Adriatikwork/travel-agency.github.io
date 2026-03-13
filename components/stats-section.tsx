"use client"

import { useEffect, useRef, useState } from "react"
import { Globe, Users, Handshake, Award, Check } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import siteData from "@/data/site-data.json"

interface Stat {
  id: string
  label: { en: string; sq: string }
  value: number
  suffix: string
  icon: string
}

interface WhyItem {
  title: { en: string; sq: string }
  description: { en: string; sq: string }
}

interface StatsSectionProps {
  stats: Stat[]
  whyChoose: WhyItem[]
}

const iconMap = {
  globe: Globe,
  users: Users,
  handshake: Handshake,
  award: Award,
}

export function StatsSection({ stats, whyChoose }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState<Record<string, number>>({})
  const sectionRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

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
    <section ref={sectionRef} className="py-16 sm:py-20 bg-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap] || Globe
            return (
              <div key={stat.id} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-brand text-primary-foreground rounded-2xl mb-4">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-1.5">
                  {stat.id === "stat-rating"
                    ? (counts[stat.id] || 0).toFixed(1)
                    : counts[stat.id]?.toLocaleString() || 0}
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground font-medium text-balance">{stat.label[language]}</div>
              </div>
            )
          })}
        </div>

        {/* Why Choose Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-foreground mb-10 sm:mb-12 text-balance">{siteData.whyChoose.section.title[language]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {whyChoose.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 sm:p-6 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5 text-balance">{item.title[language]}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{item.description[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
