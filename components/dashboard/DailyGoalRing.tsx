import { Card, CardContent } from "@/components/ui/card";

export function DailyGoalRing({
  minutesToday,
  goalMins,
}: {
  minutesToday: number;
  goalMins: number;
}) {
  const pct = Math.min(100, (minutesToday / goalMins) * 100);
  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <Card>
      <CardContent className="p-5 flex items-center gap-4">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle
              cx="50"
              cy="50"
              r={r}
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r={r}
              stroke="url(#goalGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={offset}
              fill="none"
              className="transition-all duration-700"
            />
            <defs>
              <linearGradient id="goalGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(239 84% 67%)" />
                <stop offset="100%" stopColor="hsl(263 70% 65%)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-base font-bold">
            {Math.round(pct)}%
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Today&apos;s goal
          </p>
          <p className="text-2xl font-bold">
            {minutesToday}
            <span className="text-sm font-medium text-muted-foreground">
              {" "}
              / {goalMins} min
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {pct >= 100 ? "Goal smashed — well done!" : "Keep pushing"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
