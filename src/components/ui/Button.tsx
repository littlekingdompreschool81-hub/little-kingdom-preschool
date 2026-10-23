import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "mint" | "coral" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 hover:-translate-y-0.5",
    secondary:
      "bg-sunshine-400 hover:bg-sunshine-500 text-slate-900 shadow-md shadow-sunshine-400/20 hover:shadow-sunshine-400/30 hover:-translate-y-0.5",
    mint:
      "bg-mint-600 hover:bg-mint-700 text-white shadow-md shadow-mint-600/20 hover:shadow-mint-600/30 hover:-translate-y-0.5",
    coral:
      "bg-coral-500 hover:bg-coral-600 text-white shadow-md shadow-coral-500/20 hover:shadow-coral-500/30 hover:-translate-y-0.5",
    outline:
      "bg-white hover:bg-ivory-200 text-brand-text border border-slate-300 hover:border-slate-400",
    ghost:
      "bg-transparent hover:bg-ivory-200 text-brand-text",
  };

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {children}
      {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
}
