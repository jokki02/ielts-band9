import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";
import { gradeEssay } from "@/lib/ai/writing-grader";
import { countWords } from "@/lib/utils";
import { recordSession, awardForWriting } from "@/lib/stats/recorder";

const Body = z.object({
  taskType: z.enum(["task1", "task2"]),
  promptId: z.string().nullable().optional(),
  prompt: z.string().min(10),
  response: z.string().min(20),
  timeSpent: z.number().int().nonnegative(),
});

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }
    const data = parsed.data;
    const wordCount = countWords(data.response);
    const grading = await gradeEssay(data.prompt, data.response, data.taskType);
    const attempt = await prisma.writingAttempt.create({
      data: {
        userId: user.id,
        taskType: data.taskType,
        promptId: data.promptId ?? undefined,
        prompt: data.prompt,
        userResponse: data.response,
        wordCount,
        timeSpent: data.timeSpent,
        taskAchievement: grading.scores.taskAchievement,
        coherenceCohesion: grading.scores.coherenceCohesion,
        lexicalResource: grading.scores.lexicalResource,
        grammaticalRange: grading.scores.grammaticalRange,
        overallBand: grading.scores.overall,
        feedback: JSON.stringify(grading),
        improvedVersion: grading.band9_version_intro,
        aiProvider: grading.provider,
      },
    });

    await recordSession(user.id, "writing", Math.max(1, Math.round(data.timeSpent / 60)), grading.scores.overall);
    await awardForWriting(user.id, grading.scores.overall);

    return NextResponse.json({ attempt });
  } catch (err) {
    if ((err as Error).message === "NO_USER")
      return NextResponse.json({ error: "Onboarding required" }, { status: 401 });
    console.error("[/api/grade-essay]", err);
    return NextResponse.json(
      { error: (err as Error).message || "Grading error" },
      { status: 500 },
    );
  }
}
