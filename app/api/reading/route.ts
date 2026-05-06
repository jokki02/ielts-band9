import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";
import { READING_PASSAGES } from "@/data/reading/passages";
import { isReadingAnswerCorrect } from "@/lib/ielts/question-types";
import { readingRawToBand } from "@/lib/ielts/band-calculator";
import { recordSession, awardForReading } from "@/lib/stats/recorder";

const Body = z.object({
  passageId: z.string(),
  answers: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
  timeSpent: z.number().int().nonnegative(),
});

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { passageId, answers, timeSpent } = parsed.data;
    const passage = READING_PASSAGES.find((p) => p.id === passageId);
    if (!passage) {
      return NextResponse.json({ error: "Passage not found" }, { status: 404 });
    }

    const perQ = passage.questions.map((q) => {
      const given = answers[String(q.num)] as string | string[] | undefined;
      const correct = isReadingAnswerCorrect(q.type, q.expected, given ?? null);
      return {
        num: q.num,
        type: q.type,
        question: q.question,
        expected: q.expected,
        given: given ?? null,
        correct,
        explanation: q.explanation,
      };
    });
    const raw = perQ.filter((p) => p.correct).length;
    const total = passage.questions.length;
    // Scale to 40-point standard before mapping to band
    const scaled = Math.round((raw / total) * 40);
    const band = readingRawToBand(scaled);

    const attempt = await prisma.readingAttempt.create({
      data: {
        userId: user.id,
        passageId: passage.id,
        answers: JSON.stringify(answers),
        results: JSON.stringify(perQ),
        rawScore: raw,
        totalQs: total,
        bandScore: band,
        timeSpent,
      },
    });

    await recordSession(user.id, "reading", Math.max(1, Math.round(timeSpent / 60)), band);
    await awardForReading(user.id, raw, total, timeSpent);

    return NextResponse.json({
      id: attempt.id,
      rawScore: raw,
      totalQs: total,
      bandScore: band,
    });
  } catch (err) {
    if ((err as Error).message === "NO_USER")
      return NextResponse.json({ error: "Onboarding required" }, { status: 401 });
    console.error("[/api/reading]", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
