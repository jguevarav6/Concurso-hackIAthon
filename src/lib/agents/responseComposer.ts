import type { AgentResponse } from "@/types/agent";

export function responseComposer(response: Omit<AgentResponse, "reply">): string {
  if (!response.specialty) {
    return "No se pudo clasificar la especialidad con la informacion recibida.";
  }

  if (!response.recommendedHospital) {
    return `La especialidad sugerida es ${response.specialty.name}, pero no hay hospitales disponibles para estimar copago.`;
  }

  return `La especialidad sugerida es ${response.specialty.name}. El hospital mas conveniente es ${response.recommendedHospital.name} con copago estimado de ${response.recommendedHospital.estimatedCopay}.`;
}
