"use client";

import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6", "#94a3b8"];

export function ProgressCharts({
  dailySeries,
  writingSeries,
  readingSeries,
  moduleSeries,
}: {
  dailySeries: { date: string; mins: number }[];
  writingSeries: {
    idx: number;
    band: number;
    taskAchievement: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRange: number;
  }[];
  readingSeries: { idx: number; band: number; accuracy: number }[];
  moduleSeries: { module: string; mins: number }[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">Daily study minutes (30 days)</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailySeries}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#222" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  background: "#111118",
                  border: "1px solid #2a2a3a",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="mins"
                stroke="#6366f1"
                fill="url(#g1)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Writing band trajectory</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          {writingSeries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">
              No writing data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={writingSeries}>
                <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                <XAxis dataKey="idx" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis domain={[4, 9]} tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    background: "#111118",
                    border: "1px solid #2a2a3a",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line dataKey="band" stroke="#6366f1" strokeWidth={2} dot={{ r: 3 }} />
                <Line dataKey="taskAchievement" stroke="#10b981" strokeWidth={1} dot={false} />
                <Line dataKey="coherenceCohesion" stroke="#f59e0b" strokeWidth={1} dot={false} />
                <Line dataKey="lexicalResource" stroke="#ec4899" strokeWidth={1} dot={false} />
                <Line dataKey="grammaticalRange" stroke="#8b5cf6" strokeWidth={1} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Reading accuracy</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          {readingSeries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">
              No reading data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readingSeries}>
                <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                <XAxis dataKey="idx" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    background: "#111118",
                    border: "1px solid #2a2a3a",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line dataKey="band" stroke="#10b981" strokeWidth={2} />
                <Line dataKey="accuracy" stroke="#6366f1" strokeWidth={1} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Time per module</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          {moduleSeries.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">
              No data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moduleSeries}
                  dataKey="mins"
                  nameKey="module"
                  outerRadius={90}
                  innerRadius={45}
                  label={(entry) => (entry as unknown as { module: string }).module}
                >
                  {moduleSeries.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#111118",
                    border: "1px solid #2a2a3a",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-base">Daily minutes (bar view)</CardTitle>
        </CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailySeries}>
              <CartesianGrid stroke="#222" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  background: "#111118",
                  border: "1px solid #2a2a3a",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar dataKey="mins" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
