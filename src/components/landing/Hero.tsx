export function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:py-10">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clinical">
          HackIAthon Reto 3
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-ink sm:text-5xl lg:text-6xl">
          Copago AI
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
          Estima cobertura, copago y hospital recomendado para pacientes demo
          con una experiencia conversacional clara y verificable.
        </p>
      </div>

      <div className="grid gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:min-w-72">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-slate-600">Demo publica</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-clinical">
            Activa
          </span>
        </div>
        <a
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2"
          href="#demo"
        >
          Probar demo
        </a>
      </div>
    </section>
  );
}
