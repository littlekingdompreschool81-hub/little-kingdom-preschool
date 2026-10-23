"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { EnquiryForm } from "./EnquiryForm";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Download, Calendar, FileCheck, UserCheck, Shield } from "lucide-react";

export function AdmissionsSection() {
  const steps = [
    {
      step: "01",
      title: "Online Enquiry",
      desc: "Complete the initial enquiry form with prospective scholar details.",
      icon: <FileCheck className="w-5 h-5 text-gold-400" />,
    },
    {
      step: "02",
      title: "Campus Interaction",
      desc: "Attend a tailored walkthrough and developmental assessment with faculty.",
      icon: <Calendar className="w-5 h-5 text-gold-400" />,
    },
    {
      step: "03",
      title: "Offer of Admission",
      desc: "Formal evaluation and issuance of enrolment package by the admissions board.",
      icon: <UserCheck className="w-5 h-5 text-gold-400" />,
    },
    {
      step: "04",
      title: "Matriculation",
      desc: "Finalize registration, uniform fittings, and scholarly orientation.",
      icon: <Shield className="w-5 h-5 text-gold-400" />,
    },
  ];

  return (
    <section id="admissions" className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-950 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Join Our Community"
          title="Admissions & Enrolment"
          description="We welcome curious, motivated students eager to participate actively in a rigorous and compassionate learning community."
        />

        {/* 4-Step Admissions Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-navy-900/80 border border-gold-500/20 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl font-bold text-gold-400">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-md bg-navy-850 flex items-center justify-center border border-gold-500/25">
                    {item.icon}
                  </div>
                </div>
                <h4 className="font-serif text-lg font-bold text-ivory mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid: Enquiry Form + Prospectus Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Prospectus Card */}
            <div className="glass-card rounded-2xl p-8 border border-gold-500/25 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block mb-2">
                  Official Literature
                </span>
                <h4 className="font-serif text-xl font-bold text-ivory mb-3">
                  School Prospectus (2026–2027)
                </h4>
                <p className="text-xs sm:text-sm text-ivory/70 leading-relaxed font-light mb-6">
                  Detailed breakdown of academic syllabi, campus boarders, athletic schedules, and university matriculation records.
                </p>
              </div>

              <div className="pt-4 border-t border-navy-800 space-y-3">
                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "The prospectus PDF package will be linked once the client supplies the finalized verified prospectus file."
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-navy-850 hover:bg-navy-800 text-gold-300 border border-gold-500/40 text-xs font-semibold tracking-wide transition-colors"
                >
                  <Download className="w-4 h-4 text-gold-400" />
                  <span>Download Prospectus [PDF]</span>
                </button>
                <PlaceholderNotice label="Official 2026 Prospectus File Pending" />
              </div>
            </div>

            {/* Admissions Assistance Desk */}
            <div className="p-6 rounded-2xl bg-navy-900/90 border border-gold-500/20 text-xs text-ivory/80 space-y-3">
              <h5 className="font-serif font-bold text-sm text-gold-400">
                Admissions Committee Hotline
              </h5>
              <p className="leading-relaxed">
                For queries regarding mid-term transfers, scholarship bursaries, or boarding options:
              </p>
              <div className="font-mono text-gold-300">
                +[Country Code] [Admissions Office Phone Placeholder]
              </div>
              <div className="text-[11px] text-ivory/50">
                Hours: Monday – Saturday (8:30 AM – 4:30 PM)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
