import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";

const Body = z.object({
  dailyGoalMins: z.number().int().min(10).max(480).optional(),
  preferredAI: z.enum(["gemini", "groq"]).optional(),
  notifications: z.boolean().optional(),
});

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireUser();
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const settings = await prisma.userSettings.upsert({
      where: { userId: user.id },
      update: parsed.data,
      create: {
        userId: user.id,
        ...parsed.data,
      },
    });
    return NextResponse.json({ settings });
  } catch (err) {
    if ((err as Error).message === "NO_USER")
      return NextResponse.json({ error: "Onboarding required" }, { status: 401 });
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
