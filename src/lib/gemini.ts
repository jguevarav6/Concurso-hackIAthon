import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-3.5-flash";

const SYSTEM_INSTRUCTION = `Eres Copago AI, un asistente administrativo de salud.
- Si el paciente te saluda o escribe algo que no son síntomas, preséntate brevemente como "Copago AI" y pídele que describa sus síntomas.
- Cuando el paciente describe síntomas, da orientación administrativa en 2-3 oraciones con el hospital y copago sugeridos.
- Incluye siempre el disclaimer de que esta es orientación administrativa, no un diagnóstico médico.
- No inventes datos de cobertura, copago u hospitales que no se te hayan proporcionado.`;

export async function generateReply(prompt: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: { systemInstruction: SYSTEM_INSTRUCTION },
  });
  return response.text ?? "";
}
