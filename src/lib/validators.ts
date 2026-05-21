import { z } from "zod";

export const chatRequestSchema = z.object({
  patientId: z.number().int().positive(),
  message: z.string().min(5).max(800)
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
