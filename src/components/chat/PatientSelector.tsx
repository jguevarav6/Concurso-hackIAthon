export function PatientSelector() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <label className="text-sm font-medium text-slate-700" htmlFor="patient">
        Paciente demo
      </label>
      <select id="patient" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2">
        <option>Paciente Demo Premium</option>
      </select>
    </section>
  );
}
