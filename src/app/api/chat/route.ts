import { NextResponse } from "next/server";
import { chatRequestSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = chatRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid chat request", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  return NextResponse.json({
    reply: "Chat endpoint scaffolded",
    specialty: null,
    coverage: null,
    recommendedHospital: null,
    hospitalRanking: [],
    agentTrace: ["Request validated"]
  });
}
