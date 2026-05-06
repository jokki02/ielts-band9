import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { MockTestRunner } from "./MockTestRunner";

export default async function MockTestDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await requireUser();
  const test = await prisma.mockTest.findFirst({
    where: { id: params.id, userId: user.id },
  });
  if (!test) return notFound();
  return (
    <PageWrapper>
      <PageHeader
        title={`Mock test #${test.testNumber}`}
        description="Record your section bands as you complete each module. Overall band is calculated by the official averaging rule."
      />
      <MockTestRunner
        test={{
          id: test.id,
          testNumber: test.testNumber,
          status: test.status,
          listeningBand: test.listeningBand,
          readingBand: test.readingBand,
          writingBand: test.writingBand,
          speakingBand: test.speakingBand,
          overallBand: test.overallBand,
        }}
      />
    </PageWrapper>
  );
}
