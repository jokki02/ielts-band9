import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";
import { sm2Step } from "@/lib/spaced-repetition/sm2";
import { recordSession, awardForVocab } from "@/lib/stats/recorder";

const Body = z.object({
  cardId: z.string(),
  rating: z.number().int().min(0).max(5),
});

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const parsed = Body.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { cardId, rating } = parsed.data;
    const card = await prisma.vocabCard.findFirst({
      where: { id: cardId, userId: user.id },
    });
    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }
    const next = sm2Step({
      rating: (Math.max(1, rating) as 1 | 2 | 3 | 4 | 5),
      repetitions: card.repetitions,
      easeFactor: card.easeFactor,
      interval: card.interval,
    });
    await prisma.vocabCard.update({
      where: { id: card.id },
      data: {
        repetitions: next.newRepetitions,
        easeFactor: next.newEaseFactor,
        interval: next.nextInterval,
        nextReview: next.nextReviewAt,
        lastRating: rating,
      },
    });
    // Treat 1 review as ~30 sec; aggregate across many in recordSession
    await recordSession(user.id, "vocabulary", 1);
    await awardForVocab(user.id);
    return NextResponse.json({ ok: true, next });
  } catch (err) {
    if ((err as Error).message === "NO_USER")
      return NextResponse.json({ error: "Onboarding required" }, { status: 401 });
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
