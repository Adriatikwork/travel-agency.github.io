import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found | Fluturo Travel Agency",
  description: "The page you are looking for does not exist. Explore our travel destinations and packages.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/images/logo_landscape.png"
            alt="Fluturo Travel Agency"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* 404 */}
        <h1 className="text-8xl font-extrabold text-[#38b6ff] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Looks like this destination doesn&apos;t exist on our map. Let&apos;s get you back on track and find your next adventure.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#38b6ff] text-white font-semibold rounded-xl hover:bg-[#1da6f0] transition-colors shadow-md"
          >
            ← Back to Home
          </Link>
          <Link
            href="/#destinations"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#38b6ff] font-semibold rounded-xl border-2 border-[#38b6ff] hover:bg-sky-50 transition-colors"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  )
}
