import * as Lucide from "lucide-react";
import { requireUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ACHIEVEMENTS } from "@/data/achievements/achievements";
import { cn } from "@/lib/utils";

const RARITY_STYLE: Record<string, string> = {
  common: "border-muted-foreground/30 text-muted-foreground",
  rare: "border-band-7/40 text-band-7",
  epic: "border-primary/50 text-primary",
  legendary: "border-band-9/60 text-band-9 shadow-glow",
};

export default async function AchievementsPage() {
  const user = await requireUser();
  const earned = await prisma.achievement.findMany({
    where: { userId: user.id },
  });
  const earnedSet = new Set(earned.map((a) => a.type));

  return (
    <PageWrapper>
      <PageHeader
        title="Achievements"
        description={`Unlocked ${earned.length} of ${ACHIEVEMENTS.length}`}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {ACHIEVEMENTS.map((a) => {
          const isEarned = earnedSet.has(a.type);
          const Icon = (Lucide as unknown as Record<string, React.ElementType>)[a.icon] ?? Lucide.Star;
          return (
            <Card
              key={a.type}
              className={cn(
                "transition-all",
                isEarned ? RARITY_STYLE[a.rarity] : "opacity-50 grayscale",
              )}
            >
              <CardContent className="p-4 text-center">
                <div
                  className={cn(
                    "mx-auto h-12 w-12 rounded-xl flex items-center justify-center mb-2",
                    isEarned ? "bg-card" : "bg-muted/30",
                  )}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold leading-tight">{a.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                <Badge
                  variant="outline"
                  className="mt-2 text-[10px] capitalize"
                >
                  {a.rarity}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageWrapper>
  );
}
