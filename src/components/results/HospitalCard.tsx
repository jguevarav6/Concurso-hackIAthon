import { MapPin } from "lucide-react";
import type { HospitalRecommendation } from "@/types/agent";

type HospitalCardProps = {
  hospital: HospitalRecommendation;
  isRecommended?: boolean;
};

export function HospitalCard({ hospital, isRecommended = false }: HospitalCardProps) {
  return (
    <article className={`rounded-lg border p-4 ${isRecommended ? "border-clinical bg-emerald-50/60" : "border-slate-200 bg-slate-50"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-ink">{hospital.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
            <MapPin className="size-4 text-clinical" />
            {hospital.city}
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-clinical ring-1 ring-emerald-100">
          ${hospital.estimatedCopay.toFixed(2)}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
        <span>Precio base: ${hospital.basePrice}</span>
        <span className="text-right capitalize">Red {hospital.networkLevel}</span>
      </div>
    </article>
  );
}
