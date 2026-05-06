"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StudyPlanResult, WeeklyPlan } from "@/lib/ai/study-planner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Sparkles, Calendar as CalIcon } from "lucide-react";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export function StudyPlanView({
  existing,
  defaults,
}: {
  existing: StudyPlanResult | null;
  defaults: {
    examDate: string;
    targetBand: number;
    bands: { listening: number; reading: number; writing: number; speaking: number };
  };
}) {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState<StudyPlanResult | null>(existing);
  const [examDate, setExamDate] = useState(defaults.examDate);
  const [hours, setHours] = useState("2");
  const [weakest, setWeakest] = useState("writing");

  async function generate() {
    if (!examDate) return toast.error("Please set an exam date");
    setGenerating(true);
    try {
      const weeksUntil = Math.max(
        1,
        Math.floor(
          (new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7),
        ),
      );
      const res = await fetch("/api/study-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examDate,
          weeksUntil,
          bands: defaults.bands,
          hoursPerDay: Number(hours),
          weakest: [weakest, weakest === "writing" ? "speaking" : "writing"],
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      const data = (await res.json()) as { plan: StudyPlanResult };
      setPlan(data.plan);
      toast.success(`Plan ready (${data.plan.provider})`);
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CalIcon className="h-4 w-4 text-primary" /> Plan parameters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="examDate">Exam date</Label>
              <Input
                id="examDate"
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Hours / day</Label>
              <Select value={hours} onValueChange={setHours}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["1", "1.5", "2", "2.5", "3", "4"].map((h) => (
                    <SelectItem key={h} value={h}>
                      {h} h
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Weakest module</Label>
              <Select value={weakest} onValueChange={setWeakest}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["writing", "reading", "listening", "speaking"].map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="mt-4"
            onClick={generate}
            disabled={generating}
            variant="gradient"
          >
            <Sparkles className="h-4 w-4" />
            {generating ? "Generating…" : plan ? "Regenerate plan" : "Generate plan"}
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <>
          <Card className="mb-4">
            <CardContent className="p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Overview
              </p>
              <p className="mt-1 leading-relaxed">{plan.overview}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {plan.milestone_weeks.map((w) => (
                  <Badge key={w} variant="outline">
                    Milestone: Week {w}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue={`w${plan.weekly_plans[0]?.week ?? 1}`}>
            <TabsList className="overflow-x-auto max-w-full flex-wrap">
              {plan.weekly_plans.map((w) => (
                <TabsTrigger key={w.week} value={`w${w.week}`}>
                  Week {w.week}
                </TabsTrigger>
              ))}
            </TabsList>
            {plan.weekly_plans.map((w) => (
              <WeekPanel key={w.week} week={w} />
            ))}
          </Tabs>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-base">Final-week tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1">
                {plan.final_week_tips.map((t, i) => (
                  <li key={i}>• {t}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}

function WeekPanel({ week }: { week: WeeklyPlan }) {
  return (
    <TabsContent value={`w${week.week}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <CardTitle className="text-base">
              Week {week.week} · {week.theme}
            </CardTitle>
            <div className="flex gap-1.5">
              {week.mock_test && <Badge variant="warning">Mock this week</Badge>}
              {week.focus.map((f) => (
                <Badge key={f} variant="outline">
                  {f}
                </Badge>
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{week.weekly_goal}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
            {DAYS.map((d) => (
              <div
                key={d}
                className="rounded-lg border border-border bg-card/50 p-3 min-h-[160px]"
              >
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                  {d}
                </p>
                <ul className="space-y-2 text-xs">
                  {(week.daily_tasks[d] ?? []).map((t, i) => (
                    <li key={i} className="leading-snug">
                      <span className="font-semibold text-primary">{t.module}</span>
                      <span className="text-muted-foreground"> · {t.duration}m</span>
                      <p className="text-muted-foreground">{t.activity}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
