import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://fluturo.co"),
  title: "Fluturo Travel Agency - Discover Your Next Adventure | Premium Travel Experiences",
  description:
    "Experience the world with Fluturo - Your trusted travel partner for unforgettable memories. Premium travel packages, expert planning, and personalized adventures worldwide. Plan your dream vacation today.",
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
    "Kosovo travel agency",
    "Balkans travel",
    "European vacation packages",
  ],
  alternates: {
    canonical: "https://fluturo.co",
  },
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
        url: "https://fluturo.co/images/logo_landscape.png",
        width: 1200,
        height: 630,
        alt: "Fluturo Travel Agency - Premium Travel Experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluturo Travel Agency - Discover Your Next Adventure",
    description:
      "Experience the world with Fluturo - Your trusted travel partner for unforgettable memories.",
    images: ["https://fluturo.co/images/logo_landscape.png"],
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

        {/* Microsoft specific meta tags */}
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="msapplication-TileImage" content="https://fluturo.co/images/logo_landscape.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Structured Data - Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              "@id": "https://fluturo.co/#organization",
              name: "Fluturo Travel Agency",
              description:
                "Premium travel agency based in Kosovo, specializing in European destinations and unforgettable travel experiences worldwide.",
              url: "https://fluturo.co",
              logo: {
                "@type": "ImageObject",
                url: "https://fluturo.co/images/logo_landscape.png",
                width: 1200,
                height: 630,
              },
              image: "https://fluturo.co/images/logo_landscape.png",
              email: "info@fluturo.co",
              telephone: "+38344663344",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Fehmi Agani 43",
                addressLocality: "Pristina",
                addressCountry: "XK",
              },
              priceRange: "$$-$$$",
              currenciesAccepted: "EUR",
              serviceArea: {
                "@type": "Place",
                name: "Worldwide",
              },
              areaServed: "Worldwide",
              slogan: "Discover Your Next Adventure",
              foundingDate: "2023",
              sameAs: [
                "https://facebook.com/fluturo",
                "https://instagram.com/fluturo",
                "https://tiktok.com/@fluturo",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                bestRating: "5",
                worstRating: "1",
                ratingCount: "5000",
              },
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
