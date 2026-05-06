import Link from "next/link";
import { READING_PASSAGES } from "@/data/reading/passages";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function ReadingHub() {
  return (
    <PageWrapper>
      <PageHeader
        title="Reading"
        description="Practise IELTS Academic reading passages with all 14 question types. Each passage is timed at 20 minutes."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {READING_PASSAGES.map((p) => (
          <Card key={p.id} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-reading" />
                  {p.title}
                </CardTitle>
                <Badge
                  variant={
                    p.difficulty === "band9"
                      ? "band-9"
                      : p.difficulty === "band8"
                      ? "band-8"
                      : "band-7"
                  }
                >
                  {p.difficulty.replace("band", "Band ")}
                </Badge>
              </div>
              <CardDescription className="text-xs">
                {p.source} · {p.topic}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {p.questions.length} questions · 20 min
              </span>
              <Button asChild size="sm">
                <Link href={`/reading/${p.id}`}>Start passage</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}
