import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function WeakAreasAlert({ areas }: { areas: { area: string; reason: string }[] }) {
  if (areas.length === 0) return null;
  return (
    <Card className="border-band-6/40 bg-band-6/5">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <AlertCircle className="h-4 w-4 text-band-6" />
          Areas to focus on
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {areas.map((a, i) => (
            <li key={i} className="flex gap-2">
              <Badge variant="band-6" className="shrink-0">
                {a.area}
              </Badge>
              <span className="text-muted-foreground">{a.reason}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
