import type { Metadata } from "next"
import TermsOfServiceClient from "./terms-client"

export const metadata: Metadata = {
  title: "Terms of Service | Fluturo Travel Agency",
  description:
    "Read Fluturo Travel Agency's Terms of Service. Understand the terms and conditions that govern your use of our travel booking services.",
  alternates: {
    canonical: "https://fluturo.co/terms/",
  },
  openGraph: {
    title: "Terms of Service | Fluturo Travel Agency",
    description:
      "Read Fluturo Travel Agency's Terms of Service and understand the conditions that govern our travel booking services.",
    type: "website",
    url: "https://fluturo.co/terms/",
    siteName: "Fluturo Travel Agency",
  },
  robots: {
    index: true,
    follow: false,
  },
}

export default function TermsOfServicePage() {
  return <TermsOfServiceClient />
}
