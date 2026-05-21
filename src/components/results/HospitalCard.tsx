export function HospitalCard() {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-ink">Hospital recomendado</h3>
          <p className="mt-1 text-sm text-slate-600">Pendiente de calculo</p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
          Demo
        </span>
      </div>
    </article>
  );
}
