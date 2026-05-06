import Link from "next/link";
import { LISTENING_TRACKS } from "@/data/listening/audio";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headphones } from "lucide-react";
import { DiscoverPanel } from "@/components/discover/DiscoverPanel";

export default function ListeningHub() {
  return (
    <PageWrapper>
      <PageHeader
        title="Listening Lab"
        description="Real human-recorded TED-Ed lectures with verbatim transcripts and IELTS-style questions. Every track links to its original source under its open licence."
        actions={<DiscoverPanel module="listening" />}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LISTENING_TRACKS.map((t) => (
          <Card key={t.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Headphones className="h-4 w-4 text-listening" />
                  {t.title}
                </CardTitle>
                <Badge variant="muted">Section {t.section}</Badge>
              </div>
              <CardDescription className="text-xs">{t.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t.questions.length} questions ·{" "}
                  {Math.floor(t.durationSec / 60)}:
                  {String(t.durationSec % 60).padStart(2, "0")}
                </span>
                <Button asChild size="sm" variant="default">
                  <Link href={`/listening/${t.id}`}>Open lab</Link>
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {t.attribution}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
