"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function SeedVocabButton({ label }: { label?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <Button
      variant="outline"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          const res = await fetch("/api/vocabulary/seed", { method: "POST" });
          if (!res.ok) throw new Error((await res.json()).error || "Failed");
          const data = await res.json();
          if (data.added === 0) {
            toast.info("Deck already up to date");
          } else {
            toast.success(`Seeded ${data.added} new cards`);
          }
          router.refresh();
        } catch (err) {
          toast.error((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <Sparkles className="h-4 w-4" />
      {busy ? "Seeding…" : label || "Seed AWL deck"}
    </Button>
  );
}
