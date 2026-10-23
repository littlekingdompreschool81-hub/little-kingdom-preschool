"use client";

import React from "react";
import { SCHOOL_PLACEHOLDERS } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { MapPreview } from "./MapPreview";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { MapPin, Phone, Mail, Clock, ShieldAlert } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Connect With Us"
          title="Institutional Contacts & Campus Visit"
          description="We encourage prospective parents and students to visit our campus, observe our seminars, and interact with our faculty."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-8 flex flex-col justify-between border border-gold-500/25">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400">
                  Campus Secretariat
                </span>
                <PlaceholderNotice label="Verified Contact Information" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-ivory mb-6">
                {SCHOOL_PLACEHOLDERS.institutionName}
              </h3>

              <div className="space-y-6">
                {/* Physical Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy-850 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-gold-400 mb-1">
                      Campus Location
                    </h5>
                    <p className="text-sm text-ivory/80 leading-relaxed">
                      {SCHOOL_PLACEHOLDERS.address.line1}
                    </p>
                    <p className="text-sm text-ivory/80">
                      {SCHOOL_PLACEHOLDERS.address.city}, {SCHOOL_PLACEHOLDERS.address.stateZip}
                    </p>
                    <p className="text-xs text-gold-300 font-mono mt-0.5">
                      {SCHOOL_PLACEHOLDERS.address.country}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy-850 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-gold-400 mb-1">
                      Telephone
                    </h5>
                    <p className="text-sm text-ivory/90 font-mono">
                      Admissions: {SCHOOL_PLACEHOLDERS.contact.admissionsPhone}
                    </p>
                    <p className="text-sm text-ivory/70 font-mono">
                      Main Desk: {SCHOOL_PLACEHOLDERS.contact.generalPhone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy-850 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-gold-400 mb-1">
                      Electronic Mail
                    </h5>
                    <p className="text-sm text-gold-300 underline font-mono">
                      {SCHOOL_PLACEHOLDERS.contact.admissionsEmail}
                    </p>
                    <p className="text-sm text-ivory/70 font-mono">
                      {SCHOOL_PLACEHOLDERS.contact.generalEmail}
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-navy-850 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-mono uppercase tracking-wider text-gold-400 mb-1">
                      Admissions Office Timings
                    </h5>
                    <p className="text-sm text-ivory/80">
                      {SCHOOL_PLACEHOLDERS.contact.officeHours}
                    </p>
                    <p className="text-xs text-ivory/50 mt-0.5">
                      Closed on National & Institutional Holidays
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-navy-800 text-xs font-mono text-ivory/50">
              <span>Institution Affiliation Code: </span>
              <span className="text-gold-400 font-bold">{SCHOOL_PLACEHOLDERS.affiliationNumber}</span>
            </div>
          </div>

          {/* Google Maps Embed / Interactive Preview */}
          <div className="lg:col-span-7">
            <MapPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
