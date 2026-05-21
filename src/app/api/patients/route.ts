import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Patients endpoint scaffolded",
    data: []
  });
}
