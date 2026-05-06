import { PrismaClient } from "@prisma/client";
import { VOCAB_WORDS } from "../data/vocabulary/words";

const prisma = new PrismaClient();

async function main() {
  console.log("[seed] starting…");
  // Single-user app: don't auto-create the user — onboarding handles that.
  // But if a user already exists, seed their vocab cards (idempotent).
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("[seed] no user yet — onboarding will populate one. Skipping vocab seed.");
    return;
  }

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
  console.log(`[seed] vocab cards added: ${added}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
