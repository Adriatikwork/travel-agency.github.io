// ============================================================
// TRAVEL AGENCY PACKAGES DATA
// ============================================================
// This file contains all travel package information
// ============================================================

export const packagesData = {
  meta: {
    lastUpdated: "2026-01-18",
  },
  packages: [
    {
      id: "pkg-prague-christmas-special",
      title: { en: "Prague Christmas Magic Package", sq: "Paketa Magjike e Krishtlindjeve në Pragë" },
      destinationId: "dest-prague-dec-01",
      summary: { en: "2 nights with Christmas market tours, castle visit, and traditional Czech dinner.", sq: "2 netë me turne në tregjet e Krishtlindjeve, vizitë në kështjellë dhe darkë tradicionale çeke." },
      image: "public/images/packages/placeholder.svg?height=300&width=500",
      price: 349,
      duration: 2,
      inclusions: {
        en: ["Central Hotel", "Christmas Market Tours", "Castle Tickets", "Traditional Dinner", "City Pass"],
        sq: ["Hotel Qendror", "Turne në Tregjet e Krishtlindjeve", "Bileta për Kështjellën", "Darkë Tradicionale", "City Pass"],
      },
      packageType: "bed-breakfast",
      themes: ["christmas", "romantic", "culture"],
      departureIds: ["dep-tia"],
      availableSeasons: ["winter"],
      isFeatured: true,
      isOnSale: true,
      popularityScore: 92,
    },
    {
      id: "pkg-st-moritz-luxury",
      title: { en: "St. Moritz Luxury Ski Package", sq: "Paketa Luksoze e Skijimit në St. Moritz" },
      destinationId: "dest-st-moritz-jan-01",
      summary: { en: "5 nights with premium ski access, spa treatments, and gourmet dining.", sq: "5 netë me qasje premium në ski, trajtime spa dhe kuzhinë gourmet." },
      image: "public/images/packages/placeholder.svg?height=300&width=500",
      price: 3299,
      duration: 5,
      inclusions: {
        en: ["Luxury Hotel", "VIP Ski Passes", "Spa Package", "Gourmet Meals", "Private Transfers"],
        sq: ["Hotel Luksoz", "VIP Ski Pass", "Paketë Spa", "Vakte Gourmet", "Transferta Private"],
      },
      packageType: "all-inclusive",
      themes: ["luxury", "ski", "romantic"],
      departureIds: ["dep-prn"],
      availableSeasons: ["winter"],
      isFeatured: false,
      isOnSale: false,
      popularityScore: 86,
    },
    {
      id: "pkg-vienna-culture",
      title: { en: "Vienna Cultural Experience", sq: "Përvoja Kulturore në Vienë" },
      destinationId: "dest-vienna-jan-01",
      summary: { en: "2 nights with palace tours, classical concert, and traditional café visits.", sq: "2 netë me turne në pallate, koncert klasik dhe vizita në kafene tradicionale." },
      image: "public/images/packages/placeholder.svg?height=300&width=500",
      price: 199,
      duration: 2,
      inclusions: {
        en: ["Central Hotel", "Palace Tickets", "Concert Tickets", "Café Tour", "City Pass"],
        sq: ["Hotel Qendror", "Bileta për Pallatin", "Bileta Koncerti", "Tur Kafenesh", "City Pass"],
      },
      packageType: "bed-breakfast",
      themes: ["culture", "romantic", "city-break"],
      departureIds: ["dep-prn"],
      availableSeasons: ["winter"],
      isFeatured: false,
      isOnSale: true,
      popularityScore: 90,
    }
  ],
  ui: {
    title: { en: "Travel Packages", sq: "Paketat e Udhëtimit" },
    subtitle: { en: "All-inclusive experiences crafted for unforgettable journeys", sq: "Përvoja gjithëpërfshirëse të krijuara për udhëtime të paharrueshme" },
    featured: { en: "Featured", sq: "Të Veçanta" },
    onSale: { en: "On Sale", sq: "Në Ofertë" },
    perPerson: { en: "per person", sq: "për person" },
    nights: { en: "nights", sq: "netë" },
    viewPackage: { en: "View Package", sq: "Shiko Paketën" },
    bookNow: { en: "Book Now", sq: "Rezervo Tani" },
    bookPackage: { en: "Book Package", sq: "Rezervo Paketën" },
    from: { en: "From", sq: "Nga" },
    whatsIncluded: { en: "What's Included:", sq: "Çfarë Përfshihet:" },
    moreInclusions: { en: "more inclusions", sq: "përfshirje të tjera" },
  },
} as const

export default packagesData
