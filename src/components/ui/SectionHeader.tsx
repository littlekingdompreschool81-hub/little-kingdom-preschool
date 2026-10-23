import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowVariant?: "mint" | "sky" | "sunshine" | "coral" | "neutral";
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowVariant = "sky",
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
        <Badge variant={eyebrowVariant} className="mb-3">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-heading leading-tight">
        {title}
      </h2>
      <div className="w-14 h-1.5 bg-gradient-to-r from-sky-400 via-mint-400 to-sunshine-400 rounded-full my-4" />
      {description && (
        <p className="text-brand-muted text-base sm:text-lg font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
