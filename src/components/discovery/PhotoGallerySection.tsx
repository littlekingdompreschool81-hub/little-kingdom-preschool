"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRESCHOOL_GALLERY } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Maximize2, X, Sparkles, Camera, Heart, Eye } from "lucide-react";

export function PhotoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Learning Spaces",
    "Arts & Expression",
    "Early Literacy",
    "Outdoor & Play",
  ];

  const filteredPhotos =
    selectedCategory === "All"
      ? PRESCHOOL_GALLERY
      : PRESCHOOL_GALLERY.filter((p) => p.category === selectedCategory);

  const scrapbookTapeColors = [
    "bg-sunshine-300",
    "bg-mint-300",
    "bg-sky-300",
    "bg-coral-300",
    "bg-purple-300",
    "bg-amber-300",
  ];

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with exact requested title */}
        <SectionHeader
          eyebrow="Preschool Memories & Joy"
          eyebrowVariant="coral"
          title="Every Little Moment Becomes a Big Memory"
          description="A peek into our everyday storybook days—bright discovery corners, colorful art projects, cozy circle reading, and happy playground laughter."
        />

        {/* Clear Stock/Placeholder Transparency Notice */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-xs text-amber-900 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Illustrative Photography:</strong> Images shown are illustrative representations of preschool activities until official school photographs are uploaded.
              </span>
            </div>
            <PlaceholderNotice label="Illustrative stock imagery" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-sky-600 text-white shadow-md shadow-sky-500/25 scale-105"
                  : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Editorial Scrapbook Grid with Varied Image Sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
          {filteredPhotos.map((photo, index) => {
            // Give varied column spans for dynamic scrapbook feel
            const colSpanClass =
              index === 0
                ? "lg:col-span-7"
                : index === 1
                ? "lg:col-span-5"
                : index === 2
                ? "lg:col-span-4"
                : index === 3
                ? "lg:col-span-4"
                : index === 4
                ? "lg:col-span-4"
                : "lg:col-span-6";

            const tapeColor = scrapbookTapeColors[index % scrapbookTapeColors.length];
            const slightRotation =
              index % 3 === 0 ? "rotate-[-0.8deg]" : index % 3 === 1 ? "rotate-[0.8deg]" : "rotate-0";

            return (
              <div
                key={photo.id}
                onClick={() => setActivePhotoIndex(index)}
                className={`${colSpanClass} group relative rounded-3xl bg-white p-4 pb-5 border-2 border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${slightRotation} hover:rotate-0 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                {/* Washi Tape / Pushpin Scrapbook Accent */}
                <div
                  className={`absolute -top-2.5 left-8 w-12 h-5 rounded-xs ${tapeColor} opacity-85 shadow-2xs rotate-[-3deg] z-10`}
                />

                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 mb-3.5">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    <span className="text-white text-xs font-bold flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-sky-300" />
                      <span>Click to enlarge</span>
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-sm">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Scrapbook Caption & Sticker */}
                <div className="flex items-center justify-between text-xs px-1">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-sky-700 transition-colors">
                      {photo.title}
                    </h4>
                    <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">
                      {photo.category}
                    </span>
                  </div>

                  <span className="storybook-sticker bg-slate-100 text-slate-700 text-[10px] border border-slate-200">
                    <Sparkles className="w-3 h-3 text-sunshine-600" />
                    Preschool
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900">
              <Image
                src={filteredPhotos[activePhotoIndex].imageUrl}
                alt={filteredPhotos[activePhotoIndex].title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>

            <div className="pt-4 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  {filteredPhotos[activePhotoIndex].title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {filteredPhotos[activePhotoIndex].category} • Illustrative Preschool Scene
                </p>
              </div>

              <span className="text-[11px] font-mono text-slate-400">
                {activePhotoIndex + 1} of {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
