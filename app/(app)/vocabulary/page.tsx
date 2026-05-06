import Link from "next/link";
import { requireUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { Library, Sparkles } from "lucide-react";
import { SeedVocabButton } from "./SeedVocabButton";

export default async function VocabularyHub() {
  const user = await requireUser();
  const cards = await prisma.vocabCard.findMany({
    where: { userId: user.id },
    orderBy: { word: "asc" },
  });
  const due = cards.filter((c) => new Date(c.nextReview) <= new Date()).length;
  const mastered = cards.filter((c) => c.repetitions >= 3).length;

  // Topic groups
  const byTopic = cards.reduce<Record<string, typeof cards>>((acc, c) => {
    (acc[c.topic] ??= []).push(c);
    return acc;
  }, {});

  return (
    <PageWrapper>
      <PageHeader
        title="Vocabulary"
        description="Learn high-band IELTS lexis with spaced-repetition flashcards (SM-2 algorithm)."
        actions={
          <div className="flex gap-2">
            {cards.length === 0 && <SeedVocabButton />}
            {cards.length > 0 && (
              <Button asChild variant="gradient">
                <Link href="/vocabulary/review">
                  <Sparkles className="h-4 w-4" /> Review {due} cards
                </Link>
              </Button>
            )}
          </div>
        }
      />

      {cards.length === 0 ? (
        <EmptyState
          icon={<Library className="h-6 w-6" />}
          title="No vocabulary loaded yet"
          description="Click 'Seed vocabulary' to add ~100 high-band IELTS words across topics."
          action={<SeedVocabButton />}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total</p>
                <p className="text-3xl font-bold mt-1">{cards.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Mastered</p>
                <p className="text-3xl font-bold mt-1 text-band-9">{mastered}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Due now</p>
                <p className="text-3xl font-bold mt-1 text-band-7">{due}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Topics</p>
                <p className="text-3xl font-bold mt-1">{Object.keys(byTopic).length}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {Object.entries(byTopic).map(([topic, list]) => (
              <div key={topic}>
                <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                  {topic} ({list.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {list.map((c) => (
                    <Card key={c.id} className="hover:border-vocabulary/40 transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-vocabulary">{c.word}</p>
                          <Badge variant="outline" className="text-[10px]">
                            B{c.bandLevel}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {c.definition}
                        </p>
                        {c.pronunciation && (
                          <p className="text-[10px] font-mono text-muted-foreground/80 mt-1">
                            {c.pronunciation}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </PageWrapper>
  );
}
