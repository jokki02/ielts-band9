import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";

export const maxDuration = 15;

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => ({}));
    const word = String(body.word || "").trim();
    if (!word) {
      return NextResponse.json(
        { error: "word is required" },
        { status: 400 },
      );
    }

    const existing = await prisma.vocabCard.findFirst({
      where: { userId: user.id, word },
    });
    if (existing) {
      return NextResponse.json({ ok: true, duplicate: true, id: existing.id });
    }

    const card = await prisma.vocabCard.create({
      data: {
        userId: user.id,
        word,
        definition: String(body.definition || "").slice(0, 500),
        pronunciation: String(body.pronunciation || ""),
        partOfSpeech: String(body.partOfSpeech || "noun").slice(0, 32),
        bandLevel: Number(body.bandLevel) || 7.5,
        topic: String(body.topic || "ai-suggested").slice(0, 64),
        exampleSent: String(body.exampleSent || "").slice(0, 500),
        collocations: "[]",
        synonyms: "[]",
        antonyms: "[]",
      },
    });
    return NextResponse.json({ ok: true, id: card.id });
  } catch (err) {
    if ((err as Error).message === "NO_USER")
      return NextResponse.json({ error: "Onboarding required" }, { status: 401 });
    return NextResponse.json(
      { error: `Failed: ${(err as Error).message}` },
      { status: 500 },
    );
  }
}
