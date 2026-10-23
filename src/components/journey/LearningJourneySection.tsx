"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { LearningJourneyCanvas } from "../3d/LearningJourneyCanvas";
import { Heart, Sparkles, Smile } from "lucide-react";

export function LearningJourneySection() {
  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-100 overflow-hidden"
    >
      {/* Background Pastel Radial Blobs */}
      <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full pastel-glow-mint pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full pastel-glow-sky pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        <SectionHeader
          eyebrow="Early Childhood Discovery"
          eyebrowVariant="sunshine"
          title="A Little World of Wonder"
          description="In our classrooms, every day is an adventure in creative play, story circles, and hands-on discovery. We help little minds blossom with curiosity, kindness, and big dreams."
        />

        {/* 3D Visual Scene / Graceful Fallback */}
        <div className="w-full my-4">
          <LearningJourneyCanvas />
        </div>

        {/* Friendly Preschool Philosophy Note */}
        <div className="mt-10 max-w-4xl w-full p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sunshine-100 text-sunshine-700 flex items-center justify-center shrink-0">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-extrabold text-brand-heading">
                Where Happy Beginnings Lead to Big Dreams
              </h4>
              <p className="text-sm text-slate-600 mt-1 font-normal leading-relaxed">
                We believe young children learn best when they feel secure, valued, and free to explore. Our child-centric approach balances spontaneous play with gentle guidance.
              </p>
            </div>
          </div>
          <div className="shrink-0 px-3.5 py-1.5 rounded-full bg-mint-50 border border-mint-200 text-mint-800 text-xs font-bold">
            Child-Centric Learning
          </div>
        </div>
      </div>
    </section>
  );
}
