import type { Metadata } from "next"
import PrivacyPolicyClient from "./privacy-client"

export const metadata: Metadata = {
  title: "Privacy Policy | Fluturo Travel Agency",
  description:
    "Read Fluturo Travel Agency's Privacy Policy to understand how we collect, use, and protect your personal information when you use our travel services.",
  alternates: {
    canonical: "https://fluturo.co/privacy/",
  },
  openGraph: {
    title: "Privacy Policy | Fluturo Travel Agency",
    description:
      "Read Fluturo Travel Agency's Privacy Policy to understand how we collect, use, and protect your personal information.",
    type: "website",
    url: "https://fluturo.co/privacy/",
    siteName: "Fluturo Travel Agency",
  },
  robots: {
    index: true,
    follow: false,
  },
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />
}
