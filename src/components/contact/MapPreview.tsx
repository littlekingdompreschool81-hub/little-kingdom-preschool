"use client";

import React from "react";
import { SCHOOL_PLACEHOLDERS } from "@/lib/constants";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { MapPin, Navigation, Car, Bus, ExternalLink } from "lucide-react";

export function MapPreview() {
  const addressQuery = encodeURIComponent(
    `${SCHOOL_PLACEHOLDERS.address.line1}, ${SCHOOL_PLACEHOLDERS.address.city}, ${SCHOOL_PLACEHOLDERS.address.country}`
  );

  return (
    <div className="glass-card rounded-2xl overflow-hidden border border-gold-500/30 flex flex-col h-full">
      {/* Map Header */}
      <div className="p-6 bg-navy-950/80 border-b border-gold-500/20 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-gold-400 block mb-1">
            Campus Geolocation
          </span>
          <h4 className="font-serif text-lg font-bold text-ivory">
            Google Maps & Transit Directions
          </h4>
        </div>
        <PlaceholderNotice label="Official GPS Pin Pending Client Verification" />
      </div>

      {/* Styled Map Container */}
      <div className="relative w-full h-72 sm:h-80 bg-navy-950 overflow-hidden flex items-center justify-center">
        {/* Decorative Grid Lines (Dark Cartographic Style) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#162e52_1px,transparent_1px),linear-gradient(to_bottom,#162e52_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

        {/* Ambient Map Glow */}
        <div className="absolute w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Interactive Pin Card */}
        <div className="relative z-10 flex flex-col items-center text-center p-6 rounded-xl bg-navy-900/90 border border-gold-500/40 backdrop-blur-md shadow-2xl max-w-sm mx-4">
          <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400 mb-3 animate-bounce">
            <MapPin className="w-6 h-6" />
          </div>
          <h5 className="font-serif font-bold text-base text-ivory">
            {SCHOOL_PLACEHOLDERS.institutionName}
          </h5>
          <p className="text-xs text-ivory/70 mt-1 font-mono">
            {SCHOOL_PLACEHOLDERS.address.line1}
          </p>
          <p className="text-xs text-gold-400/90 font-mono">
            {SCHOOL_PLACEHOLDERS.address.city}, {SCHOOL_PLACEHOLDERS.address.country}
          </p>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${addressQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs font-bold transition-all shadow-md"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      {/* Transit & Access Details */}
      <div className="p-6 bg-navy-900/90 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-ivory/80">
        <div className="flex items-start gap-3">
          <Car className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-ivory font-semibold mb-0.5">Visitor Parking:</strong>
            <span>Designated visitor bays available via North Security Gate. Valid photo ID required for gate pass.</span>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Bus className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-ivory font-semibold mb-0.5">Transit Connectivity:</strong>
            <span>Conveniently connected via major arterial transit routes with dedicated institutional shuttle routes.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
