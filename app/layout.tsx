import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

export const metadata: Metadata = {
  title: "Fluturo Travel Agency - Discover Your Next Adventure | Premium Travel Experiences",
  description:
    "Experience the world with Fluturo - Your trusted travel partner for unforgettable memories. Premium travel packages, expert planning, and personalized adventures worldwide. Plan your dream vacation today.",
  generator: "fluturo.co",
  keywords: [
    "travel agency",
    "vacation planning",
    "travel packages",
    "adventure travel",
    "fluturo",
    "luxury travel",
    "international travel",
    "tour packages",
    "holiday planning",
    "destination travel",
  ],
  openGraph: {
    title: "Fluturo Travel Agency - Discover Your Next Adventure",
    description:
      "Experience the world with Fluturo - Your trusted travel partner for unforgettable memories. Premium travel packages and personalized adventures.",
    type: "website",
    locale: "en_US",
    siteName: "Fluturo Travel Agency",
    url: "https://fluturo.co",
    images: [
      {
        url: "/images/logo_landscape.png",
        width: 1200,
        height: 630,
        alt: "Fluturo Travel Agency Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/image.png",
    shortcut: "/images/image.png",
    apple: "/images/image.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://fluturo.co" />

        {/* Microsoft specific meta tags */}
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="msapplication-TileImage" content="/images/logo_landscape.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Open Graph and Twitter Card images */}
        <meta property="og:image" content="/images/logo_landscape.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Fluturo Travel Agency - Premium Travel Experiences" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/images/logo_landscape.png" />
        <meta name="twitter:title" content="Fluturo Travel Agency - Discover Your Next Adventure" />
        <meta
          name="twitter:description"
          content="Experience the world with Fluturo - Your trusted travel partner for unforgettable memories."
        />

        {/* Structured Data - Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "Fluturo Travel Agency",
              description:
                "Premium travel agency offering personalized vacation packages and adventure travel experiences worldwide.",
              url: "https://fluturo.co",
              logo: "https://fluturo.co/images/logo_landscape.png",
              image: "https://fluturo.co/images/logo_landscape.png",
              email: "info@fluturo.co",
              priceRange: "$$-$$$",
              serviceArea: {
                "@type": "Place",
                name: "Worldwide",
              },
              areaServed: "Worldwide",
              slogan: "Discover Your Next Adventure",
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
