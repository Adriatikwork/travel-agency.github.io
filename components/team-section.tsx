"use client"
import { getImagePath } from "@/lib/image-path"
import { Briefcase } from "lucide-react"
import { PixelTransition } from "./pixel-transition"
import { useLanguage } from "@/lib/language-context"
import teamData from "@/data/team.json"

interface TeamMember {
  id: string
  name: string
  role: { en: string; sq: string }
  bio: { en: string[]; sq: string[] }
  image?: string
}

export function TeamSection() {
  const { language } = useLanguage()
  const { members, ui } = teamData

  return (
    <section id="team" className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#38b6ff]/10 via-white to-white"
          style={{ clipPath: "polygon(0 0, 60% 0, 40% 100%, 0% 100%)" }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-bl from-gray-50 via-white to-white"
          style={{ clipPath: "polygon(60% 0, 100% 0, 100% 100%, 40% 100%)" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{ui.title[language]}</h2>
          <p className="text-gray-600 max-w-xl mx-auto">{ui.subtitle[language]}</p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {members.map((member: TeamMember, index: number) => (
            <div
              key={member.id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-6 items-center`}
            >
              {/* Image Card - Different style for each */}
              <div className="w-full lg:w-2/5 relative group">
                <PixelTransition
                  gridSize={8}
                  hoverContent={
                    <div
                      className={`bg-[#38b6ff] text-white w-full h-full flex items-center justify-center text-[8px] sm:text-[10px] font-bold`}
                    >
                      {member.role[language].split(" ")[0]}
                    </div>
                  }
                  className="w-full"
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 ${
                      index % 2 === 0
                        ? "bg-gradient-to-br from-[#38b6ff] to-[#2d9ae6]"
                        : "bg-gradient-to-br from-gray-100 to-gray-200"
                    }`}
                    style={{
                      clipPath:
                        index % 2 === 0
                          ? "polygon(0 0, 100% 0, 95% 100%, 0% 100%)"
                          : "polygon(5% 0, 100% 0, 100% 100%, 0% 100%)",
                    }}
                  >
                    <div className="aspect-[4/5] relative">
                      {member.image && (
                        <img
                          src={getImagePath(member.image) || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {!member.image && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div
                            className={`w-32 h-32 ${
                              index % 2 === 0 ? "bg-white/20" : "bg-[#38b6ff]"
                            } rounded-full flex items-center justify-center ${
                              index % 2 === 0 ? "text-white" : "text-white"
                            } text-4xl font-bold backdrop-blur-sm`}
                          >
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Decorative overlay */}
                    <div
                      className={`absolute inset-0 ${
                        index % 2 === 0
                          ? "bg-gradient-to-t from-[#38b6ff]/80 to-transparent"
                          : "bg-gradient-to-t from-gray-900/60 to-transparent"
                      } opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6`}
                    >
                      <div className="text-white">
                        <Briefcase className="w-6 h-6 mb-2" />
                        <p className="font-semibold">{member.role[language]}</p>
                      </div>
                    </div>
                  </div>
                </PixelTransition>
              </div>

              {/* Content Card */}
              <div className="w-full lg:w-3/5">
                <div
                  className={`bg-white rounded-xl shadow-lg p-6 border ${
                    index % 2 === 0 ? "border-[#38b6ff]/20" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-1 h-16 rounded-full ${index % 2 === 0 ? "bg-[#38b6ff]" : "bg-gray-400"}`} />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className={`font-semibold ${index % 2 === 0 ? "text-[#38b6ff]" : "text-gray-600"}`}>
                        {member.role[language]}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                    {member.bio[language].map((paragraph: string, idx: number) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
