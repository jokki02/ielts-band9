import { requireUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { StudyPlanView } from "./StudyPlanView";
import { safeJsonParse } from "@/lib/utils";
import { StudyPlanResult } from "@/lib/ai/study-planner";

export default async function StudyPlanPage() {
  const user = await requireUser();
  const plan = await prisma.studyPlan.findUnique({ where: { userId: user.id } });
  const planData = plan ? safeJsonParse<StudyPlanResult | null>(plan.weeklyPlan, null) : null;

  // Compute base bands from user history
  const writing = await prisma.writingAttempt.aggregate({
    where: { userId: user.id },
    _avg: { overallBand: true },
  });
  const reading = await prisma.readingAttempt.aggregate({
    where: { userId: user.id },
    _avg: { bandScore: true },
  });

  return (
    <PageWrapper>
      <PageHeader
        title="Study Plan"
        description="An AI-generated, week-by-week schedule calibrated to your weakest areas and exam date."
      />
      <StudyPlanView
        existing={planData}
        defaults={{
          examDate: user.examDate
            ? new Date(user.examDate).toISOString().slice(0, 10)
            : "",
          targetBand: user.targetBand,
          bands: {
            listening: 6.5,
            reading: reading._avg.bandScore ?? 6.5,
            writing: writing._avg.overallBand ?? 6.0,
            speaking: 6.5,
          },
        }}
      />
    </PageWrapper>
  );
}
