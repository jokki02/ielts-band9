import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";

// All authenticated routes must be rendered per-request because they read the
// (single) user record from the database. Static pre-rendering would fail at
// build time when no user exists.
export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/onboarding");

  return (
    <div className="flex min-h-screen">
      <Sidebar
        user={{ name: user.name, targetBand: user.targetBand }}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          user={{
            name: user.name,
            studyStreak: user.studyStreak,
            currentBand: user.currentBand,
            targetBand: user.targetBand,
            examDate: user.examDate,
          }}
        />
        {children}
      </div>
      <MobileNav />
    </div>
  );
}
