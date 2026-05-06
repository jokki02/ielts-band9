import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PenLine, BookOpen, Headphones, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModuleStat {
  module: "writing" | "reading" | "listening" | "speaking";
  attempts: number;
  band: number | null;
}

const META = {
  writing: { label: "Writing", icon: PenLine, href: "/writing", color: "writing" },
  reading: { label: "Reading", icon: BookOpen, href: "/reading", color: "reading" },
  listening: { label: "Listening", icon: Headphones, href: "/listening", color: "listening" },
  speaking: { label: "Speaking", icon: Mic, href: "/speaking", color: "speaking" },
};

export function QuickStatsGrid({ stats }: { stats: ModuleStat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((s) => {
        const m = META[s.module];
        const Icon = m.icon;
        return (
          <Link key={s.module} href={m.href}>
            <Card className="p-4 hover:border-primary/60 transition-colors h-full">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "h-9 w-9 rounded-lg flex items-center justify-center",
                    s.module === "writing" && "bg-writing/15 text-writing",
                    s.module === "reading" && "bg-reading/15 text-reading",
                    s.module === "listening" && "bg-listening/15 text-listening",
                    s.module === "speaking" && "bg-speaking/15 text-speaking",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                {s.band !== null && (
                  <span className="text-xl font-bold">{s.band.toFixed(1)}</span>
                )}
              </div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-3">
                {m.label}
              </p>
              <p className="text-sm">
                {s.attempts}{" "}
                <span className="text-muted-foreground">
                  {s.attempts === 1 ? "attempt" : "attempts"}
                </span>
              </p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
