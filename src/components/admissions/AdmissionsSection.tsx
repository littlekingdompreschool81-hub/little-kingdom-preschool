"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { EnquiryForm } from "./EnquiryForm";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Send, School, Users, Sparkles, Heart, Smile, Phone, MapPin, Clock } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";

export function AdmissionsSection() {
  const steps = [
    {
      step: "01",
      title: "Send Enquiry",
      desc: "Fill in our gentle online form below with your child's name and class preference (Nursery, Junior KG, or Senior KG).",
      icon: <Send className="w-6 h-6 text-sky-600" />,
      color: "from-sky-50 to-white border-sky-300",
      badge: "Quick Step",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
    },
    {
      step: "02",
      title: "Visit School",
      desc: "Take an in-person walkthrough of our discovery corners, creative arts space, and safe outdoor activity lawn.",
      icon: <School className="w-6 h-6 text-mint-600" />,
      color: "from-mint-50 to-white border-mint-300",
      badge: "Campus Tour",
      badgeColor: "bg-mint-100 text-mint-800 border-mint-200",
    },
    {
      step: "03",
      title: "Meet the Teachers",
      desc: "A warm, gentle conversation where our teachers get to know your child's personality, routines, and interests.",
      icon: <Users className="w-6 h-6 text-amber-600" />,
      color: "from-sunshine-50 to-white border-sunshine-300",
      badge: "Friendly Chat",
      badgeColor: "bg-sunshine-100 text-amber-800 border-sunshine-200",
    },
    {
      step: "04",
      title: "Begin Learning",
      desc: "Receive your Little Kingdom welcome kit, meet your new friends, and step into the kingdom of happy discovery!",
      icon: <Sparkles className="w-6 h-6 text-coral-600" />,
      color: "from-coral-50 to-white border-coral-300",
      badge: "Welcome Day",
      badgeColor: "bg-coral-100 text-coral-800 border-coral-200",
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

        {/* 4 Friendly Illustrated Journey Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-br ${item.color} border-2 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 relative`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 font-heading font-black text-sm shadow-2xs">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>

                <span className={`storybook-sticker text-[10px] ${item.badgeColor} mb-2.5`}>
                  {item.badge}
                </span>

                <h4 className="text-xl font-black text-slate-900 mb-2 font-heading">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/70 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                Step 0{index + 1} of 04
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
              <h4 className="text-2xl font-black text-slate-900 mb-2 font-heading">
                We&apos;re Here to Help
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                Have questions about age criteria, daily routines, or walkthrough appointments? Our admissions team is happy to assist.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-200/80 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-slate-900 block">Visiting Hours:</span>
                    <span>{SCHOOL_INFO.placeholders.officeHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-extrabold text-slate-900 block">Contact Desk:</span>
                    <a
                      href="tel:+917039015296"
                      className="font-bold text-sky-800 hover:underline block text-xs"
                    >
                      📞 Neeta Jadhav: 70390 15296
                    </a>
                    <a
                      href="tel:+919594681373"
                      className="font-bold text-mint-800 hover:underline block text-xs"
                    >
                      📞 Kalpana Kadam: 95946 81373
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-coral-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-slate-900 block">2 Campus Branches:</span>
                    <div className="mt-1 space-y-1.5 font-mono text-[11px]">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                        <strong className="text-sky-800 block font-bold">Branch 1 (Ambika Nagar):</strong>
                        <span className="text-slate-600 block text-[11px]">Subhash Chandra Bose Rd, behind S Raju Photo Studio, Dombivli West</span>
                        <a
                          href={SCHOOL_INFO.branches[0].googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 text-[10px] font-extrabold text-sky-700 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open in Google Maps &rarr;</span>
                        </a>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                        <strong className="text-mint-800 block font-bold">Branch 2 (Rajvaibhav NX):</strong>
                        <span className="text-slate-600 block text-[11px]">Bhagwan, Kathe Chawl, Rajvaibhav NX, Dombivli West</span>
                        <a
                          href={SCHOOL_INFO.branches[1].googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 text-[10px] font-extrabold text-mint-700 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open in Google Maps &rarr;</span>
                        </a>
                      </div>
                    </div>
                    <a
                      href="#branches"
                      className="inline-block mt-2 text-[11px] font-extrabold text-sky-700 hover:underline"
                    >
                      View both branches on Google Maps &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Reassurance Badge Box */}
            <div className="p-6 rounded-3xl bg-mint-50/80 border-2 border-mint-200/90 shadow-2xs">
              <div className="flex items-center gap-2.5 text-mint-900 font-extrabold text-sm mb-2">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span>Nurturing Gentle Transition</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We understand that starting preschool is a major family milestone. Our gentle settling-in period ensures every child feels safe, loved, and at home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
