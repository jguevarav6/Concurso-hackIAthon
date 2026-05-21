import type { UrgencyLevel } from "@/types/agent";

export type SymptomClassification = {
  specialtySlug: string;
  urgencyLevel: UrgencyLevel;
  reasoning: string;
};

export async function symptomAgent(message: string): Promise<SymptomClassification> {
  return classifyByKeywords(message);
}

function classifyByKeywords(message: string): SymptomClassification {
  const text = message.toLowerCase();

  if (matches(text, ["respirar", "desmayo", "sangrado", "emergencia", "dolor fuerte"])) {
    return { specialtySlug: "emergencias", urgencyLevel: "high", reasoning: "Sintoma alarmante" };
  }

  if (matches(text, ["pecho", "palpitaciones", "corazon"])) {
    return { specialtySlug: "cardiologia", urgencyLevel: "medium", reasoning: "Sintomas cardiovasculares" };
  }

  if (matches(text, ["piel", "manchas", "picazon", "sarpullido"])) {
    return { specialtySlug: "dermatologia", urgencyLevel: "low", reasoning: "Sintomas de piel" };
  }

  if (matches(text, ["rodilla", "fractura", "golpe", "caida", "hueso"])) {
    return { specialtySlug: "traumatologia", urgencyLevel: "medium", reasoning: "Sintomas musculoesqueleticos" };
  }

  if (matches(text, ["estomago", "vomito", "diarrea", "gastritis"])) {
    return { specialtySlug: "gastroenterologia", urgencyLevel: "low", reasoning: "Sintomas digestivos" };
  }

  return { specialtySlug: "emergencias", urgencyLevel: "medium", reasoning: "Sintomas ambiguos" };
}

function matches(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}
