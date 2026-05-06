import Link from "next/link";
import { PART1_TOPICS, PART2_CUE_CARDS } from "@/data/speaking/cue-cards";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mic } from "lucide-react";

export default function SpeakingHub() {
  return (
    <PageWrapper>
      <PageHeader
        title="Speaking Simulator"
        description="Practise Parts 1, 2, and 3 with browser speech recognition + AI feedback on fluency, lexis, grammar, and pronunciation patterns."
      />

      <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
        Part 2 — Cue cards
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {PART2_CUE_CARDS.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Mic className="h-4 w-4 text-speaking" /> {c.topic}
                </CardTitle>
                <Badge variant="outline">B{c.bandLevel}</Badge>
              </div>
              <CardDescription className="text-xs leading-relaxed">{c.task}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm">
              <span className="text-xs text-muted-foreground">
                {c.prompts.length} prompts
              </span>
              <Button asChild size="sm" variant="default">
                <Link href={`/speaking/practice?id=${c.id}`}>Open card</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
        Part 1 — Quick warm-up
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {PART1_TOPICS.map((t) => (
          <Card key={t.topic}>
            <CardHeader>
              <CardTitle className="text-base">{t.topic}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-xs text-muted-foreground space-y-1">
                {t.questions.map((q, i) => (
                  <li key={i}>• {q}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
