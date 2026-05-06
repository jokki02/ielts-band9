import Link from "next/link";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenLine, FileBarChart, History } from "lucide-react";
import { TASK1_PROMPTS } from "@/data/writing/task1-prompts";
import { TASK2_PROMPTS } from "@/data/writing/task2-prompts";

export default function WritingHubPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="Writing Studio"
        description="Practise IELTS Academic Task 1 and Task 2 with timed prompts and AI-powered Band 9 grading."
        actions={
          <Button asChild variant="outline">
            <Link href="/writing/history">
              <History className="h-4 w-4" /> History
            </Link>
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileBarChart className="h-5 w-5 text-writing" /> Task 1 — 20 min
            </CardTitle>
            <CardDescription>
              Describe a chart, graph, table, map, or process. Aim for 150+ words.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {TASK1_PROMPTS.length} prompts available
            </span>
            <Button asChild variant="default">
              <Link href="/writing/task1">Practise Task 1</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenLine className="h-5 w-5 text-writing" /> Task 2 — 40 min
            </CardTitle>
            <CardDescription>
              Argumentative essay on a contemporary issue. Aim for 250+ words.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {TASK2_PROMPTS.length} prompts available
            </span>
            <Button asChild variant="gradient">
              <Link href="/writing/task2">Practise Task 2</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
