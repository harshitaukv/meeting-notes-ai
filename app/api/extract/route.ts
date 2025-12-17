import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    items: [
      "Emma → Draft onboarding document → Deadline: 20 June",
      "Rahul → Analyze support tickets → Deadline: Not specified",
      "Marketing → Review changes → After approval"
    ],
    mode: "mock"
  });
}
