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

export function buildMockResponse(message: string, patient: DemoPatient): AgentResponse {
  const normalized = message.toLowerCase();
  const isEmergency =
    normalized.includes("respirar") ||
    normalized.includes("dolor fuerte") ||
    normalized.includes("desmayo") ||
    normalized.includes("sangrado");
  const isSkin = normalized.includes("piel") || normalized.includes("manchas") || normalized.includes("picazon");
  const isTrauma = normalized.includes("rodilla") || normalized.includes("caida") || normalized.includes("golpe");
  const isGastro = normalized.includes("estomago") || normalized.includes("vomito") || normalized.includes("diarrea");

  const specialty = isEmergency
    ? { id: 5, name: "Emergencias", slug: "emergencias", urgencyLevel: "high" as const }
    : isSkin
      ? { id: 2, name: "Dermatologia", slug: "dermatologia", urgencyLevel: "low" as const }
      : isTrauma
        ? { id: 3, name: "Traumatologia", slug: "traumatologia", urgencyLevel: "medium" as const }
        : isGastro
          ? { id: 4, name: "Gastroenterologia", slug: "gastroenterologia", urgencyLevel: "low" as const }
          : { id: 1, name: "Cardiologia", slug: "cardiologia", urgencyLevel: "medium" as const };

  const coveragePercent = patient.planLevel === "Premium" ? 85 : patient.planLevel === "Plus" ? 70 : 50;
  const fixedCopay = patient.planLevel === "Premium" ? 30 : null;
  const deductible = patient.planLevel === "Premium" ? 100 : patient.planLevel === "Plus" ? 180 : 250;

  const hospitals = [
    { id: 1, name: "Hospital Metropolitano", city: "Quito", basePrice: 120, networkLevel: "premium" },
    { id: 2, name: "Clinica Central", city: "Quito", basePrice: 90, networkLevel: "plus" },
    { id: 3, name: "Hospital del Valle", city: "Quito", basePrice: 75, networkLevel: "plus" },
    { id: 4, name: "Centro Medico Familiar", city: "Guayaquil", basePrice: 45, networkLevel: "basico" }
  ].map((hospital) => {
    const variableCopay = hospital.basePrice * (1 - coveragePercent / 100);
    const estimatedCopay = fixedCopay == null ? variableCopay : Math.min(fixedCopay, variableCopay);

    return {
      ...hospital,
      estimatedCopay: Math.round(estimatedCopay * 100) / 100
    };
  }).sort((a, b) => a.estimatedCopay - b.estimatedCopay);

  const recommended = hospitals[0] ?? null;
  const urgencyText = specialty.urgencyLevel === "high" ? "Por los sintomas alarmantes, prioriza atencion inmediata." : "Esta es una orientacion administrativa para estimar cobertura.";

  return {
    reply: `${urgencyText} La especialidad sugerida es ${specialty.name}. Para ${patient.planName}, el hospital mas conveniente es ${recommended?.name ?? "no disponible"} con copago estimado de $${recommended?.estimatedCopay.toFixed(2) ?? "0.00"}.`,
    specialty,
    coverage: {
      planName: patient.planName,
      coveragePercent,
      fixedCopay,
      deductible
    },
    recommendedHospital: recommended,
    hospitalRanking: hospitals,
    agentTrace: [
      "Sintomas clasificados",
      "Cobertura consultada en datos demo",
      "Copago calculado",
      "Hospital recomendado",
      "Respuesta compuesta"
    ]
  };
}

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
