import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";
import { READING_PASSAGES } from "@/data/reading/passages";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QUESTION_TYPE_LABEL } from "@/lib/ielts/question-types";
import { Check, X, ArrowLeft } from "lucide-react";
import { safeJsonParse } from "@/lib/utils";

interface PerQ {
  num: number;
  type: keyof typeof QUESTION_TYPE_LABEL;
  question: string;
  expected: string | string[];
  given: string | string[] | null;
  correct: boolean;
  explanation: string;
}

export default async function ReadingResultPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { attempt?: string };
}) {
  const user = await requireUser();
  if (!searchParams.attempt) return notFound();
  const attempt = await prisma.readingAttempt.findFirst({
    where: { id: searchParams.attempt, userId: user.id, passageId: params.id },
  });
  if (!attempt) return notFound();
  const passage = READING_PASSAGES.find((p) => p.id === params.id);
  if (!passage) return notFound();
  const results = safeJsonParse<PerQ[]>(attempt.results, []);

  return (
    <PageWrapper>
      <PageHeader
        title={`${passage.title} — Results`}
        description={`Raw ${attempt.rawScore} / ${attempt.totalQs} · Band ${attempt.bandScore.toFixed(1)} · ${Math.round(attempt.timeSpent / 60)}m`}
        actions={
          <Button variant="outline" asChild>
            <Link href="/reading">
              <ArrowLeft className="h-4 w-4" /> All passages
            </Link>
          </Button>
        }
      />
      <Card className="mb-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-reading/15 to-transparent pointer-events-none" />
        <CardContent className="relative p-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Reading band
            </p>
            <p className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {attempt.bandScore.toFixed(1)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Raw score</p>
            <p className="text-2xl font-semibold">
              {attempt.rawScore} / {attempt.totalQs}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              {((attempt.rawScore / attempt.totalQs) * 100).toFixed(0)}% accuracy
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {results.map((r) => (
          <Card key={r.num} className={r.correct ? "border-band-9/30" : "border-destructive/30"}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  {r.correct ? (
                    <Check className="h-4 w-4 text-band-9" />
                  ) : (
                    <X className="h-4 w-4 text-destructive" />
                  )}
                  Question {r.num}
                </CardTitle>
                <Badge variant="muted" className="text-[10px]">
                  {QUESTION_TYPE_LABEL[r.type]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>{r.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Your answer</p>
                  <p
                    className={
                      r.correct
                        ? "font-mono text-band-9"
                        : "font-mono text-destructive"
                    }
                  >
                    {Array.isArray(r.given) ? r.given.join(", ") : r.given || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Correct answer</p>
                  <p className="font-mono text-band-9">
                    {Array.isArray(r.expected) ? r.expected.join(", ") : r.expected}
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground italic border-l-2 border-border pl-2">
                {r.explanation}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
