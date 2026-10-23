import React from "react";
import { ACHIEVEMENTS } from "@/lib/constants";

export function HeroStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-gold-500/20 max-w-5xl mx-auto w-full">
      {ACHIEVEMENTS.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center sm:items-start p-3 sm:p-4 rounded-lg bg-navy-850/60 border border-gold-500/15 backdrop-blur-sm"
        >
          <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-400 tracking-tight">
            {item.metric}
          </span>
          <span className="text-xs sm:text-sm font-medium text-ivory/90 mt-1 text-center sm:text-left">
            {item.label}
          </span>
          <span className="text-[11px] text-ivory/50 mt-1 font-mono hidden sm:inline text-left">
            {item.detail}
          </span>
        </div>
      ))}
    </div>
  );
}
