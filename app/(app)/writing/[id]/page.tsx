import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  CRITERION_LABEL,
  CRITERION_DESC,
  WritingCriterion,
} from "@/lib/ielts/writing-criteria";
import { GradingResult } from "@/lib/ai/heuristic-grader";
import { safeJsonParse } from "@/lib/utils";
import { Sparkles, Lightbulb, BadgeCheck, AlertTriangle, ArrowLeft } from "lucide-react";

export default async function WritingResult({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const attempt = await prisma.writingAttempt.findFirst({
    where: { id: params.id, userId: user.id },
  });
  if (!attempt) return notFound();

  const grading = safeJsonParse<GradingResult | null>(attempt.feedback, null);

  return (
    <PageWrapper>
      <PageHeader
        title={`${attempt.taskType === "task1" ? "Task 1" : "Task 2"} feedback`}
        description={`Graded by ${attempt.aiProvider ?? "heuristic"} · ${attempt.wordCount} words · ${Math.round(attempt.timeSpent / 60)}m`}
        actions={
          <Button variant="outline" asChild>
            <Link href="/writing/history">
              <ArrowLeft className="h-4 w-4" /> History
            </Link>
          </Button>
        }
      />

      {/* Score grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {(["taskAchievement", "coherenceCohesion", "lexicalResource", "grammaticalRange"] as WritingCriterion[]).map(
          (k) => {
            const v = attempt[k as keyof typeof attempt] as number | null;
            return (
              <Card key={k}>
                <CardContent className="p-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {CRITERION_LABEL[k]}
                  </p>
                  <p className="text-3xl font-bold mt-1">
                    {v?.toFixed(1) ?? "—"}
                  </p>
                </CardContent>
              </Card>
            );
          },
        )}
      </div>

      <Card className="mb-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent pointer-events-none" />
        <CardContent className="relative p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Overall Band
            </p>
            <p className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {attempt.overallBand?.toFixed(1) ?? "—"}
            </p>
          </div>
          <div className="text-sm max-w-md text-muted-foreground">
            {grading?.overall_comment}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="feedback">
        <TabsList>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="essay">My essay</TabsTrigger>
          <TabsTrigger value="band9">Band 9 sample</TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-4">
          {grading ? (
            <>
              {(["taskAchievement", "coherenceCohesion", "lexicalResource", "grammaticalRange"] as WritingCriterion[]).map(
                (k) => {
                  const fb = grading.feedback[k];
                  return (
                    <Card key={k}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center justify-between gap-2">
                          <span>{CRITERION_LABEL[k]}</span>
                          <Badge>{(grading.scores[k]).toFixed(1)}</Badge>
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">{CRITERION_DESC[k]}</p>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <p className="leading-relaxed">{fb.score_justification}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-band-9 mb-1.5 flex items-center gap-1">
                              <BadgeCheck className="h-3 w-3" /> Strengths
                            </p>
                            <ul className="space-y-1 text-muted-foreground">
                              {fb.strengths.map((s, i) => (
                                <li key={i} className="flex gap-2"><span>•</span>{s}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wider text-band-7 mb-1.5 flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" /> Improve
                            </p>
                            <ul className="space-y-1 text-muted-foreground">
                              {fb.improvements.map((s, i) => (
                                <li key={i} className="flex gap-2"><span>•</span>{s}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-xs flex gap-2">
                          <Lightbulb className="h-4 w-4 text-primary shrink-0" />
                          <p>
                            <span className="font-semibold text-primary">Band 9 tip:</span>{" "}
                            {fb.band9_tip}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                },
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Vocabulary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    {grading.vocabulary.good_phrases.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-band-9 mb-1.5">
                          Effective phrases
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {grading.vocabulary.good_phrases.map((p, i) => (
                            <Badge key={i} variant="success">{p}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {grading.vocabulary.overused_words.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-band-7 mb-1.5">
                          Overused
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {grading.vocabulary.overused_words.map((p, i) => (
                            <Badge key={i} variant="warning">{p}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {grading.vocabulary.suggested_upgrades.length > 0 && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                          Upgrade suggestions
                        </p>
                        <ul className="space-y-1 text-muted-foreground">
                          {grading.vocabulary.suggested_upgrades.map((u, i) => (
                            <li key={i} className="flex gap-2 text-xs">
                              <span className="font-mono text-band-7">{u.original}</span>
                              <span>→</span>
                              <span className="font-mono text-band-9">{u.better}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Grammar</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {grading.grammar_errors.length === 0 ? (
                      <p className="text-muted-foreground">
                        No major issues detected.
                      </p>
                    ) : (
                      grading.grammar_errors.map((e, i) => (
                        <div key={i} className="rounded border border-border bg-muted/30 p-2.5">
                          <p className="text-xs font-mono text-band-7 line-through">
                            {e.error}
                          </p>
                          <p className="text-xs font-mono text-band-9">{e.correction}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {e.explanation}
                          </p>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No detailed feedback available.</p>
          )}
        </TabsContent>

        <TabsContent value="essay">
          <Card>
            <CardContent
              className="prose prose-invert prose-sm sm:prose-base max-w-none p-6"
              dangerouslySetInnerHTML={{ __html: attempt.userResponse }}
            />
          </Card>
        </TabsContent>

        <TabsContent value="band9">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Band 9 sample introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground italic">
                {grading?.band9_version_intro || attempt.improvedVersion || "—"}
              </p>
              <p className="text-xs text-muted-foreground/80 mt-3">
                Compare phrasing, sentence structure, and lexis against your own
                introduction.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}
