import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { notes } = await req.json();

  if (!notes) {
    return NextResponse.json(
      { error: "Meeting notes are required" },
      { status: 400 }
    );
  }

  // LOCAL SAFE MOCK RESPONSE
  return NextResponse.json({
    actions: `
• Prepare project proposal — Owner: Alice — Deadline: Friday
• Review budget — Owner: Bob — Deadline: Not specified
• Schedule follow-up meeting — Owner: Not specified — Deadline: Next week
    `,
  });
}
