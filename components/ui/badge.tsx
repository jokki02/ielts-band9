import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        muted:
          "border-transparent bg-muted text-muted-foreground",
        "band-9":
          "border-transparent bg-[hsl(var(--band-9))]/15 text-[hsl(var(--band-9))]",
        "band-8":
          "border-transparent bg-[hsl(var(--band-8))]/15 text-[hsl(var(--band-8))]",
        "band-7":
          "border-transparent bg-[hsl(var(--band-7))]/15 text-[hsl(var(--band-7))]",
        "band-6":
          "border-transparent bg-[hsl(var(--band-6))]/15 text-[hsl(var(--band-6))]",
        success:
          "border-transparent bg-[hsl(var(--band-9))]/15 text-[hsl(var(--band-9))]",
        warning:
          "border-transparent bg-[hsl(var(--band-7))]/15 text-[hsl(var(--band-7))]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
