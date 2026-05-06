"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ExternalLink, AlertTriangle, Plus, Loader2 } from "lucide-react";
import type { DiscoverModule, DiscoverSuggestion } from "@/lib/ai/discoverer";

interface Props {
  module: DiscoverModule;
  /** Optional pre-filled topic placeholder. */
  defaultTopic?: string;
  /** Compact button variant for placement next to other actions. */
  compact?: boolean;
}

const MODULE_LABELS: Record<DiscoverModule, string> = {
  listening: "more listening material",
  reading: "more reading passages",
  "writing-task1": "more Task 1 prompts",
  "writing-task2": "more Task 2 prompts",
  vocabulary: "more vocabulary",
  speaking: "more speaking cue cards",
  tips: "more study tips",
};

export function DiscoverPanel({ module, defaultTopic, compact }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<DiscoverSuggestion[]>([]);
  const [provider, setProvider] = useState<"gemini" | "heuristic" | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [adding, setAdding] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setWarning(null);
    setResults([]);
    try {
      const res = await fetch("/api/discover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ module, topic: topic.trim() || undefined }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      const data = (await res.json()) as {
        suggestions: DiscoverSuggestion[];
        provider: "gemini" | "heuristic";
        warning?: string;
      };
      setResults(data.suggestions || []);
      setProvider(data.provider);
      if (data.warning) setWarning(data.warning);
      if (!data.suggestions?.length && !data.warning) {
        setWarning("The AI returned no suggestions. Try a different topic.");
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function addToVocab(s: DiscoverSuggestion) {
    setAdding(s.title);
    try {
      const res = await fetch("/api/vocabulary/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          word: String(s.meta?.word ?? ""),
          definition: String(s.meta?.definition ?? s.description),
          partOfSpeech: String(s.meta?.partOfSpeech ?? "noun"),
          bandLevel: Number(s.meta?.bandLevel ?? 7.5),
          topic: String(s.meta?.topic ?? "ai-suggested"),
          exampleSent: String(s.meta?.exampleSent ?? ""),
          source: s.sourceName,
          sourceUrl: s.sourceUrl,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to add");
      }
      toast.success(`Added "${s.meta?.word ?? s.title}" to your deck`);
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setAdding(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={compact ? "outline" : "default"} size={compact ? "sm" : "default"}>
          <Sparkles className="h-4 w-4" /> Discover {MODULE_LABELS[module]}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-band-9" /> Discover {MODULE_LABELS[module]}
          </DialogTitle>
          <DialogDescription>
            The AI searches publicly-available, openly-licensed sources (TED-Ed, Wikipedia, OpenStax,
            VOA, IELTS Liz, IELTS Updates and Recent Exams, British Council, IDP, Cambridge English) and
            returns links you can verify. The AI does <strong>not</strong> generate the learning content
            itself — it only points to real third-party material.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 items-center">
          <Input
            placeholder={defaultTopic || "Optional topic (e.g. environment, technology, urbanisation)"}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") run();
            }}
            disabled={busy}
          />
          <Button onClick={run} disabled={busy} variant="gradient">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {busy ? "Searching…" : "Find more"}
          </Button>
        </div>

        {warning && (
          <Card className="border-warning/40">
            <CardContent className="p-3 text-xs flex gap-2 items-start">
              <AlertTriangle className="h-4 w-4 shrink-0 text-warning mt-0.5" />
              <p>{warning}</p>
            </CardContent>
          </Card>
        )}

        {results.length > 0 && (
          <>
            <p className="text-[11px] text-muted-foreground">
              <strong>AI-discovered links</strong> — please open and verify each source before relying
              on it. The AI may occasionally hallucinate URLs.
              {provider === "gemini" && " Provider: Gemini."}
            </p>
            <div className="space-y-2">
              {results.map((s, i) => (
                <Card key={i} className="hover:border-band-9/30 transition-colors">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold leading-snug">{s.title}</p>
                      <Badge variant="outline" className="text-[10px] shrink-0">
                        {s.licence}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.description}</p>
                    {s.why && (
                      <p className="text-[11px] text-muted-foreground italic">
                        Why: {s.why}
                      </p>
                    )}
                    <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
                      <p className="text-[11px] text-muted-foreground">
                        Source: <strong className="text-foreground">{s.sourceName}</strong>
                      </p>
                      <div className="flex gap-1.5">
                        <Button
                          asChild
                          size="sm"
                          variant="outline"
                          className="text-[11px] h-7"
                        >
                          <a
                            href={s.sourceUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            <ExternalLink className="h-3 w-3" /> Open source
                          </a>
                        </Button>
                        {module === "vocabulary" && s.meta?.word && (
                          <Button
                            size="sm"
                            variant="default"
                            className="text-[11px] h-7"
                            disabled={adding === s.title}
                            onClick={() => addToVocab(s)}
                          >
                            {adding === s.title ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Plus className="h-3 w-3" />
                            )}
                            Add to deck
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
