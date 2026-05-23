import { NextResponse } from "next/server";
import { chatRequestSchema } from "@/lib/validators";
import { symptomAgent } from "@/lib/agents/symptomAgent";
import { generateReply } from "@/lib/gemini";
import { PLANS, HOSPITALS, SPECIALTY_MAP } from "@/lib/mock/catalogData";
import type { AgentResponse, HospitalRecommendation } from "@/types/agent";

function buildHospitalRanking(coveragePercent: number, fixedCopay: number | null): HospitalRecommendation[] {
  return HOSPITALS
    .map((hospital) => {
      const variableCopay = hospital.basePrice * (1 - coveragePercent / 100);
      const estimatedCopay = fixedCopay != null
        ? Math.min(fixedCopay, variableCopay)
        : variableCopay;
      return { ...hospital, estimatedCopay: Math.round(estimatedCopay * 100) / 100 };
    })
    .sort((hospitalA, hospitalB) => hospitalA.estimatedCopay - hospitalB.estimatedCopay);
}

function buildMedicalPrompt(
  message: string,
  plan: typeof PLANS[keyof typeof PLANS],
  specialtyName: string,
  urgencyLevel: string,
  topHospital: HospitalRecommendation
): string {
  return `Paciente con ${plan.planName}. Síntomas: "${message}".
Especialidad sugerida: ${specialtyName} (urgencia: ${urgencyLevel}).
Hospital más conveniente: ${topHospital.name}, copago estimado $${topHospital.estimatedCopay.toFixed(2)}.
Da orientación administrativa en 2-3 oraciones.`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = chatRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { patientId, message } = parsed.data;
  const { specialtySlug, urgencyLevel } = await symptomAgent(message);

  // Mensaje no médico: saludo o pregunta general
  if (specialtySlug === "none") {
    let reply: string;
    try {
      reply = await generateReply(message);
    } catch (err) {
      console.error("[chat] Gemini error:", err);
      return NextResponse.json({ error: "Gemini unavailable" }, { status: 502 });
    }
    return NextResponse.json({
      reply,
      specialty: null,
      coverage: null,
      recommendedHospital: null,
      hospitalRanking: [],
      agentTrace: ["Mensaje no médico detectado", "Respuesta generada con Gemini"],
    } satisfies AgentResponse);
  }

  // Mensaje médico: pipeline completo
  const plan = PLANS[patientId as keyof typeof PLANS] ?? PLANS[1];
  const specialtyInfo = SPECIALTY_MAP[specialtySlug] ?? SPECIALTY_MAP["emergencias"];
  const specialty = { ...specialtyInfo, slug: specialtySlug, urgencyLevel };

  const hospitalRanking = buildHospitalRanking(plan.coveragePercent, plan.fixedCopay);
  const recommendedHospital = hospitalRanking[0];

  const prompt = buildMedicalPrompt(message, plan, specialty.name, urgencyLevel, recommendedHospital);

  let reply: string;
  try {
    reply = await generateReply(prompt);
  } catch (err) {
    console.error("[chat] Gemini error:", err);
    return NextResponse.json({ error: "Gemini unavailable" }, { status: 502 });
  }

  const agentResponse: AgentResponse = {
    reply,
    specialty,
    coverage: plan,
    recommendedHospital,
    hospitalRanking,
    agentTrace: [
      "Síntomas clasificados",
      "Cobertura consultada",
      "Copago calculado",
      "Hospital recomendado",
      "Respuesta generada con Gemini",
    ],
  };

  return NextResponse.json(agentResponse);
}
