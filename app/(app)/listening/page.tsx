import Link from "next/link";
import { LISTENING_TRACKS } from "@/data/listening/audio";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headphones } from "lucide-react";

export default function ListeningHub() {
  return (
    <PageWrapper>
      <PageHeader
        title="Listening Lab"
        description="Practise IELTS-style listening with browser-synthesised audio and full transcripts. Bring your own MP3s by configuring `audioUrl` in data/listening/audio.ts."
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
            <CardContent className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {t.questions.length} questions
              </span>
              <Button asChild size="sm" variant="default">
                <Link href={`/listening/${t.id}`}>Open lab</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
