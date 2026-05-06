"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SpeakingPart2 } from "@/data/speaking/cue-cards";
import { TIME_LIMITS } from "@/lib/ielts/time-limits";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Send } from "lucide-react";

type Phase = "prep" | "speak" | "review";

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (e: { results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }>; resultIndex: number }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

export function SpeakingPractice({ card }: { card: SpeakingPart2 }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("prep");
  const [transcript, setTranscript] = useState("");
  const [recognising, setRecognising] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [prepLeft, setPrepLeft] = useState<number>(TIME_LIMITS.speaking.part2Prep);
  const [speakLeft, setSpeakLeft] = useState<number>(TIME_LIMITS.speaking.part2Speak);
  const recRef = useRef<SpeechRecognitionLike | null>(null);

  // Prep timer
  useEffect(() => {
    if (phase !== "prep") return;
    const id = setInterval(() => {
      setPrepLeft((s) => {
        if (s <= 1) {
          setPhase("speak");
          startRecognition();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Speak timer
  useEffect(() => {
    if (phase !== "speak") return;
    const id = setInterval(() => {
      setSpeakLeft((s) => {
        if (s <= 1) {
          stopRecognition();
          setPhase("review");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function startRecognition() {
    if (typeof window === "undefined") return;
    const SR =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition;
    if (!SR) {
      toast.warning(
        "Speech recognition not supported in this browser — type your response instead.",
      );
      return;
    }
    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.lang = "en-GB";
    r.onresult = (e) => {
      let chunk = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        chunk += e.results[i][0].transcript;
      }
      setTranscript((prev) => {
        // Replace interim portion only
        const final = Array.from(e.results)
          .filter((res) => res.isFinal)
          .map((r) => r[0].transcript)
          .join("");
        return final || prev + chunk;
      });
    };
    r.onend = () => setRecognising(false);
    r.start();
    setRecognising(true);
    recRef.current = r;
  }

  function stopRecognition() {
    recRef.current?.stop();
    setRecognising(false);
  }

  async function submit() {
    if (!transcript.trim() || transcript.trim().split(/\s+/).length < 25) {
      return toast.error("Speak (or type) at least ~25 words");
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/grade-speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          part: 2,
          cueCardId: card.id,
          task: card.task,
          transcript,
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      const data = await res.json();
      toast.success(`Speaking band ${data.scores.overall.toFixed(1)}`);
      router.push(`/speaking?result=${encodeURIComponent(JSON.stringify(data))}`);
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PageWrapper>
      <PageHeader
        title="Speaking — Part 2"
        description={`${card.topic} · 1 minute prep + 2 minutes talk`}
      />

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-base">Cue card</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>{card.task}</p>
          <ul className="space-y-1 text-muted-foreground">
            {card.prompts.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
          <div className="flex gap-1.5 flex-wrap pt-1">
            {card.modelVocabulary.slice(0, 8).map((m) => (
              <Badge key={m} variant="outline" className="text-[10px] font-mono">
                {m}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5 space-y-4">
          {phase === "prep" && (
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Prep time
              </p>
              <p className="text-5xl font-bold font-mono tabular-nums my-2">
                {String(Math.floor(prepLeft / 60)).padStart(2, "0")}:
                {String(prepLeft % 60).padStart(2, "0")}
              </p>
              <p className="text-sm text-muted-foreground">
                Make notes — when the timer ends, recording starts automatically.
              </p>
              <Button
                className="mt-3"
                onClick={() => {
                  setPrepLeft(0);
                  setPhase("speak");
                  startRecognition();
                }}
              >
                Start speaking now
              </Button>
            </div>
          )}

          {phase === "speak" && (
            <>
              <div className="flex items-center justify-between">
                <Badge
                  variant={speakLeft < 30 ? "warning" : "default"}
                  className="font-mono tabular-nums"
                >
                  {String(Math.floor(speakLeft / 60)).padStart(2, "0")}:
                  {String(speakLeft % 60).padStart(2, "0")}
                </Badge>
                <div className="flex items-center gap-2">
                  {recognising ? (
                    <Button onClick={stopRecognition} variant="outline" size="sm">
                      <MicOff className="h-4 w-4" /> Stop mic
                    </Button>
                  ) : (
                    <Button onClick={startRecognition} variant="default" size="sm">
                      <Mic className="h-4 w-4" /> Start mic
                    </Button>
                  )}
                </div>
              </div>
              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Your spoken response will appear here. You can also type if your browser doesn't support speech recognition."
                className="min-h-[180px] font-mono text-sm"
              />
              <Button
                onClick={() => {
                  stopRecognition();
                  setPhase("review");
                }}
                variant="outline"
              >
                I&apos;m done speaking
              </Button>
            </>
          )}

          {phase === "review" && (
            <>
              <Textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="min-h-[180px] font-mono text-sm"
              />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSpeakLeft(TIME_LIMITS.speaking.part2Speak);
                    setPhase("speak");
                    startRecognition();
                  }}
                >
                  Speak more
                </Button>
                <Button
                  onClick={submit}
                  disabled={submitting}
                  variant="gradient"
                  size="lg"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Analysing…" : "Submit for AI feedback"}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Part 3 follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm text-muted-foreground space-y-1">
            {card.followUpPart3.map((q, i) => (
              <li key={i}>• {q}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
