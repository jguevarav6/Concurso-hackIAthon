export function PatientSelector() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-sm font-semibold text-ink" htmlFor="patient">
          Paciente demo
        </label>
        <span className="text-xs text-slate-500">Datos de prueba</span>
      </div>
      <select
        id="patient"
        className="mt-3 min-h-11 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-clinical focus:ring-2 focus:ring-clinical/20"
      >
        <option>Paciente Demo Premium</option>
      </select>
    </section>
  );
}
