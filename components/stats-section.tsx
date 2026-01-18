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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Stats Grid - Use translated labels */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap] || Globe
            return (
              <div key={stat.id} className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-500 text-white rounded-full mb-4">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {stat.id === "stat-rating"
                    ? (counts[stat.id] || 0).toFixed(1)
                    : counts[stat.id]?.toLocaleString() || 0}
                  {stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label[language]}</div>
              </div>
            )
          })}
        </div>

        {/* Why Choose Section - Use translated content */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{siteData.whyChoose.section.title[language]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChoose.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-sky-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title[language]}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description[language]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
