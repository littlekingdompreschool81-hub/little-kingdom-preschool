"use client";

import React from "react";
import { SCHOOL_INFO } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { MapPreview } from "./MapPreview";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, Sparkles } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Connect With Us"
          eyebrowVariant="mint"
          title="School Office & Directions"
          description="We warmly invite you to visit our classrooms, walk our safe play lawns, and meet our early childhood educators in person."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 storybook-card p-8 sm:p-10 flex flex-col justify-between bg-white border-2 border-slate-200">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="storybook-sticker bg-sky-100 text-sky-800 border border-sky-200">
                  Campus Secretariat
                </span>
                <PlaceholderNotice label="Verified Details Pending Client Supply" />
              </div>

              <h3 className="text-3xl font-black text-slate-900 mb-1">
                {SCHOOL_INFO.name}
              </h3>
              <p className="text-xs font-bold text-sunshine-600 mb-8 italic">
                &ldquo;{SCHOOL_INFO.motto}&rdquo;
              </p>

              <div className="space-y-6">
                {/* Physical Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                      Campus Location
                    </h5>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-mono font-medium">
                      {SCHOOL_INFO.placeholders.address}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">
                      {SCHOOL_INFO.placeholders.cityState}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-mint-50 text-mint-600 border border-mint-200 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                      Telephone Enquiries
                    </h5>
                    <p className="text-sm sm:text-base text-slate-900 font-mono font-extrabold">
                      {SCHOOL_INFO.placeholders.phone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sunshine-50 text-sunshine-700 border border-sunshine-200 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                      Electronic Mail
                    </h5>
                    <p className="text-sm sm:text-base text-sky-700 font-mono underline font-medium">
                      {SCHOOL_INFO.placeholders.email}
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-coral-50 text-coral-600 border border-coral-200 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                      Visiting & Office Hours
                    </h5>
                    <p className="text-sm sm:text-base text-slate-800 font-medium">
                      {SCHOOL_INFO.placeholders.officeHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-slate-500">
              <Heart className="w-4 h-4 text-coral-500 fill-coral-500 shrink-0" />
              <span>A loving preschool dedicated to happy beginnings</span>
            </div>
          </div>

          {/* Google Maps / Map Preview */}
          <div className="lg:col-span-7">
            <MapPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
