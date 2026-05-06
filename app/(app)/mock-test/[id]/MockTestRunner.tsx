"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { averageOverall } from "@/lib/ielts/band-calculator";
import { Headphones, BookOpen, PenLine, Mic, ClipboardCheck } from "lucide-react";

interface T {
  id: string;
  testNumber: number;
  status: string;
  listeningBand: number | null;
  readingBand: number | null;
  writingBand: number | null;
  speakingBand: number | null;
  overallBand: number | null;
}

export function MockTestRunner({ test }: { test: T }) {
  const router = useRouter();
  const [vals, setVals] = useState<{ [k in "listening" | "reading" | "writing" | "speaking"]: string }>({
    listening: test.listeningBand?.toString() ?? "",
    reading: test.readingBand?.toString() ?? "",
    writing: test.writingBand?.toString() ?? "",
    speaking: test.speakingBand?.toString() ?? "",
  });
  const [saving, setSaving] = useState(false);

  function set(k: keyof typeof vals, v: string) {
    setVals((s) => ({ ...s, [k]: v }));
  }

  const numericVals = (["listening", "reading", "writing", "speaking"] as const).map((k) => {
    const n = Number(vals[k]);
    return Number.isFinite(n) && vals[k] !== "" ? n : null;
  });
  const allFilled = numericVals.every((n) => n !== null);
  const overall = allFilled ? averageOverall(numericVals as number[]) : null;

  async function save(complete: boolean) {
    setSaving(true);
    try {
      const res = await fetch(`/api/mock-test/${test.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listeningBand: vals.listening ? Number(vals.listening) : null,
          readingBand: vals.reading ? Number(vals.reading) : null,
          writingBand: vals.writing ? Number(vals.writing) : null,
          speakingBand: vals.speaking ? Number(vals.speaking) : null,
          status: complete ? "completed" : "in_progress",
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      toast.success(complete ? "Mock test marked complete" : "Saved");
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const cards: { key: keyof typeof vals; label: string; icon: React.ElementType }[] = [
    { key: "listening", label: "Listening", icon: Headphones },
    { key: "reading", label: "Reading", icon: BookOpen },
    { key: "writing", label: "Writing", icon: PenLine },
    { key: "speaking", label: "Speaking", icon: Mic },
  ];

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Card key={c.key}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  {c.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label className="text-xs text-muted-foreground">Band</Label>
                <Input
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min="0"
                  max="9"
                  value={vals[c.key]}
                  onChange={(e) => set(c.key, e.target.value)}
                  placeholder="e.g. 7.5"
                />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mb-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <CardContent className="relative p-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Overall band (averaging rule)
            </p>
            <p className="text-4xl font-bold mt-1">
              {overall ? overall.toFixed(1) : "—"}
            </p>
          </div>
          <Badge variant={test.status === "completed" ? "band-9" : "muted"}>
            <ClipboardCheck className="h-3 w-3 mr-1" />
            {test.status}
          </Badge>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={() => save(false)} disabled={saving} variant="outline">
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button
          onClick={() => save(true)}
          disabled={saving || !allFilled}
          variant="gradient"
        >
          Complete mock test
        </Button>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Recommended sequence</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Listening — open a Listening lab session and record the band.</li>
            <li>Reading — choose any unlocked passage; record the band.</li>
            <li>Writing — submit a Task 1 then Task 2; average the two bands.</li>
            <li>Speaking — record a Part 2 response and use the AI band.</li>
            <li>Return here, enter all 4 bands, and tap &ldquo;Complete mock test&rdquo;.</li>
          </ol>
        </CardContent>
      </Card>
    </>
  );
}
