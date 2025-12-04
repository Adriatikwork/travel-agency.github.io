"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import aboutData from "@/data/about.json"
import statsData from "@/data/stats.json"

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
    <section ref={sectionRef} id="about" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-[#38b6ff]/10 rounded-full mb-3">
              <span className="text-xs font-bold text-[#38b6ff] uppercase tracking-wider">
                {aboutData.section.label[language]}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {aboutData.section.title[language]}{" "}
              <span className="text-[#38b6ff]">{aboutData.section.titleHighlight[language]}</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{aboutData.section.subtitle[language]}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {stats.map((stat) => (
              <div key={stat.id} className="text-center">
                <div className="text-3xl font-bold text-[#38b6ff]">
                  {stat.id === "stat-rating"
                    ? (counts[stat.id] || 0).toFixed(1)
                    : counts[stat.id]?.toLocaleString() || 0}
                  {stat.suffix}
                </div>
                <div className="text-xs text-gray-600 font-medium mt-1">{stat.label[language]}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{statsData.section.title[language]}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {whyChoose.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-[#38b6ff] rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title[language]}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.description[language]}</p>
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
