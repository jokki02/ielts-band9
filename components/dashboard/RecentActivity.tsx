import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { timeAgo } from "@/lib/utils";

export interface RecentActivityItem {
  id: string;
  title: string;
  module: string;
  band?: number | null;
  date: Date;
}

export function RecentActivity({ items }: { items: RecentActivityItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No activity yet — start a Writing or Reading task to see it here.
          </p>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <div className="min-w-0">
                  <p className="font-medium truncate">{it.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {it.module} · {timeAgo(it.date)}
                  </p>
                </div>
                {typeof it.band === "number" && (
                  <Badge
                    variant={
                      it.band >= 8.5
                        ? "band-9"
                        : it.band >= 7.5
                        ? "band-8"
                        : it.band >= 6.5
                        ? "band-7"
                        : "band-6"
                    }
                  >
                    {it.band.toFixed(1)}
                  </Badge>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
