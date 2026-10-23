"use client";

import React from "react";
import { BookOpen, Globe2, Atom, Sparkles } from "lucide-react";

export function FallbackVisual() {
  const artifacts = [
    {
      title: "The Tome of Inquisitive Thought",
      category: "Humanities & Classical Philosophy",
      icon: <BookOpen className="w-8 h-8 text-gold-400" />,
      tagline: "Literature, critical dialectic, and historical reasoning",
      description:
        "Guiding students through classical literature, rhetoric, debate, and the synthesis of historical evidence to formulate persuasive arguments.",
      stats: "30,000+ Curated Volumes",
    },
    {
      title: "The Global Horizon",
      category: "Geopolitics & Environmental Stewardship",
      icon: <Globe2 className="w-8 h-8 text-gold-400" />,
      tagline: "Multilingual diplomacy, global citizenship, and ecologies",
      description:
        "Developing multilingual proficiency, geographical fluency, and an understanding of interconnected ecological and financial systems.",
      stats: "18+ Cultural Exchanges",
    },
    {
      title: "The Scientific Crucible",
      category: "Quantum Physics, Computation & Biology",
      icon: <Atom className="w-8 h-8 text-gold-400" />,
      tagline: "Empirical methodology, laboratory research, and mathematics",
      description:
        "Empirical investigation from elementary mechanics to modern robotics, computational algorithms, and biotechnology ethics.",
      stats: "12 Advanced Labs",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {artifacts.map((artifact, i) => (
          <div
            key={i}
            className="group relative rounded-xl p-6 sm:p-8 bg-gradient-to-b from-navy-800/90 to-navy-900/90 border border-gold-500/25 hover:border-gold-400/60 transition-all duration-300 shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/20 transition-all" />

            <div>
              <div className="w-14 h-14 rounded-lg bg-navy-950/80 border border-gold-500/40 flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform">
                {artifact.icon}
              </div>

              <span className="text-[11px] font-mono uppercase tracking-wider text-gold-400/90 block mb-2">
                {artifact.category}
              </span>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory mb-3 leading-snug group-hover:text-gold-200 transition-colors">
                {artifact.title}
              </h3>

              <p className="text-sm font-medium text-gold-400/80 mb-3 italic">
                &ldquo;{artifact.tagline}&rdquo;
              </p>

              <p className="text-sm text-ivory/70 leading-relaxed mb-6 font-light">
                {artifact.description}
              </p>
            </div>

            <div className="pt-4 border-t border-navy-700/60 flex items-center justify-between text-xs text-ivory/60 font-mono">
              <span className="flex items-center gap-1.5 text-gold-400/90">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Core Pillar 0{i + 1}</span>
              </span>
              <span>{artifact.stats}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
