"use client";

import React from "react";
import Link from "next/link";
import { SectionHeader } from "../ui/SectionHeader";
import {
  Sparkles,
  ArrowRight,
  Heart,
  Smile,
  BookOpen,
  Compass,
  Star,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

export function AcademicsSection() {
  const milestones = [
    {
      level: "Nursery",
      stepNumber: "01",
      tagline: "Play, explore and discover",
      description:
        "A warm, welcoming first introduction to the world outside home. Through sensory tables, tactile toys, cheerful rhymes, and guided play, little learners discover that school is a place of joy, friendship, and wonder.",
      color: "mint",
      borderColor: "border-mint-300",
      bgGradient: "from-mint-50/90 via-white to-mint-100/40",
      accentBg: "bg-mint-500",
      badgeColor: "bg-mint-100 text-mint-900 border-mint-300",
      illustration: (
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-mint-100 border-2 border-mint-300 flex items-center justify-center text-mint-700 shadow-md">
          {/* 3D Toy Blocks Illustration */}
          <div className="flex flex-col items-center">
            <span className="font-heading font-black text-3xl sm:text-4xl text-mint-800">A</span>
            <span className="text-[10px] uppercase font-black tracking-widest text-mint-600">Sensory</span>
          </div>
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-sunshine-300 border border-white flex items-center justify-center text-xs font-black shadow-xs">
            1
          </div>
        </div>
      ),
      focusPoints: [
        "Sensory & tactile exploration",
        "Gentle separation & emotional security",
        "Early vocabulary & expressive sounds",
        "Joyful social play with peers",
      ],
    },
    {
      level: "Junior KG",
      stepNumber: "02",
      tagline: "Build skills and confidence",
      description:
        "Building foundational literacy, numeracy, and fine motor confidence through structured discovery. Interactive story circles, phonics sounds, and puzzle solving help children express ideas with growing pride.",
      color: "sky",
      borderColor: "border-sky-300",
      bgGradient: "from-sky-50/90 via-white to-sky-100/40",
      accentBg: "bg-sky-500",
      badgeColor: "bg-sky-100 text-sky-900 border-sky-300",
      illustration: (
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-sky-100 border-2 border-sky-300 flex items-center justify-center text-sky-700 shadow-md">
          {/* Open Storybook Illustration */}
          <div className="flex flex-col items-center text-center">
            <BookOpen className="w-10 h-10 text-sky-700" />
            <span className="text-[10px] uppercase font-black tracking-widest text-sky-600 mt-1">Phonics</span>
          </div>
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-coral-300 border border-white flex items-center justify-center text-xs font-black shadow-xs">
            2
          </div>
        </div>
      ),
      focusPoints: [
        "Phonemic awareness & letter recognition",
        "Number relationships & geometric patterns",
        "Active listening in collaborative circles",
        "Self-expression and conversational ease",
      ],
    },
    {
      level: "Senior KG",
      stepNumber: "03",
      tagline: "Grow, create and prepare",
      description:
        "Cultivating independent curiosity, foundational reasoning, creative drawing, and school readiness. Children emerge as confident thinkers eager to ask questions, solve challenges, and transition smoothly into primary school.",
      color: "sunshine",
      borderColor: "border-sunshine-300",
      bgGradient: "from-sunshine-50/90 via-white to-amber-100/40",
      accentBg: "bg-amber-500",
      badgeColor: "bg-sunshine-100 text-amber-900 border-sunshine-300",
      illustration: (
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-sunshine-100 border-2 border-sunshine-300 flex items-center justify-center text-amber-800 shadow-md">
          {/* Graduation Star / Telescope Illustration */}
          <div className="flex flex-col items-center text-center">
            <Star className="w-10 h-10 fill-sunshine-400 text-amber-600" />
            <span className="text-[10px] uppercase font-black tracking-widest text-amber-700 mt-1">Ready</span>
          </div>
          <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-mint-300 border border-white flex items-center justify-center text-xs font-black shadow-xs">
            3
          </div>
        </div>
      ),
      focusPoints: [
        "Pre-writing dexterity & storytelling",
        "Foundational math, addition concepts & reasoning",
        "Inquiry-driven scientific curiosity",
        "Confidence for primary school transition",
      ],
    },
  ];

  return (
    <section id="learning" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory-100 relative overflow-hidden">
      {/* Background Pastel Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-mint-100/50 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-sunshine-100/50 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Three Learning Milestones"
          eyebrowVariant="sunshine"
          title="Little Steps, Big Milestones"
          description="A continuous illustrated journey where each level gently nurtures confidence, character, and curiosity along a joyful developmental path."
        />

        {/* Winding Illustrated Path Container */}
        <div className="relative mt-12 sm:mt-16">
          {/* Central Illustrated Winding Path (SVG Road on Desktop) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 hidden lg:block pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 40 1000" fill="none">
              {/* Stepping stone dashed ribbon */}
              <path
                d="M20,0 Q-10,250 20,500 T20,1000"
                stroke="#E2E8F0"
                strokeWidth="12"
                strokeDasharray="16 12"
                strokeLinecap="round"
              />
              <path
                d="M20,0 Q-10,250 20,500 T20,1000"
                stroke="#38BDF8"
                strokeWidth="4"
                strokeDasharray="12 16"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* 3 Milestone Cards along the Path */}
          <div className="space-y-12 sm:space-y-16">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={item.level}
                  className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 relative ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Milestone Center Badge (Desktop Pin on Road) */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center z-20">
                    <div className="w-14 h-14 rounded-full bg-white border-4 border-sky-400 shadow-lg flex items-center justify-center text-slate-800 font-heading font-black text-sm">
                      {item.stepNumber}
                    </div>
                  </div>

                  {/* Main Storybook Milestone Card */}
                  <div className="w-full lg:w-[calc(50%-3rem)] rounded-4xl p-8 sm:p-10 border-2 bg-gradient-to-br shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
                    style={{
                      borderColor: index === 0 ? "#86EFAC" : index === 1 ? "#7DD3FC" : "#FCD34D",
                      background: index === 0
                        ? "linear-gradient(135deg, #F0FDF4 0%, #FFFFFF 50%, #DCFCE7 100%)"
                        : index === 1
                        ? "linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 50%, #E0F2FE 100%)"
                        : "linear-gradient(135deg, #FFFBEB 0%, #FFFFFF 50%, #FEF3C7 100%)",
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center font-heading font-black text-lg text-slate-900 shadow-2xs">
                          {item.stepNumber}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                          {item.level}
                        </h3>
                      </div>

                      <span className={`storybook-sticker self-start sm:self-auto ${item.badgeColor}`}>
                        Milestone {item.stepNumber}
                      </span>
                    </div>

                    {/* Exact Illustrative Tagline */}
                    <div className="mb-4">
                      <p className="text-base sm:text-lg font-black text-sky-800 italic">
                        &ldquo;{item.tagline}&rdquo;
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mb-6">
                      {item.description}
                    </p>

                    {/* Key Developmental Focus Points */}
                    <div className="pt-6 border-t border-slate-200/80">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block mb-3">
                        Milestone Focus:
                      </span>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-bold">
                        {item.focusPoints.map((point, ptIdx) => (
                          <li key={ptIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Educational Milestone Illustration on Companion Side */}
                  <div className="w-full lg:w-[calc(50%-3rem)] flex flex-col items-center justify-center p-6 sm:p-8 rounded-4xl bg-white/70 border border-slate-200 shadow-sm backdrop-blur-xs">
                    <div className="mb-4 group-hover:scale-105 transition-transform duration-300">
                      {item.illustration}
                    </div>
                    <div className="text-center">
                      <h4 className="text-base font-extrabold text-slate-900">
                        {item.level} Discovery Hub
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-xs font-medium">
                        {index === 0
                          ? "Sensory exploration, motor discovery & happy beginnings."
                          : index === 1
                          ? "Early literacy phonics, counting games & expressive circles."
                          : "Creative projects, elementary math & confident school transition."}
                      </p>
                    </div>

                    <div className="mt-5">
                      <Link
                        href="#admissions"
                        className="inline-flex items-center gap-1.5 text-xs font-black text-sky-700 hover:text-sky-900 transition-colors"
                      >
                        <span>Enquire for {item.level}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
