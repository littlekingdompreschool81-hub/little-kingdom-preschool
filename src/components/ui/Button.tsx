import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
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
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400 focus:ring-offset-2 focus:ring-offset-navy-950 disabled:opacity-50 disabled:cursor-not-allowed group";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold shadow-lg shadow-gold-500/20 hover:shadow-gold-500/30 hover:-translate-y-0.5",
    secondary:
      "bg-navy-800 hover:bg-navy-700 text-ivory border border-gold-500/30 hover:border-gold-500/60 shadow-md",
    outline:
      "bg-transparent hover:bg-gold-500/10 text-gold-400 hover:text-gold-300 border border-gold-500/50 hover:border-gold-400",
    ghost:
      "bg-transparent hover:bg-navy-800 text-ivory/80 hover:text-ivory",
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
