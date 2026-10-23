"use client";

import React from "react";
import { SCHOOL_INFO } from "@/lib/constants";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { MapPin, Navigation, ExternalLink, Clock, ShieldCheck } from "lucide-react";

export function MapPreview() {
  const addressQuery = encodeURIComponent(
    `${SCHOOL_INFO.name}, ${SCHOOL_INFO.placeholders.address}`
  );

  return (
    <div className="storybook-card overflow-hidden border-2 border-slate-200/90 flex flex-col h-full bg-white shadow-md">
      {/* Map Header */}
      <div className="p-6 bg-ivory-100 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="storybook-sticker bg-mint-100 text-mint-800 border border-mint-200 mb-1">
            School Location
          </span>
          <h4 className="text-xl font-black text-slate-900 mt-1">
            Google Maps & Campus Access
          </h4>
        </div>
        <PlaceholderNotice label="Official GPS Pin Pending Verification" />
      </div>

      {/* Styled Map Container */}
      <div className="relative w-full h-80 sm:h-96 bg-slate-50 overflow-hidden flex items-center justify-center border-b border-slate-200">
        {/* Soft Grid Lines Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70" />

        {/* Ambient Pastel Glow */}
        <div className="absolute w-72 h-72 bg-sky-100 rounded-full blur-3xl pointer-events-none" />

        {/* Location Pin Card */}
        <div className="relative z-10 flex flex-col items-center text-center p-8 rounded-3xl bg-white/95 border-2 border-slate-200 shadow-xl max-w-sm mx-4">
          <div className="w-14 h-14 rounded-3xl bg-sky-100 text-sky-600 flex items-center justify-center mb-4 shadow-xs">
            <MapPin className="w-7 h-7 animate-bounce" />
          </div>
          <h5 className="font-black text-lg text-slate-900">
            {SCHOOL_INFO.name}
          </h5>
          <p className="text-xs text-slate-500 mt-1 font-mono font-medium">
            {SCHOOL_INFO.placeholders.address}
          </p>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${addressQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-black transition-all shadow-md hover:-translate-y-0.5"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Visitor Notes */}
      <div className="p-6 bg-white grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-mint-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-slate-900 font-extrabold mb-0.5">Secure Perimeter:</strong>
            <span>Safe preschool gates with visitor check-in at main reception to ensure child safety.</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-sunshine-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-slate-900 font-extrabold mb-0.5">Visiting Hours:</strong>
            <span>{SCHOOL_INFO.placeholders.officeHours}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
