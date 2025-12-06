// ============================================================
// TRAVEL AGENCY DESTINATIONS DATA
// ============================================================
// This file contains all destination information with comments
// for easier management. Import this instead of destinations.json
// ============================================================

export const destinationsData = {
  meta: {
    currency: "EUR",
    lastUpdated: "2025-01-15",
  },
  departures: [
    {
      id: "dep-prn",
      city: {
        en: "Prishtina",
        sq: "Prishtinë",
      },
      country: {
        en: "Kosovo",
        sq: "Kosovë",
      },
      airportCode: "PRN",
      isDefault: true,
    },
    {
      id: "dep-skp",
      city: {
        en: "Skopje",
        sq: "Shkup",
      },
      country: {
        en: "North Macedonia",
        sq: "Maqedonia e Veriut",
      },
      airportCode: "SKP",
      isDefault: false,
    },
    {
      id: "dep-tia",
      city: {
        en: "Tirana",
        sq: "Tiranë",
      },
      country: {
        en: "Albania",
        sq: "Shqipëri",
      },
      airportCode: "TIA",
      isDefault: false,
    },
  ],
  destinations: [
    // ============================================================
    // DESTINATION 1: Bansko Family Vacation
    // Winter family getaway in Bulgaria
    // ============================================================
    {
      id: "dest-bansko-jan-01",
      slug: "bansko-family-vacation",
      name: "Bansko",
      city: "Bansko",
      country: {
        en: "Bulgaria",
        sq: "Bullgari",
      },
      coordinates: {
        lat: 41.8381,
        lon: 23.4878,
      },
      continent: "Europe",
      tagline: {
        en: "Family Winter Wonderland",
        sq: "Përrallë Dimërore Familjare",
      },
      descriptionShort: {
        en: "Start the year with family relaxation, snow and fun in Bansko!",
        sq: "Filloni vitin me relaksim familjar, borë dhe argëtim në Bansko!",
      },
      descriptionLong: {
        en: "5 nights of relaxation, snow and entertainment for the whole family! Comfortable accommodation, ski slopes very close and activities for everyone. A perfect start to the new year, where nature, snow and tranquility meet with the most beautiful family moments.",
        sq: "5 netë relaksim, borë dhe argëtim për të gjithë familjen! Akomodim komod, pista skijimi shumë afër dhe aktivitete për të gjithë. Një fillim perfekt për vitin e ri, ku natyra, bora dhe qetësia takohen me momentet më të bukura familjare.",
      },
      primaryImage: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      pricing: {
        from: 1085,
        currency: "EUR",
        perPerson: false,
        priceCategory: "mid-range",
        note: {
          en: "Package for 2+2 (children under 10 years)",
          sq: "Paketa për 2+2 (fëmijë nën 10 vjeç)",
        },
      },
      duration: {
        minNights: 5,
        maxNights: 5,
        specificDates: {
          en: "January 1-5",
          sq: "1-5 Janar",
        },
      },
      mealPlan: {
        en: "Half Board - breakfast & dinner",
        sq: "Gjysmë Bordi - mëngjes & darkë",
      },
      rating: null,
      popularityScore: 90,
      featured: true,
      isNew: true,
      themes: ["family", "winter", "ski"],
      travelStyles: ["relaxation", "adventure"],
      seasonality: {
        best: ["winter"],
        avoid: [],
      },
      availableDepartureIds: ["dep-prn", "dep-tia"],
      tags: {
        en: ["skiing", "family-friendly", "half-board", "limited-spots"],
        sq: ["skijim", "për-familje", "gjysmë-bordi", "vende-të-kufizuara"],
      },
      included: {
        en: ["accommodation", "half-board", "ski-access"],
        sq: ["akomodim", "gjysmë-bordi", "qasje-në-ski"],
      },
      highlights: {
        en: ["Comfortable accommodation", "Ski slopes nearby", "Activities for all family", "Snow & relaxation"],
        sq: ["Akomodim i rehatshëm", "Pista skijimi afër", "Aktivitete për gjithë familjen", "Borë & relaksim"],
      },
    },

    // ============================================================
    // DESTINATION 2: Prague Christmas Getaway
    // Magical Christmas experience in Czech Republic
    // ============================================================
    {
      id: "dest-prague-dec-01",
      slug: "prague-christmas-getaway",
      name: "Prague",
      city: "Prague",
      country: {
        en: "Czech Republic",
        sq: "Republika Çeke",
      },
      coordinates: {
        lat: 50.0755,
        lon: 14.4378,
      },
      continent: "Europe",
      tagline: {
        en: "Christmas Magic Awaits",
        sq: "Magjia e Krishtlindjeve Ju Pret",
      },
      descriptionShort: {
        en: "A short escape, but full of magic. A limited offer, but with memories that last long.",
        sq: "Një arratisje e shkurtër, por plot magji. Një ofertë e kufizuar, por me kujtime që zgjasin gjatë.",
      },
      descriptionLong: {
        en: "Experience the magical Christmas atmosphere of Prague with its historic streets, festive markets and stunning architecture. Make December an unforgettable experience!",
        sq: "Përjetoni atmosferën magjike të Krishtlindjeve në Pragë me rrugët e saj historike, tregjet festive dhe arkitekturën mahnitëse. Bëjeni dhjetorin një përvojë të paharrueshme!",
      },
      primaryImage: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      pricing: {
        from: 299,
        currency: "EUR",
        perPerson: true,
        priceCategory: "budget",
      },
      duration: {
        minNights: 2,
        maxNights: 2,
        specificDates: {
          en: "December 22-24",
          sq: "22-24 Dhjetor",
        },
      },
      mealPlan: {
        en: "Breakfast included",
        sq: "Mëngjesi i përfshirë",
      },
      rating: null,
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

    // ============================================================
    // DESTINATION 3: St. Moritz Luxury Ski
    // Premium skiing experience in Switzerland
    // ============================================================
    {
      id: "dest-st-moritz-jan-01",
      slug: "st-moritz-luxury-ski",
      name: "St. Moritz",
      city: "St. Moritz",
      country: {
        en: "Switzerland",
        sq: "Zvicër",
      },
      coordinates: {
        lat: 46.4908,
        lon: 9.8355,
      },
      continent: "Europe",
      tagline: {
        en: "Luxury Alpine Experience",
        sq: "Përvojë Luksoze Alpine",
      },
      descriptionShort: {
        en: "Unforgettable holiday in St. Moritz!",
        sq: "Pushim i paharrueshëm në St. Moritz!",
      },
      descriptionLong: {
        en: "Experience the magical snow, luxury skiing and breathtaking views in one of the world's most exclusive ski resorts. Make your winter special!",
        sq: "Përjetoni borën magjike, skijimin luksoz dhe pamjet mahnitëse në një nga resortet më ekskluzive të skijimit në botë. Bëjeni dimrin tuaj special!",
      },
      primaryImage: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      pricing: {
        from: 2999,
        currency: "EUR",
        perPerson: false,
        priceCategory: "premium",
        note: {
          en: "Price for couple",
          sq: "Çmimi për çift",
        },
      },
      duration: {
        minNights: 5,
        maxNights: 5,
        specificDates: {
          en: "January 20-25",
          sq: "20-25 Janar",
        },
      },
      mealPlan: null,
      rating: null,
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
      included: null,
      highlights: {
        en: ["Luxury skiing", "Breathtaking alpine views", "World-class resort", "Premium experience"],
        sq: ["Skijim luksoz", "Pamje alpine mahnitëse", "Resort i klasit botëror", "Përvojë premium"],
      },
    },

    // ============================================================
    // DESTINATION 4: Vienna Winter Culture
    // Cultural winter experience in Austria
    // ============================================================
    {
      id: "dest-vienna-jan-01",
      slug: "vienna-winter-culture",
      name: "Vienna",
      city: "Vienna",
      country: {
        en: "Austria",
        sq: "Austri",
      },
      coordinates: {
        lat: 48.2082,
        lon: 16.3738,
      },
      continent: "Europe",
      tagline: {
        en: "Winter Cultural Oasis",
        sq: "Oazë Kulturore Dimërore",
      },
      descriptionShort: {
        en: "Vienna is magical even in January!",
        sq: "Viena është magjike edhe në janar!",
      },
      descriptionLong: {
        en: "After the holidays, the city of music and culture transforms into a peaceful winter oasis. Walks through the historic streets, traditional cafes and impressive architecture make every moment feel like a fairy tale. Experience the atmosphere of famous cafes, enjoy typical Austrian sweets and relax among the warm lights that reflect on the canals and city squares.",
        sq: "Pas festave, qyteti i muzikës dhe kulturës transformohet në një oazë paqësore dimërore. Shëtitjet nëpër rrugët historike, kafenetë tradicionale dhe arkitektura impresionuese e bëjnë çdo moment të ndihet si përrallë. Përjetoni atmosferën e kafeneve të famshme, shijoni ëmbëlsirat tipike austriake dhe relaksohuni mes dritave të ngrohta që pasqyrohen në kanalet dhe sheshet e qytetit.",
      },
      primaryImage: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      pricing: {
        from: 149,
        currency: "EUR",
        perPerson: true,
        priceCategory: "budget",
      },
      duration: {
        minNights: 2,
        maxNights: 2,
        specificDates: {
          en: "January 16-18",
          sq: "16-18 Janar",
        },
      },
      mealPlan: {
        en: "Breakfast included",
        sq: "Mëngjesi i përfshirë",
      },
      rating: null,
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
    },

    // ============================================================
    // DESTINATION 5: Barcelona December Escape
    // Mediterranean winter escape in Spain
    // ============================================================
    {
      id: "dest-barcelona-dec-01",
      slug: "barcelona-december-escape",
      name: "Barcelona",
      city: "Barcelona",
      country: {
        en: "Spain",
        sq: "Spanjë",
      },
      coordinates: {
        lat: 41.3874,
        lon: 2.1686,
      },
      continent: "Europe",
      tagline: {
        en: "Mediterranean Winter Sun",
        sq: "Dielli Dimëror Mesdhetar",
      },
      descriptionShort: {
        en: "Enjoy the days of December under the warm Mediterranean sun!",
        sq: "Shijoni ditët e dhjetorit nën diellin e ngrohtë mesdhetar!",
      },
      descriptionLong: {
        en: "Barcelona awaits you with festive lights, seaside walks and an atmosphere full of energy that only this city has. Perfect vacation before the holidays with La Rambla, Sagrada Familia & Catalan squares, tapas, Spanish vibe and magical winter nights.",
        sq: "Barcelona ju pret me drita festive, shëtitje bregdetare dhe një atmosferë plot energji që vetëm ky qytet e ka. Pushim perfekt para festave me La Rambla, Sagrada Familia & sheshet katalane, tapas, atmosferë spanjolle dhe netë dimërore magjike.",
      },
      primaryImage: "/placeholder.svg?height=400&width=600",
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      pricing: {
        from: 269,
        currency: "EUR",
        perPerson: true,
        priceCategory: "budget",
      },
      duration: {
        minNights: 2,
        maxNights: 2,
        specificDates: {
          en: "December 19-21",
          sq: "19-21 Dhjetor",
        },
      },
      mealPlan: {
        en: "Breakfast included",
        sq: "Mëngjesi i përfshirë",
      },
      rating: null,
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

    // ============================================================
    // ADD NEW DESTINATIONS BELOW THIS LINE
    // Copy the structure from existing destinations above
    // ============================================================
  ],
  ui: {
    featured: {
      en: "Featured",
      sq: "Të Veçanta",
    },
    new: {
      en: "New",
      sq: "E Re",
    },
    from: {
      en: "From",
      sq: "Nga",
    },
    nights: {
      en: "nights",
      sq: "netë",
    },
    viewDetails: {
      en: "View Details",
      sq: "Shiko Detajet",
    },
    bookNow: {
      en: "Book Now",
      sq: "Rezervo Tani",
    },
    availableFrom: {
      en: "Available from",
      sq: "E disponueshme nga",
    },
    airports: {
      en: "airports",
      sq: "aeroporte",
    },
    exploreDestinations: {
      en: "Explore Destinations",
      sq: "Eksploroni Destinacionet",
    },
    destinationsFound: {
      en: "destinations found",
      sq: "destinacione të gjetura",
    },
    destinationFound: {
      en: "destination found",
      sq: "destinacion i gjetur",
    },
    noDestinations: {
      en: "No destinations found matching your criteria.",
      sq: "Nuk u gjetën destinacione që përputhen me kriteret tuaja.",
    },
    tryAdjusting: {
      en: "Try adjusting your filters or search terms.",
      sq: "Provoni të rregulloni filtrat ose termat e kërkimit.",
    },
  },
} as const

export default destinationsData
