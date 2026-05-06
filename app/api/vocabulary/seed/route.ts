import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";
import { VOCAB_WORDS } from "@/data/vocabulary/words";

export async function POST() {
  try {
    const user = await requireUser();
    let added = 0;
    for (const w of VOCAB_WORDS) {
      const exists = await prisma.vocabCard.findUnique({
        where: { userId_word: { userId: user.id, word: w.word } },
      });
      if (exists) continue;
      await prisma.vocabCard.create({
        data: {
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
        },
      });
      added++;
    }
    return NextResponse.json({ added });
  } catch (err) {
    if ((err as Error).message === "NO_USER")
      return NextResponse.json({ error: "Onboarding required" }, { status: 401 });
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
