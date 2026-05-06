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
import { Mic, MicOff, Send, AlertTriangle } from "lucide-react";

type Phase = "prep" | "speak" | "review";
type MicStatus = "idle" | "requesting" | "listening" | "denied" | "unsupported" | "error";

// Minimal SpeechRecognition typing — Web Speech API isn't in lib.dom.d.ts
interface SpeechRecognitionResultLike {
  isFinal: boolean;
  0: { transcript: string };
}
interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike> & {
    [Symbol.iterator]?: () => Iterator<SpeechRecognitionResultLike>;
  };
  resultIndex: number;
}
interface SpeechRecognitionErrorEventLike {
  error: string;
  message?: string;
}
interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onaudiostart: (() => void) | null;
  onresult: ((e: SpeechRecognitionEventLike) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export function SpeakingPractice({ card }: { card: SpeakingPart2 }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("prep");
  // Final transcript persisted across recognition results (and across restarts).
  const [finalText, setFinalText] = useState("");
  // Live interim text (not yet final) — separate so each onresult event doesn't
  // double-append. We render `finalText + interim` in the textarea.
  const [interim, setInterim] = useState("");
  const [micStatus, setMicStatus] = useState<MicStatus>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [prepLeft, setPrepLeft] = useState<number>(TIME_LIMITS.speaking.part2Prep);
  const [speakLeft, setSpeakLeft] = useState<number>(TIME_LIMITS.speaking.part2Speak);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  // Tracks whether the user actively wants the mic on. Chrome stops the
  // recogniser on long silences even when continuous=true, so we auto-restart
  // from `onend` only if this is true.
  const wantsMicRef = useRef(false);

  // Browser support detection
  const [isSupported, setIsSupported] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR =
      (window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition;
    if (!SR) {
      setIsSupported(false);
      setMicStatus("unsupported");
    }
  }, []);

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      wantsMicRef.current = false;
      try {
        recRef.current?.abort();
      } catch {
        // ignore
      }
    };
  }, []);

  async function ensureMicPermission(): Promise<boolean> {
    // Try a getUserMedia probe so the browser surfaces its native permission
    // prompt BEFORE we hand off to SpeechRecognition (which on Chrome can
    // silently fail on the second visit if the prompt was dismissed once).
    if (!navigator?.mediaDevices?.getUserMedia) return true; // fall through to SR
    try {
      setMicStatus("requesting");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Immediately release — SpeechRecognition uses its own audio capture.
      stream.getTracks().forEach((t) => t.stop());
      return true;
    } catch (err) {
      const name = (err as Error).name;
      if (name === "NotAllowedError" || name === "PermissionDeniedError") {
        setMicStatus("denied");
        toast.error(
          "Microphone permission denied. Click the camera icon in the address bar → Site settings → Allow microphone, then refresh.",
        );
      } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
        setMicStatus("error");
        toast.error("No microphone detected. Plug one in and try again.");
      } else {
        setMicStatus("error");
        toast.error(`Microphone error: ${(err as Error).message}`);
      }
      return false;
    }
  }

  async function startRecognition() {
    if (typeof window === "undefined") return;
    const SR =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition;
    if (!SR) {
      setMicStatus("unsupported");
      toast.warning(
        "Speech recognition isn't supported in this browser. Try Chrome / Edge on desktop, or type your response.",
      );
      return;
    }

    const ok = await ensureMicPermission();
    if (!ok) return;

    // If something is already running, abort it first.
    try {
      recRef.current?.abort();
    } catch {
      // ignore
    }

    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.lang = "en-GB";

    r.onstart = () => {
      setMicStatus("listening");
    };
    r.onaudiostart = () => {
      setMicStatus("listening");
    };
    r.onresult = (e) => {
      // Aggregate ALL final results from the whole session into finalText, and
      // separately collect any current-event interim text. This is the only
      // shape that survives Chrome's behaviour of resetting `resultIndex` after
      // each batch.
      let newFinalChunk = "";
      let interimChunk = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) {
          newFinalChunk += res[0].transcript;
        } else {
          interimChunk += res[0].transcript;
        }
      }
      if (newFinalChunk) {
        setFinalText((prev) => (prev ? prev + " " + newFinalChunk.trim() : newFinalChunk.trim()));
      }
      setInterim(interimChunk);
    };
    r.onerror = (e) => {
      // Common Chrome errors: "no-speech" (silence), "audio-capture",
      // "not-allowed" (permission), "network" (offline), "aborted".
      if (e.error === "no-speech") {
        // Don't surface — Chrome fires this often when the user pauses.
        return;
      }
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        setMicStatus("denied");
        toast.error(
          "Microphone blocked. Click the lock/camera icon next to the URL → Site settings → Allow microphone, then refresh.",
        );
        wantsMicRef.current = false;
        return;
      }
      if (e.error === "aborted") {
        // We aborted intentionally — don't surface.
        return;
      }
      setMicStatus("error");
      toast.error(`Speech recogniser error: ${e.error}${e.message ? " — " + e.message : ""}`);
    };
    r.onend = () => {
      setInterim(""); // any pending interim is now lost; that's fine
      // Chrome stops `continuous` recognition after long silences. If the user
      // still wants the mic on, transparently restart so they don't see a dead
      // recogniser.
      if (wantsMicRef.current && phase === "speak") {
        try {
          r.start();
          return;
        } catch {
          // fall through — recogniser already started, or in a bad state
        }
      }
      setMicStatus("idle");
    };

    try {
      r.start();
      wantsMicRef.current = true;
      recRef.current = r;
    } catch (err) {
      setMicStatus("error");
      toast.error(`Could not start recogniser: ${(err as Error).message}`);
    }
  }

  function stopRecognition() {
    wantsMicRef.current = false;
    try {
      recRef.current?.stop();
    } catch {
      // ignore
    }
    setMicStatus("idle");
  }

  async function submit() {
    const combined = (finalText + " " + interim).trim();
    if (!combined || combined.split(/\s+/).length < 25) {
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
          transcript: combined,
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

  const liveTranscript = finalText + (interim ? (finalText ? " " : "") + interim : "");
  const recognising = micStatus === "listening" || micStatus === "requesting";

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

      {!isSupported && (
        <Card className="mb-4 border-destructive/40">
          <CardContent className="p-4 text-sm flex gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Speech recognition isn&apos;t supported in this browser.</p>
              <p className="text-muted-foreground mt-1">
                The Web Speech API works in <strong>Chrome, Edge and Brave</strong> on desktop and Android. On
                iOS Safari and Firefox you can still <strong>type</strong> your spoken response — the AI grader will
                analyse the text the same way.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {micStatus === "denied" && (
        <Card className="mb-4 border-destructive/40">
          <CardContent className="p-4 text-sm flex gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Microphone is blocked for this site.</p>
              <p className="text-muted-foreground mt-1">
                Click the lock / camera icon to the left of the URL → <strong>Site settings</strong> →
                <strong> Microphone: Allow</strong> → refresh the page. Or type your response in the box below.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

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
                  {micStatus === "listening" && (
                    <Badge variant="default" className="gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-band-9 animate-pulse" />
                      Listening
                    </Badge>
                  )}
                  {micStatus === "requesting" && (
                    <Badge variant="muted">Asking permission…</Badge>
                  )}
                  {micStatus === "idle" && isSupported && (
                    <Badge variant="muted">Mic off</Badge>
                  )}
                  {recognising ? (
                    <Button onClick={stopRecognition} variant="outline" size="sm">
                      <MicOff className="h-4 w-4" /> Stop mic
                    </Button>
                  ) : (
                    <Button
                      onClick={startRecognition}
                      variant="default"
                      size="sm"
                      disabled={!isSupported}
                    >
                      <Mic className="h-4 w-4" /> Start mic
                    </Button>
                  )}
                </div>
              </div>
              <Textarea
                value={liveTranscript}
                onChange={(e) => {
                  // Manual edit overrides the recogniser's stored final text.
                  setFinalText(e.target.value);
                  setInterim("");
                }}
                placeholder="Your spoken response will appear here as you talk. You can also type if your browser doesn't support speech recognition or if the mic is blocked."
                className="min-h-[180px] font-mono text-sm"
              />
              <div className="text-xs text-muted-foreground">
                {liveTranscript.trim() ? `${liveTranscript.trim().split(/\s+/).length} words` : "Waiting for speech…"}
              </div>
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
                value={liveTranscript}
                onChange={(e) => {
                  setFinalText(e.target.value);
                  setInterim("");
                }}
                className="min-h-[180px] font-mono text-sm"
              />
              <div className="flex justify-between flex-wrap gap-2">
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
