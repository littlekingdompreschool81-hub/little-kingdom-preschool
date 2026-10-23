import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "mint" | "sky" | "sunshine" | "coral" | "neutral";
}

export function Badge({
  className,
  variant = "sky",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    mint: "bg-mint-100 text-mint-800 border border-mint-300",
    sky: "bg-sky-100 text-sky-800 border border-sky-300",
    sunshine: "bg-sunshine-100 text-sunshine-800 border border-sunshine-300",
    coral: "bg-coral-100 text-coral-800 border border-coral-300",
    neutral: "bg-ivory-300/80 text-brand-muted border border-slate-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
