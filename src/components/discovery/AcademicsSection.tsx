"use client";

import React, { useState } from "react";
import { PRESCHOOL_LEVELS } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AcademicsSection() {
  const [activeLevelIndex, setActiveLevelIndex] = useState(0);
  const currentLevel = PRESCHOOL_LEVELS[activeLevelIndex];

  return (
    <section id="learning" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Preschool Learning Levels"
          eyebrowVariant="mint"
          title="Little Steps, Big Milestones"
          description="Every developmental stage is thoughtfully paced to encourage confidence, joy, and independence through structured play and social interaction."
        />

        {/* Level Selector Tabs: Exactly Nursery -> Junior KG -> Senior KG */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {PRESCHOOL_LEVELS.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveLevelIndex(index)}
              className={`px-6 py-3 rounded-2xl text-base font-extrabold transition-all duration-200 border-2 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                activeLevelIndex === index
                  ? "bg-sky-500 text-white border-sky-500 shadow-md shadow-sky-500/20"
                  : "bg-ivory-100 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-ivory-200"
              }`}
            >
              <span>{item.level}</span>
            </button>
          ))}
        </div>

        {/* Active Level Showcase Card */}
        <div className="rounded-3xl p-8 sm:p-12 bg-ivory-100 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
                  {currentLevel.badge}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Stage {activeLevelIndex + 1} of 3
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-heading mb-2">
                {currentLevel.level}
              </h3>

              {/* Exact Required Motto/Tagline */}
              <p className="text-xl sm:text-2xl font-bold text-sky-600 mb-4">
                &ldquo;{currentLevel.tagline}&rdquo;
              </p>

              <p className="text-base text-slate-600 leading-relaxed font-normal mb-8">
                {currentLevel.description}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="text-xs uppercase font-bold tracking-widest text-slate-500">
                  Key Focus Areas (Illustrative Copy):
                </h4>
                {currentLevel.focus.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm sm:text-base text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-mint-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4">
                <Link
                  href="#admissions"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-sm transition-all"
                >
                  <span>Enquire for {currentLevel.level}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-slate-500 italic">
                  * Age and admission details to be confirmed with school desk
                </span>
              </div>
            </div>

            {/* Level Visual Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between h-full">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-mint-100 text-mint-700 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-extrabold text-brand-heading mb-2">
                  Nurturing Early Joy
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  Each learning level provides engaging, developmentally attuned experiences designed to foster independence, fine motor skills, and happy peer friendships.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
                <span className="font-semibold text-slate-700">Enrolment Status</span>
                <span className="px-2.5 py-1 rounded-full bg-sunshine-100 text-sunshine-800 font-bold">
                  2026–27 Open
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
