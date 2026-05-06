import { PageWrapper, PageHeader } from "@/components/layout/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TIPS } from "@/data/tips/tips";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiscoverPanel } from "@/components/discover/DiscoverPanel";

const MODULES = ["all", "writing", "reading", "listening", "speaking", "vocabulary", "general"] as const;

export default function TipsPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="Tips Hub"
        description="Concentrated study advice paraphrased from official IELTS partners (British Council, IDP, Cambridge English) and respected examiner blogs (IELTS Liz, IELTS Simon). Every tip cites its source."
        actions={<DiscoverPanel module="tips" />}
      />
      <Tabs defaultValue="all">
        <TabsList className="overflow-x-auto max-w-full">
          {MODULES.map((m) => (
            <TabsTrigger key={m} value={m} className="capitalize">
              {m}
            </TabsTrigger>
          ))}
        </TabsList>
        {MODULES.map((m) => (
          <TabsContent key={m} value={m} className="space-y-3">
            {TIPS.filter((t) => m === "all" || t.module === m).map((t) => (
              <Card key={t.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-sm">{t.title}</CardTitle>
                    <div className="flex gap-1.5">
                      <Badge variant="muted" className="capitalize">
                        {t.module}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {t.level}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p>{t.body}</p>
                  <p className="text-[11px]">
                    <strong className="text-foreground">Source:</strong>{" "}
                    {t.source}
                    {" — "}
                    <a
                      href={t.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline hover:text-foreground"
                    >
                      read original
                    </a>
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </PageWrapper>
  );
}
