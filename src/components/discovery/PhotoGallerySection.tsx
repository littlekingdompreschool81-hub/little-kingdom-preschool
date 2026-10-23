"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRESCHOOL_GALLERY } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Maximize2, X, ChevronLeft, ChevronRight, Camera, Sparkles } from "lucide-react";

export function PhotoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Learning Spaces",
    "Arts & Expression",
    "Early Literacy",
    "Outdoor & Play",
    "Music & Movement",
  ];

  const filteredPhotos =
    selectedCategory === "All"
      ? PRESCHOOL_GALLERY
      : PRESCHOOL_GALLERY.filter((p) => p.category === selectedCategory);

  const photoFrameStyles = [
    { border: "border-sky-300", pinColor: "bg-sky-400", tilt: "rotate-[-1.5deg]" },
    { border: "border-mint-300", pinColor: "bg-mint-400", tilt: "rotate-[1.5deg]" },
    { border: "border-sunshine-300", pinColor: "bg-sunshine-400", tilt: "rotate-[-1deg]" },
    { border: "border-coral-300", pinColor: "bg-coral-400", tilt: "rotate-[2deg]" },
    { border: "border-lavender-300", pinColor: "bg-lavender-400", tilt: "rotate-[-2deg]" },
    { border: "border-sky-300", pinColor: "bg-sky-400", tilt: "rotate-[1deg]" },
  ];

  return (
    <section id="gallery" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Visual Moments"
          eyebrowVariant="sunshine"
          title="Glimpses of Little Kingdom"
          description="Everyday moments of artistic expression, circle storytime, sensory building, and happy outdoor play across our preschool."
        />

        {/* Playful Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/25 scale-105"
                  : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Storybook Polaroid Style Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => {
            const frame = photoFrameStyles[index % photoFrameStyles.length];
            return (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className={`group relative rounded-3xl bg-white p-3.5 pb-5 border-2 ${frame.border} shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${frame.tilt} hover:rotate-0 hover:-translate-y-2`}
              >
                {/* Decorative Pin / Tape Sticker */}
                <div
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 rounded-full ${frame.pinColor} opacity-90 shadow-xs z-10`}
                />

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                    <span className="w-8 h-8 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-sm">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Polaroid Caption */}
                <div className="pt-3 px-1">
                  <div className="flex items-center justify-between text-[11px] font-bold text-sky-700 uppercase tracking-wider mb-0.5">
                    <span>{photo.category}</span>
                    <Sparkles className="w-3 h-3 text-sunshine-500" />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 truncate">
                    {photo.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Notice */}
        <div className="mt-12 flex justify-center">
          <PlaceholderNotice label="Official preschool photography to be supplied by school management" />
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
              <Image
                src={filteredPhotos[activePhotoIndex].imageUrl}
                alt={filteredPhotos[activePhotoIndex].title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="w-full mt-5 flex items-center justify-between text-white">
              <div>
                <span className="text-xs font-bold text-sunshine-300 uppercase tracking-wider">
                  {filteredPhotos[activePhotoIndex].category}
                </span>
                <h4 className="text-xl font-black mt-0.5">
                  {filteredPhotos[activePhotoIndex].title}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {filteredPhotos[activePhotoIndex].caption}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActivePhotoIndex(
                      (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                    )
                  }
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length)
                  }
                  className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
