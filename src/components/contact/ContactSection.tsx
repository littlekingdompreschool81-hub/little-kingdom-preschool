"use client";

import React from "react";
import { SCHOOL_INFO } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { MapPreview } from "./MapPreview";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-100 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Get in Touch"
          eyebrowVariant="mint"
          title="Contact & Location"
          description="We welcome visits from prospective parents. Schedule a personalized walkthrough to experience the joyful environment at Little Kingdom Preschool."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 soft-card p-6 sm:p-8 flex flex-col justify-between bg-white border border-slate-200">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  School Office
                </span>
                <PlaceholderNotice label="Verified Details Pending Client Supply" />
              </div>

              <h3 className="text-2xl font-extrabold text-brand-heading mb-1">
                {SCHOOL_INFO.name}
              </h3>
              <p className="text-xs font-semibold text-sunshine-600 mb-6 italic">
                &ldquo;{SCHOOL_INFO.motto}&rdquo;
              </p>

              <div className="space-y-5">
                {/* Physical Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                      Campus Address
                    </h5>
                    <p className="text-sm text-slate-700 leading-relaxed font-mono">
                      {SCHOOL_INFO.placeholders.address}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">
                      {SCHOOL_INFO.placeholders.cityState}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-mint-50 text-mint-600 border border-mint-200 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                      Telephone
                    </h5>
                    <p className="text-sm text-slate-800 font-mono font-bold">
                      {SCHOOL_INFO.placeholders.phone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-sunshine-50 text-sunshine-700 border border-sunshine-200 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                      Email Address
                    </h5>
                    <p className="text-sm text-sky-700 font-mono underline">
                      {SCHOOL_INFO.placeholders.email}
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-coral-50 text-coral-600 border border-coral-200 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                      Office Hours
                    </h5>
                    <p className="text-sm text-slate-700 font-medium">
                      {SCHOOL_INFO.placeholders.officeHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Heart className="w-4 h-4 text-coral-500 fill-coral-500 shrink-0" />
              <span>Dedicated to joyful early years education</span>
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
