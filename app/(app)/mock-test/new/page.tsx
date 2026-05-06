import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth/get-user";

export default async function NewMockTest() {
  const user = await requireUser();
  const last = await prisma.mockTest.findFirst({
    where: { userId: user.id },
    orderBy: { testNumber: "desc" },
  });
  const nextNumber = (last?.testNumber ?? 0) + 1;
  const test = await prisma.mockTest.create({
    data: {
      userId: user.id,
      testNumber: nextNumber,
      status: "in_progress",
    },
  });
  redirect(`/mock-test/${test.id}`);
}
