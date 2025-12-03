"use client"

import { Phone, MapPin } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import siteData from "@/data/site-data.json"

// Helper to get base path
const getBasePath = () => {
  const base = process.env.NEXT_PUBLIC_BASE_PATH
  if (!base || base === "''" || base === '""' || base.trim() === "") return ""
  return base
}

export default function ComingSoonPage() {
  const basePath = getBasePath()

  return (
    <div className="min-h-screen bg-[#38b6ff] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Logo */}
        <div className="mb-16 flex justify-center">
          <img
            src={`${basePath}/images/logo_landscape.png`}
            alt="Fluturo Travel Agency"
            className="h-20 md:h-24 w-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* Lottie Animation */}
        <div className="flex justify-center mb-8">
          <DotLottieReact
            src="https://lottie.host/08695a76-3b9e-4cf5-82ae-9e7d8a96a306/hUuujyMXBW.lottie"
            loop
            autoplay
            style={{ width: "400px", height: "400px", maxWidth: "100%" }}
          />
        </div>

        {/* Coming Soon Text */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">Coming Soon</h1>

        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          We're preparing something amazing for you. Your next adventure is just around the corner!
        </p>

        {/* Contact Information */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 max-w-2xl mx-auto shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Get in Touch</h2>

          {/* Phone Number - Large white box */}
          <a
            href={`tel:${siteData.footer.contact.phone}`}
            className="block bg-white rounded-2xl p-6 mb-4 hover:bg-white/95 transition-all duration-300 group animate-bounce-subtle"
          >
            <div className="flex items-center justify-center gap-3">
              <Phone className="h-6 w-6 text-[#38b6ff] animate-wiggle" />
              <span className="text-2xl md:text-3xl font-bold text-[#38b6ff]">{siteData.footer.contact.phone}</span>
            </div>
          </a>

          <p className="text-white/90 text-base md:text-lg mb-8">Call us for travel inquiries</p>

          {/* Divider */}
          <div className="h-px bg-white/20 my-8" />

          {/* Address Section */}
          <div className="text-white">
            <p className="text-lg md:text-xl text-white/90 mb-3">Visit us at</p>
            <div className="flex items-center justify-center gap-2 mb-2 animate-bounce-subtle-delayed">
              <MapPin className="h-5 w-5 text-white animate-wiggle-delayed" />
              <p className="text-xl md:text-2xl font-bold">Fehmi Agani 43</p>
            </div>
            <p className="text-lg md:text-xl text-white/90">Pristina, Kosovo</p>
          </div>
        </div>

        <div className="mt-8 text-white/70 space-y-1">
          <p className="text-sm md:text-base">© 2025 Fluturo Travel Agency. All rights reserved.</p>
          <p className="text-sm">Operating since June 2023</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-bounce-subtle-delayed {
          animation: bounce-subtle 2s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }

        .animate-wiggle-delayed {
          animation: wiggle 2s ease-in-out infinite;
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  )
}
