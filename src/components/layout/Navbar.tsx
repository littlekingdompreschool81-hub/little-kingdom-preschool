"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles, ChevronRight, PhoneCall } from "lucide-react";
import { NAV_ITEMS, SCHOOL_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Top Banner for Admissions Notice */}
      <div className="bg-gradient-to-r from-sky-50 via-sunshine-50 to-mint-50 border-b border-slate-200/80 text-xs py-2 px-4 text-center text-slate-700 flex items-center justify-center gap-2 relative z-50">
        <Sparkles className="w-3.5 h-3.5 text-sunshine-500 animate-pulse shrink-0" />
        <span className="font-medium">
          <strong className="text-sky-700">Admissions Open 2026–2027:</strong>{" "}
          Now welcoming children for Nursery, Junior KG, and Senior KG.
        </span>
        <Link
          href="#admissions"
          className="text-sky-600 hover:text-sky-800 font-bold underline ml-1.5 hidden sm:inline"
        >
          Enquire Online
        </Link>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300 w-full",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/90 py-2.5"
            : "bg-ivory-100/90 backdrop-blur-sm py-3.5 border-b border-slate-200/50"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Institution Brand & Official Logo */}
            <Link
              href="#home"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-xl p-1"
            >
              {/* Preserves 1:1 square aspect ratio without distortion */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200/80 flex items-center justify-center shrink-0">
                <Image
                  src={SCHOOL_INFO.logoUrl}
                  alt={SCHOOL_INFO.logoAlt}
                  fill
                  priority
                  className="object-contain p-0.5"
                  sizes="56px"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-brand-heading group-hover:text-sky-600 transition-colors">
                  {SCHOOL_INFO.name}
                </span>
                <span className="text-xs font-semibold text-sunshine-600 tracking-wide">
                  &ldquo;{SCHOOL_INFO.motto}&rdquo;
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3.5 py-2 text-sm text-slate-600 hover:text-sky-600 font-semibold transition-colors rounded-lg hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-1.5 px-2 py-0.5 text-[10px] font-bold uppercase bg-mint-100 text-mint-800 rounded-full border border-mint-300">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Header Action Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="#admissions"
                className="bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <span>Admissions 2026–27</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 text-slate-700 hover:text-sky-600 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-white/98 backdrop-blur-xl border-b border-slate-200 px-6 py-6 shadow-xl transition-all animate-in slide-in-from-top-3 duration-200">
            <nav className="flex flex-col space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 text-base font-semibold text-slate-700 hover:text-sky-600 border-b border-slate-100"
                >
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-mint-100 text-mint-800 rounded-full border border-mint-200">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  )}
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-2.5">
                <Link
                  href="#admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl shadow-sm text-sm"
                >
                  Admission Enquiry Form
                </Link>
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-slate-50"
                >
                  <PhoneCall className="w-4 h-4 text-sky-600" />
                  <span>Contact Information</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
