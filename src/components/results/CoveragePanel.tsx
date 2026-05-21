export function CoveragePanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">Cobertura</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          Pendiente
        </span>
      </div>
      <div className="mt-4 rounded-md bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-700">Sin estimacion todavia</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          La cobertura aparecera cuando el agente procese sintomas y paciente.
        </p>
      </div>
    </section>
  );
}
