export interface TermsSection {
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

export interface TermsOfService {
  title: {
    en: string
    sq: string
  }
  description: {
    en: string
    sq: string
  }
  lastUpdated: string
  sections: TermsSection[]
}

const termsOfService: TermsOfService = {
  title: {
    en: "Terms of Service",
    sq: "Kushtet e Shërbimit",
  },
  description: {
    en: "Read the terms and conditions governing the use of Fluturo Travel Agency services.",
    sq: "Lexoni kushtet dhe kondicionet që rregullojnë përdorimin e shërbimeve të Fluturo Travel Agency.",
  },
  lastUpdated: "March 2025",
  sections: [
    {
      id: "acceptance-of-terms",
      title: {
        en: "1. Acceptance of Terms",
        sq: "1. Pranimin e Kushteve",
      },
      content: {
        en: "By using the Fluturo Travel Agency website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services. These terms apply to all visitors, users, and customers of Fluturo Travel Agency.",
        sq: "Duke përdorur faqen e internetit dhe shërbimet e Fluturo Travel Agency, ju pajtoheni të jeni të lidhur nga këto Kushte të Shërbimit. Nëse nuk pajtoheni, ju lutemi mos përdorni shërbimet tona. Këto kushte zbatohen për të gjithë vizitorët, përdoruesit dhe klientët e Fluturo Travel Agency.",
      },
    },
    {
      id: "our-services",
      title: {
        en: "2. Our Services",
        sq: "2. Shërbimet Tona",
      },
      content: {
        en: "Fluturo Travel Agency provides travel planning, booking assistance, and consultation services including but not limited to: flight bookings, hotel reservations, travel packages, transfers, and visa guidance. We act as an intermediary between you and third-party service providers (airlines, hotels, etc.).",
        sq: "Fluturo Travel Agency ofron shërbime planifikimi të udhëtimit, ndihmë rezervimi dhe këshillim të cilat përfshijnë por nuk janë të kufizuara në: rezervimet e fluturimeve, rezervimet në hotel, paketa udhëtimi, transfertat dhe orientimin e vizës. Kami si ndërmjetës midis jush dhe ofruesve të shërbimeve të palëve të treta (linjat ajrore, hotelet, etj.).",
      },
    },
    {
      id: "bookings-and-payments",
      title: {
        en: "3. Bookings and Payments",
        sq: "3. Rezervimet dhe Pagesat",
      },
      content: {
        en: [
          "All bookings are subject to availability and confirmation. Prices quoted are indicative and may change until a booking is confirmed in writing. A booking is only confirmed once full or agreed deposit payment has been received and a confirmation document has been issued by Fluturo.",
          "Payment terms, cancellation fees, and deposit requirements will be communicated clearly at the time of booking and are specific to each package or service.",
        ],
        sq: [
          "Të gjitha rezervimet janë objekt i disponibilitetit dhe konfirmimit. Çmimet e ofruara janë indicative dhe mund të ndryshojnë derisa një rezervim të konfirmohet në shkrim. Një rezervim konfirmohet vetëm pasi të marrë pagesa e plotë ose të rënë dakord dhe një dokument konfirmimi të ketë lëshuar Fluturo.",
          "Termat e pagesës, tarifat e anulimit dhe kërkesat e depozitit do të komunikohen qartë në kohën e rezervimit dhe janë specifike për secilin paket ose shërbim.",
        ],
      },
    },
    {
      id: "cancellations-and-refunds",
      title: {
        en: "4. Cancellations and Refunds",
        sq: "4. Anullet dhe Rimbursimet",
      },
      content: {
        en: [
          "Cancellation policies vary depending on the service provider (airline, hotel, tour operator) and the specific package booked. Fluturo will communicate applicable cancellation terms at the time of booking. In general:",
          "We strongly recommend purchasing travel insurance to protect against unforeseen cancellations.",
        ],
        sq: [
          "Politikat e anulimit ndryshojnë në varësi të ofruesit të shërbimit (ajrore, hotel, operator turizmike) dhe paketës specifike të rezervuar. Fluturo do të komunikojë termat e anulimit të zbatueshëm në kohën e rezervimit. Në përgjithësi:",
          "Ne fuqimisht rekomandojmë blerjen e sigurimit të udhëtimit për të mbrojtur kundër anulimeve të paparashikuara.",
        ],
      },
      list: {
        en: [
          "Cancellations made well in advance may be eligible for partial or full refunds minus any service fees",
          "Last-minute cancellations may be non-refundable",
          "Fluturo service fees are generally non-refundable once a booking has been processed",
        ],
        sq: [
          "Anullimet e bëra me mirë paraprakisht mund të jenë të drejta për rimbursimet e pjesshëm ose të plotë minus çdo tarifë shërbimi",
          "Anullimet e fundit mund të jenë jo të rimbursueshem",
          "Tarifat e shërbimit Fluturo përgjithësisht nuk janë të rimbursueshem pasi një rezervim të ketë procesuar",
        ],
      },
    },
    {
      id: "travel-documents-and-responsibilities",
      title: {
        en: "5. Travel Documents and Responsibilities",
        sq: "5. Dokumentet e Udhëtimit dhe Përgjegjësitë",
      },
      content: {
        en: "It is your responsibility to ensure you hold a valid passport, any required visas, and meet the entry requirements for your destination country. Fluturo can provide general guidance but is not responsible for denied entry, visa refusals, or travel disruptions caused by missing or invalid documents.",
        sq: "Është përgjegjësia juaj të siguroheni se zotëroni një pasaportë të vlefshme, ndonjë vizë të kërkuar dhe të plotësohen kërkesatë hyrjes për vendin e destinacionit. Fluturo mund të ofrojë orientim të përgjithshëm por nuk është përgjegjës për hyrjen e mohuar, refuzimin e vizës ose ndërprerjet e udhëtimit të shkaktuara nga dokumentet që mungojnë ose jo të vlefshëm.",
      },
    },
    {
      id: "limitation-of-liability",
      title: {
        en: "6. Limitation of Liability",
        sq: "6. Kufizimi i Përgjegjësisë",
      },
      content: {
        en: [
          "Fluturo Travel Agency acts as an agent for third-party suppliers and is not liable for any acts, errors, omissions, injuries, losses, accidents, delays, or irregularities caused by such suppliers. Our liability is limited to the amount paid to us for the specific service in question.",
          "We are not responsible for force majeure events including but not limited to natural disasters, strikes, pandemics, or government travel restrictions.",
        ],
        sq: [
          "Fluturo Travel Agency vepron si agjent për ofruesit e palëve të treta dhe nuk është përgjegjës për ndonjë veprim, gabim, lënie në dukje, lëndim, humbje, aksidente, vonesa ose parregullsi të shkaktuara nga ofruesit e tillë. Përgjegjësia jonë është e kufizuar në shumën e paguar për ne për shërbimin specifik në fjalë.",
          "Ne nuk jemi përgjegjës për ngjarjet e forcës më të lartë duke përfshirë por nuk janë të kufizuara në fatkeqësi natyrore, grevë, pandemi ose kufizime të udhëtimit të qeverisë.",
        ],
      },
    },
    {
      id: "website-use",
      title: {
        en: "7. Website Use",
        sq: "7. Përdorimi i Faqes së Internetit",
      },
      content: {
        en: "You agree to use our website only for lawful purposes. You must not misuse or interfere with our website, attempt to gain unauthorized access, or submit false inquiries. We reserve the right to restrict access to any user who violates these terms.",
        sq: "Ju pajtoheni të përdorni faqen tonë të internetit vetëm për qëllime ligjore. Nuk duhet të keqpërdorni ose të ndërhyrni me faqen tonë të internetit, të përpiquni të fitoni akses të paautorizuar ose të dorëzoni kërkesa të rreme. Ne rezervojmë të drejtën për të kufizuar aksesin në çdo përdorues që shkel këto kushte.",
      },
    },
    {
      id: "intellectual-property",
      title: {
        en: "8. Intellectual Property",
        sq: "8. Pronësia Intelektuale",
      },
      content: {
        en: "All content on this website — including text, images, logos, and design — is the property of Fluturo Travel Agency and may not be copied, reproduced, or used without our written permission.",
        sq: "I gjithë përmbajtja në këtë faqe të internetit - duke përfshirë tekstin, imazhet, logot dhe dizajnin - është pronësia e Fluturo Travel Agency dhe nuk mund të kopjohet, riprodhoohet ose përdoret pa lejen tonë të shkruar.",
      },
    },
    {
      id: "changes-to-terms",
      title: {
        en: "9. Changes to Terms",
        sq: "9. Ndryshimet në Kushte",
      },
      content: {
        en: "We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated date. Continued use of our services after changes constitutes acceptance of the new terms.",
        sq: "Ne rezervojmë të drejtën për të përditësuar këto Kushte të Shërbimit në çdo kohë. Ndryshimet do të bohen në këtë faqe me një datë të përditësuar. Përdorimi i vazhdueshëm i shërbimeve tona pas ndryshimeve përbën pranimin e kushteve të reja.",
      },
    },
    {
      id: "governing-law",
      title: {
        en: "10. Governing Law",
        sq: "10. Ligji i Zbatueshëm",
      },
      content: {
        en: "These terms are governed by the laws of the Republic of Kosovo. Any disputes arising from these terms or our services shall be subject to the jurisdiction of the courts of Pristina, Kosovo.",
        sq: "Këto kushte rregullohen nga ligjet e Republikës së Kosovës. Çdo mosmarrëveshje që del nga këto kushte ose shërbimet tona do të jetë objekt i jurisdiksionit të gjykatave të Prishtinës, Kosovë.",
      },
    },
    {
      id: "contact-us",
      title: {
        en: "11. Contact Us",
        sq: "11. Na Kontaktoni",
      },
      content: {
        en: "For questions about these Terms of Service, contact us at info@fluturo.co or call 044 66 33 44.",
        sq: "Për pyetje në lidhje me këto Kushte të Shërbimit, na kontaktoni në info@fluturo.co ose na telefononi 044 66 33 44.",
      },
    },
  ],
}

export default termsOfService
