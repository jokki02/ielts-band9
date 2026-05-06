"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ListeningTrack } from "@/data/listening/audio";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Play, Pause, SkipBack, Send, Eye, EyeOff } from "lucide-react";
import { normaliseAnswer } from "@/lib/ielts/question-types";

export function ListeningPractice({ track }: { track: ListeningTrack }) {
  const [playing, setPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const queueRef = useRef<SpeechSynthesisUtterance[]>([]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    };
  }, []);

  function speak() {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      toast.error("Speech synthesis is not supported in this browser.");
      return;
    }
    if (track.audioUrl) {
      // Real file path — let the user use the audio element below
      return;
    }
    window.speechSynthesis.cancel();
    queueRef.current = [];
    track.transcript.forEach((line, i) => {
      const u = new SpeechSynthesisUtterance(`${line.speaker}: ${line.text}`);
      u.rate = 0.95;
      u.pitch = 1;
      u.lang = "en-GB";
      if (i === track.transcript.length - 1) {
        u.onend = () => setPlaying(false);
      }
      queueRef.current.push(u);
      window.speechSynthesis.speak(u);
    });
    setPlaying(true);
  }

  function pause() {
    window.speechSynthesis?.pause();
    setPlaying(false);
  }
  function resume() {
    window.speechSynthesis?.resume();
    setPlaying(true);
  }
  function restart() {
    window.speechSynthesis?.cancel();
    setPlaying(false);
    setTimeout(speak, 100);
  }

  function setAnswer(num: number, v: string) {
    setAnswers((a) => ({ ...a, [String(num)]: v }));
  }

  function submit() {
    setSubmitted(true);
    setPlaying(false);
    window.speechSynthesis?.cancel();
  }

  function isCorrect(num: number, expected: string) {
    const given = normaliseAnswer(answers[String(num)] ?? "");
    if (!given) return false;
    return expected
      .split("|")
      .map((e) => normaliseAnswer(e))
      .includes(given);
  }

  const correctCount = submitted
    ? track.questions.filter((q) => isCorrect(q.num, q.expected)).length
    : 0;

  return (
    <PageWrapper>
      <PageHeader
        title={track.title}
        description={`Section ${track.section} · ${track.questions.length} questions`}
      />

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-base">Audio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {track.audioUrl ? (
            <audio
              src={track.audioUrl}
              controls
              className="w-full"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {!playing ? (
                <Button onClick={queueRef.current.length ? resume : speak} variant="default">
                  <Play className="h-4 w-4" /> Play (browser TTS)
                </Button>
              ) : (
                <Button onClick={pause} variant="outline">
                  <Pause className="h-4 w-4" /> Pause
                </Button>
              )}
              <Button onClick={restart} variant="ghost">
                <SkipBack className="h-4 w-4" /> Restart
              </Button>
              <Button
                variant="ghost"
                onClick={() => setShowTranscript((s) => !s)}
              >
                {showTranscript ? (
                  <>
                    <EyeOff className="h-4 w-4" /> Hide transcript
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" /> Show transcript
                  </>
                )}
              </Button>
            </div>
          )}
          {!track.audioUrl && (
            <p className="text-xs text-muted-foreground">
              Using your browser&apos;s text-to-speech engine. Real exam audio
              will be in a British accent — pick a UK voice in your OS settings
              for the most authentic experience.
            </p>
          )}
          {showTranscript && (
            <div className="rounded-lg border border-border bg-muted/20 p-3 text-xs space-y-1.5 max-h-72 overflow-y-auto scrollbar-thin">
              {track.transcript.map((line, i) => (
                <p key={i}>
                  <span className="text-muted-foreground font-semibold">
                    {line.speaker}:{" "}
                  </span>
                  {line.text}
                </p>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-3">
        {track.questions.map((q) => {
          const correct = submitted && isCorrect(q.num, q.expected);
          return (
            <Card
              key={q.num}
              className={
                submitted
                  ? correct
                    ? "border-band-9/40"
                    : "border-destructive/40"
                  : ""
              }
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-sm">Question {q.num}</CardTitle>
                  <Badge variant="muted" className="text-[10px]">
                    {q.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>{q.question}</p>
                {q.type === "mcq" && q.options ? (
                  <RadioGroup
                    value={answers[String(q.num)] ?? ""}
                    onValueChange={(v) => setAnswer(q.num, v)}
                    disabled={submitted}
                  >
                    {q.options.map((o) => (
                      <Label key={o} className="flex gap-2 cursor-pointer">
                        <RadioGroupItem value={o} />
                        <span>{o}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                ) : (
                  <Input
                    value={answers[String(q.num)] ?? ""}
                    onChange={(e) => setAnswer(q.num, e.target.value)}
                    disabled={submitted}
                    placeholder="Your answer"
                  />
                )}
                {submitted && (
                  <div className="text-xs space-y-0.5">
                    <p>
                      Correct answer:{" "}
                      <span className="font-mono text-band-9">{q.expected}</span>
                    </p>
                    <p className="text-muted-foreground italic">{q.explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="sticky bottom-4 mt-4 flex justify-end">
        {submitted ? (
          <Card>
            <CardContent className="p-4 text-sm">
              Score:{" "}
              <span className="font-bold">
                {correctCount}/{track.questions.length}
              </span>
            </CardContent>
          </Card>
        ) : (
          <Button onClick={submit} variant="gradient" size="lg">
            <Send className="h-4 w-4" /> Submit answers
          </Button>
        )}
      </div>
    </PageWrapper>
  );
}
