import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";
import { generateStudyPlan } from "@/lib/ai/study-planner";

const Body = z.object({
  examDate: z.string(),
  weeksUntil: z.number().int().min(1),
  bands: z.object({
    listening: z.number(),
    reading: z.number(),
    writing: z.number(),
    speaking: z.number(),
  }),
  hoursPerDay: z.number().min(0.5).max(12),
  weakest: z.array(z.string()).min(1),
});

export const maxDuration = 90;

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const plan = await generateStudyPlan(parsed.data);
    await prisma.studyPlan.upsert({
      where: { userId: user.id },
      update: {
        examDate: new Date(parsed.data.examDate),
        weeklyPlan: JSON.stringify(plan),
        focusAreas: JSON.stringify(parsed.data.weakest),
      },
      create: {
        userId: user.id,
        examDate: new Date(parsed.data.examDate),
        weeklyPlan: JSON.stringify(plan),
        focusAreas: JSON.stringify(parsed.data.weakest),
      },
    });
    return NextResponse.json({ plan });
  } catch (err) {
    if ((err as Error).message === "NO_USER")
      return NextResponse.json({ error: "Onboarding required" }, { status: 401 });
    console.error("[/api/study-plan]", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
