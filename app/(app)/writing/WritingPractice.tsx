"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RichEditor } from "@/components/editor/RichEditor";
import { Timer } from "@/components/common/Timer";
import { countWords } from "@/lib/utils";
import { Sparkles, RotateCcw, Send, Lightbulb, ArrowRight } from "lucide-react";

export interface WritingPracticeProps {
  taskType: "task1" | "task2";
  promptId: string;
  prompt: string;
  meta: {
    topic: string;
    type: string;
    keyVocabulary: string[];
    band9Tips: string;
    dataDescription?: string;
  };
  timeLimit: number;
  minWords: number;
  promptOptions: { id: string; label: string }[];
}

export function WritingPractice(props: WritingPracticeProps) {
  const router = useRouter();
  const storageKey = `essay-draft-${props.taskType}-${props.promptId}`;
  const [content, setContent] = useState("");
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  // Load draft
  useEffect(() => {
    const cached = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
    if (cached) setContent(cached);
  }, [storageKey]);

  // Save draft
  useEffect(() => {
    if (typeof window === "undefined") return;
    const id = setTimeout(() => localStorage.setItem(storageKey, content), 500);
    return () => clearTimeout(id);
  }, [content, storageKey]);

  const wordCount = useMemo(() => countWords(content), [content]);
  const minMet = wordCount >= props.minWords;

  async function submit() {
    if (!content.trim()) return toast.error("Write something first");
    if (wordCount < props.minWords - 30)
      return toast.error(`Aim for at least ${props.minWords} words.`);
    setSubmitting(true);
    try {
      const res = await fetch("/api/grade-essay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskType: props.taskType,
          promptId: props.promptId,
          prompt: props.prompt,
          response: content,
          timeSpent: elapsed,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Grading failed");
      const data = await res.json();
      localStorage.removeItem(storageKey);
      toast.success(`Graded — ${data.attempt.overallBand} overall`);
      router.push(`/writing/${data.attempt.id}`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageWrapper>
      <PageHeader
        title={props.taskType === "task1" ? "Writing Task 1" : "Writing Task 2"}
        description={`${props.timeLimit / 60}-minute timed practice · minimum ${props.minWords} words · AI-graded against the official IELTS criteria.`}
        actions={
          <div className="flex items-center gap-2">
            <Timer
              durationS={props.timeLimit}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> Task prompt
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm leading-relaxed">{props.prompt}</p>
              {props.meta.dataDescription && (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                  <strong className="text-foreground">Visual:</strong>{" "}
                  {props.meta.dataDescription}
                </div>
              )}
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="muted">{props.meta.type}</Badge>
                {props.meta.topic && (
                  <Badge variant="muted">{props.meta.topic}</Badge>
                )}
                <Badge variant="outline">{props.minWords}+ words</Badge>
              </div>
            </CardContent>
          </Card>
          <RichEditor
            value={content}
            onChange={setContent}
            placeholder="Begin your essay…"
          />
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm">
              <span
                className={
                  minMet ? "text-band-9 font-semibold" : "text-muted-foreground"
                }
              >
                {wordCount} words
              </span>
              {!minMet && (
                <span className="text-muted-foreground">
                  {" "}· {props.minWords - wordCount} to minimum
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm("Clear your draft?")) {
                    setContent("");
                    localStorage.removeItem(storageKey);
                  }
                }}
              >
                <RotateCcw className="h-4 w-4" /> Clear
              </Button>
              <Button
                onClick={submit}
                disabled={submitting}
                variant="gradient"
                size="lg"
              >
                <Send className="h-4 w-4" />
                {submitting ? "Grading…" : "Submit for AI grading"}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-band-7" /> Band 9 tip
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {props.meta.band9Tips}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Key vocabulary</CardTitle>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="flex flex-wrap gap-1.5">
                  {props.meta.keyVocabulary.map((kw) => (
                    <Tooltip key={kw}>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="outline"
                          className="cursor-help font-mono text-[11px]"
                        >
                          {kw}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span className="text-xs">
                          Use naturally — don&apos;t force it.
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Try a different prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 max-h-72 overflow-y-auto scrollbar-thin">
                {props.promptOptions
                  .filter((p) => p.id !== props.promptId)
                  .slice(0, 8)
                  .map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/writing/${props.taskType}?id=${p.id}`}
                        className="text-xs text-muted-foreground hover:text-foreground flex items-center justify-between gap-2 px-2 py-1.5 rounded hover:bg-muted"
                      >
                        <span className="truncate">{p.label}</span>
                        <ArrowRight className="h-3 w-3 shrink-0" />
                      </Link>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}
