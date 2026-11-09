"use client";

import React, { useState } from "react";
import { SCHOOL_INFO, SCHOOL_BRANCHES, type SchoolBranch } from "@/lib/constants";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { MapPin, Navigation, ExternalLink, Clock, ShieldCheck, Compass, School, Sparkles } from "lucide-react";

interface MapPreviewProps {
  selectedBranchId?: string;
  onBranchSelect?: (id: string) => void;
}

export function MapPreview({ selectedBranchId, onBranchSelect }: MapPreviewProps) {
  const [internalBranchId, setInternalBranchId] = useState<string>(SCHOOL_BRANCHES[0].id);

  const activeId = selectedBranchId || internalBranchId;
  const activeBranch = SCHOOL_BRANCHES.find((b) => b.id === activeId) || SCHOOL_BRANCHES[0];

  const handleSelect = (id: string) => {
    setInternalBranchId(id);
    if (onBranchSelect) {
      onBranchSelect(id);
    }
  };

  const addressQuery = encodeURIComponent(
    `${activeBranch.name}, ${activeBranch.address}`
  );

  return (
    <div className="storybook-card overflow-hidden border-2 border-slate-200/90 flex flex-col h-full bg-white shadow-md">
      {/* Map Header with Branch Selector Buttons */}
      <div className="p-6 bg-ivory-100 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="storybook-sticker bg-mint-100 text-mint-900 border border-mint-200 mb-1">
            2 Campus Locations
          </span>
          <h4 className="text-xl font-black text-slate-900 mt-1 font-heading">
            Google Maps & Campus Access
          </h4>
        </div>

        {/* Quick Branch Switcher Pill Controls */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          {SCHOOL_BRANCHES.map((branch) => {
            const isSelected = branch.id === activeBranch.id;
            return (
              <button
                key={branch.id}
                onClick={() => handleSelect(branch.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-sky-500 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <School className="w-3.5 h-3.5" />
                <span>{branch.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Styled Map Container */}
      <div className="relative w-full h-84 sm:h-96 bg-slate-50 overflow-hidden flex items-center justify-center border-b border-slate-200">
        {/* Soft Grid Lines Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70" />

        {/* Ambient Pastel Glows */}
        <div className="absolute top-10 left-10 w-60 h-60 bg-sky-100/70 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-mint-100/70 rounded-full blur-3xl pointer-events-none" />

        {/* Interactive Location Pin Card for the Active Branch */}
        <div className="relative z-10 flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-white/95 border-2 border-slate-200 shadow-xl max-w-sm mx-4 transition-all duration-300">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-sky-400 to-sky-600 text-white flex items-center justify-center mb-3.5 shadow-md">
            <MapPin className="w-7 h-7 animate-bounce" />
          </div>

          <span className="storybook-sticker bg-sky-100 text-sky-800 border border-sky-300 text-[10px] mb-2 font-black">
            {activeBranch.badge} • {activeBranch.tagline}
          </span>

          <h5 className="font-black text-lg text-slate-900 font-heading">
            {activeBranch.name}
          </h5>

          <p className="text-xs text-slate-600 mt-1 font-mono font-medium leading-relaxed">
            {activeBranch.address}
          </p>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
            {activeBranch.cityState}
          </p>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${addressQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-black transition-all shadow-md hover:-translate-y-0.5"
          >
            <Navigation className="w-4 h-4" />
            <span>Open {activeBranch.shortName} in Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Campus Highlights for the Selected Branch */}
      <div className="p-6 bg-white space-y-4 text-xs text-slate-600">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <span className="font-extrabold text-slate-900 text-xs">
            {activeBranch.shortName} Campus Highlights:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeBranch.highlights.map((h, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold border border-slate-200"
              >
                ✓ {h}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-mint-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 font-extrabold mb-0.5">Safety & Perimeter:</strong>
              <span>Equipped with secure child gates, CCTV surveillance, and visitor sign-in at reception.</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-sunshine-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-slate-900 font-extrabold mb-0.5">Visiting Hours:</strong>
              <span>{activeBranch.officeHours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
