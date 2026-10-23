"use client";

import React from "react";
import { ACHIEVEMENTS, SCHOOL_PLACEHOLDERS } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Trophy, CheckCircle, ShieldCheck } from "lucide-react";

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Proven Distinction"
          title="Scholarly & Institutional Benchmarks"
          description="A legacy measured through academic excellence, global university matriculation, and ethical leadership in diverse professional fields."
        />

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ACHIEVEMENTS.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-b from-navy-850 to-navy-900 border border-gold-500/25 flex flex-col items-center text-center relative overflow-hidden group hover:border-gold-400 transition-colors shadow-lg"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="font-serif text-4xl sm:text-5xl font-bold text-gold-400 mb-3 tracking-tight">
                {item.metric}
              </span>
              <h3 className="font-serif text-lg font-bold text-ivory mb-2">
                {item.label}
              </h3>
              <p className="text-xs text-ivory/60 font-mono leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Head of School / Leadership Quotation Banner */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-gold-500/30">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-full bg-gold-500/20 border border-gold-400/50 flex items-center justify-center shrink-0">
              <Trophy className="w-10 h-10 text-gold-400" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <span className="font-mono text-xs uppercase tracking-widest text-gold-400 block mb-2">
                Institutional Creed
              </span>
              <blockquote className="font-serif text-xl sm:text-2xl text-ivory italic leading-relaxed mb-4">
                &ldquo;[Founder / Head of School Quote Placeholder: We do not merely prepare students for examinations; we prepare young minds to lead in an interconnected and complex world.]&rdquo;
              </blockquote>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="text-sm font-bold text-gold-300">
                  [Head of School / Chancellor Name Placeholder]
                </span>
                <span className="text-xs text-ivory/50 font-mono">
                  [M.A., Ph.D. Oxon / Academic Credentials Placeholder]
                </span>
              </div>
            </div>

            <PlaceholderNotice label="Verified Chancellor Statement" className="shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
