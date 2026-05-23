import type { AgentResponse } from "@/types/agent";
import type { PatientSummary } from "@/types/database";

export type DemoPatient = PatientSummary & {
  age: number;
  planName: string;
  planLevel: "Basico" | "Plus" | "Premium";
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type TraceStepStatus = "pending" | "active" | "done";

export type TraceStep = {
  label: string;
  description: string;
  status: TraceStepStatus;
};

export const demoPatients: DemoPatient[] = [
  {
    id: 1,
    fullName: "Paciente Demo Basico",
    documentNumber: "0102030405",
    city: "Guayaquil",
    age: 34,
    planName: "Plan Basico",
    planLevel: "Basico"
  },
  {
    id: 2,
    fullName: "Paciente Demo Plus",
    documentNumber: "0203040506",
    city: "Quito",
    age: 41,
    planName: "Plan Plus",
    planLevel: "Plus"
  },
  {
    id: 3,
    fullName: "Paciente Demo Premium",
    documentNumber: "0304050607",
    city: "Quito",
    age: 29,
    planName: "Plan Premium",
    planLevel: "Premium"
  }
];

export const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Selecciona un paciente demo y escribe sintomas. Te mostrare especialidad, cobertura estimada, ranking de hospitales y trazabilidad."
  }
];

export const examplePrompts = [
  "Tengo dolor fuerte en el pecho y me cuesta respirar",
  "Tengo manchas rojas en la piel y mucha picazon",
  "Me cai y me duele mucho la rodilla",
  "Tengo dolor de estomago y vomito desde ayer"
];

export const emptyTrace: TraceStep[] = [
  { label: "Sintomas", description: "Esperando mensaje del paciente", status: "pending" },
  { label: "Cobertura", description: "Pendiente de consulta", status: "pending" },
  { label: "Copago", description: "Pendiente de calculo", status: "pending" },
  { label: "Hospital", description: "Pendiente de ranking", status: "pending" },
  { label: "Respuesta", description: "Pendiente de composicion", status: "pending" }
];

export function buildCompletedTrace(response: AgentResponse): TraceStep[] {
  return [
    {
      label: "Sintomas",
      description: response.specialty ? `${response.specialty.name} (${response.specialty.urgencyLevel})` : "Sin clasificacion",
      status: "done"
    },
    {
      label: "Cobertura",
      description: response.coverage ? `${response.coverage.planName}, ${response.coverage.coveragePercent}%` : "Sin cobertura",
      status: "done"
    },
    {
      label: "Copago",
      description: response.recommendedHospital ? `$${response.recommendedHospital.estimatedCopay.toFixed(2)} estimado` : "No calculado",
      status: "done"
    },
    {
      label: "Hospital",
      description: response.recommendedHospital?.name ?? "Sin recomendacion",
      status: "done"
    },
    {
      label: "Respuesta",
      description: "Lista para mostrar al paciente",
      status: "done"
    }
  ];
}
