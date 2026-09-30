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
      maxLat: 82.0,
      minLng: 19.0,
      maxLng: 169.0,
      centerLat: 61.524,
      centerLng: 105.3188,
      zoom: 3
    },
    languages: [
      { code: 'ru', name: 'Russian', native: 'Русский' },
      { code: 'en', name: 'English', native: 'English' },
    ],
    keyRegions: ['Siberia - Irkutsk Thermal Hub', 'Urals - Yekaterinburg Industrial', 'Volga - Samara Transit Corridor', 'Far East - Vladivostok Port Ring']
  },
  CN: {
    code: 'CN',
    name: 'China',
    nativeName: '中国',
    flag: '🇨🇳',
    currency: 'CNY (¥)',
    population: '1.41 Billion',
    urbanizationRate: 65.2,
    infrastructureDeficitIndex: 28.4,
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
      { code: 'zh', name: 'Mandarin', native: '中文' },
      { code: 'en', name: 'English', native: 'English' },
    ],
    keyRegions: ['Guizhou - Mountain Eco-Belt', 'Sichuan - Chengdu Peri-Urban', 'Henan - Central Food Logistics', 'Yunnan - Border Transit Corridor']
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
    coordinates: { lat: 25.4484, lng: 79.5685 },
    demographicProfile: {
      vulnerablePopulationRatio: 0.68,
      avgIncomeBracket: '$1,200 USD / yr',
      densityPerKm2: 340
    },
    infrastructureDeficitScore: 91,
    recommendedAction: 'Deploy 45 decentralised solar groundwater pumping stations with multi-stage reverse osmosis filtration units in drought-prone gram panchayats.',
    estimatedBudgetUsdMillions: 38.4,
    ndbAlignment: 'NDB Clean Water & Sustainable Sanitation Mandate'
  },
  {
    id: 'hs-in-02',
    title: 'Patna Rural Flood Embankment & Sensor Alert Drainage',
    nation: 'IN',
    region: 'Bihar - Patna Rural',
    category: 'flood_climate_resilience',
    citizenDemandCount: 11450,
    urgencyScore: 92,
    coordinates: { lat: 25.5941, lng: 85.1376 },
    demographicProfile: {
      vulnerablePopulationRatio: 0.72,
      avgIncomeBracket: '$980 USD / yr',
      densityPerKm2: 1850
    },
    infrastructureDeficitScore: 88,
    recommendedAction: 'Construct reinforced retention dykes with IoT water-level sensor arrays linked to state disaster mitigation early warning nodes.',
    estimatedBudgetUsdMillions: 46.2,
    ndbAlignment: 'Climate Resilient Urban & River Basin Infrastructure'
  },
  {
    id: 'hs-in-03',
    title: 'Vidarbha Farmer Solar Microgrid & Agrivoltaic Feeder',
    nation: 'IN',
    region: 'Maharashtra - Vidarbha',
    category: 'renewable_energy_grid',
    citizenDemandCount: 9600,
    urgencyScore: 88,
    coordinates: { lat: 21.1458, lng: 79.0882 },
    demographicProfile: {
      vulnerablePopulationRatio: 0.54,
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
    coordinates: { lat: 12.9716, lng: 77.5946 },
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
    coordinates: { lat: -22.7556, lng: -43.4603 },
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

  // South Africa (ZA)
  {
    id: 'hs-za-01',
    title: 'Diepsloot Township Solar Hybrid Microgrid & Street Lighting',
    nation: 'ZA',
    region: 'Gauteng - Soweto & Diepsloot',
    category: 'renewable_energy_grid',
    citizenDemandCount: 11200,
    urgencyScore: 91,
    coordinates: { lat: -25.9333, lng: 28.0167 },
    demographicProfile: {
      vulnerablePopulationRatio: 0.74,
      avgIncomeBracket: '$2,100 USD / yr',
      densityPerKm2: 4100
    },
    infrastructureDeficitScore: 85,
    recommendedAction: 'Community-owned 8MW rooftop/canopy solar + lithium storage microgrid countering Stage 6 loadshedding.',
    estimatedBudgetUsdMillions: 29.5,
    ndbAlignment: 'Decentralized Clean Energy Access Target'
  }
];

export const INITIAL_CITIZEN_REQUESTS: CitizenRequest[] = [
  {
    id: 'req-init-01',
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
    geocodedLocation: {
      lat: 25.4484,
      lng: 79.5685,
      address: 'Mahoba Gram Panchayat, Bundelkhand, Uttar Pradesh'
    },
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
    id: 'req-init-02',
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
    geocodedLocation: {
      lat: 25.5941,
      lng: 85.1376,
      address: 'Punpun River Embankment, Patna Rural, Bihar'
    },
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
    id: 'req-init-03',
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
    geocodedLocation: {
      lat: -22.7556,
      lng: -43.4603,
      address: 'Rua São Bento, Baixada Fluminense, Rio de Janeiro'
    },
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
    id: 'req-init-04',
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
    geocodedLocation: {
      lat: -25.9333,
      lng: 28.0167,
      address: 'Diepsloot Extension 2, Gauteng, South Africa'
    },
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
