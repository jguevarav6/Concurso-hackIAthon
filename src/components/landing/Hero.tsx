export function Hero() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end lg:py-12">
      <div className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clinical">
          HackIAthon Reto 3
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
          Copago AI
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
          Agente conversacional para estimar cobertura, copago y hospital
          recomendado antes de una atencion medica.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-ink px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
            href="#demo"
          >
            Probar demo
          </a>
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-clinical hover:text-clinical focus:outline-none focus:ring-2 focus:ring-clinical/20"
            href="#flujo"
          >
            Ver flujo tecnico
          </a>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {["MySQL real", "Copago deterministico", "Respuestas con Gemini"].map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-white/80 px-4 py-3 shadow-sm">
              <p className="text-sm font-semibold text-ink">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <p className="text-sm font-semibold text-ink">Estado de la demo</p>
            <p className="mt-1 text-xs text-slate-500">MVP desplegado en Vercel</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-clinical">Activa</span>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-600">Entrada</span>
            <span className="text-sm font-medium text-ink">Sintomas</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-600">Motor</span>
            <span className="text-sm font-medium text-ink">Agentes + reglas</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-600">Salida</span>
            <span className="text-sm font-medium text-ink">Ranking hospitalario</span>
          </div>
        </div>
      </div>
    </section>
  );
}
