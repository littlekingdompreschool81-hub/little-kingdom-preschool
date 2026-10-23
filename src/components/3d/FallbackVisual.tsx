"use client";

import React from "react";
import { Shapes, BookOpen, Globe, Sparkles } from "lucide-react";

export function FallbackVisual() {
  const artifacts = [
    {
      title: "Alphabet Blocks & Early Words",
      category: "Early Literacy & Language",
      icon: <Shapes className="w-8 h-8 text-sky-600" />,
      tagline: "Touching, stacking, and phonemic discovery",
      description:
        "Building letter awareness and tactile fine motor skills through playful wooden blocks and interactive alphabet games.",
      color: "bg-sky-50 text-sky-700 border-sky-200",
      pill: "Early Words",
    },
    {
      title: "Colorful Illustrated Storybooks",
      category: "Imagination & Wonder",
      icon: <BookOpen className="w-8 h-8 text-coral-600" />,
      tagline: "Vibrant illustrations and cheerful rhymes",
      description:
        "Inspiring curiosity and emotional empathy through shared circle storytime, picture book discussions, and creative rhymes.",
      color: "bg-coral-50 text-coral-700 border-coral-200",
      pill: "Story Circles",
    },
    {
      title: "The Wonder Globe & Living Nature",
      category: "Discovery & Environment",
      icon: <Globe className="w-8 h-8 text-mint-600" />,
      tagline: "Animals, weather, plants, and our world",
      description:
        "Helping children understand seasons, plants, animals, and caring for others in a bright, friendly environment.",
      color: "bg-mint-50 text-mint-700 border-mint-200",
      pill: "Nature Wonder",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artifacts.map((artifact, i) => (
          <div
            key={i}
            className="group relative rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${artifact.color} group-hover:scale-105 transition-transform`}
              >
                {artifact.icon}
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                {artifact.category}
              </span>

              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-heading mb-2">
                {artifact.title}
              </h3>

              <p className="text-xs font-semibold text-slate-500 mb-3 italic">
                &ldquo;{artifact.tagline}&rdquo;
              </p>

              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                {artifact.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-600">
                <Sparkles className="w-3.5 h-3.5 text-sunshine-500" />
                <span>Pillar 0{i + 1}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                {artifact.pill}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
