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
  Sparkles,
  Heart,
} from "lucide-react";

export function ActivitiesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Gamepad2: <Gamepad2 className="w-7 h-7 text-mint-600" />,
    Palette: <Palette className="w-7 h-7 text-coral-600" />,
    BookOpen: <BookOpen className="w-7 h-7 text-sky-600" />,
    Shapes: <Shapes className="w-7 h-7 text-sunshine-600" />,
    Users: <Users className="w-7 h-7 text-mint-600" />,
    Music: <Music className="w-7 h-7 text-lavender-600" />,
  };

  const featureThemes = [
    {
      cardBg: "bg-gradient-to-br from-mint-50/90 to-white",
      borderColor: "border-mint-200/90 hover:border-mint-400",
      iconBg: "bg-mint-100",
      stickerText: "Intentional Play",
      stickerColor: "bg-mint-100 text-mint-800 border-mint-200",
    },
    {
      cardBg: "bg-gradient-to-br from-coral-50/90 to-white",
      borderColor: "border-coral-200/90 hover:border-coral-400",
      iconBg: "bg-coral-100",
      stickerText: "Creative Expression",
      stickerColor: "bg-coral-100 text-coral-800 border-coral-200",
    },
    {
      cardBg: "bg-gradient-to-br from-sky-50/90 to-white",
      borderColor: "border-sky-200/90 hover:border-sky-400",
      iconBg: "bg-sky-100",
      stickerText: "Story Circles",
      stickerColor: "bg-sky-100 text-sky-800 border-sky-200",
    },
    {
      cardBg: "bg-gradient-to-br from-sunshine-50/90 to-white",
      borderColor: "border-sunshine-200/90 hover:border-sunshine-400",
      iconBg: "bg-sunshine-100",
      stickerText: "Early Math & Logic",
      stickerColor: "bg-sunshine-100 text-sunshine-800 border-sunshine-200",
    },
    {
      cardBg: "bg-gradient-to-br from-mint-50/90 to-white",
      borderColor: "border-mint-200/90 hover:border-mint-400",
      iconBg: "bg-mint-100",
      stickerText: "Empathy & Sharing",
      stickerColor: "bg-mint-100 text-mint-800 border-mint-200",
    },
    {
      cardBg: "bg-gradient-to-br from-lavender-50/90 to-white",
      borderColor: "border-lavender-200/90 hover:border-lavender-400",
      iconBg: "bg-lavender-100",
      stickerText: "Active Rhythms",
      stickerColor: "bg-lavender-100 text-lavender-800 border-lavender-200",
    },
  ];

  return (
    <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Childhood Development"
          eyebrowVariant="mint"
          title="Growing Through Play"
          description="Early childhood is a magical season of active discovery. These six developmental focus areas illustrate how we support cognitive, physical, and social milestones."
        />

        {/* 6 Storybook Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {GROWING_THROUGH_PLAY_FEATURES.map((feature, idx) => {
            const theme = featureThemes[idx] || featureThemes[0];
            return (
              <div
                key={feature.id}
                className={`storybook-card p-8 flex flex-col justify-between ${theme.cardBg} border-2 ${theme.borderColor} group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-3xl ${theme.iconBg} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}
                    >
                      {iconMap[feature.iconName]}
                    </div>
                    <span className={`storybook-sticker ${theme.stickerColor}`}>
                      {theme.stickerText}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-sky-700 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed font-medium text-sm sm:text-base mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Sparkles className="w-3.5 h-3.5 text-sunshine-500" />
                    <span>Focus Area 0{idx + 1}</span>
                  </span>
                  <span>Playful Learning</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
