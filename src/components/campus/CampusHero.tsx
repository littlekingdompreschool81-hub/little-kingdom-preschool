"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Heart,
  Sun,
  ChevronRight,
  Compass,
  Smile,
  ShieldCheck,
  Star,
  Shapes,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";

export function CampusHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden storybook-hero-gradient"
    >
      {/* 1. Atmospheric Sky & Sun Element */}
      <div
        className="absolute top-12 right-12 sm:right-28 w-36 h-36 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-sunshine-300 via-sunshine-200 to-sunshine-100 blur-2xl opacity-80 pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * -0.6}px, ${mousePos.y * -0.6}px)` }}
      />

      {/* Floating Animated Clouds */}
      <div
        className="absolute top-20 left-10 w-44 sm:w-64 h-16 cloud-shape opacity-90 pointer-events-none transition-transform duration-700 ease-out hidden sm:block"
        style={{ transform: `translate(${mousePos.x * 0.8}px, ${mousePos.y * 0.4}px)` }}
      >
        <div className="absolute -top-8 left-8 w-24 h-24 bg-white rounded-full" />
        <div className="absolute -top-12 left-20 w-32 h-32 bg-white rounded-full" />
      </div>

      <div
        className="absolute top-36 right-8 w-40 sm:w-56 h-14 cloud-shape opacity-85 pointer-events-none transition-transform duration-700 ease-out hidden md:block"
        style={{ transform: `translate(${mousePos.x * -0.7}px, ${mousePos.y * 0.5}px)` }}
      >
        <div className="absolute -top-6 left-6 w-20 h-20 bg-white rounded-full" />
        <div className="absolute -top-10 left-16 w-28 h-28 bg-white rounded-full" />
      </div>

      {/* 2. Floating 3D/Playful Geometric Toys & Stickers (Parallax Depth) */}
      {/* Alphabet Block A */}
      <div
        className="absolute top-1/4 left-6 sm:left-16 p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-xl shadow-sky-500/25 rotate-[-12deg] pointer-events-none animate-float-gentle hidden sm:flex flex-col items-center justify-center border-2 border-white/60"
        style={{ transform: `translate(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px) rotate(-12deg)` }}
      >
        <span className="font-black text-2xl sm:text-3xl font-heading">A</span>
        <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">Blocks</span>
      </div>

      {/* Star Wonder Sticker */}
      <div
        className="absolute top-1/3 right-8 sm:right-20 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-sunshine-300 to-sunshine-500 text-slate-900 shadow-xl shadow-sunshine-500/25 rotate-[14deg] pointer-events-none animate-float-delayed hidden sm:flex items-center gap-2 border-2 border-white/70"
        style={{ transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px) rotate(14deg)` }}
      >
        <Star className="w-5 h-5 text-amber-900 fill-amber-900" />
        <span className="font-extrabold text-xs">Big Dreams</span>
      </div>

      {/* Alphabet Block B */}
      <div
        className="absolute bottom-32 left-12 sm:left-28 p-3 rounded-2xl bg-gradient-to-br from-coral-400 to-coral-600 text-white shadow-xl shadow-coral-500/25 rotate-[8deg] pointer-events-none animate-float-delayed hidden md:flex items-center justify-center border-2 border-white/60"
        style={{ transform: `translate(${mousePos.x * 0.9}px, ${mousePos.y * 0.9}px) rotate(8deg)` }}
      >
        <span className="font-black text-2xl font-heading">B</span>
      </div>

      {/* Alphabet Block C */}
      <div
        className="absolute bottom-36 right-16 sm:right-32 p-3 rounded-2xl bg-gradient-to-br from-mint-400 to-mint-600 text-white shadow-xl shadow-mint-500/25 rotate-[-10deg] pointer-events-none animate-float-gentle hidden md:flex items-center justify-center border-2 border-white/60"
        style={{ transform: `translate(${mousePos.x * -0.9}px, ${mousePos.y * -0.9}px) rotate(-10deg)` }}
      >
        <span className="font-black text-2xl font-heading">C</span>
      </div>

      {/* 3. Hero Centerpiece: Brand, Titles & Actions */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center my-auto z-10 pt-4">
        {/* Official Motto Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-sunshine-300/80 text-sunshine-800 text-xs sm:text-sm font-extrabold shadow-sm mb-6 transition-transform hover:scale-105">
          <Sparkles className="w-4 h-4 text-sunshine-600 animate-pulse" />
          <span>Motto: &ldquo;{SCHOOL_INFO.motto}&rdquo;</span>
        </div>

        {/* School Name Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.08] mb-4">
          <span className="block drop-shadow-sm">
            {SCHOOL_INFO.name}
          </span>
        </h1>

        {/* Required Creative Tagline */}
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-sky-700 max-w-3xl leading-snug mb-5">
          Little Minds. Big Dreams. Endless Possibilities.
        </h2>

        {/* Welcoming Description */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-10">
          Step into a vibrant children&apos;s kingdom where stories unfold, playful blocks spark curiosity, and every little step leads toward confidence and joy.
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
          <Link
            href="#journey"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white font-extrabold text-base tracking-wide shadow-xl shadow-sky-500/30 hover:shadow-sky-500/40 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-sky-300"
          >
            <Compass className="w-5 h-5 text-sky-200" />
            <span>Explore Our World</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <Link
            href="#admissions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-ivory-100 text-slate-800 border-2 border-slate-300 hover:border-slate-400 text-base font-extrabold shadow-md transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            <Heart className="w-5 h-5 text-coral-500 fill-coral-500" />
            <span>Enquire for Admission</span>
          </Link>
        </div>

        {/* Quick Highlights Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-slate-700">
          <span className="storybook-sticker bg-mint-100 text-mint-800 border border-mint-200">
            <Smile className="w-4 h-4 text-mint-600" />
            Nursery • Jr KG • Sr KG
          </span>
          <span className="storybook-sticker bg-sunshine-100 text-sunshine-800 border border-sunshine-200">
            <Sparkles className="w-4 h-4 text-sunshine-600" />
            Play-Based Learning
          </span>
          <span className="storybook-sticker bg-sky-100 text-sky-800 border border-sky-200">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            Caring & Safe Campus
          </span>
        </div>
      </div>

      {/* 4. Layered Storybook Rolling Hills & Garden Base */}
      <div className="relative w-full z-10 pt-8">
        {/* Downward Scroll Cue */}
        <div className="flex flex-col items-center justify-center pb-4">
          <Link
            href="#journey"
            className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-sky-700 transition-colors group focus:outline-none"
            aria-label="Scroll down to begin the storybook journey"
          >
            <span className="text-xs font-bold text-slate-600 group-hover:text-sky-700 tracking-wide">
              Scroll to Enter the Kingdom
            </span>
            <div className="w-7 h-11 rounded-full border-2 border-slate-400 group-hover:border-sky-500 flex items-start justify-center p-1.5 transition-colors bg-white/80">
              <div className="w-1.5 h-2.5 rounded-full bg-sky-500 animate-bounce" />
            </div>
          </Link>
        </div>

        {/* Illustrated Rolling Hills SVG Wave (Edge-to-Edge) */}
        <div className="relative -mb-16 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden pointer-events-none">
          <svg
            className="w-full h-24 sm:h-36 object-cover"
            viewBox="0 0 1440 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Back Layer Hill (Mint/Grass) */}
            <path
              d="M0,80 C320,150 480,20 800,90 C1120,160 1280,40 1440,70 L1440,180 L0,180 Z"
              fill="#86EFAC"
              opacity="0.45"
            />
            {/* Middle Layer Hill (Fresh Mint) */}
            <path
              d="M0,110 C280,40 640,140 960,80 C1200,30 1360,110 1440,90 L1440,180 L0,180 Z"
              fill="#4ADE80"
              opacity="0.6"
            />
            {/* Front Hill (Warm Ivory Foreground Transition) */}
            <path
              d="M0,135 C360,90 720,160 1080,110 C1280,85 1380,130 1440,120 L1440,180 L0,180 Z"
              fill="#F0F9FF"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
