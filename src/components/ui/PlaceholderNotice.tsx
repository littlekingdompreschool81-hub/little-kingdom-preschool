import React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderNoticeProps {
  label?: string;
  className?: string;
}

export function PlaceholderNotice({
  label = "To be updated with verified details from school management",
  className,
}: PlaceholderNoticeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-medium",
        className
      )}
      title="This field uses an editable placeholder pending official client confirmation."
    >
      <Info className="w-3 h-3 text-amber-600 shrink-0" />
      <span>{label}</span>
    </div>
  );
}
