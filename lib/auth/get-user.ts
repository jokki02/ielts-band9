import "server-only";
import { prisma } from "@/lib/db";

/**
 * Single-user app: there is exactly ONE user record. We return it (creating the
 * record on first call to keep dev-server bootstraps frictionless), or null if
 * onboarding was skipped explicitly by setting the body to nothing — but in our
 * case the onboarding page populates the user. The helper is idempotent.
 */
export async function getUser() {
  const user = await prisma.user.findFirst({
    include: { settings: true, studyPlan: true },
    orderBy: { createdAt: "asc" },
  });
  return user;
}

export async function requireUser() {
  const user = await getUser();
  if (!user) {
    throw new Error("NO_USER");
  }
  return user;
}
