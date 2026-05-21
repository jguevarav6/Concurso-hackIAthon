const trace = ["Esperando sintomas", "Cobertura pendiente", "Copago pendiente"];

export function AgentTrace() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">Trazabilidad</h2>
      <ol className="mt-3 space-y-3 text-sm text-slate-600">
        {trace.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span className="size-2 rounded-full bg-slate-300" />
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
