import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp } from "lucide-react";
import { bandLabel } from "@/lib/utils";

export function BandScoreCard({
  current,
  target,
}: {
  current: number;
  target: number;
}) {
  const pct = Math.min(100, Math.max(0, (current / 9) * 100));
  return (
    <Card className="md:col-span-2 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      <CardContent className="p-6 relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Current overall band
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {current.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                / {target.toFixed(1)} target · {bandLabel(current)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Gap to target</p>
            <p className="text-2xl font-semibold text-band-7 flex items-center gap-1 justify-end">
              <TrendingUp className="h-4 w-4" />
              {(target - current).toFixed(1)}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <Progress
            value={pct}
            className="h-2.5"
            indicatorClassName="bg-gradient-primary"
          />
          <div className="flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
            <span>Band 0</span>
            <span>Band 9</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
