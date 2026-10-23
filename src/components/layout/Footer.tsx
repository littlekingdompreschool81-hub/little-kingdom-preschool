"use client";

import React from "react";
import Link from "next/link";
import { Shield, ArrowUp, Heart, CheckCircle2 } from "lucide-react";
import { SCHOOL_PLACEHOLDERS, NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-950 text-ivory border-t border-gold-500/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-xl tracking-wide text-ivory">
                {SCHOOL_PLACEHOLDERS.institutionName}
              </span>
            </div>

            <p className="text-sm text-ivory/70 leading-relaxed font-light max-w-sm">
              Dedicated to academic rigour, moral integrity, artistic sensibility, and athletic discipline. Guiding tomorrow&apos;s innovators into global distinction.
            </p>

            <div className="pt-2 text-xs font-mono text-gold-400/80">
              <span>{SCHOOL_PLACEHOLDERS.accreditation}</span>
              <span className="mx-2">•</span>
              <span>{SCHOOL_PLACEHOLDERS.affiliationNumber}</span>
            </div>
          </div>

          {/* Navigation Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-400 mb-4">
              Explore Campus
            </h4>
            <ul className="space-y-2 text-sm text-ivory/70">
              {NAV_ITEMS.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-gold-300 transition-colors focus:outline-none focus:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Admissions & Academics */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-400 mb-4">
              Admissions
            </h4>
            <ul className="space-y-2 text-sm text-ivory/70">
              <li>
                <Link href="#admissions" className="hover:text-gold-300 transition-colors">
                  Enquiry Form 2026–27
                </Link>
              </li>
              <li>
                <Link href="#admissions" className="hover:text-gold-300 transition-colors">
                  Admissions Criteria
                </Link>
              </li>
              <li>
                <Link href="#admissions" className="hover:text-gold-300 transition-colors">
                  Scholarship Bursaries
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-gold-300 transition-colors">
                  Campus Walkthrough
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Verifications */}
          <div>
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-gold-400 mb-4">
              Transparency
            </h4>
            <ul className="space-y-2 text-xs text-ivory/60 font-mono">
              <li>• Institutional Charter</li>
              <li>• Safety & Child Safeguarding</li>
              <li>• Annual Examination Audits</li>
              <li>• Mandatory Public Disclosures</li>
              <li>• Accessibility Commitment</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-navy-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <div>
            <p>
              &copy; {new Date().getFullYear()} {SCHOOL_PLACEHOLDERS.institutionName}. All rights reserved.
            </p>
            <p className="text-[11px] text-ivory/40 mt-0.5">
              Production Website Architecture. Client data fields are clearly designated placeholders until formal institutional audit.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-navy-850 border border-gold-500/20 text-gold-400 hover:text-gold-300 text-xs font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-gold-400"
            aria-label="Scroll back to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
