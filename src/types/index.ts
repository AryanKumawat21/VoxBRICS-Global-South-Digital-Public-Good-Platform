export type BRICSNationCode = 'BR' | 'RU' | 'IN' | 'CN' | 'ZA' | 'EG' | 'ET' | 'IR' | 'AE' | 'SA';

export type AppTheme = 'dark' | 'light' | 'brics_gold';

export interface BRICSNation {
  code: BRICSNationCode;
  name: string;
  nativeName: string;
  flag: string;
  currency: string;
  population: string;
  urbanizationRate: number; // percentage
  infrastructureDeficitIndex: number; // 0 - 100
  isFoundingBRICS?: boolean;
  mapBounds: {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
    centerLat: number;
    centerLng: number;
    zoom: number;
  };
  languages: { code: string; name: string; native: string }[];
  keyRegions: string[];
}

export type SubmissionChannel = 'voice' | 'whatsapp' | 'sms' | 'telegram' | 'web_portal';

export type RequestCategory = 
  | 'clean_water_sanitation'
  | 'renewable_energy_grid'
  | 'transit_transportation'
  | 'healthcare_clinic'
  | 'education_digital_learning'
  | 'flood_climate_resilience'
  | 'waste_management'
  | 'affordable_housing'
  | 'civic_amenity';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical' | 'invalid_spam';

export interface CitizenRequest {
  id?: string;
  citizenName?: string;
  userId?: string; // Link to user profile
  isAnonymous: boolean;
  nation: BRICSNationCode;
  region: string;
  channel: SubmissionChannel;
  originalLanguage: string;
  originalText: string;
  translatedEnglishText?: string;
  category: RequestCategory;
  urgency: UrgencyLevel;
  audioUrl?: string;
  hasAudioTranscription?: boolean;
  geocodedLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  sentimentScore?: number; // -1 to 1
  impactEstimateCitizens?: number;
  timestamp: any;
  status: 'pending_review' | 'hotspot_clustered' | 'policy_matched' | 'investment_ready' | 'flagged_invalid';
  verificationStatus?: {
    isValidCivicIssue: boolean;
    verificationReason: string;
    groundedInPrecedent: boolean;
    confidenceScore: number;
  };
  upvotes?: number;
  verifiedLocalId?: string;
}

export interface HotspotCluster {
  id: string;
  title: string;
  nation: BRICSNationCode;
  region: string;
  category: RequestCategory;
  citizenDemandCount: number;
  urgencyScore: number; // 1-100
  coordinates: { lat: number; lng: number }; // True geographic coordinates
  demographicProfile: {
    vulnerablePopulationRatio: number; // 0-1
    avgIncomeBracket: string;
    densityPerKm2: number;
  };
  infrastructureDeficitScore: number; // 0-100
  recommendedAction: string;
  estimatedBudgetUsdMillions: number;
  ndbAlignment: string; // New Development Bank priority alignment
}

export interface PredictiveTrendPoint {
  year: number;
  demandIntensity: number; // 0 - 100
  populationGrowthPct: number;
  climateRiskFactor: number; // 0 - 100
  waterStressLevel: number; // 0 - 100
  projectedCostPerBeneficiaryUsd: number;
}
