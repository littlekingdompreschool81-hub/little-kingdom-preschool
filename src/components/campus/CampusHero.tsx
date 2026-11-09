"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  ChevronRight,
  Compass,
  Smile,
  ShieldCheck,
  Star,
  BookOpen,
  Palette,
  Sun,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";

export function CampusHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[96vh] lg:min-h-screen flex flex-col justify-between pt-10 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#EBF6FF] via-[#FAF6EE] to-[#FFFDF8]"
    >
      {/* 1. Illustrated Rainbow Arc across the Pastel Sky */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] lg:w-[1200px] h-[340px] sm:h-[460px] pointer-events-none opacity-40 transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-50%) translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
      >
        <svg viewBox="0 0 1000 500" fill="none" className="w-full h-full">
          {/* Lavender arc */}
          <path d="M50 480 A450 450 0 0 1 950 480" stroke="#E9D5FF" strokeWidth="22" strokeLinecap="round" />
          {/* Sky blue arc */}
          <path d="M80 480 A420 420 0 0 1 920 480" stroke="#BAE6FD" strokeWidth="22" strokeLinecap="round" />
          {/* Mint arc */}
          <path d="M110 480 A390 390 0 0 1 890 480" stroke="#BBF7D0" strokeWidth="22" strokeLinecap="round" />
          {/* Sunshine yellow arc */}
          <path d="M140 480 A360 360 0 0 1 860 480" stroke="#FDE68A" strokeWidth="22" strokeLinecap="round" />
          {/* Coral blush arc */}
          <path d="M170 480 A330 330 0 0 1 830 480" stroke="#FECDD3" strokeWidth="22" strokeLinecap="round" />
        </svg>
      </div>

      {/* 2. Sunshine & Floating Clouds */}
      <div
        className="absolute top-10 right-8 sm:right-24 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-sunshine-300 via-sunshine-200 to-amber-100 blur-2xl opacity-70 pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px)` }}
      />

      {/* Cloud Left */}
      <div
        className="absolute top-16 left-6 sm:left-14 w-40 sm:w-56 h-14 opacity-80 pointer-events-none transition-transform duration-700 ease-out hidden sm:block"
        style={{ transform: `translate(${mousePos.x * 0.7}px, ${mousePos.y * 0.4}px)` }}
      >
        <div className="absolute top-4 left-0 w-36 h-10 bg-white/90 rounded-full blur-[0.5px] shadow-sm" />
        <div className="absolute -top-2 left-6 w-16 h-16 bg-white/95 rounded-full" />
        <div className="absolute -top-5 left-16 w-20 h-20 bg-white rounded-full shadow-sm" />
      </div>

      {/* Cloud Right */}
      <div
        className="absolute top-32 right-10 sm:right-28 w-44 sm:w-60 h-16 opacity-80 pointer-events-none transition-transform duration-700 ease-out hidden md:block"
        style={{ transform: `translate(${mousePos.x * -0.8}px, ${mousePos.y * 0.5}px)` }}
      >
        <div className="absolute top-4 left-0 w-40 h-11 bg-white/90 rounded-full blur-[0.5px] shadow-sm" />
        <div className="absolute -top-3 left-8 w-18 h-18 bg-white/95 rounded-full" />
        <div className="absolute -top-6 left-18 w-22 h-22 bg-white rounded-full shadow-sm" />
      </div>

      {/* 3. Floating Illustrated Kingdom Castle Silhouette in Backdrop */}
      <div
        className="absolute bottom-28 sm:bottom-36 left-1/2 -translate-x-1/2 w-80 sm:w-[500px] h-48 opacity-25 pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-50%) translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)` }}
      >
        <svg viewBox="0 0 500 200" fill="none" className="w-full h-full text-sky-900">
          {/* Left Tower */}
          <rect x="120" y="70" width="40" height="110" rx="6" fill="currentColor" opacity="0.5" />
          <polygon points="110,70 140,25 170,70" fill="currentColor" opacity="0.7" />
          <polygon points="140,25 140,10 155,17.5" fill="#F43F5E" />
          {/* Right Tower */}
          <rect x="340" y="70" width="40" height="110" rx="6" fill="currentColor" opacity="0.5" />
          <polygon points="330,70 360,25 390,70" fill="currentColor" opacity="0.7" />
          <polygon points="360,25 360,10 375,17.5" fill="#38BDF8" />
          {/* Main Castle Hall */}
          <rect x="160" y="90" width="180" height="90" rx="10" fill="currentColor" opacity="0.6" />
          {/* Crenellations */}
          <rect x="175" y="80" width="20" height="15" rx="3" fill="currentColor" opacity="0.7" />
          <rect x="210" y="80" width="20" height="15" rx="3" fill="currentColor" opacity="0.7" />
          <rect x="270" y="80" width="20" height="15" rx="3" fill="currentColor" opacity="0.7" />
          <rect x="305" y="80" width="20" height="15" rx="3" fill="currentColor" opacity="0.7" />
          {/* Central Dome / Turret */}
          <polygon points="220,90 250,45 280,90" fill="currentColor" opacity="0.8" />
          <polygon points="250,45 250,30 270,37.5" fill="#F59E0B" />
          {/* Arched Gate */}
          <path d="M225,180 V135 A25,25 0 0 1 275,135 V180 Z" fill="#FFFDF8" opacity="0.9" />
          {/* Little windows */}
          <circle cx="140" cy="110" r="6" fill="#FFFDF8" opacity="0.8" />
          <circle cx="360" cy="110" r="6" fill="#FFFDF8" opacity="0.8" />
          <circle cx="250" cy="115" r="8" fill="#FFFDF8" opacity="0.8" />
        </svg>
      </div>

      {/* 4. Floating 3D-Styled Educational Objects & Stickers */}
      {/* Alphabet Block A */}
      <div
        className="absolute top-1/4 left-4 sm:left-14 p-3.5 sm:p-4 rounded-3xl bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 text-white shadow-xl shadow-sky-500/25 pointer-events-none transition-transform duration-500 hidden sm:flex flex-col items-center justify-center border-2 border-white/80"
        style={{ transform: `translate(${mousePos.x * 1.3}px, ${mousePos.y * 1.3}px) rotate(-10deg)` }}
      >
        <span className="font-black text-2xl sm:text-3xl font-heading drop-shadow-sm">A</span>
        <span className="text-[9px] uppercase font-black tracking-widest text-sky-100">Play</span>
      </div>

      {/* Open Storybook */}
      <div
        className="absolute top-1/3 right-6 sm:right-20 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-coral-400 to-coral-600 text-white shadow-xl shadow-coral-500/25 pointer-events-none transition-transform duration-500 hidden sm:flex items-center gap-2 border-2 border-white/80"
        style={{ transform: `translate(${mousePos.x * -1.2}px, ${mousePos.y * -1.2}px) rotate(8deg)` }}
      >
        <BookOpen className="w-5 h-5 text-white" />
        <span className="font-extrabold text-xs">Wonder Tales</span>
      </div>

      {/* Alphabet Block B */}
      <div
        className="absolute bottom-36 left-8 sm:left-24 p-3 rounded-2xl bg-gradient-to-br from-sunshine-300 to-sunshine-500 text-slate-900 shadow-xl shadow-sunshine-500/25 pointer-events-none transition-transform duration-500 hidden md:flex items-center justify-center border-2 border-white/80"
        style={{ transform: `translate(${mousePos.x * 0.9}px, ${mousePos.y * 0.9}px) rotate(12deg)` }}
      >
        <span className="font-black text-2xl font-heading">B</span>
      </div>

      {/* Alphabet Block C */}
      <div
        className="absolute bottom-40 right-10 sm:right-28 p-3 rounded-2xl bg-gradient-to-br from-mint-400 to-mint-600 text-white shadow-xl shadow-mint-500/25 pointer-events-none transition-transform duration-500 hidden md:flex items-center justify-center border-2 border-white/80"
        style={{ transform: `translate(${mousePos.x * -0.9}px, ${mousePos.y * -0.9}px) rotate(-12deg)` }}
      >
        <span className="font-black text-2xl font-heading">C</span>
      </div>

      {/* Wonder Wand / Star Sticker */}
      <div
        className="absolute top-20 right-1/4 p-2 sm:p-2.5 rounded-2xl bg-white/90 text-sunshine-600 shadow-md border border-sunshine-200 pointer-events-none transition-transform duration-700 hidden lg:flex items-center gap-1.5"
        style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * 0.6}px) rotate(6deg)` }}
      >
        <Star className="w-4 h-4 fill-sunshine-400 text-sunshine-500" />
        <span className="text-[11px] font-extrabold text-slate-800">Big Dreams</span>
      </div>

      {/* 5. Centerpiece: Headlines, Exact Motto, and Call to Actions */}
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center my-auto z-10 pt-4">
        {/* Exact Official Motto Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 backdrop-blur-md border-2 border-sunshine-300 text-sunshine-900 text-xs sm:text-sm font-extrabold shadow-sm mb-6 transition-transform hover:scale-105">
          <Sparkles className="w-4 h-4 text-sunshine-600 animate-pulse" />
          <span>Official Motto: &ldquo;{SCHOOL_INFO.motto}&rdquo;</span>
          <Sparkles className="w-4 h-4 text-sunshine-600 animate-pulse" />
        </div>

        {/* School Name Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.08] mb-3">
          <span className="block drop-shadow-sm font-heading">
            {SCHOOL_INFO.name}
          </span>
        </h1>

        {/* Required Creative Tagline */}
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-sky-700 max-w-3xl leading-snug mb-5">
          Little Minds. Big Dreams. Endless Possibilities.
        </h2>

        {/* Welcoming Description */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed font-medium mb-9">
          Step into a vibrant children&apos;s storybook kingdom where playful discoveries spark natural wonder, nurturing friendships blossom, and every little step builds confidence for life.
        </p>

        {/* Prominent Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-9">
          <Link
            href="#journey"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:from-sky-600 hover:to-sky-800 text-white font-black text-base tracking-wide shadow-xl shadow-sky-500/30 hover:shadow-sky-500/40 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-sky-200"
          >
            <Compass className="w-5 h-5 text-sky-200" />
            <span>Explore Our World</span>
            <ChevronRight className="w-4 h-4" />
          </Link>

          <Link
            href="#admissions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-ivory-100 text-slate-800 border-2 border-slate-300 hover:border-slate-400 text-base font-black shadow-md transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            <Heart className="w-5 h-5 text-coral-500 fill-coral-500" />
            <span>Enquire for Admission</span>
          </Link>
        </div>

        {/* Quick Highlights Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm font-extrabold text-slate-700">
          <span className="storybook-sticker bg-mint-100 text-mint-900 border border-mint-200 shadow-xs">
            <Smile className="w-4 h-4 text-mint-600" />
            Nursery • Junior KG • Senior KG
          </span>
          <span className="storybook-sticker bg-sunshine-100 text-amber-900 border border-sunshine-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Play-Based Learning
          </span>
          <span className="storybook-sticker bg-purple-100 text-purple-900 border border-purple-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            2 Branch Campuses
          </span>
          <span className="storybook-sticker bg-sky-100 text-sky-900 border border-sky-200 shadow-xs">
            <Heart className="w-4 h-4 text-coral-500 fill-coral-500" />
            Loving & Safe Care
          </span>
        </div>
      </div>

      {/* 6. Layered Illustrated Storybook Rolling Hills Base */}
      <div className="relative w-full z-10 pt-8">
        {/* Scroll Cue */}
        <div className="flex flex-col items-center justify-center pb-3">
          <Link
            href="#journey"
            className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-sky-700 transition-colors group focus:outline-none"
            aria-label="Scroll down to begin the storybook journey"
          >
            <span className="text-xs font-bold text-slate-600 group-hover:text-sky-700 tracking-wide">
              Scroll to Enter the Kingdom
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-slate-400 group-hover:border-sky-500 flex items-start justify-center p-1 transition-colors bg-white/80">
              <div className="w-1.5 h-2.5 rounded-full bg-sky-500 animate-bounce" />
            </div>
          </Link>
        </div>

        {/* Illustrated Rolling Hills SVG Wave (Edge-to-Edge) */}
        <div className="relative -mb-12 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden pointer-events-none">
          <svg
            className="w-full h-24 sm:h-36 object-cover"
            viewBox="0 0 1440 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Back Layer Hill (Light Mint) */}
            <path
              d="M0,80 C320,150 480,20 800,90 C1120,160 1280,40 1440,70 L1440,180 L0,180 Z"
              fill="#BBF7D0"
              opacity="0.5"
            />
            {/* Middle Layer Hill (Mint Green) */}
            <path
              d="M0,110 C280,40 640,140 960,80 C1200,30 1360,110 1440,90 L1440,180 L0,180 Z"
              fill="#86EFAC"
              opacity="0.65"
            />
            {/* Front Hill (Warm Ivory Transition to Next Section) */}
            <path
              d="M0,135 C360,90 720,160 1080,110 C1280,85 1380,130 1440,120 L1440,180 L0,180 Z"
              fill="#FFFDF8"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
