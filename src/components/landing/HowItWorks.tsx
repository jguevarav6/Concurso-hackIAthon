const steps = [
  "Clasifica sintomas",
  "Consulta cobertura",
  "Calcula copago",
  "Ordena hospitales",
  "Compone respuesta"
];

export function HowItWorks() {
  return (
    <section id="flujo" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clinical">
            Automatizacion
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">Flujo de subagentes</h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-slate-600">
          Cada paso separa interpretacion, cobertura, calculo y recomendacion.
        </p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <div key={step} className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
            <span className="mb-3 inline-flex size-7 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-clinical">
              {index + 1}
            </span>
            {step}
          </div>
        ))}
      </div>
    </section>
  );
}
