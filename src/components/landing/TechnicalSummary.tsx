const stack = ["Next.js", "React", "TypeScript", "TailwindCSS", "Prisma", "MySQL", "OpenAI", "Vercel"];

export function TechnicalSummary() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      <h2 className="text-2xl font-semibold text-ink">Resumen tecnico</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {stack.map((item) => (
          <span key={item} className="rounded-full bg-white px-3 py-1 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
