"use client";

import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Sparkles, Sun, Heart, Smile, Palette, BookOpen, Shield } from "lucide-react";

export function FacilitiesSection() {
  const preschoolSpaces = [
    {
      title: "Activity & Discovery Rooms",
      category: "Early Classrooms",
      description:
        "Spacious, sunlit learning studios featuring child-accessible shelves, sensory tables, building blocks, and cheerful activity mats.",
      badge: "Discovery Studios",
      color: "from-sky-50 to-white border-sky-200",
      icon: <Sun className="w-6 h-6 text-sky-600" />,
    },
    {
      title: "Creative Arts & Messy Play Corner",
      category: "Art Studio",
      description:
        "A vibrant splash corner for finger painting, clay sculpting, collage crafting, and sensory water trays that spark boundless imagination.",
      badge: "Art Corner",
      color: "from-coral-50 to-white border-coral-200",
      icon: <Palette className="w-6 h-6 text-coral-600" />,
    },
    {
      title: "Safe Indoor & Outdoor Play Zone",
      category: "Active Play",
      description:
        "Soft-cushioned play equipment, mini slides, sensory obstacle paths, and shaded lawn space for active motor coordination and laughter.",
      badge: "Playground",
      color: "from-mint-50 to-white border-mint-200",
      icon: <Smile className="w-6 h-6 text-mint-600" />,
    },
    {
      title: "Cozy Story & Reading Circles",
      category: "Literacy Nook",
      description:
        "A warm corner with plush cushions, puppet characters, and curated picture books where teachers bring enchanting tales to life.",
      badge: "Reading Nook",
      color: "from-sunshine-50 to-white border-sunshine-200",
      icon: <BookOpen className="w-6 h-6 text-sunshine-600" />,
    },
  ];

  return (
    <section id="spaces" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Preschool Spaces"
          eyebrowVariant="sky"
          title="Safe, Inspiring Learning Spaces"
          description="Purpose-built for young learners to explore freely, interact safely, and feel right at home every single day."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {preschoolSpaces.map((space, index) => (
            <div
              key={index}
              className={`storybook-card p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br ${space.color} border-2 group`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-3xl bg-white shadow-xs border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {space.icon}
                  </div>
                  <span className="storybook-sticker bg-white text-slate-800 border border-slate-200">
                    {space.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-sky-700 transition-colors">
                  {space.title}
                </h3>

                <p className="text-slate-600 leading-relaxed font-medium text-base mb-8">
                  {space.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-bold text-slate-500">
                <span>{space.category}</span>
                <PlaceholderNotice label="Facility specifications pending client audit" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
