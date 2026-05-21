export type UrgencyLevel = "low" | "medium" | "high";

export type SpecialtyResult = {
  id: number;
  name: string;
  slug: string;
  urgencyLevel: UrgencyLevel;
};

export type CoverageResult = {
  planName: string;
  coveragePercent: number;
  fixedCopay?: number | null;
  deductible: number;
} | null;

export type HospitalRecommendation = {
  id: number;
  name: string;
  city: string;
  basePrice: number;
  estimatedCopay: number;
  networkLevel: string;
};

export type AgentResponse = {
  reply: string;
  specialty: SpecialtyResult | null;
  coverage: CoverageResult;
  recommendedHospital: HospitalRecommendation | null;
  hospitalRanking: HospitalRecommendation[];
  agentTrace: string[];
};
