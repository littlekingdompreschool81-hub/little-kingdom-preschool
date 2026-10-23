"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Heart, Sparkles } from "lucide-react";
import { SCHOOL_INFO, NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white text-slate-700 border-t border-slate-200/90 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Pastel Top Bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-mint-400 via-sunshine-400 to-coral-400" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white shadow-xs border border-slate-200 flex items-center justify-center shrink-0">
                <Image
                  src={SCHOOL_INFO.logoUrl}
                  alt={SCHOOL_INFO.logoAlt}
                  fill
                  className="object-contain p-0.5"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-brand-heading">
                  {SCHOOL_INFO.name}
                </span>
                <span className="text-xs font-semibold text-sunshine-600">
                  &ldquo;{SCHOOL_INFO.motto}&rdquo;
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed font-normal max-w-sm">
              Nurturing joyful, curious, and confident young learners. Our preschool provides a safe, welcoming foundation for Nursery, Junior KG, and Senior KG.
            </p>

            <div className="pt-1 text-xs font-bold text-sky-700">
              <span>{SCHOOL_INFO.principalTitle}: </span>
              <span className="text-slate-800">{SCHOOL_INFO.principal}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 font-semibold">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-sky-600 transition-colors focus:outline-none focus:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Levels */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Classes
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="#learning" className="hover:text-sky-600 transition-colors font-medium">
                  Nursery (Level 1)
                </Link>
              </li>
              <li>
                <Link href="#learning" className="hover:text-sky-600 transition-colors font-medium">
                  Junior KG (Level 2)
                </Link>
              </li>
              <li>
                <Link href="#learning" className="hover:text-sky-600 transition-colors font-medium">
                  Senior KG (Level 3)
                </Link>
              </li>
              <li>
                <Link href="#admissions" className="hover:text-sky-600 transition-colors font-medium">
                  Admission Enquiry 2026–27
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              School Hours
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">
                {SCHOOL_INFO.placeholders.officeHours}
              </p>
              <p className="pt-2 text-slate-500 italic">
                * Weekend admissions desk by prior appointment
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>
              &copy; {new Date().getFullYear()} {SCHOOL_INFO.name}. All rights reserved.
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Official Client Website • Principal: {SCHOOL_INFO.principal} • Motto: &ldquo;{SCHOOL_INFO.motto}&rdquo;
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-ivory-200 hover:bg-ivory-300 text-slate-700 text-xs font-bold transition-colors focus:outline-none"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
