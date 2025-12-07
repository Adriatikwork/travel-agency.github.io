// ============================================================
// TRAVEL AGENCY PACKAGES DATA
// ============================================================
// This file contains all curated travel package information
// Each package is linked to a destination
// ============================================================

export const packagesData = {
  packages: [
    // ============================================================
    // PACKAGE 1: Barcelona Mediterranean Romance
    // Romantic city break in Barcelona
    // ============================================================
    {
      id: "pkg-barcelona-romantic",
      title: {
        en: "Barcelona Mediterranean Romance",
        sq: "Romancë Mesdhetare në Barcelonë"
      },
      destinationId: "dest-barcelona-dec-01",
      summary: {
        en: "2 nights with tapas tours, Gaudí architecture visits, and beachfront dining.",
        sq: "2 netë me turne tapas, vizita në arkitekturën e Gaudít dhe darke në bregdet."
      },
      image: "/placeholder.svg?height=300&width=500",
      price: 299,
      duration: 2,
      inclusions: {
        en: ["Boutique Hotel", "Tapas Tour", "Sagrada Familia Tickets", "Beach Club Access", "Airport Transfers"],
        sq: [
          "Hotel Boutique",
          "Tur Tapas",
          "Bileta për Sagrada Familia",
          "Qasje në Beach Club",
          "Transferta Aeroporti"
        ]
      },
      packageType: "bed-breakfast",
      themes: ["romantic", "city-break", "beach"],
      departureIds: ["dep-tia"],
      availableSeasons: ["winter"],
      isFeatured: true,
      isOnSale: false,
      popularityScore: 95
    },

    // ============================================================
    // PACKAGE 2: Prague Christmas Magic
    // Christmas market experience in Prague
    // ============================================================
    {
      id: "pkg-prague-christmas-special",
      title: {
        en: "Prague Christmas Magic Package",
        sq: "Paketa Magjike e Krishtlindjeve në Pragë"
      },
      destinationId: "dest-prague-dec-01",
      summary: {
        en: "2 nights with Christmas market tours, castle visit, and traditional Czech dinner.",
        sq: "2 netë me turne në tregjet e Krishtlindjeve, vizitë në kështjellë dhe darkë tradicionale çeke."
      },
      image: "/placeholder.svg?height=300&width=500",
      price: 349,
      duration: 2,
      inclusions: {
        en: ["Central Hotel", "Christmas Market Tours", "Castle Tickets", "Traditional Dinner", "City Pass"],
        sq: [
          "Hotel Qendror",
          "Turne në Tregjet e Krishtlindjeve",
          "Bileta për Kështjellën",
          "Darkë Tradicionale",
          "City Pass"
        ]
      },
      packageType: "bed-breakfast",
      themes: ["christmas", "romantic", "culture"],
      departureIds: ["dep-tia"],
      availableSeasons: ["winter"],
      isFeatured: true,
      isOnSale: true,
      popularityScore: 92
    },

    // ============================================================
    // PACKAGE 3: Bansko Family Ski Adventure
    // Family winter ski package in Bansko
    // ============================================================
    {
      id: "pkg-bansko-family-ski",
      title: {
        en: "Bansko Family Ski Adventure",
        sq: "Aventura Familjare e Skijimit në Bansko"
      },
      destinationId: "dest-bansko-jan-01",
      summary: {
        en: "5 nights with ski passes, equipment rental, and family activities in the snow.",
        sq: "5 netë me ski pass, qira pajisjesh dhe aktivitete familjare në borë."
      },
      image: "/placeholder.svg?height=300&width=500",
      price: 1199,
      duration: 5,
      inclusions: {
        en: ["Family Room", "Half-Board Meals", "Ski Passes", "Equipment Rental", "Kids Activities"],
        sq: ["Dhomë Familjare", "Gjysmë-Bordi", "Ski Pass", "Qira Pajisjesh", "Aktivitete për Fëmijë"]
      },
      packageType: "half-board",
      themes: ["family", "ski", "winter"],
      departureIds: ["dep-prn", "dep-tia"],
      availableSeasons: ["winter"],
      isFeatured: true,
      isOnSale: false,
      popularityScore: 88
    },

    // ============================================================
    // PACKAGE 4: Vienna Cultural Experience
    // Cultural exploration package in Vienna
    // ============================================================
    {
      id: "pkg-vienna-culture",
      title: {
        en: "Vienna Cultural Experience",
        sq: "Përvoja Kulturore në Vienë"
      },
      destinationId: "dest-vienna-jan-01",
      summary: {
        en: "2 nights with palace tours, classical concert, and traditional café visits.",
        sq: "2 netë me turne në pallate, koncert klasik dhe vizita në kafene tradicionale."
      },
      image: "/placeholder.svg?height=300&width=500",
      price: 199,
      duration: 2,
      inclusions: {
        en: ["Central Hotel", "Palace Tickets", "Concert Tickets", "Café Tour", "City Pass"],
        sq: ["Hotel Qendror", "Bileta për Pallatin", "Bileta Koncerti", "Tur Kafenesh", "City Pass"]
      },
      packageType: "bed-breakfast",
      themes: ["culture", "romantic", "city-break"],
      departureIds: ["dep-prn"],
      availableSeasons: ["winter"],
      isFeatured: false,
      isOnSale: true,
      popularityScore: 90
    },

    // ============================================================
    // PACKAGE 5: St. Moritz Luxury Ski
    // Premium luxury ski experience in Switzerland
    // ============================================================
    {
      id: "pkg-st-moritz-luxury",
      title: {
        en: "St. Moritz Luxury Ski Package",
        sq: "Paketa Luksoze e Skijimit në St. Moritz"
      },
      destinationId: "dest-st-moritz-jan-01",
      summary: {
        en: "5 nights with premium ski access, spa treatments, and gourmet dining.",
        sq: "5 netë me qasje premium në ski, trajtime spa dhe kuzhinë gourmet."
      },
      image: "/placeholder.svg?height=300&width=500",
      price: 3299,
      duration: 5,
      inclusions: {
        en: ["Luxury Hotel", "VIP Ski Passes", "Spa Package", "Gourmet Meals", "Private Transfers"],
        sq: ["Hotel Luksoz", "VIP Ski Pass", "Paketë Spa", "Vakte Gourmet", "Transferta Private"]
      },
      packageType: "all-inclusive",
      themes: ["luxury", "ski", "romantic"],
      departureIds: ["dep-prn"],
      availableSeasons: ["winter"],
      isFeatured: false,
      isOnSale: false,
      popularityScore: 86
    }

    // ============================================================
    // ADD NEW PACKAGES BELOW THIS LINE
    // Copy the structure from existing packages above
    // ============================================================
  ],
  ui: {
    title: {
      en: "Curated Travel Packages",
      sq: "Paketa Udhëtimi të Kuruar"
    },
    subtitle: {
      en: "All-inclusive experiences crafted for unforgettable journeys",
      sq: "Përvoja gjithëpërfshirëse të krijuara për udhëtime të paharrueshme"
    },
    whatsIncluded: {
      en: "What's Included:",
      sq: "Çfarë Përfshihet:"
    },
    moreInclusions: {
      en: "more inclusions",
      sq: "përfshirje të tjera"
    },
    nights: {
      en: "nights",
      sq: "netë"
    },
    from: {
      en: "From",
      sq: "Nga"
    },
    bookPackage: {
      en: "Book Package",
      sq: "Rezervo Paketën"
    },
    featured: {
      en: "Featured",
      sq: "Të Veçanta"
    },
    onSale: {
      en: "On Sale",
      sq: "Në Ofertë"
    }
  }
} as const

export default packagesData
