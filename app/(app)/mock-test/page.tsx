import Link from "next/link";
import { requireUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, ArrowRight } from "lucide-react";
import { averageOverall } from "@/lib/ielts/band-calculator";
import { timeAgo } from "@/lib/utils";

export default async function MockTestHub() {
  const user = await requireUser();
  const tests = await prisma.mockTest.findMany({
    where: { userId: user.id },
    orderBy: { startedAt: "desc" },
  });

  return (
    <PageWrapper>
      <PageHeader
        title="Mock Test Centre"
        description="Full-length, exam-condition simulations across all four modules. Each mock takes ~2h45m end-to-end."
        actions={
          <Button asChild variant="gradient">
            <Link href="/mock-test/new">
              <ClipboardCheck className="h-4 w-4" /> New mock test
            </Link>
          </Button>
        }
      />

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-base">How it works</CardTitle>
          <CardDescription>
            A mock test runs the full sequence: 30-min listening → 60-min reading → 60-min writing → 11–14 min speaking. Each module&apos;s band is computed using the official IELTS conversion tables and combined per the IELTS Academic averaging rule.
          </CardDescription>
        </CardHeader>
      </Card>

      <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
        History ({tests.length})
      </h2>
      {tests.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            No mock tests yet — start your first one to track full-test progress.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {tests.map((t) => {
            const sectionBands = [
              t.listeningBand,
              t.readingBand,
              t.writingBand,
              t.speakingBand,
            ].filter((b): b is number => typeof b === "number");
            const overall =
              t.overallBand ??
              (sectionBands.length === 4 ? averageOverall(sectionBands) : null);
            return (
              <Card key={t.id}>
                <Link href={`/mock-test/${t.id}`}>
                  <CardContent className="p-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">Mock test #{t.testNumber}</p>
                      <p className="text-xs text-muted-foreground">
                        {timeAgo(t.startedAt)} · status {t.status}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {overall ? (
                        <Badge
                          variant={
                            overall >= 8.5
                              ? "band-9"
                              : overall >= 7.5
                              ? "band-8"
                              : overall >= 6.5
                              ? "band-7"
                              : "band-6"
                          }
                        >
                          Overall {overall.toFixed(1)}
                        </Badge>
                      ) : (
                        <Badge variant="muted">In progress</Badge>
                      )}
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
    </PageWrapper>
  );
}
