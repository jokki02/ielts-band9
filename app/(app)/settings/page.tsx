import { requireUser } from "@/lib/auth/get-user";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const user = await requireUser();
  return (
    <PageWrapper>
      <PageHeader
        title="Settings"
        description="Update your profile, study goals, and preferences."
      />
      <SettingsForm
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          currentBand: user.currentBand,
          targetBand: user.targetBand,
          examDate: user.examDate
            ? new Date(user.examDate).toISOString().slice(0, 10)
            : "",
          dailyGoalMins: user.settings?.dailyGoalMins ?? 60,
          preferredAI: user.settings?.preferredAI ?? "gemini",
        }}
      />
    </PageWrapper>
  );
}
