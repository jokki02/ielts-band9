import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";
import { VOCAB_WORDS } from "@/data/vocabulary/words";
import { AWL_WORDS } from "@/data/vocabulary/awl";

// Map Coxhead AWL sublist (1 = most frequent, 10 = least frequent) to an
// approximate IELTS band level. The most frequent academic words start
// appearing in productive use around Band 7; the rarer sublists are
// Band 8.5 territory.
function awlSublistToBand(sublist: number): number {
  if (sublist <= 1) return 7;
  if (sublist <= 3) return 7.5;
  if (sublist <= 6) return 8;
  return 8.5;
}

export const maxDuration = 60;

export async function POST() {
  try {
    const user = await requireUser();

    // Batch-insert avoids ~600 round-trips on a Postgres serverless connection
    // (which would otherwise blow Vercel's 10s default function timeout).
    const existing = new Set(
      (
        await prisma.vocabCard.findMany({
          where: { userId: user.id },
          select: { word: true },
        })
      ).map((r) => r.word),
    );

    type Row = NonNullable<
      Parameters<typeof prisma.vocabCard.createMany>[0]
    >["data"] extends infer T
      ? T extends Array<infer U>
        ? U
        : T
      : never;
    const rows: Row[] = [];

    // 1. Hand-curated high-band collocation cards.
    for (const w of VOCAB_WORDS) {
      if (existing.has(w.word)) continue;
      rows.push({
        userId: user.id,
        word: w.word,
        definition: w.definition,
        pronunciation: w.pronunciation,
        partOfSpeech: w.partOfSpeech,
        bandLevel: w.bandLevel,
        topic: w.topic,
        exampleSent: w.exampleIELTS,
        collocations: JSON.stringify(w.collocations),
        synonyms: JSON.stringify(w.synonyms),
        antonyms: JSON.stringify(w.antonyms),
      });
    }

    // 2. Full Academic Word List (Coxhead 2000) — 570 word families.
    //    Definitions sourced from Wiktionary (CC-BY-SA 4.0).
    for (const w of AWL_WORDS) {
      if (existing.has(w.word)) continue;
      rows.push({
        userId: user.id,
        word: w.word,
        definition: w.definition,
        pronunciation: "",
        partOfSpeech: w.partOfSpeech,
        bandLevel: awlSublistToBand(w.sublist),
        topic: `awl-sublist-${w.sublist}`,
        exampleSent: w.example,
        collocations: "[]",
        synonyms: "[]",
        antonyms: "[]",
      });
    }

    if (rows.length > 0) {
      await prisma.vocabCard.createMany({ data: rows, skipDuplicates: true });
    }

    return NextResponse.json({
      added: rows.length,
      total: VOCAB_WORDS.length + AWL_WORDS.length,
    });
  } catch (err) {
    if ((err as Error).message === "NO_USER")
      return NextResponse.json({ error: "Onboarding required" }, { status: 401 });
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
