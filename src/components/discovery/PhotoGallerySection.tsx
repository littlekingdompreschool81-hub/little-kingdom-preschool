"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRESCHOOL_GALLERY, type GalleryPhoto, SCHOOL_INFO } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { Maximize2, X, Sparkles, Camera, Heart, Eye, CheckCircle2, MapPin, ArrowRight, PartyPopper } from "lucide-react";

export function PhotoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // Dynamically derive available categories from authentic photos
  const dynamicCategories = [
    "All",
    ...Array.from(new Set(PRESCHOOL_GALLERY.map((p) => p.category))),
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
  ];

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with exact requested title */}
        <SectionHeader
          eyebrow="Preschool Memories & Joy"
          eyebrowVariant="coral"
          title="Every Little Moment Becomes a Big Memory"
          description="Authentic moments of joy, celebration, and playful discovery captured directly at Little Kingdom Pre School across our two campuses."
        />

        {/* Real Photo Highlight Banner */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-sunshine-50 via-white to-mint-50 border-2 border-sunshine-300/80 text-xs text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sunshine-200 text-amber-900 flex items-center justify-center shrink-0 shadow-2xs">
                <Camera className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <strong className="text-slate-900 font-extrabold text-sm block">
                  100% Authentic School Photographs Only
                </strong>
                <span className="text-slate-600">
                  Every photo displayed here is an authentic memory from Little Kingdom Pre School. All dummy images have been completely removed.
                </span>
              </div>
            </div>
            <span className="storybook-sticker bg-mint-100 text-mint-900 border border-mint-300 shrink-0 self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5 text-mint-700" />
              Verified Campus Photos
            </span>
          </div>
        </div>

        {/* Category Filters (only shown if there are multiple categories) */}
        {dynamicCategories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {dynamicCategories.map((category) => (
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
              </button>
            ))}
          </div>
        )}

        {/* GALLERY DISPLAY */}
        {filteredPhotos.length === 1 ? (
          /* Single Featured Photo Showcase: Beautiful Two-Column Storybook Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            {/* Left: Featured Authentic Photo Card */}
            <div className="lg:col-span-7">
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(index)}
                  className="group relative rounded-3xl bg-white p-5 sm:p-7 border-3 border-amber-300 shadow-xl ring-4 ring-sunshine-100/70 hover:shadow-2xl transition-all duration-300 cursor-pointer rotate-[-0.6deg] hover:rotate-0 hover:-translate-y-1"
                >
                  {/* Scrapbook Washi Tape */}
                  <div className="absolute -top-3.5 left-12 w-16 h-6 rounded-xs bg-sunshine-300 opacity-90 shadow-2xs rotate-[-3deg] z-10" />
                  <div className="absolute -top-3.5 right-12 w-16 h-6 rounded-xs bg-mint-300 opacity-90 shadow-2xs rotate-[4deg] z-10" />

                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-3 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-sunshine-300 to-amber-400 text-amber-950 font-black text-xs shadow-xs border border-white">
                      <Sparkles className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
                      <span>Authentic Campus Photograph</span>
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Tap to expand
                    </span>
                  </div>

                  {/* Photo Frame */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-900 mb-4 shadow-inner">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      className="object-contain object-center group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 650px"
                      priority
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-5">
                      <span className="text-white text-xs sm:text-sm font-bold flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-sunshine-300" />
                        <span>Click to view full high-resolution photo</span>
                      </span>
                      <span className="w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Caption & Title */}
                  <div className="space-y-1.5 px-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-extrabold text-sky-700 uppercase tracking-wider">
                        {photo.category}
                      </span>
                      <span className="storybook-sticker bg-amber-100 text-amber-950 border-amber-300 text-[10px]">
                        <PartyPopper className="w-3 h-3 text-amber-700" />
                        {photo.tag || "Campus Event"}
                      </span>
                    </div>
                    <h3 className="font-black text-slate-900 text-lg sm:text-xl font-heading">
                      {photo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Storybook Companion Story & School Highlights Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-white p-6 sm:p-8 border-2 border-slate-200/90 shadow-lg space-y-6">
                <div>
                  <span className="storybook-sticker bg-coral-100 text-coral-800 border-coral-200 text-xs font-bold mb-3 inline-flex">
                    <Heart className="w-3.5 h-3.5 text-coral-600 fill-coral-500" />
                    Our Campus Culture
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 font-heading">
                    Celebrating Culture, Creativity & Pure Childhood Joy
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    At Little Kingdom Pre School, every festival and milestone is an opportunity for experiential learning. Our classrooms and celebration courtyards come alive with colors, traditional dress, handcrafted swings, and joyful song.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="p-4 rounded-2xl bg-sunshine-50/80 border border-sunshine-200 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-sunshine-200 text-amber-900 flex items-center justify-center shrink-0 text-sm font-bold">
                      🌸
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        Festivals & Traditional Celebrations
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Janmashtami, Dahi Handi, Diwali, Republic Day, and Grandparents Day celebrated with active child participation.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-sky-200 text-sky-900 flex items-center justify-center shrink-0 text-sm font-bold">
                      🏫
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        Celebrated Across Both Campuses
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Activities take place across both {SCHOOL_INFO.branches[0].name} and {SCHOOL_INFO.branches[1].name}.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-mint-50/80 border border-mint-200 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-mint-200 text-mint-900 flex items-center justify-center shrink-0 text-sm font-bold">
                      📸
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        Growing Photo Album
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        We only showcase real photos of our school. More campus photos will be framed right here.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="#admissions"
                    className="flex-1 text-center py-3 px-5 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-sm shadow-md shadow-coral-500/25 transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Enquire for Admission</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#branches"
                    className="flex-1 text-center py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MapPin className="w-4 h-4 text-sky-600" />
                    <span>View 2 Branches</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Multi-Photo Grid (automatically activated when more photos are uploaded) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {filteredPhotos.map((photo, index) => {
              const tapeColor = scrapbookTapeColors[index % scrapbookTapeColors.length];
              const slightRotation =
                index % 3 === 0 ? "rotate-[-0.8deg]" : index % 3 === 1 ? "rotate-[0.8deg]" : "rotate-0";

              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(index)}
                  className={`group relative rounded-3xl bg-white p-4 sm:p-5 pb-5 border-2 border-amber-300 shadow-lg ring-2 ring-sunshine-200 hover:shadow-2xl transition-all duration-300 cursor-pointer ${slightRotation} hover:rotate-0 hover:-translate-y-1.5 flex flex-col justify-between`}
                >
                  {/* Scrapbook Tape */}
                  <div
                    className={`absolute -top-2.5 left-8 w-12 h-5 rounded-xs ${tapeColor} opacity-85 shadow-2xs rotate-[-3deg] z-10`}
                  />

                  {/* Corner Ribbon */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-sunshine-300 to-amber-400 text-amber-950 font-black text-[11px] shadow-sm border border-white">
                      <Sparkles className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
                      <span>Authentic Photo</span>
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 mb-3.5">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                  {/* Caption & Sticker */}
                  <div className="flex flex-col gap-1.5 px-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[11px] font-extrabold text-sky-700 uppercase tracking-wider">
                        {photo.category}
                      </span>
                      <span className="storybook-sticker bg-amber-100 text-amber-950 border-amber-300 text-[10px]">
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
        )}
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

            <div className="relative aspect-[3/4] max-h-[70vh] w-full rounded-2xl overflow-hidden bg-slate-950 mx-auto">
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
                  <span className="px-2.5 py-0.5 rounded-full bg-sunshine-200 text-amber-950 font-black text-[10px]">
                    ✨ Verified Campus Photograph
                  </span>
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
