"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRESCHOOL_LEVELS } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Shapes,
  BookOpen,
  Compass,
  Star,
  Sun,
  Heart,
} from "lucide-react";

export function AcademicsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const worldThemes = [
    {
      gradient: "from-mint-100 via-mint-50 to-white",
      border: "border-mint-300",
      accentBg: "bg-mint-500",
      accentText: "text-mint-800",
      badgeColor: "bg-mint-100 text-mint-800 border-mint-300",
      worldTitle: "The Garden of Sensory Play",
      icon: <Shapes className="w-8 h-8 text-mint-600" />,
      pillarTitle: "Sensory & Hands-on Exploration",
      pillarNote: "Toddlers touch, stack, splash, and discover their world through joyful play.",
    },
    {
      gradient: "from-sky-100 via-sky-50 to-white",
      border: "border-sky-300",
      accentBg: "bg-sky-500",
      accentText: "text-sky-800",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
      worldTitle: "The Valley of Stories & Numbers",
      icon: <BookOpen className="w-8 h-8 text-sky-600" />,
      pillarTitle: "Early Literacy & Puzzle Solving",
      pillarNote: "Children begin recognizing letter sounds, counting friendly objects, and listening in circles.",
    },
    {
      gradient: "from-sunshine-100 via-sunshine-50 to-white",
      border: "border-sunshine-300",
      accentBg: "bg-sunshine-500",
      accentText: "text-sunshine-800",
      badgeColor: "bg-sunshine-100 text-sunshine-800 border-sunshine-300",
      worldTitle: "The Mountain of Big Dreams",
      icon: <Compass className="w-8 h-8 text-sunshine-600" />,
      pillarTitle: "Creative Discovery & School Readiness",
      pillarNote: "Kindergartners express thoughts independently, draw, collaborate, and prepare for formal schooling.",
    },
  ];

  const currentLevel = PRESCHOOL_LEVELS[activeTab];
  const currentTheme = worldThemes[activeTab];

  return (
    <section id="learning" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory-100 relative overflow-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-sunshine-100/60 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-96 h-96 rounded-full bg-mint-100/60 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Three Learning Worlds"
          eyebrowVariant="sunshine"
          title="Little Steps, Big Milestones"
          description="A carefully paced early childhood framework where every developmental stage builds upon curiosity, gentle discipline, and happy self-confidence."
        />

        {/* Playful Interactive Stage Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
          {PRESCHOOL_LEVELS.map((level, idx) => (
            <button
              key={level.id}
              onClick={() => setActiveTab(idx)}
              className={`px-6 sm:px-8 py-3.5 rounded-2xl text-base sm:text-lg font-extrabold transition-all duration-300 flex items-center gap-2.5 border-2 focus:outline-none focus:ring-4 focus:ring-sky-200 ${
                activeTab === idx
                  ? `${worldThemes[idx].accentBg} text-white ${worldThemes[idx].border} shadow-lg scale-105`
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span>{level.level}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 font-mono">
                0{idx + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Visually Distinct Active Learning World Card */}
        <div
          className={`rounded-4xl p-8 sm:p-12 lg:p-16 border-2 ${currentTheme.border} bg-gradient-to-br ${currentTheme.gradient} shadow-xl relative overflow-hidden transition-all duration-500`}
        >
          {/* Background Motif watermark */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 pointer-events-none text-slate-900">
            {currentTheme.icon}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Area */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`storybook-sticker ${currentTheme.badgeColor}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {currentTheme.worldTitle}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Step {activeTab + 1} of 3
                </span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-black text-slate-900 mb-2">
                {currentLevel.level}
              </h3>

              {/* Exact Tagline from Prompt */}
              <p className="text-xl sm:text-2xl font-black text-sky-700 mb-4">
                &ldquo;{currentLevel.tagline}&rdquo;
              </p>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium mb-8">
                {currentLevel.description}
              </p>

              {/* Focus Pillars */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-500">
                  Focus Activities (Illustrative Copy):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentLevel.focus.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs flex items-center gap-2.5 text-sm text-slate-800 font-bold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-6 border-t border-slate-300/60 flex flex-wrap items-center gap-4">
                <Link
                  href="#admissions"
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl ${currentTheme.accentBg} hover:opacity-90 text-white font-extrabold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5`}
                >
                  <span>Enquire for {currentLevel.level}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-slate-500 italic">
                  * Age criteria to be verified with admissions desk
                </span>
              </div>
            </div>

            {/* Right Storybook Showcase Card */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between h-full">
              <div>
                <div className="w-16 h-16 rounded-3xl bg-ivory-100 flex items-center justify-center mb-6 shadow-xs border border-slate-100">
                  {currentTheme.icon}
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Learning Milestone
                </span>
                <h4 className="text-2xl font-extrabold text-slate-900 mb-3">
                  {currentTheme.pillarTitle}
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {currentTheme.pillarNote}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <Star className="w-4 h-4 text-sunshine-500 fill-sunshine-500" />
                  <span>Enrolment 2026–27 Open</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                  {currentLevel.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
