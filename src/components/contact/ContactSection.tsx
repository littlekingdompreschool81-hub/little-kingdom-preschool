"use client";

import React, { useState } from "react";
import { SCHOOL_INFO, SCHOOL_BRANCHES, type SchoolBranch } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { MapPreview } from "./MapPreview";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Heart,
  Sparkles,
  School,
  ExternalLink,
  Navigation,
  Compass,
} from "lucide-react";

export function ContactSection() {
  const [selectedBranchId, setSelectedBranchId] = useState<string>(SCHOOL_BRANCHES[0].id);

  const selectedBranch =
    SCHOOL_BRANCHES.find((b) => b.id === selectedBranchId) || SCHOOL_BRANCHES[0];

  return (
    <section id="branches" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory-100 relative overflow-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-sky-100/50 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-mint-100/50 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <div id="contact" className="scroll-mt-24">
          <SectionHeader
            eyebrow="2 School Locations"
            eyebrowVariant="mint"
            title="Our 2 Campuses & Directions"
            description="Little Kingdom Preschool proudly operates across two vibrant, thoughtfully designed branch campuses. Families can explore both locations below."
          />
        </div>

        {/* 2-Branch Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {SCHOOL_BRANCHES.map((branch, index) => {
            const isSelected = branch.id === selectedBranchId;
            const isBranch1 = index === 0;

            return (
              <div
                key={branch.id}
                onClick={() => setSelectedBranchId(branch.id)}
                className={`storybook-card p-8 sm:p-10 flex flex-col justify-between border-2 cursor-pointer transition-all duration-300 relative ${
                  isSelected
                    ? isBranch1
                      ? "bg-gradient-to-br from-sky-50 via-white to-sky-100/40 border-sky-400 shadow-xl ring-2 ring-sky-300 scale-[1.01]"
                      : "bg-gradient-to-br from-mint-50 via-white to-mint-100/40 border-mint-400 shadow-xl ring-2 ring-mint-300 scale-[1.01]"
                    : "bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-lg"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`storybook-sticker ${
                        isBranch1
                          ? "bg-sky-100 text-sky-900 border-sky-300"
                          : "bg-mint-100 text-mint-900 border-mint-300"
                      }`}
                    >
                      <School className="w-3.5 h-3.5" />
                      {branch.badge}
                    </span>

                    <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                      Campus 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 font-heading">
                    {branch.name}
                  </h3>
                  <p className="text-xs font-extrabold text-sky-700 mb-6 italic">
                    &ldquo;{branch.tagline}&rdquo;
                  </p>

                  <div className="space-y-5 text-xs sm:text-sm text-slate-700">
                    {/* Address */}
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                          isBranch1 ? "bg-sky-100 text-sky-700 border-sky-200" : "bg-mint-100 text-mint-700 border-mint-200"
                        }`}
                      >
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Campus Address
                        </span>
                        <p className="font-mono text-slate-800 font-medium leading-relaxed">
                          {branch.address}
                        </p>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">
                          {branch.cityState} • {branch.landmark}
                        </p>
                      </div>
                    </div>

                    {/* Contact Person & Telephone */}
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                          isBranch1 ? "bg-sky-100 text-sky-700 border-sky-200" : "bg-mint-100 text-mint-700 border-mint-200"
                        }`}
                      >
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Contact Details ({branch.contactPerson})
                        </span>
                        <a
                          href={`tel:${branch.phone}`}
                          className="font-mono font-extrabold text-slate-900 hover:text-sky-700 transition-colors inline-flex items-center gap-1.5"
                        >
                          <span>{branch.contactPerson} - {branch.phone}</span>
                        </a>
                      </div>
                    </div>

                    {/* Office Hours */}
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                          isBranch1 ? "bg-sky-100 text-sky-700 border-sky-200" : "bg-mint-100 text-mint-700 border-mint-200"
                        }`}
                      >
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-0.5">
                          Visiting Hours
                        </span>
                        <p className="text-slate-800 font-medium">
                          {branch.officeHours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Selection and Maps CTA */}
                <div className="pt-6 mt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBranchId(branch.id);
                    }}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                      isSelected
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <span>{isSelected ? "Currently Viewing on Map" : `View ${branch.shortName} on Map`}</span>
                  </button>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.name + ", " + branch.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-sky-700 hover:text-sky-900 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Google Map Preview for Active Branch */}
        <div className="grid grid-cols-1 gap-8">
          <MapPreview
            selectedBranchId={selectedBranchId}
            onBranchSelect={(id) => setSelectedBranchId(id)}
          />
        </div>

        {/* Operational Cohesion & Verified Coordinator Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sunshine-100 text-amber-900 flex items-center justify-center shrink-0">
              <Sparkles className="w-7 h-7 text-amber-700" />
            </div>
            <div>
              <strong className="text-slate-900 text-base font-extrabold block">
                Direct Admissions Helpline & Coordination
              </strong>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                For admissions across both branches, reach out directly to Admissions Coordinator <strong>Mrs. Kalpana Kadam</strong> or Principal <strong>{SCHOOL_INFO.principal}</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+917039015296"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-sky-600/20 transition-all hover:scale-102"
            >
              <Phone className="w-4 h-4" />
              <span>Call Neeta Jadhav: 70390 15296</span>
            </a>
            <a
              href="tel:+919594681373"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-mint-500 hover:bg-mint-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-mint-500/20 transition-all hover:scale-102"
            >
              <Phone className="w-4 h-4" />
              <span>Kalpana Kadam: 95946 81373</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
