import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/get-user";
import { OnboardingForm } from "./OnboardingForm";

export default async function OnboardingPage() {
  const user = await getUser();
  if (user) redirect("/");
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-glow mb-4">
            B9
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to IELTS Band 9 Prep
          </h1>
          <p className="text-muted-foreground mt-2">
            A personal study studio for one student — you. Set up your profile to
            get started.
          </p>
        </div>
        <OnboardingForm />
      </div>
    </main>
  );
}
