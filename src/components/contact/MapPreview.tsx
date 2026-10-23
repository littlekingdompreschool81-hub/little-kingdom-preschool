"use client";

import React from "react";
import { SCHOOL_INFO } from "@/lib/constants";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { MapPin, Navigation, ExternalLink, Clock, Shield } from "lucide-react";

export function MapPreview() {
  const addressQuery = encodeURIComponent(
    `${SCHOOL_INFO.name}, ${SCHOOL_INFO.placeholders.address}`
  );

  return (
    <div className="soft-card overflow-hidden border border-slate-200/90 flex flex-col h-full bg-white">
      {/* Map Header */}
      <div className="p-6 bg-ivory-100 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block mb-1">
            School Location & Directions
          </span>
          <h4 className="text-lg font-extrabold text-brand-heading">
            Google Maps & Campus Access
          </h4>
        </div>
        <PlaceholderNotice label="Official GPS Pin Pending School Verification" />
      </div>

      {/* Styled Map Container */}
      <div className="relative w-full h-72 sm:h-80 bg-slate-50 overflow-hidden flex items-center justify-center border-b border-slate-200">
        {/* Soft Grid Lines Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-60" />

        {/* Ambient Pastel Glow */}
        <div className="absolute w-60 h-60 bg-sky-100 rounded-full blur-3xl pointer-events-none" />

        {/* Location Pin Card */}
        <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-white/95 border border-slate-200 shadow-md max-w-sm mx-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-3 shadow-xs">
            <MapPin className="w-6 h-6 animate-bounce" />
          </div>
          <h5 className="font-extrabold text-base text-brand-heading">
            {SCHOOL_INFO.name}
          </h5>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            {SCHOOL_INFO.placeholders.address}
          </p>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${addressQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition-all shadow-xs"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Visitor Notes */}
      <div className="p-6 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
        <div className="flex items-start gap-3">
          <Shield className="w-4 h-4 text-mint-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-slate-800 font-bold mb-0.5">Visitor Security:</strong>
            <span>Safe preschool perimeter with dedicated parent sign-in at front reception for child safety.</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-4 h-4 text-sunshine-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-slate-800 font-bold mb-0.5">Visiting Hours:</strong>
            <span>{SCHOOL_INFO.placeholders.officeHours}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
