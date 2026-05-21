import { MapPin, ShieldCheck } from "lucide-react";
import type { DemoPatient } from "@/lib/mock/demoData";

type PatientSelectorProps = {
  patients: DemoPatient[];
  selectedPatientId: number;
  onChange: (patientId: number) => void;
};

export function PatientSelector({ patients, selectedPatientId, onChange }: PatientSelectorProps) {
  const selectedPatient =
    patients.find((patient) => patient.id === selectedPatientId) ?? patients[0];

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
        value={selectedPatientId}
        onChange={(event) => onChange(Number(event.target.value))}
      >
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.fullName}
          </option>
        ))}
      </select>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Ciudad</p>
          <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-ink">
            <MapPin className="size-4 text-clinical" />
            {selectedPatient.city}
          </p>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Plan</p>
          <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-ink">
            <ShieldCheck className="size-4 text-clinical" />
            {selectedPatient.planName}
          </p>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Edad</p>
          <p className="mt-1 text-sm font-semibold text-ink">{selectedPatient.age} anos</p>
        </div>
      </div>
    </section>
  );
}
