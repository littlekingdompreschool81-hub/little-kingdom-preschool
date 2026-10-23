"use client";

import React from "react";
import { GROWING_THROUGH_PLAY_FEATURES } from "@/lib/constants";
import { SectionHeader } from "../ui/SectionHeader";
import {
  Gamepad2,
  Palette,
  BookOpen,
  Shapes,
  Music,
  Compass,
  Sparkles,
  Heart,
  Sun,
  Smile,
} from "lucide-react";

export function ActivitiesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    Gamepad2: <Gamepad2 className="w-8 h-8 text-mint-700" />,
    Palette: <Palette className="w-8 h-8 text-coral-600" />,
    BookOpen: <BookOpen className="w-8 h-8 text-sky-700" />,
    Shapes: <Shapes className="w-8 h-8 text-amber-700" />,
    Music: <Music className="w-8 h-8 text-purple-700" />,
    Compass: <Compass className="w-8 h-8 text-emerald-700" />,
  };

  return (
    <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory-200 relative overflow-hidden">
      {/* Decorative Pastel Background Accents */}
      <div className="absolute top-1/4 -right-16 w-80 h-80 rounded-full bg-sunshine-200/50 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-16 w-80 h-80 rounded-full bg-mint-200/50 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header with exact required title */}
        <SectionHeader
          eyebrow="Hands-On Early Learning"
          eyebrowVariant="mint"
          title="Little Hands, Big Discoveries"
          description="Early childhood thrives when curiosity leads the way. Through tactile play, colorful self-expression, storytelling, and outdoor wonder, our children learn with joy every single day."
        />

        {/* Asymmetric Editorial Bento Scrapbook Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Play & Discovery (Featured Large Bento Card - spans 2 cols on lg) */}
          <div className="lg:col-span-2 rounded-4xl p-8 sm:p-10 bg-gradient-to-br from-mint-50 via-white to-mint-100/50 border-2 border-mint-200/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between">
            <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-mint-200/30 blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-3xl bg-mint-100 border border-mint-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {iconMap["Gamepad2"]}
                </div>
                <span className="storybook-sticker bg-mint-100 text-mint-900 border border-mint-300">
                  <Smile className="w-3.5 h-3.5 text-mint-700" />
                  Sensory & Tactile Play
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 font-heading">
                Play & Discovery
              </h3>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal max-w-xl mb-6">
                Children explore texture, balance, water, sand, and tactile materials in guided discovery corners. Here, building blocks become towers, simple puzzles awaken reasoning, and cooperative roleplay teaches empathy and sharing naturally.
              </p>
            </div>

            <div className="pt-6 border-t border-mint-200/70 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-extrabold text-mint-900">
              <span className="px-3 py-1 rounded-full bg-white/90 border border-mint-200">
                • Building Blocks & Stacking
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 border border-mint-200">
                • Sensory Sand & Water Tables
              </span>
              <span className="px-3 py-1 rounded-full bg-white/90 border border-mint-200">
                • Imaginative Roleplay
              </span>
            </div>
          </div>

          {/* Card 2: Art & Creativity */}
          <div className="rounded-4xl p-8 bg-gradient-to-br from-coral-50 via-white to-coral-100/40 border-2 border-coral-200/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-3xl bg-coral-100 border border-coral-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {iconMap["Palette"]}
                </div>
                <span className="storybook-sticker bg-coral-100 text-rose-900 border border-coral-300">
                  Fine Motor Fun
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-2 font-heading">
                Art & Creativity
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-6">
                Finger painting, natural clay sculpting, paper tearing, and crayon magic. Every child is encouraged to create without boundaries, strengthening grip, finger dexterity, and joyful self-expression.
              </p>
            </div>

            <div className="pt-4 border-t border-coral-200/70 text-xs font-bold text-coral-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-coral-500" />
              <span>Color Mixing • Clay • Finger Paints</span>
            </div>
          </div>

          {/* Card 3: Stories & Rhymes */}
          <div className="rounded-4xl p-8 bg-gradient-to-br from-sky-50 via-white to-sky-100/40 border-2 border-sky-200/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-3xl bg-sky-100 border border-sky-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {iconMap["BookOpen"]}
                </div>
                <span className="storybook-sticker bg-sky-100 text-sky-900 border border-sky-300">
                  Early Literacy
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-2 font-heading">
                Stories & Rhymes
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-6">
                Enchanting circle story sessions, picture book exploration, rhythmic chants, and phonics games that foster attentive listening, rich vocabulary, and a lifelong love for reading.
              </p>
            </div>

            <div className="pt-4 border-t border-sky-200/70 text-xs font-bold text-sky-800 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Picture Tales • Phonics • Story Circles</span>
            </div>
          </div>

          {/* Card 4: Puzzles & Thinking */}
          <div className="rounded-4xl p-8 bg-gradient-to-br from-sunshine-50 via-white to-amber-100/40 border-2 border-sunshine-200/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-3xl bg-sunshine-100 border border-sunshine-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {iconMap["Shapes"]}
                </div>
                <span className="storybook-sticker bg-sunshine-100 text-amber-900 border border-sunshine-300">
                  Early Math & Logic
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-2 font-heading">
                Puzzles & Thinking
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-6">
                Geometric shape sorters, wooden peg puzzles, counting beads, and pattern sequencing that help developing brains grasp foundational numeracy, spatial reasoning, and persistence.
              </p>
            </div>

            <div className="pt-4 border-t border-sunshine-200/70 text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-600" />
              <span>Shape Sorters • Counting • Patterns</span>
            </div>
          </div>

          {/* Card 5: Music & Movement */}
          <div className="rounded-4xl p-8 bg-gradient-to-br from-purple-50 via-white to-purple-100/40 border-2 border-purple-200/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-3xl bg-purple-100 border border-purple-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  {iconMap["Music"]}
                </div>
                <span className="storybook-sticker bg-purple-100 text-purple-900 border border-purple-300">
                  Gross Motor Rhythm
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-2 font-heading">
                Music & Movement
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal mb-6">
                Tambourines, musical bells, lively nursery songs, and joyful dance routines that sharpen auditory processing, physical balance, and healthy energetic expression.
              </p>
            </div>

            <div className="pt-4 border-t border-purple-200/70 text-xs font-bold text-purple-900 flex items-center gap-1.5">
              <Music className="w-4 h-4 text-purple-600" />
              <span>Rhythm Bells • Action Songs • Active Play</span>
            </div>
          </div>

          {/* Card 6: Nature & Exploration (Featured Full Bento Card - spans across remaining columns) */}
          <div className="lg:col-span-3 rounded-4xl p-8 sm:p-10 bg-gradient-to-br from-emerald-50 via-white to-mint-100/40 border-2 border-emerald-200/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                  {iconMap["Compass"]}
                </div>
                <div>
                  <span className="storybook-sticker bg-emerald-100 text-emerald-900 border border-emerald-300 mb-1">
                    Green Curiosity
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                    Nature & Exploration
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal max-w-2xl">
                Young children plant seeds in tiny pots, observe falling autumn leaves, watch rainwater trickle, and discover the wonder of insects and butterflies in safe outdoor garden sessions.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-col gap-2 shrink-0 text-xs font-extrabold text-emerald-900">
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                🌱 Sprouting Seedlings
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                🍃 Leaf & Texture Hunts
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-200 shadow-2xs">
                ☀️ Outdoor Garden Walks
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
