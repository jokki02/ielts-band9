"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ReviewCard {
  id: string;
  word: string;
  definition: string;
  pronunciation: string | null;
  partOfSpeech: string;
  bandLevel: number;
  topic: string;
  exampleSent: string;
  collocations: string[];
  synonyms: string[];
  antonyms: string[];
}

const RATING_LABELS: { value: 0 | 1 | 2 | 3 | 4 | 5; label: string; color: string }[] = [
  { value: 0, label: "Blank", color: "bg-destructive/30 hover:bg-destructive/50 text-destructive-foreground" },
  { value: 1, label: "Wrong", color: "bg-destructive/20 hover:bg-destructive/40" },
  { value: 2, label: "Hard", color: "bg-band-6/20 hover:bg-band-6/40" },
  { value: 3, label: "OK", color: "bg-band-7/20 hover:bg-band-7/40" },
  { value: 4, label: "Easy", color: "bg-band-8/20 hover:bg-band-8/40" },
  { value: 5, label: "Perfect", color: "bg-band-9/20 hover:bg-band-9/40" },
];

export function ReviewSession({ cards }: { cards: ReviewCard[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState({ good: 0, bad: 0 });
  const card = cards[index];

  if (!card) return null;

  async function rate(r: 0 | 1 | 2 | 3 | 4 | 5) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/vocabulary/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardId: card.id, rating: r }),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed");
      setStats((s) => ({ good: s.good + (r >= 3 ? 1 : 0), bad: s.bad + (r < 3 ? 1 : 0) }));
      if (index === cards.length - 1) {
        toast.success("Session complete");
        router.push("/vocabulary");
        router.refresh();
      } else {
        setIndex((i) => i + 1);
        setFlipped(false);
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <span>
          Card {index + 1} / {cards.length}
        </span>
        <span>
          <span className="text-band-9">{stats.good}</span>
          {" / "}
          <span className="text-destructive">{stats.bad}</span>
        </span>
      </div>

      <div
        className="relative cursor-pointer perspective-1000 h-72"
        onClick={() => setFlipped((f) => !f)}
      >
        <div
          className={cn(
            "relative w-full h-full transition-transform duration-500 transform-style-3d",
            flipped && "[transform:rotateY(180deg)]",
          )}
        >
          {/* Front */}
          <Card className="absolute inset-0 backface-hidden flex items-center justify-center">
            <CardContent className="p-8 text-center">
              <Badge variant="outline" className="mb-3">{card.topic} · B{card.bandLevel}</Badge>
              <p className="text-4xl font-bold text-vocabulary">{card.word}</p>
              {card.pronunciation && (
                <p className="font-mono text-sm text-muted-foreground mt-2">
                  {card.pronunciation}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">{card.partOfSpeech}</p>
              <p className="text-xs text-muted-foreground mt-6">Tap to reveal</p>
            </CardContent>
          </Card>
          {/* Back */}
          <Card className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] overflow-y-auto">
            <CardContent className="p-6 space-y-3 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Definition
                </p>
                <p>{card.definition}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Example
                </p>
                <p className="italic text-muted-foreground">{card.exampleSent}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Collocations
                  </p>
                  <ul className="text-muted-foreground space-y-0.5">
                    {card.collocations.slice(0, 4).map((c) => (
                      <li key={c}>• {c}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Synonyms
                  </p>
                  <ul className="text-muted-foreground space-y-0.5">
                    {card.synonyms.slice(0, 4).map((c) => (
                      <li key={c}>• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-6">
        {RATING_LABELS.map((r) => (
          <Button
            key={r.value}
            variant="outline"
            disabled={!flipped || submitting}
            onClick={() => rate(r.value)}
            className={cn(
              "flex flex-col h-auto py-2 text-xs",
              flipped && r.color,
            )}
          >
            <span className="font-bold">{r.value}</span>
            <span className="text-[10px]">{r.label}</span>
          </Button>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-3">
        {flipped ? "Rate your recall" : "Tap card to flip"}
      </p>
    </div>
  );
}
