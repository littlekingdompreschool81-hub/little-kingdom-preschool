"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GALLERY_PHOTOS } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import { PlaceholderNotice } from "../ui/PlaceholderNotice";
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

export function PhotoGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Campus Architecture",
    "Academics",
    "Facilities",
    "Athletics",
    "Arts & Culture",
  ];

  const filteredPhotos =
    selectedCategory === "All"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-navy-900 relative">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Visual Chronicle"
          title="Campus Life in Motion"
          description="A glimpse into daily academic discourse, scientific laboratories, athletic championships, and theatrical recitals across our campus."
        />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-gold-500 text-navy-950 font-bold shadow-md shadow-gold-500/20"
                  : "bg-navy-850/80 text-ivory/70 hover:text-ivory border border-gold-500/15 hover:border-gold-500/35"
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
              className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-navy-950 border border-gold-500/20 cursor-pointer shadow-lg hover:border-gold-400/60 transition-all duration-300"
            >
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-navy-950/80 border border-gold-500/40 text-gold-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Photo Caption & Title */}
              <div className="absolute bottom-4 inset-x-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block mb-1">
                  {photo.category}
                </span>
                <h3 className="font-serif text-base font-bold text-ivory group-hover:text-gold-200 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-ivory/60 truncate font-mono mt-0.5">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Photo Audit Notice */}
        <div className="mt-8 flex justify-center">
          <PlaceholderNotice label="Official High-Resolution School Archives Pending Verification" />
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-navy-850 text-ivory hover:text-gold-400 border border-gold-500/30 focus:outline-none"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl w-full flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-gold-500/40 shadow-2xl">
              <Image
                src={filteredPhotos[activePhotoIndex].imageUrl}
                alt={filteredPhotos[activePhotoIndex].title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="w-full mt-4 flex items-center justify-between text-ivory">
              <div>
                <span className="text-xs font-mono text-gold-400 uppercase tracking-widest">
                  {filteredPhotos[activePhotoIndex].category}
                </span>
                <h4 className="font-serif text-xl font-bold mt-1">
                  {filteredPhotos[activePhotoIndex].title}
                </h4>
                <p className="text-xs text-ivory/70 font-mono mt-1">
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
                  className="p-2 rounded-md bg-navy-800 text-ivory hover:text-gold-400 border border-gold-500/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length)
                  }
                  className="p-2 rounded-md bg-navy-800 text-ivory hover:text-gold-400 border border-gold-500/20"
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
