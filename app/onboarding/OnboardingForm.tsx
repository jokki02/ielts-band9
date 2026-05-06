"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export function OnboardingForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentBand, setCurrentBand] = useState("6.5");
  const [targetBand, setTargetBand] = useState("9.0");
  const [examDate, setExamDate] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter a name");
    if (!email.trim()) return toast.error("Please enter an email");
    setSubmitting(true);
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          currentBand: Number(currentBand),
          targetBand: Number(targetBand),
          examDate: examDate || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create profile");
      }
      toast.success("Profile ready");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  const bands = ["4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tell me about yourself</CardTitle>
        <CardDescription>
          We&apos;ll use this to tailor your study plan and feedback. You can change
          everything later in Settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Your name</Label>
              <Input
                id="name"
                placeholder="e.g. Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Current Band (estimate)</Label>
              <Select value={currentBand} onValueChange={setCurrentBand}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bands.map((b) => (
                    <SelectItem key={b} value={b}>
                      Band {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Target Band</Label>
              <Select value={targetBand} onValueChange={setTargetBand}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {bands.slice(4).map((b) => (
                    <SelectItem key={b} value={b}>
                      Band {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="examDate">Exam date (optional)</Label>
            <Input
              id="examDate"
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
            />
            <p className="text-[11px] text-muted-foreground">
              We&apos;ll generate a study plan calibrated to this date.
            </p>
          </div>
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={submitting}
          >
            {submitting ? "Setting up…" : "Start studying"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
