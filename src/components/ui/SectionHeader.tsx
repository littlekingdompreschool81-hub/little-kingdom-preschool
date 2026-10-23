import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12 lg:mb-16", alignClasses[align], className)}>
      {eyebrow && (
        <Badge variant="gold" className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ivory leading-tight">
        {title}
      </h2>
      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent my-4" />
      {description && (
        <p className="text-ivory/70 text-base sm:text-lg font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
