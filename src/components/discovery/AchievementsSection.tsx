"use client";

import React from "react";
import { SCHOOL_INFO } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { UserCheck, Sparkles, Quote } from "lucide-react";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";

export function AchievementsSection() {
  return (
    <section id="principal" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Leadership & Vision"
          eyebrowVariant="sky"
          title="A Message from Our Principal"
          description="Guiding early childhood learning with warmth, dedication, and an unwavering commitment to every child's individual growth."
        />

        {/* Principal Message Card */}
        <div className="soft-card p-8 sm:p-12 lg:p-14 border border-slate-200/90 relative overflow-hidden bg-gradient-to-br from-white via-ivory-100 to-sky-50/30">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10">
            {/* Principal Visual Badge / Avatar */}
            <div className="flex flex-col items-center shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-sky-100 via-mint-100 to-sunshine-100 border-2 border-slate-200/80 shadow-md flex items-center justify-center text-sky-700">
                <UserCheck className="w-14 h-14 text-sky-600" />
              </div>
              <div className="mt-3 text-center">
                <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  Leadership
                </span>
              </div>
            </div>

            {/* Principal Identification & Message */}
            <div className="flex-1 text-center md:text-left">
              <div className="mb-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-heading">
                  {SCHOOL_INFO.principal}
                </h3>
                <p className="text-base font-bold text-sky-700 mt-1">
                  {SCHOOL_INFO.principalTitle}
                </p>
                <p className="text-xs font-semibold text-sunshine-600 tracking-wide mt-0.5">
                  &ldquo;{SCHOOL_INFO.motto}&rdquo;
                </p>
              </div>

              {/* Exact Unapproved Quotation Rule: Do not invent quote; use editable placeholder */}
              <div className="relative my-6 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <Quote className="w-8 h-8 text-slate-300 absolute -top-4 left-4 fill-slate-100" />
                <p className="text-slate-600 font-medium italic leading-relaxed text-base sm:text-lg">
                  &ldquo;{SCHOOL_INFO.principalMessagePlaceholder}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-slate-400 font-medium">
                    Official welcome address pending administrative sign-off
                  </span>
                  <PlaceholderNotice label="Principal's message pending approval" />
                </div>
              </div>

              {/* Commitment Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
                <div className="p-3 rounded-xl bg-ivory-100 border border-slate-200/60 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sunshine-500 shrink-0" />
                  <span className="font-semibold">Nurturing Environment</span>
                </div>
                <div className="p-3 rounded-xl bg-ivory-100 border border-slate-200/60 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-mint-500 shrink-0" />
                  <span className="font-semibold">Attentive Care</span>
                </div>
                <div className="p-3 rounded-xl bg-ivory-100 border border-slate-200/60 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-500 shrink-0" />
                  <span className="font-semibold">Joyful Beginnings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
