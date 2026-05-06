import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth/get-user";
import { analyzeSpeaking } from "@/lib/ai/speaking-analyzer";
import { recordSession } from "@/lib/stats/recorder";

const Body = z.object({
  part: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  cueCardId: z.string().optional(),
  task: z.string(),
  transcript: z.string().min(20),
  durationS: z.number().int().positive().optional(),
});

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { task, transcript, durationS } = parsed.data;
    // Default to 90 seconds if not provided (typical Part 2 response)
    const result = await analyzeSpeaking(task, transcript, durationS ?? 90);
    await recordSession(user.id, "speaking", 3, result.scores.overall);
    return NextResponse.json(result);
  } catch (err) {
    if ((err as Error).message === "NO_USER")
      return NextResponse.json({ error: "Onboarding required" }, { status: 401 });
    console.error("[/api/grade-speaking]", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
