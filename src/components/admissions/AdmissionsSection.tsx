"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { EnquiryForm } from "./EnquiryForm";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Calendar, Heart, Sparkles, Smile, PhoneCall } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";

export function AdmissionsSection() {
  const steps = [
    {
      step: "01",
      title: "Online Enquiry",
      desc: "Submit the quick enquiry form with child & parent details.",
      icon: <Sparkles className="w-5 h-5 text-sky-600" />,
    },
    {
      step: "02",
      title: "Campus Walkthrough",
      desc: "Tour our colorful classrooms, play zones, and meet our teachers.",
      icon: <Calendar className="w-5 h-5 text-mint-600" />,
    },
    {
      step: "03",
      title: "Enrolment Guide",
      desc: "Simple documentation review and child readiness interaction.",
      icon: <Smile className="w-5 h-5 text-sunshine-600" />,
    },
    {
      step: "04",
      title: "Welcome to School",
      desc: "Receive the welcome kit and start a joyful preschool journey!",
      icon: <Heart className="w-5 h-5 text-coral-600" />,
    },
  ];

  return (
    <section id="admissions" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Admissions Open 2026–27"
          eyebrowVariant="sky"
          title="Begin the Journey at Little Kingdom"
          description="We invite parents to take the first step. Our admissions process is gentle, warm, and supportive for every family."
        />

        {/* 4 Friendly Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-ivory-100 border border-slate-200/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-sky-600">
                    {item.step}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center border border-slate-200">
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-base font-extrabold text-brand-heading mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid: Form + Sidebar Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Admissions Assistance Card */}
            <div className="soft-card p-6 sm:p-8 bg-ivory-100 border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block mb-2">
                Admissions Desk
              </span>
              <h4 className="text-xl font-extrabold text-brand-heading mb-3">
                Have Questions?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-5">
                Our admissions coordinator is delighted to answer queries regarding class readiness, school hours, and transport support.
              </p>

              <div className="space-y-3 pt-3 border-t border-slate-200/80 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">Phone Enquiry:</span>
                  <span className="font-mono text-slate-800 font-bold">
                    {SCHOOL_INFO.placeholders.phone}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Office Timings:</span>
                  <span className="text-slate-700">
                    {SCHOOL_INFO.placeholders.officeHours}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <PlaceholderNotice label="Verified phone number pending school update" />
              </div>
            </div>

            {/* School Prospectus Card */}
            <div className="p-6 rounded-3xl bg-sunshine-50 border border-sunshine-200/80 text-xs text-sunshine-900 space-y-3">
              <h5 className="font-extrabold text-sm text-sunshine-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sunshine-600" />
                <span>Preschool Enrolment Guide</span>
              </h5>
              <p className="text-sunshine-800/90 leading-relaxed">
                The complete preschool information booklet with daily routines and fee structures will be available upon verified client upload.
              </p>
              <PlaceholderNotice label="Official 2026 brochure pending client upload" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
