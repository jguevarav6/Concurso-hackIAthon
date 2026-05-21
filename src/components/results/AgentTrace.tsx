import { Check, Circle, Loader2 } from "lucide-react";
import type { TraceStep } from "@/lib/mock/demoData";

type AgentTraceProps = {
  steps: TraceStep[];
};

export function AgentTrace({ steps }: AgentTraceProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">Trazabilidad</h2>
      <ol className="mt-3 space-y-3 text-sm text-slate-600">
        {steps.map((step) => (
          <li key={step.label} className="flex gap-3 rounded-md bg-slate-50 p-3">
            <span className="mt-0.5 text-clinical">
              {step.status === "done" ? (
                <Check className="size-4" />
              ) : step.status === "active" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Circle className="size-4 text-slate-300" />
              )}
            </span>
            <span>
              <span className="block font-semibold text-ink">{step.label}</span>
              <span className="mt-1 block text-xs leading-5 text-slate-600">{step.description}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
