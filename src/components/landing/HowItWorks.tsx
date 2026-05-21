const steps = [
  "Clasifica sintomas",
  "Consulta cobertura",
  "Calcula copago",
  "Ordena hospitales",
  "Compone respuesta"
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-2xl font-semibold text-ink">Flujo de subagentes</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {steps.map((step) => (
          <div key={step} className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
            {step}
          </div>
        ))}
      </div>
    </section>
  );
}
