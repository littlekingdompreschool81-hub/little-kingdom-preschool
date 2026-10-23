"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { LearningJourneyCanvas } from "../3d/LearningJourneyCanvas";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Compass, GraduationCap, Sparkles } from "lucide-react";

export function LearningJourneySection() {
  return (
    <section
      id="journey"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-navy-950 overflow-hidden"
    >
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-navy-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <SectionHeader
          eyebrow="Pedagogical Philosophy"
          title="A Journey Into Learning"
          description="Education is not the mere memorization of facts, but an intellectual voyage. As our students advance through each stage, timeless literature, global perspective, and scientific inquiry emerge as cornerstones of their character."
        />

        {/* Learning Journey 3D Canvas / Narrative */}
        <div className="w-full my-6">
          <LearningJourneyCanvas />
        </div>

        {/* Narrative Callout Banner */}
        <div className="mt-12 max-w-4xl w-full p-6 sm:p-8 rounded-xl bg-navy-900/80 border border-gold-500/20 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-ivory">
                Holistic Intellectual Transformation
              </h4>
              <p className="text-sm text-ivory/70 mt-1">
                From early childhood discovery to pre-university research, our curriculum fosters critical minds capable of independent synthesis.
              </p>
            </div>
          </div>
          <PlaceholderNotice label="Curriculum Board Accredited" className="shrink-0" />
        </div>
      </div>
    </section>
  );
}
