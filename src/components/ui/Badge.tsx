import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "navy" | "outline" | "success";
}

export function Badge({
  className,
  variant = "gold",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    gold: "bg-gold-500/10 text-gold-400 border border-gold-500/30",
    navy: "bg-navy-700/60 text-navy-200 border border-navy-600/50",
    outline: "bg-transparent text-ivory/80 border border-ivory/20",
    success: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
