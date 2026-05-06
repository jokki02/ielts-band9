"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  PenLine,
  BookOpen,
  Headphones,
  Mic,
  Library,
  Calendar,
  ClipboardCheck,
  BarChart3,
  Trophy,
  Lightbulb,
  BookMarked,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/writing", label: "Writing", icon: PenLine },
  { href: "/reading", label: "Reading", icon: BookOpen },
  { href: "/listening", label: "Listening", icon: Headphones },
  { href: "/speaking", label: "Speaking", icon: Mic },
  { href: "/vocabulary", label: "Vocabulary", icon: Library },
  { href: "/study-plan", label: "Study Plan", icon: Calendar },
  { href: "/mock-test", label: "Mock Test", icon: ClipboardCheck },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/tips", label: "Tips", icon: Lightbulb },
  { href: "/sources", label: "Sources", icon: BookMarked },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ user }: { user: { name: string; targetBand: number } }) {
  const path = usePathname();
  return (
    <aside className="hidden lg:flex h-screen sticky top-0 flex-col w-64 border-r border-border/60 bg-card/40 backdrop-blur-xl">
      <div className="px-6 py-5 border-b border-border/60">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold shadow-glow">
            B9
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">IELTS Band 9</div>
            <div className="text-[11px] text-muted-foreground">
              {user.name} · target {user.targetBand}
            </div>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? path === "/"
              : path === href || path.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border/60 text-[11px] text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>v0.1.0</span>
          <span className="text-band-9">● Online</span>
        </div>
      </div>
    </aside>
  );
}
