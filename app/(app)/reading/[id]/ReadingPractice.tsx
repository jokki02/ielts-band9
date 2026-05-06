"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ReadingPassage } from "@/data/reading/passages";
import { TIME_LIMITS } from "@/lib/ielts/time-limits";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Timer } from "@/components/common/Timer";
import { QUESTION_TYPE_LABEL } from "@/lib/ielts/question-types";
import { Send } from "lucide-react";

type Answers = Record<string, string | string[]>;

export function ReadingPractice({ passage }: { passage: ReadingPassage }) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const setAnswer = (q: number, v: string | string[]) =>
    setAnswers((a) => ({ ...a, [String(q)]: v }));

  const filled = useMemo(
    () =>
      passage.questions.filter((q) => {
        const a = answers[String(q.num)];
        return a !== undefined && (Array.isArray(a) ? a.length > 0 : a !== "");
      }).length,
    [answers, passage.questions],
  );

  async function submit() {
    if (filled === 0) return toast.error("Answer at least one question");
    setSubmitting(true);
    try {
      const res = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passageId: passage.id,
          answers,
          timeSpent: elapsed,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      const data = await res.json();
      toast.success(`${data.rawScore}/${data.totalQs} correct · Band ${data.bandScore}`);
      router.push(`/reading/${passage.id}/result?attempt=${data.id}`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageWrapper>
      <PageHeader
        title={passage.title}
        description={`${passage.source} · ${passage.questions.length} questions · 20 minutes`}
        actions={
          <div className="flex gap-2">
            <Timer
              durationS={TIME_LIMITS.reading.perPassage}
              running={running}
              onComplete={() => {
                setRunning(false);
                toast.warning("Time's up");
              }}
              onTick={(e) => setElapsed(e)}
            />
            {!running ? (
              <Button onClick={() => setRunning(true)} variant="gradient">
                Start timer
              </Button>
            ) : (
              <Button onClick={() => setRunning(false)} variant="outline">
                Pause
              </Button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="lg:max-h-[80vh] overflow-y-auto scrollbar-thin">
          <CardHeader>
            <CardTitle className="text-base">Reading Passage</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert prose-sm max-w-none">
            {passage.paragraphs.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4 lg:max-h-[80vh] lg:overflow-y-auto lg:pr-2 scrollbar-thin">
          {passage.questions.map((q) => (
            <Card key={q.num}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-sm">
                    Question {q.num}
                  </CardTitle>
                  <Badge variant="muted" className="text-[10px]">
                    {QUESTION_TYPE_LABEL[q.type]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>{q.question}</p>
                {q.type === "tfng" && (
                  <RadioGroup
                    value={(answers[String(q.num)] as string) ?? ""}
                    onValueChange={(v) => setAnswer(q.num, v)}
                  >
                    {["TRUE", "FALSE", "NOT GIVEN"].map((o) => (
                      <Label
                        key={o}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <RadioGroupItem value={o} />
                        <span>{o}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
                {q.type === "ynng" && (
                  <RadioGroup
                    value={(answers[String(q.num)] as string) ?? ""}
                    onValueChange={(v) => setAnswer(q.num, v)}
                  >
                    {["YES", "NO", "NOT GIVEN"].map((o) => (
                      <Label
                        key={o}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <RadioGroupItem value={o} />
                        <span>{o}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
                {(q.type === "mcq" || q.type === "matching_headings") && q.options && (
                  <RadioGroup
                    value={(answers[String(q.num)] as string) ?? ""}
                    onValueChange={(v) => setAnswer(q.num, v)}
                  >
                    {q.options.map((o) => (
                      <Label
                        key={o}
                        className="flex items-start gap-2 cursor-pointer"
                      >
                        <RadioGroupItem value={o} className="mt-0.5" />
                        <span className="text-xs">{o}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
                {q.type === "mcq_multi" && q.options && (
                  <div className="space-y-1.5">
                    {q.options.map((o) => {
                      const arr = (answers[String(q.num)] as string[]) ?? [];
                      const checked = arr.includes(o);
                      return (
                        <Label
                          key={o}
                          className="flex items-start gap-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(c) => {
                              const next = c
                                ? [...arr, o]
                                : arr.filter((x) => x !== o);
                              setAnswer(q.num, next);
                            }}
                            className="mt-0.5"
                          />
                          <span className="text-xs">{o}</span>
                        </Label>
                      );
                    })}
                  </div>
                )}
                {q.type === "matching_information" && q.options && (
                  <RadioGroup
                    value={(answers[String(q.num)] as string) ?? ""}
                    onValueChange={(v) => setAnswer(q.num, v)}
                    className="grid grid-cols-3 sm:grid-cols-6 gap-1"
                  >
                    {q.options.map((o) => (
                      <Label
                        key={o}
                        className="flex items-center gap-1.5 cursor-pointer rounded border border-border px-2 py-1"
                      >
                        <RadioGroupItem value={o} />
                        <span className="text-xs">Para {o}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
                {(q.type === "sentence_completion" ||
                  q.type === "note_completion" ||
                  q.type === "table_completion" ||
                  q.type === "flowchart_completion" ||
                  q.type === "short_answer") && (
                  <Input
                    placeholder="Your answer"
                    value={(answers[String(q.num)] as string) ?? ""}
                    onChange={(e) => setAnswer(q.num, e.target.value)}
                  />
                )}
                {q.type === "summary_completion" && (
                  <div className="space-y-2">
                    {(Array.isArray(q.expected) ? q.expected : ["A"]).map(
                      (_, idx) => {
                        const arr = (answers[String(q.num)] as string[]) ?? [];
                        return (
                          <Input
                            key={idx}
                            placeholder={`Blank (${String.fromCharCode(65 + idx)})`}
                            value={arr[idx] ?? ""}
                            onChange={(e) => {
                              const next = [...arr];
                              next[idx] = e.target.value;
                              setAnswer(q.num, next);
                            }}
                          />
                        );
                      },
                    )}
                  </div>
                )}
                {q.type === "matching_features" && (
                  <Textarea
                    placeholder="Your answer"
                    value={(answers[String(q.num)] as string) ?? ""}
                    onChange={(e) => setAnswer(q.num, e.target.value)}
                    className="min-h-[60px]"
                  />
                )}
                {q.type === "matching_sentence_endings" && (
                  <Input
                    placeholder="Your answer"
                    value={(answers[String(q.num)] as string) ?? ""}
                    onChange={(e) => setAnswer(q.num, e.target.value)}
                  />
                )}
              </CardContent>
            </Card>
          ))}

          <div className="sticky bottom-4 lg:bottom-0 flex items-center justify-between gap-3 bg-card/90 backdrop-blur border border-border rounded-xl p-3">
            <span className="text-xs text-muted-foreground">
              {filled}/{passage.questions.length} answered
            </span>
            <Button
              onClick={submit}
              disabled={submitting}
              variant="gradient"
              size="lg"
            >
              <Send className="h-4 w-4" /> {submitting ? "Marking…" : "Submit answers"}
            </Button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
