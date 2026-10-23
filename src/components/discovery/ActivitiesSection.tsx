"use client";

import React from "react";
import { ACTIVITIES } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { Users, Bot, Music, Globe, Sparkles } from "lucide-react";

export function ActivitiesSection() {
  const activityIcons = [
    <Users key="1" className="w-6 h-6 text-gold-400" />,
    <Bot key="2" className="w-6 h-6 text-gold-400" />,
    <Music key="3" className="w-6 h-6 text-gold-400" />,
    <Globe key="4" className="w-6 h-6 text-gold-400" />,
  ];

  return (
    <section id="activities" className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Co-Curricular Life"
          title="Character, Leadership & Expression"
          description="True education extends beyond classrooms into arenas of public advocacy, musical performance, competitive athletics, and environmental stewardship."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACTIVITIES.map((activity, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-navy-850/70 border border-gold-500/20 hover:border-gold-400/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-navy-950 border border-gold-500/30 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  {activityIcons[index % activityIcons.length]}
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-gold-400 block mb-2">
                  {activity.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-ivory mb-3 leading-snug group-hover:text-gold-200 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light mb-6">
                  {activity.description}
                </p>
              </div>

              <div className="pt-4 border-t border-navy-800 text-xs font-mono text-gold-400/70 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Student-Led Guild</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
