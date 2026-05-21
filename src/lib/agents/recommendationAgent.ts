import type { HospitalRecommendation } from "@/types/agent";

export function recommendationAgent(ranking: HospitalRecommendation[]) {
  return ranking[0] ?? null;
}
