"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PenLine, BookOpen, Library, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/writing", label: "Writing", icon: PenLine },
  { href: "/reading", label: "Reading", icon: BookOpen },
  { href: "/vocabulary", label: "Vocab", icon: Library },
  { href: "/progress", label: "Progress", icon: BarChart3 },
];

export function MobileNav() {
  const path = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-xl border-t border-border/60 pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 gap-1 px-1 py-1">
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
                "flex flex-col items-center gap-0.5 py-2 rounded-md text-[10px] transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
