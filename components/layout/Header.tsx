import { Flame, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { greetByTime, daysBetween } from "@/lib/utils";

export function Header({
  user,
}: {
  user: {
    name: string;
    studyStreak: number;
    currentBand: number;
    targetBand: number;
    examDate?: Date | null;
  };
}) {
  const daysToExam = user.examDate
    ? Math.max(0, daysBetween(new Date(), user.examDate))
    : null;

  return (
    <header className="border-b border-border/60 bg-background/60 backdrop-blur sticky top-0 z-30">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2 min-w-0">
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
              B9
            </div>
            <span className="font-semibold text-sm">IELTS Band 9</span>
          </Link>
          <div className="hidden sm:block">
            <p className="text-xs text-muted-foreground">
              {greetByTime()},
              <span className="text-foreground font-medium ml-1">{user.name}</span>
            </p>
            <p className="text-[11px] text-muted-foreground/80 -mt-0.5">
              Stay on the path to Band {user.targetBand}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Badge variant="outline" className="gap-1 text-[11px]">
            <Flame className="h-3 w-3 text-band-7" />
            {user.studyStreak} day{user.studyStreak === 1 ? "" : "s"}
          </Badge>
          {daysToExam !== null && (
            <Badge
              variant={daysToExam <= 14 ? "warning" : "outline"}
              className="text-[11px]"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              {daysToExam}d to exam
            </Badge>
          )}
          <Badge variant="band-7" className="text-[11px]">
            Current: Band {user.currentBand.toFixed(1)}
          </Badge>
        </div>
      </div>
    </header>
  );
}
