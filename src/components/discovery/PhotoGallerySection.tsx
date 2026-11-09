"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PRESCHOOL_GALLERY,
  PRESCHOOL_VIDEOS,
  type GalleryPhoto,
  type CampusVideo,
  SCHOOL_INFO,
} from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import {
  Maximize2,
  X,
  Sparkles,
  Camera,
  Heart,
  Eye,
  CheckCircle2,
  MapPin,
  ArrowRight,
  PartyPopper,
  Play,
  Film,
  Video,
  Clock,
  Volume2,
  VolumeX,
  PhoneCall,
  Calendar,
} from "lucide-react";

export function PhotoGallerySection() {
  const [activeMediaTab, setActiveMediaTab] = useState<"photos" | "videos">("photos");
  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState("All");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<CampusVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Available photo categories
  const dynamicPhotoCategories = [
    "All",
    ...Array.from(new Set(PRESCHOOL_GALLERY.map((p) => p.category))),
  ];

  const filteredPhotos =
    selectedPhotoCategory === "All"
      ? PRESCHOOL_GALLERY
      : PRESCHOOL_GALLERY.filter((p) => p.category === selectedPhotoCategory);

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
        {/* Section Header */}
        <SectionHeader
          eyebrow="Preschool Memories & Joy"
          eyebrowVariant="coral"
          title="Every Little Moment Becomes a Big Memory"
          description="Explore authentic photo memories and festival video reels captured directly at Little Kingdom Pre School across our two campuses."
        />

        {/* Media Type Switcher: Photos vs Videos */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="bg-white p-1.5 rounded-3xl border-2 border-slate-200 shadow-md inline-flex">
            <button
              onClick={() => setActiveMediaTab("photos")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeMediaTab === "photos"
                  ? "bg-sky-600 text-white shadow-md shadow-sky-500/25 scale-102"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Campus Photos</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeMediaTab === "photos" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
              }`}>
                {PRESCHOOL_GALLERY.length} Authentic
              </span>
            </button>

            <button
              onClick={() => setActiveMediaTab("videos")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                activeMediaTab === "videos"
                  ? "bg-coral-500 text-white shadow-md shadow-coral-500/25 scale-102"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Celebration Videos & Reels</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeMediaTab === "videos" ? "bg-white/20 text-white" : "bg-coral-100 text-coral-800"
              }`}>
                {PRESCHOOL_VIDEOS.length} Reels
              </span>
            </button>
          </div>
        </div>

        {/* ================= PHOTOS TAB ================= */}
        {activeMediaTab === "photos" && (
          <div>
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
                      Featuring our real campus banner, Janmashtami swing celebration, and daily learning moments. Zero stock images.
                    </span>
                  </div>
                </div>
                <span className="storybook-sticker bg-mint-100 text-mint-900 border border-mint-300 shrink-0 self-start sm:self-auto">
                  <CheckCircle2 className="w-3.5 h-3.5 text-mint-700" />
                  Verified Campus Photos
                </span>
              </div>
            </div>

            {/* Photo Category Filters */}
            {dynamicPhotoCategories.length > 2 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {dynamicPhotoCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedPhotoCategory(category)}
                    className={`px-4 sm:px-5 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                      selectedPhotoCategory === category
                        ? "bg-sky-600 text-white shadow-md shadow-sky-500/25 scale-105"
                        : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* Scrapbook Photos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
              {filteredPhotos.map((photo, index) => {
                const tapeColor = scrapbookTapeColors[index % scrapbookTapeColors.length];
                const slightRotation = index === 0 ? "rotate-[-0.6deg]" : "rotate-[0.6deg]";

                return (
                  <div
                    key={photo.id}
                    onClick={() => setActivePhotoIndex(index)}
                    className={`group relative rounded-3xl bg-white p-5 sm:p-6 border-3 border-amber-300 shadow-xl ring-4 ring-sunshine-100/70 hover:shadow-2xl transition-all duration-300 cursor-pointer ${slightRotation} hover:rotate-0 hover:-translate-y-1.5 flex flex-col justify-between`}
                  >
                    {/* Scrapbook Washi Tape */}
                    <div
                      className={`absolute -top-3.5 left-10 w-16 h-6 rounded-xs ${tapeColor} opacity-90 shadow-2xs rotate-[-3deg] z-10`}
                    />
                    <div
                      className={`absolute -top-3.5 right-10 w-16 h-6 rounded-xs ${scrapbookTapeColors[(index + 1) % scrapbookTapeColors.length]} opacity-90 shadow-2xs rotate-[4deg] z-10`}
                    />

                    {/* Top Ribbon */}
                    <div className="flex items-center justify-between mb-3 pt-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-sunshine-300 to-amber-400 text-amber-950 font-black text-xs shadow-xs border border-white">
                        <Sparkles className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
                        <span>{photo.tag || "Authentic School Photo"}</span>
                      </span>
                      <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> Tap to zoom
                      </span>
                    </div>

                    {/* Image Container with Safe Aspect Ratio */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-900 mb-4 shadow-inner">
                      <Image
                        src={photo.imageUrl}
                        alt={photo.title}
                        fill
                        className="object-contain object-center group-hover:scale-102 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 500px"
                        priority
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-5">
                        <span className="text-white text-xs sm:text-sm font-bold flex items-center gap-2">
                          <Maximize2 className="w-4 h-4 text-sunshine-300" />
                          <span>Click to expand high-resolution photo</span>
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
                          Verified
                        </span>
                      </div>
                      <h3 className="font-black text-slate-900 text-lg font-heading group-hover:text-sky-700 transition-colors">
                        {photo.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* School Highlights Companion Card */}
            <div className="max-w-4xl mx-auto rounded-3xl bg-white p-6 sm:p-8 border-2 border-slate-200/90 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-100 text-coral-800 text-xs font-bold">
                    <Heart className="w-3.5 h-3.5 text-coral-600 fill-coral-500" />
                    <span>Little Kingdom Campus Experience</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                    Learning by Doing Across Both Campuses
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                    Admissions are open for Play Group, Nursery, Jr. KG, and Sr. KG across both Branch 1 (Primary Campus) and Branch 2 (Activity Campus).
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
                  <Link
                    href="#admissions"
                    className="text-center py-3 px-6 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-sm shadow-md shadow-coral-500/25 transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Enquire for Admission</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:+919594681373"
                    className="text-center py-3 px-5 rounded-2xl bg-mint-100 hover:bg-mint-200 text-mint-900 font-extrabold text-sm transition-colors flex items-center justify-center gap-2 border border-mint-300"
                  >
                    <PhoneCall className="w-4 h-4 text-mint-700" />
                    <span>Call Kalpana Kadam: 9594681373</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIDEOS TAB ================= */}
        {activeMediaTab === "videos" && (
          <div className="space-y-10">
            {/* Video Banner */}
            <div className="max-w-3xl mx-auto">
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-coral-50 via-white to-sunshine-50 border-2 border-coral-200 text-xs text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-coral-200 text-coral-900 flex items-center justify-center shrink-0 shadow-2xs">
                    <Video className="w-5 h-5 text-coral-800" />
                  </div>
                  <div>
                    <strong className="text-slate-900 font-extrabold text-sm block">
                      Campus Celebration Reels & Learning Films
                    </strong>
                    <span className="text-slate-600">
                      Watch how our children learn through music, action songs, and festival celebrations at Little Kingdom Pre School.
                    </span>
                  </div>
                </div>
                <span className="storybook-sticker bg-coral-100 text-coral-900 border border-coral-300 shrink-0 self-start sm:self-auto">
                  <Sparkles className="w-3.5 h-3.5 text-coral-700" />
                  3 Celebration Reels
                </span>
              </div>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {PRESCHOOL_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className="group relative rounded-3xl bg-white p-5 border-2 border-slate-200 shadow-md hover:shadow-2xl hover:border-coral-300 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
                >
                  <div>
                    {/* Video Thumbnail with Play Button */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 mb-4 shadow-inner">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-lg shadow-coral-500/40 group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-white ml-0.5" />
                        </div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                        <Clock className="w-3 h-3 text-coral-300" />
                        <span>{video.duration}</span>
                      </div>

                      {/* Top Category Badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-black uppercase tracking-wider shadow-sm">
                        {video.tag}
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-extrabold text-coral-600 uppercase tracking-wider block">
                        {video.category}
                      </span>
                      <h4 className="font-black text-slate-900 text-base group-hover:text-coral-600 transition-colors line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {video.caption}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-coral-600">
                    <span className="flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 fill-coral-600" />
                      <span>Watch Celebration Reel</span>
                    </span>
                    <span className="w-6 h-6 rounded-full bg-coral-50 text-coral-600 flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Video Upload Note for School Management */}
            <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-slate-700 flex items-center gap-3">
              <Film className="w-5 h-5 text-sky-600 shrink-0" />
              <p>
                <strong>Adding School Videos:</strong> You can place any school celebration video file (.mp4) inside the <code className="bg-white px-1.5 py-0.5 rounded text-sky-800 font-mono text-[11px]">public/videos/</code> directory or share YouTube links to play them directly on the website.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ================= PHOTO LIGHTBOX MODAL ================= */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
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
                priority
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

      {/* ================= VIDEO PLAYER MODAL ================= */}
      {activeVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 p-4 sm:p-6 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Container */}
            <div className="relative aspect-[16/9] max-h-[65vh] w-full rounded-2xl overflow-hidden bg-black mx-auto flex items-center justify-center">
              {/* HTML5 Video with graceful fallback animated preview */}
              <video
                src={activeVideo.videoUrl}
                poster={activeVideo.thumbnailUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback if video file is not yet deployed: show interactive celebration preview
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = document.getElementById("video-fallback-preview");
                  if (fallback) fallback.style.display = "flex";
                }}
              />

              {/* Animated Celebration Video Fallback Preview (when raw file is pending) */}
              <div
                id="video-fallback-preview"
                style={{ display: "none" }}
                className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
              >
                <div className="w-20 h-20 rounded-full bg-coral-500/20 border-2 border-coral-400 flex items-center justify-center mb-4 animate-pulse">
                  <Play className="w-9 h-9 text-coral-400 fill-coral-400 ml-1" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white font-heading mb-2">
                  {activeVideo.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-4">
                  {activeVideo.caption}
                </p>
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-xs text-xs text-sunshine-200 border border-white/20 max-w-md">
                  ✨ <strong>Celebration Video Player Ready:</strong> To stream your exact school recording, simply place <code className="bg-black/40 px-1.5 py-0.5 rounded text-white font-mono">{activeVideo.videoUrl?.replace('/videos/', '')}</code> in the <code className="bg-black/40 px-1.5 py-0.5 rounded text-white font-mono">public/videos/</code> folder!
                </div>
              </div>
            </div>

            {/* Video Details Bar */}
            <div className="pt-4 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-extrabold text-coral-400 uppercase tracking-wider">
                    {activeVideo.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sunshine-300 text-amber-950 font-black text-[10px]">
                    ⏱️ {activeVideo.duration}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white font-heading">
                  {activeVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  {activeVideo.caption}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="#admissions"
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2 rounded-xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Admissions Open
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
