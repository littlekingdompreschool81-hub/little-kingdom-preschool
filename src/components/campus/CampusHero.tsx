"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Heart, Sun, ArrowDown, ChevronRight, ShieldCheck } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";
import { Badge } from "../ui/Badge";

export function CampusHero() {
  return (
    <section
      id="home"
      className="relative min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between pt-10 sm:pt-16 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-ivory-100 via-sky-50/40 to-ivory-100"
    >
      {/* Soft Pastel Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-80 h-80 rounded-full pastel-glow-sky pointer-events-none -z-10" />
      <div className="absolute top-28 right-1/4 w-80 h-80 rounded-full pastel-glow-sunshine pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full pastel-glow-mint pointer-events-none -z-10" />

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center my-auto z-10">
        {/* Official Logo Display */}
        <div className="relative mb-6 group">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white shadow-lg shadow-slate-200/80 border-2 border-amber-200/80 p-2 flex items-center justify-center transition-transform hover:scale-105 duration-300">
            <Image
              src={SCHOOL_INFO.logoUrl}
              alt={SCHOOL_INFO.logoAlt}
              fill
              priority
              className="object-contain p-2"
              sizes="(max-width: 640px) 112px, 144px"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-sunshine-400 text-slate-900 rounded-full p-1.5 shadow-md">
            <Sun className="w-5 h-5 text-amber-900 animate-spin-slow" />
          </div>
        </div>

        {/* Motto Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sunshine-100/90 border border-sunshine-300 text-sunshine-800 text-xs sm:text-sm font-bold shadow-xs mb-5">
          <Sparkles className="w-4 h-4 text-sunshine-600" />
          <span>&ldquo;{SCHOOL_INFO.motto}&rdquo;</span>
        </div>

        {/* School Name */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-brand-heading max-w-4xl leading-[1.15] mb-5">
          Welcome to <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-sky-600 via-mint-600 to-sunshine-600 bg-clip-text text-transparent">
            {SCHOOL_INFO.name}
          </span>
        </h1>

        {/* Subtitle / Welcoming Atmosphere */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal mb-8">
          A joyful, safe, and nurturing world where curiosity thrives, friendships bloom, and every little learner is encouraged to dream big.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          <Link
            href="#learning"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <span>Explore Learning Levels</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <Link
            href="#admissions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white hover:bg-ivory-200 text-slate-800 border-2 border-slate-200 hover:border-slate-300 text-sm font-bold shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <Heart className="w-4 h-4 text-coral-500 fill-coral-500" />
            <span>Admissions Enquiry</span>
          </Link>
        </div>

        {/* Preschool Highlight Pillars (Replaces irrelevant university statistics) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto w-full">
          <div className="p-4 rounded-2xl bg-white/90 border border-sky-100 shadow-xs flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-2">
              <Sun className="w-4 h-4" />
            </span>
            <span className="font-extrabold text-sm text-slate-800">Joyful Learning</span>
            <span className="text-xs text-slate-500 mt-0.5">Play & exploration</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 border border-mint-100 shadow-xs flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="w-8 h-8 rounded-xl bg-mint-100 text-mint-600 flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="font-extrabold text-sm text-slate-800">Safe Environment</span>
            <span className="text-xs text-slate-500 mt-0.5">Caring supervision</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 border border-sunshine-100 shadow-xs flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="w-8 h-8 rounded-xl bg-sunshine-100 text-sunshine-700 flex items-center justify-center mb-2">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-extrabold text-sm text-slate-800">Early Milestones</span>
            <span className="text-xs text-slate-500 mt-0.5">Nursery, Jr & Sr KG</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 border border-coral-100 shadow-xs flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="w-8 h-8 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center mb-2">
              <Heart className="w-4 h-4" />
            </span>
            <span className="font-extrabold text-sm text-slate-800">Dedicated Care</span>
            <span className="text-xs text-slate-500 mt-0.5">Warm & attentive</span>
          </div>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <div className="flex flex-col items-center justify-center pt-8 z-10">
        <Link
          href="#about"
          className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-sky-600 transition-colors group focus:outline-none"
          aria-label="Scroll down to explore"
        >
          <span className="text-xs font-semibold text-slate-500 group-hover:text-sky-600 tracking-wide">
            Discover Little Kingdom
          </span>
          <div className="w-7 h-11 rounded-full border-2 border-slate-300 group-hover:border-sky-400 flex items-start justify-center p-1.5 transition-colors">
            <div className="w-1.5 h-2 rounded-full bg-sky-500 animate-bounce" />
          </div>
        </Link>
      </div>
    </section>
  );
}
