"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Compass, Award, Calendar, ChevronRight } from "lucide-react";
import { SCHOOL_PLACEHOLDERS } from "@/lib/constants";
import { HeroStats } from "./HeroStats";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";

export function CampusHero() {
  return (
    <section
      id="campus"
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Architectural Canvas Image with Vignette & Navy Tint */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85"
          alt="Campus Architectural Quadrangle"
          fill
          priority
          className="object-cover object-center scale-105 filter brightness-[0.32] contrast-[1.12]"
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-navy-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
      </div>

      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Hero Header Content */}
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center my-auto z-10">
        {/* Verification & Accreditation Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-800/80 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-medium backdrop-blur-md">
            <Award className="w-4 h-4 text-gold-400" />
            <span>{SCHOOL_PLACEHOLDERS.accreditation}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
            <span className="font-mono text-xs">{SCHOOL_PLACEHOLDERS.affiliationNumber}</span>
          </div>
          <PlaceholderNotice label="Official Board Verification" />
        </div>

        {/* Institution Title & Tagline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ivory max-w-4xl leading-[1.1] mb-6">
          <span className="block text-ivory drop-shadow-md">
            {SCHOOL_PLACEHOLDERS.institutionName}
          </span>
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-normal text-gold-400 font-serif italic tracking-normal">
            A Journey Into Learning
          </span>
        </h1>

        {/* School Motto / Philosophy */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-ivory/80 leading-relaxed font-light mb-8">
          Fostering academic rigour, global perspective, and compassionate leadership across generations of scholars.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          <Link
            href="#journey"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm tracking-wide shadow-xl shadow-gold-500/25 hover:shadow-gold-500/40 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Our School</span>
          </Link>

          <Link
            href="#admissions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-md bg-navy-850/80 hover:bg-navy-800 text-ivory border border-gold-500/40 hover:border-gold-400 text-sm font-semibold transition-all duration-300 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>Admissions Enquiry 2026–27</span>
            <ChevronRight className="w-4 h-4 text-ivory/60" />
          </Link>
        </div>

        {/* Key Statistics Bar */}
        <HeroStats />
      </div>

      {/* Downward Scroll Cue */}
      <div className="flex flex-col items-center justify-center pt-8 z-10">
        <Link
          href="#journey"
          className="flex flex-col items-center gap-2 text-ivory/60 hover:text-gold-400 transition-colors group focus:outline-none"
          aria-label="Scroll down to begin learning journey"
        >
          <span className="text-[11px] uppercase tracking-widest font-mono text-gold-400/90 group-hover:text-gold-300">
            Begin the Journey
          </span>
          <div className="w-8 h-12 rounded-full border border-gold-500/40 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-gold-400 animate-bounce" />
          </div>
        </Link>
      </div>
    </section>
  );
}
