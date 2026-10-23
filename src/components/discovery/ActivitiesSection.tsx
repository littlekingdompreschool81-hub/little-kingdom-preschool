"use client";

import React from "react";
import { GROWING_THROUGH_PLAY_FEATURES } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import {
  Gamepad2,
  Palette,
  BookOpen,
  Shapes,
  Users,
  Music,
  HeartHandshake,
} from "lucide-react";

export function ActivitiesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Gamepad2: <Gamepad2 className="w-6 h-6 text-mint-600" />,
    Palette: <Palette className="w-6 h-6 text-coral-600" />,
    BookOpen: <BookOpen className="w-6 h-6 text-sky-600" />,
    Shapes: <Shapes className="w-6 h-6 text-sunshine-600" />,
    Users: <Users className="w-6 h-6 text-mint-600" />,
    Music: <Music className="w-6 h-6 text-coral-600" />,
  };

  const accentStyles: Record<string, { bg: string; border: string }> = {
    mint: { bg: "bg-mint-50/80", border: "border-mint-200" },
    coral: { bg: "bg-coral-50/80", border: "border-coral-200" },
    sky: { bg: "bg-sky-50/80", border: "border-sky-200" },
    sunshine: { bg: "bg-sunshine-50/80", border: "border-sunshine-200" },
  };

  return (
    <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-200 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Proposed Learning Features"
          eyebrowVariant="coral"
          title="Growing Through Play"
          description="Early childhood is a magical time of active exploration. These developmental focus areas outline how we support cognitive, social, and emotional growth."
        />

        {/* 6 Preschool Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GROWING_THROUGH_PLAY_FEATURES.map((feature) => {
            const style = accentStyles[feature.accent] || accentStyles.sky;
            return (
              <div
                key={feature.id}
                className="soft-card p-6 sm:p-8 flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${style.bg} ${style.border} group-hover:scale-105 transition-transform`}
                  >
                    {iconMap[feature.iconName] || <HeartHandshake className="w-6 h-6 text-sky-600" />}
                  </div>

                  <h3 className="text-xl font-extrabold text-brand-heading mb-3 group-hover:text-sky-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-600">Preschool Pillar</span>
                  <span className="text-[11px] bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-medium">
                    Developmental Play
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-xs text-slate-500 italic">
          * Specific activity schedules and classroom programmes are designed in accordance with early childhood learning guidelines.
        </div>
      </div>
    </section>
  );
}
