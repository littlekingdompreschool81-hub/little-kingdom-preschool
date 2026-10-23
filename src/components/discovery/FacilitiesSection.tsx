"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Sparkles, Sun, Heart, Smile } from "lucide-react";

export function FacilitiesSection() {
  const preschoolSpaces = [
    {
      title: "Bright & Cheerful Activity Rooms",
      category: "Learning Environment",
      description:
        "Well-ventilated, colorful classrooms equipped with child-height furniture, sensory learning corners, and safe tactile materials.",
      badge: "Classroom Spaces",
      icon: <Sun className="w-5 h-5 text-sunshine-600" />,
    },
    {
      title: "Creative Arts & Messy Play Corner",
      category: "Creative Expression",
      description:
        "Dedicated spaces for finger painting, clay sculpting, sensory trays, and craft projects that let little imaginations flourish.",
      badge: "Art Corner",
      icon: <Sparkles className="w-5 h-5 text-coral-600" />,
    },
    {
      title: "Safe Indoor & Outdoor Play Zone",
      category: "Physical Play",
      description:
        "Child-safe play equipment, soft-landing mats, and age-appropriate physical play structures for active coordination and group fun.",
      badge: "Play Zone",
      icon: <Smile className="w-5 h-5 text-mint-600" />,
    },
    {
      title: "Cozy Story & Reading Circles",
      category: "Early Literacy",
      description:
        "A quiet, comfortable nook with picture books, soft cushions, and puppets where teachers bring captivating tales to life.",
      badge: "Reading Nook",
      icon: <Heart className="w-5 h-5 text-sky-600" />,
    },
  ];

  return (
    <section id="spaces" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-100 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Preschool Spaces"
          eyebrowVariant="sky"
          title="Safe, Inspiring Learning Spaces"
          description="Designed to nurture curious little minds in a secure, hygienic, and joyous preschool environment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {preschoolSpaces.map((space, index) => (
            <div
              key={index}
              className="soft-card p-6 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-ivory-200 flex items-center justify-center">
                    {space.icon}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    {space.badge}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-brand-heading mb-2 group-hover:text-sky-600 transition-colors">
                  {space.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {space.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="font-semibold text-slate-500">
                  {space.category}
                </span>
                <PlaceholderNotice label="Facility details pending client audit" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
