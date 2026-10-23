import React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderNoticeProps {
  label?: string;
  className?: string;
}

export function PlaceholderNotice({
  label = "Verified institution data pending client audit",
  className,
}: PlaceholderNoticeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-[11px] text-gold-300 font-mono tracking-wide",
        className
      )}
      title="This field uses a client-audited placeholder and will be populated upon official client verification."
    >
      <Info className="w-3 h-3 text-gold-400 shrink-0" />
      <span>{label}</span>
    </div>
  );
}
