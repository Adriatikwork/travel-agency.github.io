// ============================================================
// TRAVEL AGENCY DESTINATIONS DATA
// ============================================================
// This file contains all destination information with comments
// for easier management. Import this instead of destinations.json
// ============================================================

export const destinationsData = {
  meta: {
    currency: "EUR",
    lastUpdated: "2025-12-14",
  },
  departures: [
    {
      id: "dep-prn",
      city: { en: "Prishtina", sq: "Prishtinë" },
      country: { en: "Kosovo", sq: "Kosovë" },
      airportCode: "PRN",
      isDefault: true,
    },
    {
      id: "dep-skp",
      city: { en: "Skopje", sq: "Shkup" },
      country: { en: "North Macedonia", sq: "Maqedonia e Veriut" },
      airportCode: "SKP",
      isDefault: false,
    },
    {
      id: "dep-tia",
      city: { en: "Tirana", sq: "Tiranë" },
      country: { en: "Albania", sq: "Shqipëri" },
      airportCode: "TIA",
      isDefault: false,
    }
  ],
  destinations: [
    {
      id: "dest-st-moritz-jan-01",
      slug: "st-moritz-luxury-ski",
      name: "St. Moritz",
      city: "St. Moritz",
      country: { en: "Switzerland", sq: "Zvicër" },
      coordinates: {
        lat: 46.4908,
        lon: 9.8355,
      },
      continent: "Europe",
      tagline: { en: "Luxury Alpine Experience", sq: "Përvojë Luksoze Alpine" },
      descriptionShort: { en: "Unforgettable holiday in St. Moritz!", sq: "Pushim i paharrueshëm në St. Moritz!" },
      descriptionLong: { en: "Experience the magical snow, luxury skiing and breathtaking views in one of the world's most exclusive ski resorts. Make your winter special!", sq: "Përjetoni borën magjike, skijimin luksoz dhe pamjet mahnitëse në një nga resortet më ekskluzive të skijimit në botë. Bëjeni dimrin tuaj special!" },
      primaryImage: "https://images.unsplash.com/photo-1609863761484-7649ab97dc4d?w=1200&h=800&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1609863761484-7649ab97dc4d?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1610041321420-d77aa7c5b5c5?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1544272321-c0ee2cf0bb5c?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=1200&h=800&fit=crop"],
      pricing: {
        from: 2999,
        currency: "EUR",
        perPerson: false,
        priceCategory: "premium",
        note: { en: "Price for couple", sq: "Çmimi për çift" },
      },
      duration: {
        minNights: 5,
        maxNights: 5,
        specificDates: { en: "January 20-25", sq: "20-25 Janar" },
      },
      popularityScore: 88,
      featured: true,
      isNew: true,
      themes: ["luxury", "winter", "ski", "romantic"],
      travelStyles: ["adventure", "relaxation"],
      seasonality: {
        best: ["winter"],
        avoid: [],
      },
      availableDepartureIds: ["dep-prn"],
      tags: {
        en: ["luxury-ski", "swiss-alps", "exclusive", "couples"],
        sq: ["skijim-luksoz", "alpet-zvicerane", "ekskluziv", "çifte"],
      },
      highlights: {
        en: ["Luxury skiing", "Breathtaking alpine views", "World-class resort", "Premium experience"],
        sq: ["Skijim luksoz", "Pamje alpine mahnitëse", "Resort i klasit botëror", "Përvojë premium"],
      },
    },
    {
      id: "dest-vienna-jan-01",
      slug: "vienna-winter-culture",
      name: "Vienna",
      city: "Vienna",
      country: { en: "Austria", sq: "Austri" },
      coordinates: {
        lat: 48.2082,
        lon: 16.3738,
      },
      continent: "Europe",
      tagline: { en: "Winter Cultural Oasis", sq: "Oazë Kulturore Dimërore" },
      descriptionShort: { en: "Vienna is magical even in January!", sq: "Viena është magjike edhe në janar!" },
      descriptionLong: { en: "After the holidays, the city of music and culture transforms into a peaceful winter oasis. Walks through the historic streets, traditional cafes and impressive architecture make every moment feel like a fairy tale. Experience the atmosphere of famous cafes, enjoy typical Austrian sweets and relax among the warm lights that reflect on the canals and city squares.", sq: "Pas festave, qyteti i muzikës dhe kulturës transformohet në një oazë paqësore dimërore. Shëtitjet nëpër rrugët historike, kafenetë tradicionale dhe arkitektura impresionuese e bëjnë çdo moment të ndihet si përrallë. Përjetoni atmosferën e kafeneve të famshme, shijoni ëmbëlsirat tipike austriake dhe relaksohuni mes dritave të ngrohta që pasqyrohen në kanalet dhe sheshet e qytetit." },
      primaryImage: "https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=1200&h=800&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1558599652-5e0b1d719c2c?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=1200&h=800&fit=crop"],
      pricing: {
        from: 149,
        currency: "EUR",
        perPerson: true,
        priceCategory: "budget",
      },
      duration: {
        minNights: 2,
        maxNights: 2,
        specificDates: { en: "January 16-18", sq: "16-18 Janar" },
      },
      mealPlan: { en: "Breakfast included", sq: "Mëngjesi i përfshirë" },
      popularityScore: 87,
      featured: true,
      isNew: true,
      themes: ["city-break", "culture", "winter"],
      travelStyles: ["culture", "relaxation"],
      seasonality: {
        best: ["winter"],
        avoid: [],
      },
      availableDepartureIds: ["dep-prn"],
      tags: {
        en: ["cafes", "architecture", "cultural", "peaceful"],
        sq: ["kafene", "arkitekturë", "kulturor", "paqësor"],
      },
      included: {
        en: ["flight-from-prishtina", "hotel-accommodation", "breakfast"],
        sq: ["fluturim-nga-prishtina", "akomodim-në-hotel", "mëngjes"],
      },
      highlights: {
        en: ["Famous Viennese cafes", "Historic architecture", "Austrian sweets", "Winter atmosphere"],
        sq: ["Kafenetë e famshme të Vienës", "Arkitektura historike", "Ëmbëlsirat austriake", "Atmosfera dimërore"],
      },
    }
  ],
  ui: {
    featured: { en: "Featured", sq: "Të Veçanta" },
    new: { en: "New", sq: "E Re" },
    from: { en: "From", sq: "Nga" },
    nights: { en: "nights", sq: "netë" },
    viewDetails: { en: "View Details", sq: "Shiko Detajet" },
    bookNow: { en: "Book Now", sq: "Rezervo Tani" },
    availableFrom: { en: "Available from", sq: "E disponueshme nga" },
    airports: { en: "airports", sq: "aeroporte" },
    exploreDestinations: { en: "Explore Destinations", sq: "Eksploroni Destinacionet" },
    destinationsFound: { en: "destinations found", sq: "destinacione të gjetura" },
    destinationFound: { en: "destination found", sq: "destinacion i gjetur" },
    noDestinations: { en: "No destinations found matching your criteria.", sq: "Nuk u gjetën destinacione që përputhen me kriteret tuaja." },
    tryAdjusting: { en: "Try adjusting your filters or search terms.", sq: "Provoni të rregulloni filtrat ose termat e kërkimit." },
  },
} as const

export default destinationsData
