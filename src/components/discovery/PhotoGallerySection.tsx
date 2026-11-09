"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRESCHOOL_GALLERY, type GalleryPhoto } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Maximize2, X, Sparkles, Camera, Heart, Eye, CheckCircle2 } from "lucide-react";

export function PhotoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Festivals & Celebrations",
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

  const authenticCount = PRESCHOOL_GALLERY.filter((p) => p.isAuthentic).length;

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with exact requested title */}
        <SectionHeader
          eyebrow="Preschool Memories & Joy"
          eyebrowVariant="coral"
          title="Every Little Moment Becomes a Big Memory"
          description="A glimpse into our vibrant storybook world—authentic festival celebrations, colorful creative arts, cozy circle storytime, and happy playground discoveries."
        />

        {/* Real Photo Highlight Banner */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-sunshine-50 via-white to-mint-50 border-2 border-sunshine-300/80 text-xs text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-sunshine-200 text-amber-900 flex items-center justify-center shrink-0 shadow-2xs">
                <Sparkles className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <strong className="text-slate-900 font-extrabold text-sm block">
                  Featuring Authentic School Photographs
                </strong>
                <span className="text-slate-600">
                  Real snapshots of our children celebrating cultural festivals and daily discovery at Little Kingdom Pre School.
                </span>
              </div>
            </div>
            <span className="storybook-sticker bg-mint-100 text-mint-900 border border-mint-300 shrink-0 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-mint-700" />
              Verified School Memories
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-sky-600 text-white shadow-md shadow-sky-500/25 scale-105"
                  : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {category}
              {category === "Festivals & Celebrations" && (
                <span className="ml-1.5 px-2 py-0.5 rounded-full bg-sunshine-300 text-amber-950 text-[10px] font-black">
                  New
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Editorial Scrapbook Grid with Varied Image Sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-7 items-stretch">
          {filteredPhotos.map((photo, index) => {
            // Authentic celebration photo gets prime featured space
            const colSpanClass =
              photo.isAuthentic
                ? "lg:col-span-6 xl:col-span-5"
                : index === 1
                ? "lg:col-span-6 xl:col-span-7"
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
                className={`${colSpanClass} group relative rounded-3xl bg-white p-4 sm:p-5 pb-5 border-2 ${
                  photo.isAuthentic ? "border-amber-300 shadow-lg ring-2 ring-sunshine-200" : "border-slate-200/90 shadow-md"
                } hover:shadow-2xl transition-all duration-300 cursor-pointer ${slightRotation} hover:rotate-0 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                {/* Washi Tape / Pushpin Scrapbook Accent */}
                <div
                  className={`absolute -top-2.5 left-8 w-12 h-5 rounded-xs ${tapeColor} opacity-85 shadow-2xs rotate-[-3deg] z-10`}
                />

                {/* Top Corner Ribbon for Authentic Photos */}
                {photo.isAuthentic && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-sunshine-300 to-amber-400 text-amber-950 font-black text-[11px] shadow-sm border border-white">
                      <Sparkles className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
                      <span>Authentic School Photo</span>
                    </span>
                  </div>
                )}

                <div className={`relative rounded-2xl overflow-hidden ${photo.isAuthentic ? "aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/4]" : "aspect-[16/10]"} bg-slate-100 mb-3.5`}>
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                    <span className="text-white text-xs font-bold flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-sky-300" />
                      <span>Click to view full photo</span>
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-sm">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Scrapbook Caption & Sticker */}
                <div className="flex flex-col gap-1.5 px-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-extrabold text-sky-700 uppercase tracking-wider">
                      {photo.category}
                    </span>
                    <span className={`storybook-sticker ${photo.isAuthentic ? "bg-amber-100 text-amber-950 border-amber-300" : "bg-slate-100 text-slate-700 border-slate-200"} text-[10px]`}>
                      <Sparkles className="w-3 h-3 text-sunshine-600" />
                      {photo.tag || "Little Kingdom"}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base group-hover:text-sky-700 transition-colors">
                    {photo.title}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>
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
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`relative ${filteredPhotos[activePhotoIndex].isAuthentic ? "aspect-[3/4] max-h-[65vh]" : "aspect-[16/10] max-h-[65vh]"} w-full rounded-2xl overflow-hidden bg-slate-900 mx-auto`}>
              <Image
                src={filteredPhotos[activePhotoIndex].imageUrl}
                alt={filteredPhotos[activePhotoIndex].title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>

            <div className="pt-4 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-extrabold text-sky-700 uppercase tracking-wider">
                    {filteredPhotos[activePhotoIndex].category}
                  </span>
                  {filteredPhotos[activePhotoIndex].isAuthentic && (
                    <span className="px-2 py-0.5 rounded-full bg-sunshine-200 text-amber-950 font-black text-[10px]">
                      ✨ Verified Campus Photograph
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                  {filteredPhotos[activePhotoIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  {filteredPhotos[activePhotoIndex].caption}
                </p>
              </div>

              <span className="text-[11px] font-mono text-slate-400 self-end sm:self-center">
                {activePhotoIndex + 1} of {filteredPhotos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
