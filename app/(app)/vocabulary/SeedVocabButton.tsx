"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function SeedVocabButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <Button
      variant="default"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          const res = await fetch("/api/vocabulary/seed", { method: "POST" });
          if (!res.ok) throw new Error((await res.json()).error || "Failed");
          const data = await res.json();
          toast.success(`Seeded ${data.added} cards`);
          router.refresh();
        } catch (err) {
          toast.error((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <Sparkles className="h-4 w-4" />
      {busy ? "Seeding…" : "Seed vocabulary"}
    </Button>
  );
}
