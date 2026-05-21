import type { ReactNode } from "react";
import { AlertTriangle, BadgeDollarSign, HeartPulse, ShieldCheck } from "lucide-react";
import type { CoverageResult, SpecialtyResult } from "@/types/agent";

type CoveragePanelProps = {
  coverage: CoverageResult;
  specialty: SpecialtyResult | null;
};

export function CoveragePanel({ coverage, specialty }: CoveragePanelProps) {
  const urgencyClass =
    specialty?.urgencyLevel === "high"
      ? "bg-red-50 text-danger"
      : specialty?.urgencyLevel === "medium"
        ? "bg-amber-50 text-caution"
        : "bg-emerald-50 text-clinical";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">Cobertura</h2>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${coverage ? "bg-emerald-50 text-clinical" : "bg-slate-100 text-slate-600"}`}>
          {coverage ? "Calculada" : "Pendiente"}
        </span>
      </div>

      {coverage && specialty ? (
        <div className="mt-4 space-y-3">
          <div className="rounded-md bg-slate-50 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <HeartPulse className="size-4 text-clinical" />
              {specialty.name}
            </p>
            <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${urgencyClass}`}>
              Urgencia {specialty.urgencyLevel}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <Metric icon={<ShieldCheck className="size-4" />} label="Plan" value={coverage.planName} />
            <Metric icon={<BadgeDollarSign className="size-4" />} label="Cobertura" value={`${coverage.coveragePercent}%`} />
            <Metric icon={<AlertTriangle className="size-4" />} label="Deducible" value={`$${coverage.deductible}`} />
          </div>

          <p className="rounded-md bg-amber-50 p-3 text-xs leading-5 text-amber-800">
            Copago estimado. La validacion final depende del hospital o aseguradora.
          </p>
        </div>
      ) : (
        <div className="mt-4 rounded-md bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">Sin estimacion todavia</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            La cobertura aparecera cuando el agente procese sintomas y paciente.
          </p>
        </div>
      )}
    </section>
  );
}

function Metric({
  icon,
  label,
  value
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-3">
      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        <span className="text-clinical">{icon}</span>
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
