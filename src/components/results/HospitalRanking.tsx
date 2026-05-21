import { HospitalCard } from "@/components/results/HospitalCard";

export function HospitalRanking() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">Ranking de hospitales</h2>
        <span className="text-xs text-slate-500">Menor copago</span>
      </div>
      <div className="mt-3">
        <HospitalCard />
      </div>
    </section>
  );
}
