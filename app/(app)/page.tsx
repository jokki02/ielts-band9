import Link from "next/link";
import { requireUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { BandScoreCard } from "@/components/dashboard/BandScoreCard";
import { StudyStreakWidget } from "@/components/dashboard/StudyStreakWidget";
import { QuickStatsGrid, type ModuleStat } from "@/components/dashboard/QuickStatsGrid";
import { RecentActivity, type RecentActivityItem } from "@/components/dashboard/RecentActivity";
import { DailyGoalRing } from "@/components/dashboard/DailyGoalRing";
import { WeakAreasAlert } from "@/components/dashboard/WeakAreasAlert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PenLine, BookOpen, Library, ClipboardCheck, ArrowRight } from "lucide-react";

export default async function Dashboard() {
  const user = await requireUser();

  // Aggregations
  const [writing, reading, sessionsToday, allSessions, vocabDue] = await Promise.all([
    prisma.writingAttempt.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.readingAttempt.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
    prisma.studySession.findMany({
      where: {
        userId: user.id,
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    }),
    prisma.studySession.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
      take: 5,
    }),
    prisma.vocabCard.count({
      where: { userId: user.id, nextReview: { lte: new Date() } },
    }),
  ]);

  const minutesToday = sessionsToday.reduce((s, x) => s + x.duration, 0);
  const goalMins = user.settings?.dailyGoalMins ?? 60;

  function avgBand<T extends { overallBand?: number | null; bandScore?: number | null }>(
    rows: T[],
    pick: (r: T) => number | null | undefined,
  ) {
    const vals = rows.map(pick).filter((v): v is number => typeof v === "number");
    if (vals.length === 0) return null;
    return vals.reduce((s, v) => s + v, 0) / vals.length;
  }

  const writingBand = avgBand(writing, (r) => r.overallBand);
  const readingBand = avgBand(reading, (r) => r.bandScore);

  const stats: ModuleStat[] = [
    { module: "writing", attempts: writing.length, band: writingBand },
    { module: "reading", attempts: reading.length, band: readingBand },
    { module: "listening", attempts: 0, band: null },
    { module: "speaking", attempts: 0, band: null },
  ];

  const recent: RecentActivityItem[] = [
    ...writing.slice(0, 3).map((w) => ({
      id: w.id,
      title: w.taskType === "task1" ? "Task 1 attempt" : "Task 2 essay",
      module: "Writing",
      band: w.overallBand,
      date: w.createdAt,
    })),
    ...reading.slice(0, 3).map((r) => ({
      id: r.id,
      title: "Reading passage",
      module: "Reading",
      band: r.bandScore,
      date: r.createdAt,
    })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 6);

  // Weak areas heuristic
  const weakAreas: { area: string; reason: string }[] = [];
  if (writing.length >= 2 && writingBand !== null && writingBand < user.targetBand - 0.5) {
    const lastFew = writing.slice(0, 3);
    const cohAvg = avgBand(lastFew, (r) => r.coherenceCohesion);
    const lexAvg = avgBand(lastFew, (r) => r.lexicalResource);
    const grAvg = avgBand(lastFew, (r) => r.grammaticalRange);
    if (cohAvg !== null && cohAvg < user.targetBand - 0.5)
      weakAreas.push({ area: "Coherence", reason: `${cohAvg.toFixed(1)} avg in last attempts` });
    if (lexAvg !== null && lexAvg < user.targetBand - 0.5)
      weakAreas.push({ area: "Lexis", reason: `${lexAvg.toFixed(1)} avg in last attempts` });
    if (grAvg !== null && grAvg < user.targetBand - 0.5)
      weakAreas.push({ area: "Grammar", reason: `${grAvg.toFixed(1)} avg in last attempts` });
  }
  if (vocabDue > 0)
    weakAreas.push({
      area: "Vocab",
      reason: `${vocabDue} cards due for review`,
    });
  if (writing.length === 0)
    weakAreas.push({ area: "Writing", reason: "No essays submitted yet" });
  if (reading.length === 0)
    weakAreas.push({ area: "Reading", reason: "No passages attempted yet" });

  return (
    <PageWrapper>
      <PageHeader
        title="Dashboard"
        description="Your daily IELTS Band 9 control room. Pick up where you left off — or jump straight into a graded essay."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <BandScoreCard current={user.currentBand} target={user.targetBand} />
        <StudyStreakWidget streak={user.studyStreak} totalMins={user.totalStudyMins} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <DailyGoalRing minutesToday={minutesToday} goalMins={goalMins} />
        <Card className="lg:col-span-2">
          <CardContent className="p-5 flex flex-wrap gap-2 items-center h-full">
            <p className="text-sm text-muted-foreground w-full mb-2">
              Quick start
            </p>
            <Button variant="gradient" asChild>
              <Link href="/writing/task2">
                <PenLine className="h-4 w-4" /> Practise Task 2
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/writing/task1">
                <PenLine className="h-4 w-4" /> Task 1
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/reading">
                <BookOpen className="h-4 w-4" /> Reading drill
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/vocabulary/review">
                <Library className="h-4 w-4" /> Review {vocabDue || 0}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/mock-test">
                <ClipboardCheck className="h-4 w-4" /> Mock test
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-muted-foreground mb-2 px-1">
          By module
        </p>
        <QuickStatsGrid stats={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentActivity items={recent} />
          {allSessions.length > 0 && (
            <p className="text-xs text-muted-foreground mt-2 text-right">
              <Link href="/progress" className="hover:underline inline-flex items-center gap-1">
                See full progress <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
          )}
        </div>
        <WeakAreasAlert areas={weakAreas} />
      </div>
    </PageWrapper>
  );
}
