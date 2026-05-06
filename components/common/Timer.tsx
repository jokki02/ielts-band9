"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { formatDuration } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Timer({
  durationS,
  running,
  onComplete,
  onTick,
}: {
  durationS: number;
  running: boolean;
  onComplete?: () => void;
  onTick?: (elapsed: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed((e) => {
        const next = e + 1;
        onTick?.(next);
        if (next >= durationS) {
          onComplete?.();
          return durationS;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, durationS, onComplete, onTick]);

  const remaining = Math.max(0, durationS - elapsed);
  const danger = remaining <= 60;
  const warning = remaining <= 300;
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-mono tabular-nums",
        danger
          ? "border-destructive/60 bg-destructive/10 text-destructive"
          : warning
          ? "border-band-7/60 bg-band-7/10 text-band-7"
          : "border-border bg-card",
      )}
    >
      <Clock className="h-4 w-4" />
      {formatDuration(remaining)}
    </div>
  );
}
