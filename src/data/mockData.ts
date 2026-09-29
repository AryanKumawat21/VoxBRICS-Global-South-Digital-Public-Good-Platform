import { BRICSNation, CitizenRequest, HotspotCluster } from '../types';

// Standard BRICS Nations - with Core Founding BRICS (Brazil, Russia, India, China, South Africa) prioritized
export const BRICS_NATIONS: Record<string, BRICSNation> = {
  IN: {
    code: 'IN',
    name: 'India',
    nativeName: 'भारत',
    flag: '🇮🇳',
    currency: 'INR (₹)',
    population: '1.43 Billion',
    urbanizationRate: 36.4,
    infrastructureDeficitIndex: 58.2,
    isFoundingBRICS: true,
    mapBounds: {
      minLat: 8.0,
      maxLat: 36.0,
      minLng: 68.0,
      maxLng: 97.0,
      centerLat: 21.7679,
      centerLng: 78.8718,
      zoom: 5
    },
    languages: [
      { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
      { code: 'en', name: 'English', native: 'English' },
      { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
      { code: 'bn', name: 'Bengali', native: 'বাংলা' },
      { code: 'te', name: 'Telugu', native: 'తెలుగు' },
      { code: 'mr', name: 'Marathi', native: 'मराठी' },
    ],
    keyRegions: ['Bihar - Patna Rural', 'Uttar Pradesh - Bundelkhand', 'Maharashtra - Vidarbha', 'Tamil Nadu - Chennai Peri-urban', 'Karnataka - Bengaluru Outer Ring']
  },
  BR: {
    code: 'BR',
    name: 'Brazil',
    nativeName: 'Brasil',
    flag: '🇧🇷',
    currency: 'BRL (R$)',
    population: '215 Million',
    urbanizationRate: 87.8,
    infrastructureDeficitIndex: 46.5,
    isFoundingBRICS: true,
    mapBounds: {
      minLat: -33.7,
      maxLat: 5.2,
      minLng: -73.9,
      maxLng: -34.8,
      centerLat: -14.235,
      centerLng: -51.9253,
      zoom: 4
    },
    languages: [
      { code: 'pt', name: 'Portuguese', native: 'Português' },
      { code: 'en', name: 'English', native: 'English' },
    ],
    keyRegions: ['Rio de Janeiro - Baixada Fluminense', 'Bahia - Semiárido', 'São Paulo - Zona Leste Favela Ring', 'Pará - Marabá Basin', 'Ceará - Fortaleza Periphery']
  },
  RU: {
    code: 'RU',
    name: 'Russia',
    nativeName: 'Россия',
    flag: '🇷🇺',
    currency: 'RUB (₽)',
    population: '144 Million',
    urbanizationRate: 75.1,
    infrastructureDeficitIndex: 41.2,
    isFoundingBRICS: true,
    mapBounds: {
      minLat: 41.0,
      maxLat: 77.0,
      minLng: 20.0,
      maxLng: 170.0,
      centerLat: 61.524,
      centerLng: 105.3188,
      zoom: 3
    },
    languages: [
      { code: 'ru', name: 'Russian', native: 'Русский' },
      { code: 'en', name: 'English', native: 'English' },
    ],
    keyRegions: ['Siberia - Irkutsk Thermal Hub', 'Urals - Chelyabinsk Transit', 'Far East - Vladivostok Port Ring', 'Northwest - Karelia Microgrids']
  },
  CN: {
    code: 'CN',
    name: 'China',
    nativeName: '中国',
    flag: '🇨🇳',
    currency: 'CNY (¥)',
    population: '1.41 Billion',
    urbanizationRate: 65.2,
    infrastructureDeficitIndex: 28.5,
    isFoundingBRICS: true,
    mapBounds: {
      minLat: 18.0,
      maxLat: 53.5,
      minLng: 73.5,
      maxLng: 135.0,
      centerLat: 35.8617,
      centerLng: 104.1954,
      zoom: 4
    },
    languages: [
      { code: 'zh', name: 'Mandarin Chinese', native: '中文' },
      { code: 'en', name: 'English', native: 'English' },
    ],
    keyRegions: ['Guizhou - Mountain Eco-Belt', 'Henan - Central Plains Hub', 'Sichuan - Western Revitalization Zone', 'Gansu - Hexi Corridor']
  },
  ZA: {
    code: 'ZA',
    name: 'South Africa',
    nativeName: 'iNingizimu Afrika',
    flag: '🇿🇦',
    currency: 'ZAR (R)',
    population: '60 Million',
    urbanizationRate: 68.3,
    infrastructureDeficitIndex: 52.1,
    isFoundingBRICS: true,
    mapBounds: {
      minLat: -35.0,
      maxLat: -22.0,
      minLng: 16.0,
      maxLng: 33.0,
      centerLat: -30.5595,
      centerLng: 22.9375,
      zoom: 5
    },
    languages: [
      { code: 'zu', name: 'isiZulu', native: 'isiZulu' },
      { code: 'xh', name: 'isiXhosa', native: 'isiXhosa' },
      { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },
      { code: 'en', name: 'English', native: 'English' },
    ],
    keyRegions: ['Gauteng - Soweto & Diepsloot', 'Eastern Cape - OR Tambo District', 'KwaZulu-Natal - eThekwini Informal Settlements', 'Limpopo - Sekhukhune Rural']
  },
  EG: {
    code: 'EG',
    name: 'Egypt',
    nativeName: 'مصر',
    flag: '🇪🇬',
    currency: 'EGP (E£)',
    population: '112 Million',
    urbanizationRate: 43.1,
    infrastructureDeficitIndex: 49.8,
    isFoundingBRICS: false,
    mapBounds: {
      minLat: 22.0,
      maxLat: 31.7,
      minLng: 25.0,
      maxLng: 36.9,
      centerLat: 26.8206,
      centerLng: 30.8025,
      zoom: 6
    },
    languages: [
      { code: 'ar', name: 'Arabic', native: 'العربية' },
      { code: 'en', name: 'English', native: 'English' },
    ],
    keyRegions: ['Upper Egypt - Asyut Corridor', 'Nile Delta - Kafr El Sheikh', 'Giza - Imbaba Informal', 'Suez Canal - Ismailia West']
  },
  ET: {
    code: 'ET',
    name: 'Ethiopia',
    nativeName: 'ኢትዮጵያ',
    flag: '🇪🇹',
    currency: 'ETB (Br)',
    population: '126 Million',
    urbanizationRate: 22.8,
    infrastructureDeficitIndex: 69.4,
    isFoundingBRICS: false,
    mapBounds: {
      minLat: 3.4,
      maxLat: 14.9,
      minLng: 33.0,
      maxLng: 48.0,
      centerLat: 9.145,
      centerLng: 40.4897,
      zoom: 6
    },
    languages: [
      { code: 'am', name: 'Amharic', native: 'አማርኛ' },
      { code: 'om', name: 'Oromo', native: 'Afaan Oromoo' },
      { code: 'en', name: 'English', native: 'English' },
    ],
    keyRegions: ['Oromia - Sheger City Periphery', 'Tigray - Mekelle Outskirts', 'Amhara - Bahir Dar Agro-Hub', 'Sidama - Hawassa Industrial Ring']
  },
  IR: {
    code: 'IR',
    name: 'Iran',
    nativeName: 'ایران',
    flag: '🇮🇷',
    currency: 'IRR (﷼)',
    population: '88 Million',
    urbanizationRate: 76.5,
    infrastructureDeficitIndex: 44.1,
    isFoundingBRICS: false,
    mapBounds: {
      minLat: 25.0,
      maxLat: 39.8,
      minLng: 44.0,
      maxLng: 63.3,
      centerLat: 32.4279,
      centerLng: 53.688,
      zoom: 5
    },
    languages: [
      { code: 'fa', name: 'Persian', native: 'فارسی' },
      { code: 'en', name: 'English', native: 'English' },
    ],
    keyRegions: ['Isfahan Water Basin', 'Khuzestan Desalination Belt', 'Tehran Southern Periphery']
  },
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    nativeName: 'الإمارات',
    flag: '🇦🇪',
    currency: 'AED (د.إ)',
    population: '9.9 Million',
    urbanizationRate: 87.5,
    infrastructureDeficitIndex: 14.2,
    isFoundingBRICS: false,
    mapBounds: {
      minLat: 22.6,
      maxLat: 26.1,
      minLng: 51.5,
      maxLng: 56.4,
      centerLat: 23.4241,
      centerLng: 53.8478,
      zoom: 7
    },
    languages: [
      { code: 'ar', name: 'Arabic', native: 'العربية' },
      { code: 'en', name: 'English', native: 'English' },
    ],
    keyRegions: ['Northern Emirates - Ras Al Khaimah Peri-urban', 'Fujairah Mountain Valleys', 'Al Ain Agricultural Zone']
  }
};

export const INITIAL_HOTSPOTS: HotspotCluster[] = [
  // India (IN) - Precise Geocoded Coordinates
  {
    id: 'hs-in-01',
    title: 'Bundelkhand Solar-Powered Piped Drinking Water Network',
    nation: 'IN',
    region: 'Uttar Pradesh - Bundelkhand',
    category: 'clean_water_sanitation',
    citizenDemandCount: 14820,
    urgencyScore: 94,
    coordinates: { lat: 25.4484, lng: 79.5685 }, // UP / Bundelkhand region
    demographicProfile: {
      vulnerablePopulationRatio: 0.68,
      avgIncomeBracket: '< $1,400 USD / yr',
      densityPerKm2: 340
    },
    infrastructureDeficitScore: 88,
    recommendedAction: 'Deploy decentralised solar desalination & gravity filtration piped network servicing 42 drought-prone village clusters.',
    estimatedBudgetUsdMillions: 42.5,
    ndbAlignment: 'Clean Water & Sustainable Infrastructure Window'
  },
  {
    id: 'hs-in-02',
    title: 'Patna Rural Flood Embankment & Drainage Channel',
    nation: 'IN',
    region: 'Bihar - Patna Rural',
    category: 'flood_climate_resilience',
    citizenDemandCount: 11450,
    urgencyScore: 91,
    coordinates: { lat: 25.5941, lng: 85.1376 }, // Patna, Bihar
    demographicProfile: {
      vulnerablePopulationRatio: 0.72,
      avgIncomeBracket: '< $1,200 USD / yr',
      densityPerKm2: 1800
    },
    infrastructureDeficitScore: 85,
    recommendedAction: 'Construct elevated concrete retention levees and solar drainage pumps connecting Punpun and Ganga basins.',
    estimatedBudgetUsdMillions: 38.0,
    ndbAlignment: 'Climate Adaptation & Flood Protection Facility'
  },
  {
    id: 'hs-in-03',
    title: 'Vidarbha Farmer Solar Microgrid & Drip Irrigation',
    nation: 'IN',
    region: 'Maharashtra - Vidarbha',
    category: 'renewable_energy_grid',
    citizenDemandCount: 9800,
    urgencyScore: 87,
    coordinates: { lat: 21.1458, lng: 79.0882 }, // Nagpur / Vidarbha
    demographicProfile: {
      vulnerablePopulationRatio: 0.64,
      avgIncomeBracket: '$1,600 USD / yr',
      densityPerKm2: 260
    },
    infrastructureDeficitScore: 79,
    recommendedAction: 'Install 12MW agricultural solar microgrid with automated smart metering for cotton farmer cooperatives.',
    estimatedBudgetUsdMillions: 27.5,
    ndbAlignment: 'Decentralized Clean Energy Access Target'
  },
  {
    id: 'hs-in-04',
    title: 'Bengaluru Peri-Urban Transit Feeder & Wastewater Recycling',
    nation: 'IN',
    region: 'Karnataka - Bengaluru Outer Ring',
    category: 'transit_transportation',
    citizenDemandCount: 8200,
    urgencyScore: 82,
    coordinates: { lat: 12.9716, lng: 77.5946 }, // Bengaluru, Karnataka
    demographicProfile: {
      vulnerablePopulationRatio: 0.45,
      avgIncomeBracket: '$3,800 USD / yr',
      densityPerKm2: 4300
    },
    infrastructureDeficitScore: 71,
    recommendedAction: 'Electrified feeder bus corridor connecting metro stations with industrial corridors and secondary sewage treatment plants.',
    estimatedBudgetUsdMillions: 54.0,
    ndbAlignment: 'Urban Mobility & Environmental Infrastructure'
  },

  // Brazil (BR)
  {
    id: 'hs-br-01',
    title: 'Baixada Fluminense Micro-Drainage & Stormwater Resilience',
    nation: 'BR',
    region: 'Rio de Janeiro - Baixada Fluminense',
    category: 'flood_climate_resilience',
    citizenDemandCount: 9340,
    urgencyScore: 89,
    coordinates: { lat: -22.7556, lng: -43.4603 }, // Baixada Fluminense, RJ
    demographicProfile: {
      vulnerablePopulationRatio: 0.59,
      avgIncomeBracket: '$3,200 USD / yr',
      densityPerKm2: 2800
    },
    infrastructureDeficitScore: 82,
    recommendedAction: 'Channel restoration, bioswales, and sensor-guided flood evacuation channels connecting Sarapuí Basin.',
    estimatedBudgetUsdMillions: 68.0,
    ndbAlignment: 'Environmental Protection & Urban Drainage Fund'
  },
  {
    id: 'hs-br-02',
    title: 'Bahia Sertão Decentralized Cisterns & Deep Well Solar Stations',
    nation: 'BR',
    region: 'Bahia - Semiárido',
    category: 'clean_water_sanitation',
    citizenDemandCount: 7650,
    urgencyScore: 86,
    coordinates: { lat: -12.9714, lng: -38.5014 }, // Bahia
    demographicProfile: {
      vulnerablePopulationRatio: 0.65,
      avgIncomeBracket: '$2,100 USD / yr',
      densityPerKm2: 140
    },
    infrastructureDeficitScore: 84,
    recommendedAction: 'Rainwater harvesting cistern complexes and brackish groundwater reverse-osmosis desalination units.',
    estimatedBudgetUsdMillions: 31.0,
    ndbAlignment: 'Rural Water Security & Climate Resilience'
  },

  // Russia (RU)
  {
    id: 'hs-ru-01',
    title: 'Irkutsk Siberian District Biomass & Electric Heating Grid Upgrade',
    nation: 'RU',
    region: 'Siberia - Irkutsk Thermal Hub',
    category: 'renewable_energy_grid',
    citizenDemandCount: 6540,
    urgencyScore: 88,
    coordinates: { lat: 52.287, lng: 104.305 }, // Irkutsk
    demographicProfile: {
      vulnerablePopulationRatio: 0.42,
      avgIncomeBracket: '$4,100 USD / yr',
      densityPerKm2: 85
    },
    infrastructureDeficitScore: 78,
    recommendedAction: 'Modernize aging coal boilers with high-efficiency pellet biomass combined heat-and-power units for sub-zero resilience.',
    estimatedBudgetUsdMillions: 45.0,
    ndbAlignment: 'Energy Efficiency & Arctic Urban Sustainability'
  },

  // China (CN)
  {
    id: 'hs-cn-01',
    title: 'Guizhou Karst Mountain Piped Water & Rural Cold Storage Logistics',
    nation: 'CN',
    region: 'Guizhou - Mountain Eco-Belt',
    category: 'clean_water_sanitation',
    citizenDemandCount: 13200,
    urgencyScore: 85,
    coordinates: { lat: 26.647, lng: 106.630 }, // Guiyang, Guizhou
    demographicProfile: {
      vulnerablePopulationRatio: 0.38,
      avgIncomeBracket: '$4,500 USD / yr',
      densityPerKm2: 240
    },
    infrastructureDeficitScore: 68,
    recommendedAction: 'High-elevation water booster lift pumps and smart logistics chilling hubs for regional agricultural revitalization.',
    estimatedBudgetUsdMillions: 52.0,
    ndbAlignment: 'Rural Revitalization & Mountain Infrastructure'
  },

  // South Africa (ZA)
  {
    id: 'hs-za-01',
    title: 'Diepsloot Township Solar Hybrid Microgrid & Street Lighting',
    nation: 'ZA',
    region: 'Gauteng - Soweto & Diepsloot',
    category: 'renewable_energy_grid',
    citizenDemandCount: 11200,
    urgencyScore: 91,
    coordinates: { lat: -25.9333, lng: 28.0167 }, // Diepsloot, Gauteng
    demographicProfile: {
      vulnerablePopulationRatio: 0.74,
      avgIncomeBracket: '$2,100 USD / yr',
      densityPerKm2: 4100
    },
    infrastructureDeficitScore: 85,
    recommendedAction: 'Community-owned 8MW rooftop/canopy solar + lithium storage microgrid countering Stage 6 loadshedding.',
    estimatedBudgetUsdMillions: 29.5,
    ndbAlignment: 'Decentralized Clean Energy Access Target'
  },
  {
    id: 'hs-za-02',
    title: 'OR Tambo District Rural Water Reticulation & Bridge Access',
    nation: 'ZA',
    region: 'Eastern Cape - OR Tambo District',
    category: 'clean_water_sanitation',
    citizenDemandCount: 8400,
    urgencyScore: 89,
    coordinates: { lat: -31.5833, lng: 28.7833 }, // Eastern Cape
    demographicProfile: {
      vulnerablePopulationRatio: 0.79,
      avgIncomeBracket: '$1,700 USD / yr',
      densityPerKm2: 110
    },
    infrastructureDeficitScore: 88,
    recommendedAction: 'All-weather pedestrian crossing bridges over flood-prone river crossings and piped spring catchments.',
    estimatedBudgetUsdMillions: 22.0,
    ndbAlignment: 'Rural Connectivity & Basic Infrastructure'
  },

  // Egypt (EG)
  {
    id: 'hs-eg-01',
    title: 'Upper Egypt Asyut Mobile Health Screening & Primary Clinic Hubs',
    nation: 'EG',
    region: 'Upper Egypt - Asyut Corridor',
    category: 'healthcare_clinic',
    citizenDemandCount: 7850,
    urgencyScore: 84,
    coordinates: { lat: 27.1809, lng: 31.1837 }, // Asyut, Egypt
    demographicProfile: {
      vulnerablePopulationRatio: 0.62,
      avgIncomeBracket: '$1,800 USD / yr',
      densityPerKm2: 950
    },
    infrastructureDeficitScore: 76,
    recommendedAction: 'Construct 6 solarized primary diagnostic health centers with telemedicine links to Cairo university hospitals.',
    estimatedBudgetUsdMillions: 18.2,
    ndbAlignment: 'Social Infrastructure & Universal Health Security'
  },

  // Ethiopia (ET)
  {
    id: 'hs-et-01',
    title: 'Sheger City Ring Agro-Logistics Road & Cold Storage Access',
    nation: 'ET',
    region: 'Oromia - Sheger City Periphery',
    category: 'transit_transportation',
    citizenDemandCount: 8900,
    urgencyScore: 87,
    coordinates: { lat: 9.0300, lng: 38.7400 }, // Addis / Sheger, Ethiopia
    demographicProfile: {
      vulnerablePopulationRatio: 0.71,
      avgIncomeBracket: '$1,100 USD / yr',
      densityPerKm2: 1200
    },
    infrastructureDeficitScore: 91,
    recommendedAction: 'All-weather feeder roads linking smallholder farmers directly to railway hubs with solar milk/vegetable chillers.',
    estimatedBudgetUsdMillions: 34.0,
    ndbAlignment: 'Agricultural Value Chain & Rural Connectivity'
  }
];

export const INITIAL_CITIZEN_REQUESTS: CitizenRequest[] = [
  {
    nation: 'IN',
    region: 'Uttar Pradesh - Bundelkhand',
    channel: 'voice',
    citizenName: 'Sunita Devi (Gram Panchayat)',
    isAnonymous: false,
    originalLanguage: 'hi',
    originalText: 'हमारे गांव महोबा के तीन टोलों में पिछले चार महीने से हैंडपंप सूख चुके हैं। महिलाओं को 4 किलोमीटर दूर जाकर पानी लाना पड़ता है। क्या पंचायत में सोलर पंप योजना शुरू हो सकती है?',
    translatedEnglishText: 'In our Mahoba village, handpumps have been dry for the last 4 months across 3 hamlets. Women walk 4 km for drinking water. Can a solar-powered piped water scheme be sanctioned immediately?',
    category: 'clean_water_sanitation',
    urgency: 'critical',
    sentimentScore: -0.78,
    impactEstimateCitizens: 2400,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'hotspot_clustered',
    verificationStatus: {
      isValidCivicIssue: true,
      verificationReason: 'Verified against Jal Jeevan Mission deficit reports and Bundelkhand groundwater depletion records.',
      groundedInPrecedent: true,
      confidenceScore: 0.94
    },
    upvotes: 412
  },
  {
    nation: 'IN',
    region: 'Bihar - Patna Rural',
    channel: 'whatsapp',
    citizenName: 'Rameshwar Yadav',
    isAnonymous: false,
    originalLanguage: 'hi',
    originalText: 'पुनपुन नदी के किनारे वाले तटबंध में दरार आ गई है। बारिश के मौसम में खेत और घर डूबने की पूरी संभावना है। कृपा करके त्वरित मरम्मत कराई जाए।',
    translatedEnglishText: 'Fissures have appeared along the Punpun river embankment. In the upcoming monsoon, our agricultural fields and settlements will flood completely. Urgent repair is requested.',
    category: 'flood_climate_resilience',
    urgency: 'critical',
    sentimentScore: -0.82,
    impactEstimateCitizens: 3800,
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'hotspot_clustered',
    verificationStatus: {
      isValidCivicIssue: true,
      verificationReason: 'Corroborated with Bihar State Disaster Management Authority historical flood risk maps.',
      groundedInPrecedent: true,
      confidenceScore: 0.91
    },
    upvotes: 310
  },
  {
    nation: 'BR',
    region: 'Rio de Janeiro - Baixada Fluminense',
    channel: 'whatsapp',
    citizenName: 'Carlos Eduardo',
    isAnonymous: false,
    originalLanguage: 'pt',
    originalText: 'Toda chuva forte o canal da Rua São Bento transborda e invade as casas e a creche comunitária. Precisamos urgente de dragagem e bueiros com contenção.',
    translatedEnglishText: 'Every heavy rain the São Bento street channel overflows and floods homes and the community nursery. We urgently need canal dredging and stormwater retention basins.',
    category: 'flood_climate_resilience',
    urgency: 'high',
    sentimentScore: -0.65,
    impactEstimateCitizens: 5800,
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'hotspot_clustered',
    verificationStatus: {
      isValidCivicIssue: true,
      verificationReason: 'Matched with Rio de Janeiro municipal drainage deficit registry.',
      groundedInPrecedent: true,
      confidenceScore: 0.88
    },
    upvotes: 289
  },
  {
    nation: 'ZA',
    region: 'Gauteng - Soweto & Diepsloot',
    channel: 'telegram',
    citizenName: 'Thabo Mthembu',
    isAnonymous: true,
    originalLanguage: 'zu',
    originalText: 'Kule nyanga sekuphele amasonto amabili singenagesi. Izingane azikwazi ukufunda ebusuku, futhi izitolo zokudla zilahlekelwa yinyama yonke efrijini.',
    translatedEnglishText: 'It has been two full weeks without power this month. Children cannot study after dark, and local spaza shops have lost all refrigerated food due to transformer failure.',
    category: 'renewable_energy_grid',
    urgency: 'critical',
    sentimentScore: -0.85,
    impactEstimateCitizens: 8500,
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: 'policy_matched',
    verificationStatus: {
      isValidCivicIssue: true,
      verificationReason: 'Verified with Eskom loadshedding logs and Gauteng informal settlement electrification backlog.',
      groundedInPrecedent: true,
      confidenceScore: 0.96
    },
    upvotes: 670
  }
];
