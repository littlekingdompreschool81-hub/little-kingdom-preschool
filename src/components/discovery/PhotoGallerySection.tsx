"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  PhoneCall,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FolderHeart,
  Layers,
} from "lucide-react";

interface EventAlbum {
  id: string;
  title: string;
  category: string;
  tag: string;
  icon: string;
  description: string;
  coverImage: string;
  accent: "sunshine" | "coral" | "mint" | "sky";
  badgeColor: string;
  matchingVideoId?: string;
}

const EVENT_ALBUMS: EventAlbum[] = [
  {
    id: "all",
    title: "All Memories",
    category: "All",
    tag: "18 Photos • 3 Reels",
    icon: "🌟",
    description: "Complete showcase of celebrations, campus inaugurations, and daily play-based learning moments across our 2 campuses.",
    coverImage: "/images/gallery/janmashtami-radha-krishna-1.jpg",
    accent: "sky",
    badgeColor: "bg-sky-100 text-sky-900 border-sky-300",
  },
  {
    id: "janmashtami",
    title: "Janmashtami Utsav",
    category: "Janmashtami Utsav",
    tag: "5 Photos • 1 Live Reel",
    icon: "🌸",
    description: "Little Radha & Krishna dressed in traditional festive attire celebrating on decorated flower swings with cultural music.",
    coverImage: "/images/gallery/janmashtami-flower-swing-2.jpg",
    accent: "sunshine",
    badgeColor: "bg-sunshine-100 text-amber-900 border-sunshine-300",
    matchingVideoId: "janmashtami-celebration-reel",
  },
  {
    id: "branch-opening",
    title: "Rajvaibhav NX Opening",
    category: "New Branch Launch",
    tag: "4 Photos • 1 Tour Video",
    icon: "🏫",
    description: "Auspicious inauguration ceremony, modern cheerful classrooms, festive balloon entrance arch, and parent tour.",
    coverImage: "/images/gallery/branch-opening-inauguration-1.jpg",
    accent: "coral",
    badgeColor: "bg-coral-100 text-coral-900 border-coral-300",
    matchingVideoId: "branch2-opening-ceremony",
  },
  {
    id: "celebrations",
    title: "Daily Activities & Fun",
    category: "Celebrations & Activities",
    tag: "8 Photos • 1 Highlights Reel",
    icon: "🎨",
    description: "Sensory discovery, colors day, circle time rhymes, motor coordination games, and hands-on crafts.",
    coverImage: "/images/gallery/celebration-activity-6.jpg",
    accent: "mint",
    badgeColor: "bg-mint-100 text-mint-900 border-mint-300",
    matchingVideoId: "learning-celebration-highlights",
  },
  {
    id: "admissions-banner",
    title: "Programs & Admissions Guide",
    category: "Campus & Admissions",
    tag: "Official Campus Guide",
    icon: "📜",
    description: "Official Little Kingdom banner detailing Play Group, Nursery, Jr. KG, and Sr. KG curriculum highlights.",
    coverImage: "/images/gallery/school-admission-banner.jpg",
    accent: "sky",
    badgeColor: "bg-sky-100 text-sky-900 border-sky-300",
  },
];

export function PhotoGallerySection() {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>("all");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<CampusVideo | null>(null);

  const selectedAlbum =
    EVENT_ALBUMS.find((a) => a.id === selectedAlbumId) || EVENT_ALBUMS[0];

  const filteredPhotos =
    selectedAlbum.category === "All"
      ? PRESCHOOL_GALLERY
      : PRESCHOOL_GALLERY.filter((p) => p.category === selectedAlbum.category);

  // Relevant video for current album
  const currentAlbumVideo = selectedAlbum.matchingVideoId
    ? PRESCHOOL_VIDEOS.find((v) => v.id === selectedAlbum.matchingVideoId)
    : null;

  // Keyboard navigation for photo lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === "Escape") {
        setActivePhotoIndex(null);
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev > 0 ? prev - 1 : filteredPhotos.length - 1) : null
        );
      } else if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) =>
          prev !== null ? (prev < filteredPhotos.length - 1 ? prev + 1 : 0) : null
        );
      }
    },
    [activePhotoIndex, filteredPhotos.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

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

        {/* ================= 1. STRUCTURED EVENT ALBUM SELECTOR ================= */}
        <div className="mb-12">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="storybook-sticker bg-white text-slate-700 border-slate-300 shadow-2xs text-xs">
              <FolderHeart className="w-3.5 h-3.5 text-coral-600" />
              <span>Select an Event Album</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 max-w-6xl mx-auto">
            {EVENT_ALBUMS.map((album) => {
              const isSelected = album.id === selectedAlbumId;
              return (
                <button
                  key={album.id}
                  onClick={() => setSelectedAlbumId(album.id)}
                  className={`group relative rounded-3xl p-3 sm:p-4 text-left transition-all duration-300 border-2 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-white border-coral-500 shadow-xl ring-4 ring-coral-100 scale-102"
                      : "bg-white/80 hover:bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-md"
                  }`}
                >
                  <div>
                    {/* Small Thumbnail Preview */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 mb-3 shadow-inner">
                      <Image
                        src={album.coverImage}
                        alt={album.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 200px"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                        {album.icon}
                      </span>
                      {album.matchingVideoId && (
                        <span className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-md">
                          <Play className="w-3 h-3 fill-white ml-0.5" />
                        </span>
                      )}
                    </div>

                    <h4 className={`font-black text-xs sm:text-sm line-clamp-1 ${
                      isSelected ? "text-coral-600" : "text-slate-900"
                    }`}>
                      {album.title}
                    </h4>
                  </div>

                  <span className="mt-2 text-[10px] font-bold text-slate-500 font-mono block">
                    {album.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 2. ACTIVE ALBUM HEADER BANNER ================= */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-coral-100 border border-coral-200 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                {selectedAlbum.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 font-heading">
                    {selectedAlbum.title}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${selectedAlbum.badgeColor}`}>
                    {selectedAlbum.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  {selectedAlbum.description}
                </p>
              </div>
            </div>

            <span className="storybook-sticker bg-mint-100 text-mint-900 border-mint-300 shrink-0 self-start sm:self-auto text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-mint-700" />
              100% Verified Campus Media
            </span>
          </div>
        </div>

        {/* ================= 3. FEATURED EVENT VIDEO REEL (IF ALBUM HAS A VIDEO) ================= */}
        {currentAlbumVideo && (
          <div className="max-w-4xl mx-auto mb-12">
            <div
              onClick={() => setActiveVideo(currentAlbumVideo)}
              className="group relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white border-2 border-coral-400/50 shadow-2xl cursor-pointer hover:border-coral-400 transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
            >
              {/* Thumbnail with pulsing Play button */}
              <div className="relative w-full md:w-64 aspect-[16/9] rounded-2xl overflow-hidden shrink-0 shadow-lg bg-black">
                <Image
                  src={currentAlbumVideo.thumbnailUrl}
                  alt={currentAlbumVideo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-lg shadow-coral-500/50 group-hover:scale-110 transition-transform animate-pulse">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/80 text-[10px] font-mono font-bold text-sunshine-300">
                  {currentAlbumVideo.duration}
                </span>
              </div>

              {/* Video Info */}
              <div className="flex-1 space-y-2 text-center md:text-left">
                <span className="px-3 py-1 rounded-full bg-coral-500/30 text-coral-300 text-[10px] font-black uppercase tracking-wider border border-coral-400/30 inline-block">
                  🎬 Featured Celebration Video
                </span>
                <h4 className="text-xl sm:text-2xl font-black font-heading text-white group-hover:text-coral-300 transition-colors">
                  {currentAlbumVideo.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                  {currentAlbumVideo.caption}
                </p>
                <div className="pt-2 flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-coral-400">
                  <Play className="w-4 h-4 fill-coral-400" />
                  <span>Click to Stream High-Definition Celebration Video</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* If "All Memories" is selected, show all 3 video reels horizontally */}
        {selectedAlbum.id === "all" && (
          <div className="max-w-6xl mx-auto mb-14">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-coral-600" />
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                  Celebration Video Reels ({PRESCHOOL_VIDEOS.length})
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-500">
                Tap any reel to play
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRESCHOOL_VIDEOS.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className="group relative rounded-3xl bg-white p-4 border-2 border-slate-200 shadow-md hover:shadow-xl hover:border-coral-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 mb-3 shadow-inner">
                      <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-coral-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/80 text-[10px] font-mono font-bold text-white">
                        {video.duration}
                      </span>
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 text-slate-900 text-[10px] font-black uppercase">
                        {video.tag}
                      </span>
                    </div>

                    <h4 className="font-black text-slate-900 text-sm group-hover:text-coral-600 transition-colors line-clamp-1">
                      {video.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {video.caption}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-coral-600">
                    <span className="flex items-center gap-1">
                      <Play className="w-3.5 h-3.5 fill-coral-600" />
                      <span>Watch Reel</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= 4. AUTHENTIC SCRAPBOOK PHOTOS GRID ================= */}
        <div className="max-w-6xl mx-auto mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-sky-600" />
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Photo Gallery ({filteredPhotos.length} Photos)
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> Click any photo to zoom & navigate
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPhotos.map((photo, index) => {
              const tapeColor = scrapbookTapeColors[index % scrapbookTapeColors.length];

              return (
                <div
                  key={photo.id}
                  onClick={() => setActivePhotoIndex(index)}
                  className="group relative rounded-3xl bg-white p-4 sm:p-5 border-2 border-slate-200 shadow-md hover:shadow-2xl hover:border-sky-300 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
                >
                  {/* Washi Tape Ribbon Effect */}
                  <div
                    className={`absolute -top-3 left-8 w-14 h-5 rounded-xs ${tapeColor} opacity-90 shadow-2xs rotate-[-3deg] z-10`}
                  />

                  <div>
                    {/* Image Container with Safe Aspect Ratio */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 mb-3 shadow-inner">
                      <Image
                        src={photo.imageUrl}
                        alt={photo.title}
                        fill
                        className="object-contain object-center group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg">
                          <Maximize2 className="w-5 h-5" />
                        </span>
                      </div>

                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-slate-900 text-[10px] font-black uppercase tracking-wider shadow-sm">
                        {photo.category}
                      </span>
                    </div>

                    <h4 className="font-black text-slate-900 text-sm group-hover:text-sky-700 transition-colors line-clamp-1">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {photo.caption}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{photo.tag || "Authentic Photo"}</span>
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-700" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= 5. QUICK ENQUIRY CALLOUT ================= */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white p-6 sm:p-8 border-2 border-slate-200/90 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral-100 text-coral-800 text-xs font-bold">
                <Heart className="w-3.5 h-3.5 text-coral-600 fill-coral-500" />
                <span>Visit Our Campuses in Person</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Experience Little Kingdom Early Learning
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                Admissions are open for Play Group, Nursery, Jr. KG, and Sr. KG across both Branch 1 (Ambika Nagar) and Branch 2 (Rajvaibhav NX).
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
                href="tel:+917039015296"
                className="text-center py-3 px-5 rounded-2xl bg-sky-100 hover:bg-sky-200 text-sky-900 font-extrabold text-sm transition-colors flex items-center justify-center gap-2 border border-sky-300"
              >
                <PhoneCall className="w-4 h-4 text-sky-700" />
                <span>Call Neeta Jadhav: 7039015296</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PHOTO LIGHTBOX MODAL WITH NEXT / PREV NAVIGATION ================= */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) =>
                prev !== null ? (prev > 0 ? prev - 1 : filteredPhotos.length - 1) : null
              );
            }}
            className="absolute left-3 sm:left-6 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) =>
                prev !== null ? (prev < filteredPhotos.length - 1 ? prev + 1 : 0) : null
              );
            }}
            className="absolute right-3 sm:right-6 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

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

            <div className="relative aspect-[4/3] max-h-[70vh] w-full rounded-2xl overflow-hidden bg-slate-950 mx-auto">
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

              <span className="text-xs font-mono font-bold text-slate-400 self-end sm:self-center bg-slate-100 px-3 py-1 rounded-full">
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
              {activeVideo.embedUrl ? (
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  allow="autoplay; fullscreen"
                  className="w-full h-full border-0 rounded-2xl"
                  allowFullScreen
                />
              ) : (
                <video
                  src={activeVideo.videoUrl}
                  poster={activeVideo.thumbnailUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              )}
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
