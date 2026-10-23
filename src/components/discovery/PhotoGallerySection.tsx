"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PRESCHOOL_GALLERY } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

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

  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ivory-100 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Visual Moments"
          eyebrowVariant="sunshine"
          title="Glimpses of Little Kingdom"
          description="Everyday moments of joy, artistic expression, active play, and curious exploration at our preschool."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === category
                  ? "bg-sky-500 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-white border border-slate-200 shadow-xs cursor-pointer hover:shadow-md transition-all duration-300"
            >
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 inset-x-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sunshine-300 block mb-1">
                  {photo.category}
                </span>
                <h3 className="text-base font-extrabold text-white leading-snug">
                  {photo.title}
                </h3>
                <p className="text-xs text-white/80 truncate mt-0.5 font-normal">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Photo Audit Notice */}
        <div className="mt-8 flex justify-center">
          <PlaceholderNotice label="Official preschool photos to be updated upon client supply" />
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
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src={filteredPhotos[activePhotoIndex].imageUrl}
                alt={filteredPhotos[activePhotoIndex].title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="w-full mt-4 flex items-center justify-between text-white">
              <div>
                <span className="text-xs font-bold text-sunshine-300 uppercase tracking-wider">
                  {filteredPhotos[activePhotoIndex].category}
                </span>
                <h4 className="text-lg font-bold mt-0.5">
                  {filteredPhotos[activePhotoIndex].title}
                </h4>
                <p className="text-xs text-white/70 mt-0.5">
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
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length)
                  }
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Next image"
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
