"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserVals {
  id: string;
  name: string;
  email: string;
  currentBand: number;
  targetBand: number;
  examDate: string;
  dailyGoalMins: number;
  preferredAI: string;
}

const BANDS = ["4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"];

export function SettingsForm({ user }: { user: UserVals }) {
  const router = useRouter();
  const [vals, setVals] = useState(user);
  const [saving, setSaving] = useState(false);

  function set<K extends keyof UserVals>(k: K, v: UserVals[K]) {
    setVals((s) => ({ ...s, [k]: v }));
  }

  async function save() {
    setSaving(true);
    try {
      const userRes = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: vals.name,
          email: vals.email,
          currentBand: vals.currentBand,
          targetBand: vals.targetBand,
          examDate: vals.examDate || null,
        }),
      });
      if (!userRes.ok) throw new Error((await userRes.json()).error || "Failed to save user");

      const settingsRes = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dailyGoalMins: vals.dailyGoalMins,
          preferredAI: vals.preferredAI,
        }),
      });
      if (!settingsRes.ok) throw new Error((await settingsRes.json()).error || "Failed to save settings");

      toast.success("Settings saved");
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={vals.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={vals.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Current band</Label>
              <Select
                value={vals.currentBand.toString()}
                onValueChange={(v) => set("currentBand", Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BANDS.map((b) => (
                    <SelectItem key={b} value={b}>
                      Band {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Target band</Label>
              <Select
                value={vals.targetBand.toString()}
                onValueChange={(v) => set("targetBand", Number(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {BANDS.map((b) => (
                    <SelectItem key={b} value={b}>
                      Band {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="examDate">Exam date</Label>
            <Input
              id="examDate"
              type="date"
              value={vals.examDate}
              onChange={(e) => set("examDate", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="goal">Daily goal (minutes)</Label>
            <Input
              id="goal"
              type="number"
              min={10}
              max={480}
              value={vals.dailyGoalMins}
              onChange={(e) => set("dailyGoalMins", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Preferred AI</Label>
            <Select
              value={vals.preferredAI}
              onValueChange={(v) => set("preferredAI", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini">Gemini (Google)</SelectItem>
                <SelectItem value="groq">Groq (Llama)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-[11px] text-muted-foreground">
              We always fall back to the other provider, then to a local heuristic, if your preferred AI is unavailable.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={save} disabled={saving} variant="gradient" size="lg">
        {saving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}
