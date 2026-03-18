export interface PrivacySection {
  id: string
  title: {
    en: string
    sq: string
  }
  content: {
    en: string | string[]
    sq: string | string[]
  }
  list?: {
    en: string[]
    sq: string[]
  }
}

export interface PrivacyPolicy {
  title: {
    en: string
    sq: string
  }
  description: {
    en: string
    sq: string
  }
  lastUpdated: string
  sections: PrivacySection[]
}

const privacyPolicy: PrivacyPolicy = {
  title: {
    en: "Privacy Policy",
    sq: "Politika e Privatësisë",
  },
  description: {
    en: "Learn how Fluturo Travel Agency collects, uses, and protects your personal information.",
    sq: "Mësoni se si Fluturo Travel Agency mbledh, përdor dhe mbron informacionin tuaj personal.",
  },
  lastUpdated: "March 2025",
  sections: [
    {
      id: "who-we-are",
      title: {
        en: "1. Who We Are",
        sq: "1. Kush Jemi Ne",
      },
      content: {
        en: 'Fluturo Travel Agency ("we", "us", or "our") is a travel agency based in Pristina, Kosovo, operating at Fehmi Agani 43. We can be reached at info@fluturo.co.',
        sq: 'Fluturo Travel Agency ("ne", "nesh", ose "yni") është një agjenci udhëtimi me bazë në Prishtinë, Kosovë, që operon në Fehmi Agani 43. Mund të na arritni në info@fluturo.co.',
      },
    },
    {
      id: "information-we-collect",
      title: {
        en: "2. Information We Collect",
        sq: "2. Informacioni Që Ne Mbledhim",
      },
      content: {
        en: "When you use our website or submit a travel inquiry, we may collect:",
        sq: "Kur përdorni faqen tonë të internetit ose dorëzoni një kërkesë udhëtimi, mund të mbledhim:",
      },
      list: {
        en: [
          "Full name, email address, and phone number",
          "Travel preferences, dates, and destination interests",
          "Number of travelers and trip type",
          "Basic usage data (pages visited, browser type) via analytics",
        ],
        sq: [
          "Emri i plotë, adresa e postës elektronike dhe numri i telefonit",
          "Preferencat e udhëtimit, datat dhe interesat për destinacionin",
          "Numri i udhëtarëve dhe lloji i udhëtimit",
          "Të dhënat bazike të përdorimit (faqet e vizituara, lloji i shfletuesit) përmes analitikës",
        ],
      },
    },
    {
      id: "how-we-use-information",
      title: {
        en: "3. How We Use Your Information",
        sq: "3. Si E Përdorim Informacionin Tuaj",
      },
      content: {
        en: "We use your information solely to:",
        sq: "Ne e përdorim informacionin tuaj vetëm për:",
      },
      list: {
        en: [
          "Respond to your travel inquiries and plan your trip",
          "Send you quotes, booking confirmations, and relevant travel updates",
          "Improve our website and services",
          "Comply with legal obligations",
        ],
        sq: [
          "Përgjigjuni kërkesave tuaja të udhëtimit dhe planifikoni udhëtimin tuaj",
          "T'ju dërgojmë oferta, konfirmimet e rezervimeve dhe përditësimet përkatëse të udhëtimit",
          "Përmirësojmë faqen tonë të internetit dhe shërbimet",
          "Bashkëpunojmë me detyrat ligjore",
        ],
      },
    },
    {
      id: "how-we-share-information",
      title: {
        en: "4. How We Share Your Information",
        sq: "4. Si E Ndajmë Informacionin Tuaj",
      },
      content: {
        en: "We may share your information with trusted service providers (such as airlines, hotels, and transfer companies) strictly to fulfill your travel booking. These partners are required to handle your data securely and only for the purpose of your trip.",
        sq: "Mund të ndajmë informacionin tuaj me ofruesit e shërbimeve të besueshëm (si linjat ajrore, hotelet dhe kompanive të transferit) vetëm për të përmbushur rezervimin tuaj të udhëtimit. Këta partnerë janë të detyruar të trajtojnë të dhënat tuaja në mënyrë të sigurt dhe vetëm për qëllimin e udhëtimit tuaj.",
      },
    },
    {
      id: "cookies",
      title: {
        en: "5. Cookies",
        sq: "5. Cookies",
      },
      content: {
        en: "Our website may use basic cookies to improve your browsing experience and collect anonymous analytics data. You can disable cookies in your browser settings at any time. We do not use cookies for advertising purposes.",
        sq: "Faqja jonë e internetit mund të përdorë cookies bazike për të përmirësuar përvojën tuaj të shfletimit dhe për të mbledhur të dhëna anonime analitike. Mund të çaktivizoni cookies në cilësimet e shfletuesit në çdo kohë. Ne nuk përdorim cookies për qëllime reklamimi.",
      },
    },
    {
      id: "data-retention",
      title: {
        en: "6. Data Retention",
        sq: "6. Ruajtja e të Dhënave",
      },
      content: {
        en: "We retain your personal information for as long as necessary to provide our services and comply with legal requirements. You may request deletion of your data at any time by contacting us at info@fluturo.co.",
        sq: "Ne ruajmë informacionin tuaj personal për kohën sa është e nevojshme për të ofruar shërbimet tona dhe për të përputhur me kërkesat ligjore. Mund të kërkoni fshirjen e të dhënave tuaja në çdo kohë duke na kontaktuar në info@fluturo.co.",
      },
    },
    {
      id: "your-rights",
      title: {
        en: "7. Your Rights",
        sq: "7. Të Drejtat Tuaja",
      },
      content: {
        en: "You have the right to:",
        sq: "Keni të drejtën të:",
      },
      list: {
        en: [
          "Access the personal data we hold about you",
          "Request correction of inaccurate data",
          "Request deletion of your data",
          "Withdraw consent for marketing communications at any time",
        ],
        sq: [
          "Pristini të dhënat personale që ne mbajtim për ju",
          "Kërkoni ndreqjen e të dhënave të pasakta",
          "Kërkoni fshirjen e të dhënave tuaja",
          "Tërhiqni pëlqimin për komunikimet e marketingut në çdo kohë",
        ],
      },
    },
    {
      id: "security",
      title: {
        en: "8. Security",
        sq: "8. Siguria",
      },
      content: {
        en: "We take reasonable technical and organizational measures to protect your personal data from unauthorized access, loss, or misuse. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.",
        sq: "Ne marrim masa të arsyeshme teknike dhe organizative për të mbrojtur të dhënat tuaja personale nga aksesi i paautorizuar, humbja ose keqpërdorimi. Megjithatë, asnjë transmision në internet nuk është 100% i sigurt dhe ne nuk mund të garantojmë sigurinë absolute.",
      },
    },
    {
      id: "changes-to-policy",
      title: {
        en: "9. Changes to This Policy",
        sq: "9. Ndryshimet në Këtë Politikë",
      },
      content: {
        en: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of our website after changes constitutes acceptance of the updated policy.",
        sq: "Mund ta përditësojmë këtë Politikë Privatësie herë pas here. Çdo ndryshim do të bohet në këtë faqe me një datë të përditësuar. Përdorimi i vazhdueshëm i faqes sonë të internetit pas ndryshimeve përbën pranimin e politikës së përditësuar.",
      },
    },
    {
      id: "contact-us",
      title: {
        en: "10. Contact Us",
        sq: "10. Na Kontaktoni",
      },
      content: {
        en: "If you have any questions about this Privacy Policy, please contact us at info@fluturo.co or call us at 044 66 33 44.",
        sq: "Nëse keni ndonjë pyetje në lidhje me këtë Politikë Privatësie, ju lutemi na kontaktoni në info@fluturo.co ose na telefononi në 044 66 33 44.",
      },
    },
  ],
}

export default privacyPolicy
