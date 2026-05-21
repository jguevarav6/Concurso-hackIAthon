import { HospitalCard } from "@/components/results/HospitalCard";

export function HospitalRanking() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-semibold text-ink">Ranking de hospitales</h2>
      <div className="mt-3">
        <HospitalCard />
      </div>
    </section>
  );
}
