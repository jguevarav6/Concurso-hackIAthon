import { HospitalCard } from "@/components/results/HospitalCard";
import type { HospitalRecommendation } from "@/types/agent";

type HospitalRankingProps = {
  ranking: HospitalRecommendation[];
  recommendedHospital: HospitalRecommendation | null;
};

export function HospitalRanking({ ranking, recommendedHospital }: HospitalRankingProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">Ranking de hospitales</h2>
        <span className="text-xs text-slate-500">Menor copago</span>
      </div>
      {ranking.length > 0 ? (
        <div className="mt-3 space-y-3">
          {ranking.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              isRecommended={hospital.id === recommendedHospital?.id}
            />
          ))}
        </div>
      ) : (
        <div className="mt-3 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          El ranking aparecera cuando exista una estimacion.
        </div>
      )}
    </section>
  );
}
