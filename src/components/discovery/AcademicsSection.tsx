"use client";

import React, { useState } from "react";
import { ACADEMIC_STAGES } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { CheckCircle2, BookMarked, ArrowUpRight } from "lucide-react";

export function AcademicsSection() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="academics" className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Curricular Rigour"
          title="Academic Framework & Progression"
          description="Designed to challenge and elevate, our structured curriculum balances timeless humanistic inquiry with quantitative mastery and empirical research."
        />

        {/* Stage Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {ACADEMIC_STAGES.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveStage(index)}
              className={`px-5 py-3 rounded-lg text-sm sm:text-base font-serif transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-gold-400 ${
                activeStage === index
                  ? "bg-gold-500 text-navy-950 font-bold border-gold-400 shadow-lg shadow-gold-500/20"
                  : "bg-navy-850/70 text-ivory/80 border-gold-500/20 hover:border-gold-500/40 hover:text-ivory"
              }`}
            >
              <span>{item.stage}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Details Card */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-gold-400 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/30">
                  {ACADEMIC_STAGES[activeStage].grades}
                </span>
                <PlaceholderNotice label="Official Syllabus Pending Audit" />
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ivory mb-4">
                {ACADEMIC_STAGES[activeStage].stage}
              </h3>

              <p className="text-base sm:text-lg text-ivory/80 leading-relaxed font-light mb-8">
                {ACADEMIC_STAGES[activeStage].description}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-xs uppercase font-mono tracking-widest text-gold-400">
                  Key Curriculum Focus Areas:
                </h4>
                {ACADEMIC_STAGES[activeStage].highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm sm:text-base text-ivory/90">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gold-500/20 flex flex-wrap items-center gap-4">
                <a
                  href="#admissions"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 underline"
                >
                  <span>Enquire for {ACADEMIC_STAGES[activeStage].stage}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-navy-950/70 p-6 sm:p-8 rounded-xl border border-gold-500/20 flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-lg bg-gold-500/20 text-gold-400 flex items-center justify-center mb-6">
                  <BookMarked className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold text-ivory mb-2">
                  Academic Philosophy
                </h4>
                <p className="text-sm text-ivory/70 leading-relaxed font-light">
                  Every scholar is paired with dedicated faculty mentors to cultivate lifelong intellectual self-reliance, ethical reasoning, and scholarly poise.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-navy-800 text-xs font-mono text-ivory/50 flex justify-between">
                <span>Accreditation Standard</span>
                <span className="text-gold-400">[Verified Board ID]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
