import { requireUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { ProgressCharts } from "./ProgressCharts";

export default async function ProgressPage() {
  const user = await requireUser();
  const [writing, reading, sessions] = await Promise.all([
    prisma.writingAttempt.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    }),
    prisma.readingAttempt.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    }),
    prisma.studySession.findMany({
      where: { userId: user.id },
      orderBy: { date: "asc" },
    }),
  ]);

  // Build daily-minutes series for last 30 days
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - 29);
  const dailyBuckets: Record<string, number> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    dailyBuckets[d.toISOString().slice(0, 10)] = 0;
  }
  sessions.forEach((s) => {
    const k = new Date(s.date).toISOString().slice(0, 10);
    if (k in dailyBuckets) dailyBuckets[k] += s.duration;
  });
  const dailySeries = Object.entries(dailyBuckets).map(([d, mins]) => ({
    date: d.slice(5),
    mins,
  }));

  const writingSeries = writing
    .filter((w) => typeof w.overallBand === "number")
    .map((w, i) => ({
      idx: i + 1,
      band: w.overallBand!,
      taskAchievement: w.taskAchievement ?? 0,
      coherenceCohesion: w.coherenceCohesion ?? 0,
      lexicalResource: w.lexicalResource ?? 0,
      grammaticalRange: w.grammaticalRange ?? 0,
    }));

  const readingSeries = reading.map((r, i) => ({
    idx: i + 1,
    band: r.bandScore,
    accuracy: (r.rawScore / r.totalQs) * 100,
  }));

  // Module split
  const moduleMins: Record<string, number> = {};
  sessions.forEach((s) => {
    moduleMins[s.module] = (moduleMins[s.module] ?? 0) + s.duration;
  });
  const moduleSeries = Object.entries(moduleMins).map(([k, v]) => ({
    module: k,
    mins: v,
  }));

  return (
    <PageWrapper>
      <PageHeader
        title="Progress"
        description="Track your trajectory across writing, reading, and overall study time."
      />
      <ProgressCharts
        dailySeries={dailySeries}
        writingSeries={writingSeries}
        readingSeries={readingSeries}
        moduleSeries={moduleSeries}
      />
    </PageWrapper>
  );
}
