"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { EnquiryForm } from "./EnquiryForm";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Calendar, Heart, Sparkles, Smile, PhoneCall, ShieldCheck } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";

export function AdmissionsSection() {
  const steps = [
    {
      step: "01",
      title: "Online Enquiry",
      desc: "Share your child's name and class preference through our quick form below.",
      icon: <Sparkles className="w-6 h-6 text-sky-600" />,
      color: "from-sky-50 to-white border-sky-200",
    },
    {
      step: "02",
      title: "Campus Walkthrough",
      desc: "Tour our colorful discovery rooms, outdoor play lawns, and meet our teachers.",
      icon: <Calendar className="w-6 h-6 text-mint-600" />,
      color: "from-mint-50 to-white border-mint-200",
    },
    {
      step: "03",
      title: "Child Interaction",
      desc: "A warm, gentle readiness conversation designed to make your child feel at ease.",
      icon: <Smile className="w-6 h-6 text-sunshine-600" />,
      color: "from-sunshine-50 to-white border-sunshine-200",
    },
    {
      step: "04",
      title: "Enrolment & Welcome",
      desc: "Receive your welcome pack and join the Little Kingdom family of happy learners!",
      icon: <Heart className="w-6 h-6 text-coral-600" />,
      color: "from-coral-50 to-white border-coral-200",
    },
  ];

  return (
    <section id="admissions" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-sky-100/40 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-sunshine-100/40 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Admissions Open 2026–2027"
          eyebrowVariant="sky"
          title="Begin Your Child's Journey"
          description="We welcome curious toddlers and enthusiastic young learners. Our admissions process is gentle, supportive, and designed around your family."
        />

        {/* 4 Storybook Enrolment Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`storybook-card p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br ${item.color} border-2`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-slate-800 font-heading">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                Step 0{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid: Form + Sidebar Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <EnquiryForm />
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Admissions Desk Card */}
            <div className="storybook-card p-8 bg-ivory-100 border-2 border-slate-200 shadow-sm">
              <span className="storybook-sticker bg-sky-100 text-sky-800 border border-sky-200 mb-3">
                Admissions Desk
              </span>
              <h4 className="text-2xl font-black text-slate-900 mb-2">
                We&apos;re Here to Help
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                Have questions about age readiness, classroom routines, or school hours? Our admissions coordinator is happy to assist.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-200 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">
                    Phone Enquiry:
                  </span>
                  <span className="font-mono text-slate-900 font-extrabold text-sm">
                    {SCHOOL_INFO.placeholders.phone}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase tracking-wider block mb-0.5">
                    Admissions Hours:
                  </span>
                  <span className="text-slate-700 font-medium">
                    {SCHOOL_INFO.placeholders.officeHours}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <PlaceholderNotice label="Phone number to be updated by school management" />
              </div>
            </div>

            {/* School Prospectus Box */}
            <div className="p-8 rounded-4xl bg-gradient-to-br from-sunshine-50 to-sunshine-100/70 border-2 border-sunshine-200/90 text-slate-800 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sunshine-600" />
                <h5 className="font-extrabold text-base text-slate-900">
                  Preschool Information Guide
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Our complete 2026–2027 information booklet detailing daily schedules and fee structures will be available upon verified client upload.
              </p>
              <div className="pt-2">
                <PlaceholderNotice label="Official 2026 prospectus booklet pending upload" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
