const stack = ["Next.js", "React", "TypeScript", "TailwindCSS", "Prisma", "MySQL", "Gemini AI", "Vercel"];

export function TechnicalSummary() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <div className="grid gap-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[0.8fr_1.2fr] lg:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clinical">
            Stack del MVP
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">Resumen tecnico</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Monolito modular con frontend, API routes, servicios y agentes internos en una sola base Next.js.
          </p>
        </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {stack.map((item) => (
          <span key={item} className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200">
            {item}
          </span>
        ))}
      </div>
      </div>
    </section>
  );
}
