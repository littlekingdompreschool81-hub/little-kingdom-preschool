"use client";

import React from "react";
import { SCHOOL_INFO, PRINCIPAL_MESSAGE } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { UserCheck, Sparkles, Quote, Heart, Sun, Phone, CheckCircle2 } from "lucide-react";

export function AchievementsSection() {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden scroll-mt-20">
      {/* Background Pastel Elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-sunshine-100/50 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-sky-100/50 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="School Leadership"
          eyebrowVariant="sky"
          title={PRINCIPAL_MESSAGE.title}
          description="Guiding early childhood development with dedication, warmth, and an unwavering belief in every child's potential."
        />

        {/* Storybook Editorial Feature Box */}
        <div className="storybook-card p-8 sm:p-12 lg:p-14 border-2 border-sky-100 bg-gradient-to-br from-white via-ivory-100 to-sky-50/40 relative overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-12">
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

              <div className="mt-4 text-center space-y-2">
                <span className="storybook-sticker bg-mint-100 text-mint-900 border border-mint-200 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mint-700" />
                  Preschool Head
                </span>

                <a
                  href={`tel:${SCHOOL_INFO.principalPhone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-extrabold text-xs transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-700" />
                  <span>{SCHOOL_INFO.principalPhoneFormatted}</span>
                </a>
              </div>
            </div>

            {/* Principal Identification & Approved Message */}
            <div className="flex-1 w-full text-center lg:text-left">
              <div className="mb-4">
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
                  {SCHOOL_INFO.principal}
                </h3>
                <p className="text-lg font-extrabold text-sky-700 mt-1">
                  {SCHOOL_INFO.principalTitle}
                </p>
                <p className="text-xs font-bold text-sunshine-600 tracking-wide mt-0.5">
                  &ldquo;{SCHOOL_INFO.motto}&rdquo; • {SCHOOL_INFO.tagline}
                </p>
              </div>

              {/* Official Principal Message Body - Expanded Length Rectangle */}
              <div className="relative my-6 p-7 sm:p-10 lg:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 w-full">
                <Quote className="w-10 h-10 text-sky-200 absolute -top-5 left-6 fill-sky-100" />

                {PRINCIPAL_MESSAGE.paragraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className={`text-slate-700 leading-relaxed ${
                      idx === 0
                        ? "text-base sm:text-lg font-bold text-slate-900"
                        : "text-sm sm:text-base font-normal"
                    }`}
                  >
                    {para}
                  </p>
                ))}

                {/* Sign-off */}
                <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-slate-700 font-bold">
                    <p className="italic text-slate-500">{PRINCIPAL_MESSAGE.signOff}</p>
                    <p className="font-extrabold text-slate-900 text-sm mt-0.5">{PRINCIPAL_MESSAGE.signOffRole}</p>
                    <p className="text-sky-700">{PRINCIPAL_MESSAGE.signOffSchool}</p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunshine-100 text-amber-900 font-bold text-[11px] self-start sm:self-auto border border-sunshine-200">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    Verified Leadership Message
                  </span>
                </div>
              </div>

              {/* Three Nurturing Commitments */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-700 font-bold">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-2xs">
                  <Heart className="w-4 h-4 text-coral-500 fill-coral-500 shrink-0" />
                  <span>Warm & Safe Care</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-sunshine-500 shrink-0" />
                  <span>Creativity & Play</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-2xs">
                  <UserCheck className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Curious Young Minds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
