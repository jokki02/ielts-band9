import Link from "next/link";
import { requireUser } from "@/lib/auth/get-user";
import { prisma } from "@/lib/db";
import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/common/EmptyState";
import { History, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/utils";

export default async function WritingHistory() {
  const user = await requireUser();
  const attempts = await prisma.writingAttempt.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageWrapper>
      <PageHeader
        title="Writing history"
        description="Every essay you've submitted, with full feedback."
      />
      {attempts.length === 0 ? (
        <EmptyState
          icon={<History className="h-6 w-6" />}
          title="No essays yet"
          description="Submit a Task 1 or Task 2 attempt to see your history here."
          action={
            <Button asChild>
              <Link href="/writing/task2">Start Task 2</Link>
            </Button>
          }
        />
      ) : (
        <div className="space-y-2">
          {attempts.map((a) => (
            <Card key={a.id} className="hover:border-primary/50 transition-colors">
              <Link href={`/writing/${a.id}`}>
                <CardContent className="flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">
                      {a.taskType === "task1" ? "Task 1" : "Task 2"} ·{" "}
                      <span className="text-muted-foreground">
                        {a.prompt.slice(0, 80)}
                        {a.prompt.length > 80 ? "…" : ""}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {a.wordCount} words · {timeAgo(a.createdAt)} · {a.aiProvider}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {typeof a.overallBand === "number" && (
                      <Badge
                        variant={
                          a.overallBand >= 8.5
                            ? "band-9"
                            : a.overallBand >= 7.5
                            ? "band-8"
                            : a.overallBand >= 6.5
                            ? "band-7"
                            : "band-6"
                        }
                      >
                        {a.overallBand.toFixed(1)}
                      </Badge>
                    )}
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
