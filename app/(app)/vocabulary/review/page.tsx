import Link from "next/link";
import { requireUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { ReviewSession } from "./ReviewSession";
import { EmptyState } from "@/components/common/EmptyState";
import { Library } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function VocabReviewPage() {
  const user = await requireUser();
  const due = await prisma.vocabCard.findMany({
    where: { userId: user.id, nextReview: { lte: new Date() } },
    orderBy: [{ nextReview: "asc" }, { repetitions: "asc" }],
    take: 30,
  });
  return (
    <PageWrapper>
      <PageHeader
        title="Vocabulary Review"
        description="Spaced-repetition session. Rate each card honestly — the algorithm schedules the next review."
      />
      {due.length === 0 ? (
        <EmptyState
          icon={<Library className="h-6 w-6" />}
          title="Nothing due"
          description="No cards are due for review right now. Come back later."
          action={
            <Button asChild>
              <Link href="/vocabulary">Back to vocabulary</Link>
            </Button>
          }
        />
      ) : (
        <ReviewSession
          cards={due.map((c) => ({
            id: c.id,
            word: c.word,
            definition: c.definition,
            pronunciation: c.pronunciation,
            partOfSpeech: c.partOfSpeech,
            bandLevel: c.bandLevel,
            topic: c.topic,
            exampleSent: c.exampleSent,
            collocations: JSON.parse(c.collocations) as string[],
            synonyms: JSON.parse(c.synonyms) as string[],
            antonyms: JSON.parse(c.antonyms) as string[],
          }))}
        />
      )}
    </PageWrapper>
  );
}
