import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";
import { averageOverall } from "@/lib/ielts/band-calculator";
import { awardForMock } from "@/lib/stats/recorder";

const Body = z.object({
  listeningBand: z.number().nullable().optional(),
  readingBand: z.number().nullable().optional(),
  writingBand: z.number().nullable().optional(),
  speakingBand: z.number().nullable().optional(),
  status: z.enum(["in_progress", "completed"]).optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await requireUser();
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const data = parsed.data;
    const existing = await prisma.mockTest.findFirst({
      where: { id: params.id, userId: user.id },
    });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const sections = [
      data.listeningBand ?? existing.listeningBand,
      data.readingBand ?? existing.readingBand,
      data.writingBand ?? existing.writingBand,
      data.speakingBand ?? existing.speakingBand,
    ].filter((n): n is number => typeof n === "number");
    const overall = sections.length === 4 ? averageOverall(sections) : null;

    const updated = await prisma.mockTest.update({
      where: { id: existing.id },
      data: {
        listeningBand: data.listeningBand ?? existing.listeningBand,
        readingBand: data.readingBand ?? existing.readingBand,
        writingBand: data.writingBand ?? existing.writingBand,
        speakingBand: data.speakingBand ?? existing.speakingBand,
        overallBand: overall,
        status: data.status ?? existing.status,
        completedAt: data.status === "completed" ? new Date() : existing.completedAt,
      },
    });
    if (data.status === "completed" && overall) {
      await awardForMock(user.id, overall);
    }
    return NextResponse.json({ test: updated });
  } catch (err) {
    if ((err as Error).message === "NO_USER")
      return NextResponse.json({ error: "Onboarding required" }, { status: 401 });
    console.error("[/api/mock-test]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
