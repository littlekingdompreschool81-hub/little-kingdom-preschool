"use client";

import React from "react";
import { SCHOOL_INFO } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { UserCheck, Sparkles, Quote, Heart, Sun } from "lucide-react";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";

export function AchievementsSection() {
  return (
    <section id="principal" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background Pastel Elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-sunshine-100/50 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-sky-100/50 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="School Leadership"
          eyebrowVariant="sky"
          title="A Message from Our Principal"
          description="Guiding early childhood development with dedication, warmth, and an unwavering belief in every child's potential."
        />

        {/* Storybook Editorial Feature Box */}
        <div className="storybook-card p-8 sm:p-14 lg:p-16 border-2 border-sky-100 bg-gradient-to-br from-white via-ivory-100 to-sky-50/40 relative overflow-hidden shadow-xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-12">
            {/* Principal Visual Frame */}
            <div className="flex flex-col items-center shrink-0">
              <div className="relative group">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-4xl bg-gradient-to-tr from-sky-200 via-mint-200 to-sunshine-200 border-4 border-white shadow-lg flex items-center justify-center text-sky-800">
                  <UserCheck className="w-16 h-16 text-sky-700" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-sunshine-400 text-slate-900 flex items-center justify-center shadow-md">
                  <Sun className="w-5 h-5 text-amber-950" />
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="storybook-sticker bg-sky-100 text-sky-800 border border-sky-200">
                  Preschool Head
                </span>
              </div>
            </div>

            {/* Principal Identification & Approved Quote Area */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {SCHOOL_INFO.principal}
                </h3>
                <p className="text-lg font-extrabold text-sky-700 mt-1">
                  {SCHOOL_INFO.principalTitle}
                </p>
                <p className="text-xs font-bold text-sunshine-600 tracking-wide mt-0.5">
                  &ldquo;{SCHOOL_INFO.motto}&rdquo;
                </p>
              </div>

              {/* Exact Unapproved Quote Rule: Do not invent quotation; use editable placeholder */}
              <div className="relative my-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                <Quote className="w-10 h-10 text-sky-200 absolute -top-5 left-6 fill-sky-100" />
                <p className="text-slate-700 font-medium italic leading-relaxed text-base sm:text-lg">
                  &ldquo;{SCHOOL_INFO.principalMessagePlaceholder}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-slate-400 font-semibold">
                    Official address to be uploaded following administrative review
                  </span>
                  <PlaceholderNotice label="Principal's message pending approval" />
                </div>
              </div>

              {/* Three Nurturing Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700 font-bold">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-2xs">
                  <Heart className="w-4 h-4 text-coral-500 fill-coral-500 shrink-0" />
                  <span>Loving Atmosphere</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-sunshine-500 shrink-0" />
                  <span>Playful Learning</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-2xs">
                  <UserCheck className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Dedicated Mentors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
