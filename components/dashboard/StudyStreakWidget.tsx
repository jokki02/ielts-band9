import { Card, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

export function StudyStreakWidget({
  streak,
  totalMins,
}: {
  streak: number;
  totalMins: number;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-band-7/15 flex items-center justify-center">
            <Flame className="h-6 w-6 text-band-7" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Study streak
            </p>
            <p className="text-2xl font-bold">
              {streak} <span className="text-sm font-medium text-muted-foreground">days</span>
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          {Math.round(totalMins / 60)}h total studied · keep going!
        </p>
      </CardContent>
    </Card>
  );
}
