// ============================================================
// TRAVEL AGENCY DESTINATIONS DATA
// ============================================================
// This file contains all destination information with comments
// for easier management. Import this instead of destinations.json
// ============================================================

export const destinationsData = {
  meta: {
    currency: "EUR",
    lastUpdated: "2025-12-16",
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
      id: "dest-barcelona-dec-01",
      slug: "barcelona-december-escape",
      name: "Barcelona",
      city: "Barcelona",
      country: { en: "Spain", sq: "Spanjë" },
      coordinates: {
        lat: 41.3874,
        lon: 2.1686,
      },
      continent: "Europe",
      tagline: { en: "Mediterranean Winter Sun", sq: "Dielli Dimëror Mesdhetar" },
      descriptionShort: { en: "Enjoy the days of December under the warm Mediterranean sun!", sq: "Shijoni ditët e dhjetorit nën diellin e ngrohtë mesdhetar!" },
      descriptionLong: { en: "Barcelona awaits you with festive lights, seaside walks and an atmosphere full of energy. Perfect vacation before the holidays with La Rambla, Sagrada Familia, tapas, and magical winter nights.", sq: "Barcelona ju pret me drita festive, shëtitje bregdetare dhe një atmosferë plot energji. Pushim perfekt para festave me La Rambla, Sagrada Familia, tapas dhe netë dimërore magjike." },
      primaryImage: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=1200&h=800&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&h=800&fit=crop"],
      pricing: {
        from: 269,
        currency: "EUR",
        perPerson: true,
        priceCategory: "budget",
      },
      duration: {
        minNights: 2,
        maxNights: 2,
        specificDates: { en: "December 19-21", sq: "19-21 Dhjetor" },
      },
      mealPlan: { en: "Breakfast included", sq: "Mëngjesi i përfshirë" },
      popularityScore: 94,
      featured: true,
      isNew: true,
      themes: ["city-break", "beach", "culture"],
      travelStyles: ["shopping", "culture"],
      seasonality: {
        best: ["winter"],
        avoid: [],
      },
      availableDepartureIds: ["dep-tia"],
      tags: {
        en: ["gaudi", "tapas", "mediterranean", "pre-christmas"],
        sq: ["gaudi", "tapas", "mesdhetar", "para-krishtlindjeve"],
      },
      included: {
        en: ["flight-from-tirana", "hotel-accommodation", "breakfast"],
        sq: ["fluturim-nga-tirana", "akomodim-në-hotel", "mëngjes"],
      },
      highlights: {
        en: ["La Rambla", "Sagrada Familia", "Catalan culture", "Tapas & Spanish vibe"],
        sq: ["La Rambla", "Sagrada Familia", "Kultura katalane", "Tapas & atmosfera spanjolle"],
      },
    },
    {
      id: "dest-prague-dec-01",
      slug: "prague-christmas-getaway",
      name: "PragueTesting",
      city: "Prague",
      country: { en: "Czech Republic", sq: "Republika Çeke" },
      coordinates: {
        lat: 50.0755,
        lon: 14.4378,
      },
      continent: "Europe",
      tagline: { en: "Christmas Magic Awaits", sq: "Magjia e Krishtlindjeve Ju Pret" },
      descriptionShort: { en: "A short escape, but full of magic. A limited offer, but with memories that last long.", sq: "Një arratisje e shkurtër, por plot magji. Një ofertë e kufizuar, por me kujtime që zgjasin gjatë." },
      descriptionLong: { en: "Experience the magical Christmas atmosphere of Prague with its historic streets, festive markets and stunning architecture. Make December an unforgettable experience!", sq: "Përjetoni atmosferën magjike të Krishtlindjeve në Pragë me rrugët e saj historike, tregjet festive dhe arkitekturën mahnitëse." },
      primaryImage: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&h=800&fit=crop",
      gallery: ["https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&h=800&fit=crop", "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=1200&h=800&fit=crop"],
      pricing: {
        from: 299,
        currency: "EUR",
        perPerson: true,
        priceCategory: "budget",
      },
      duration: {
        minNights: 2,
        maxNights: 2,
        specificDates: { en: "December 22-24", sq: "22-24 Dhjetor" },
      },
      mealPlan: { en: "Breakfast included", sq: "Mëngjesi i përfshirë" },
      popularityScore: 92,
      featured: true,
      isNew: true,
      themes: ["city-break", "romantic", "christmas"],
      travelStyles: ["culture", "shopping"],
      seasonality: {
        best: ["winter"],
        avoid: [],
      },
      availableDepartureIds: ["dep-tia"],
      tags: {
        en: ["christmas-markets", "short-break", "cultural", "limited-offer"],
        sq: ["tregje-krishtlindjesh", "pushim-i-shkurtër", "kulturor", "ofertë-e-kufizuar"],
      },
      included: {
        en: ["flight-from-tirana", "hotel-accommodation", "breakfast"],
        sq: ["fluturim-nga-tirana", "akomodim-në-hotel", "mëngjes"],
      },
      highlights: {
        en: ["Historic Old Town", "Christmas markets", "Castle & architecture", "Festive atmosphere"],
        sq: ["Qyteti i Vjetër Historik", "Tregjet e Krishtlindjeve", "Kështjella & arkitektura", "Atmosferë festive"],
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
