"use client";

import React from "react";
import { FACILITIES } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Landmark, Compass, Award, Building2 } from "lucide-react";

export function FacilitiesSection() {
  const facilityIcons = [
    <Landmark key="1" className="w-6 h-6 text-gold-400" />,
    <Compass key="2" className="w-6 h-6 text-gold-400" />,
    <Building2 key="3" className="w-6 h-6 text-gold-400" />,
    <Award key="4" className="w-6 h-6 text-gold-400" />,
  ];

  return (
    <section id="facilities" className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Campus Infrastructure"
          title="World-Class Learning Environments"
          description="Architecture purposefully conceived to inspire contemplation, scientific experimentation, physical wellbeing, and artistic performance."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACILITIES.map((facility, index) => (
            <div
              key={index}
              className="glass-card rounded-xl p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-lg bg-navy-850 border border-gold-500/30 flex items-center justify-center group-hover:border-gold-400 transition-colors">
                    {facilityIcons[index % facilityIcons.length]}
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-400/80 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                    {facility.category}
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-ivory mb-3 group-hover:text-gold-200 transition-colors">
                  {facility.title}
                </h3>

                <p className="text-sm sm:text-base text-ivory/70 leading-relaxed font-light mb-6">
                  {facility.description}
                </p>
              </div>

              <div className="pt-6 border-t border-navy-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <span className="font-mono text-gold-400/90 font-medium">
                  {facility.specs}
                </span>
                <PlaceholderNotice label="Facility Audit Pending" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
