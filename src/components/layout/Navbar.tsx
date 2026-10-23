"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Shield, ChevronRight, PhoneCall, Sparkles } from "lucide-react";
import { NAV_ITEMS, SCHOOL_PLACEHOLDERS } from "@/lib/constants";
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
      {/* Top Banner for Admissions Alert */}
      <div className="bg-navy-950/90 border-b border-gold-500/20 text-xs py-1.5 px-4 text-center text-ivory/80 flex items-center justify-center gap-2 relative z-50">
        <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
        <span>
          <strong className="text-gold-300 font-medium">Admissions 2026–2027:</strong>{" "}
          Registrations now open for Foundation to Senior Secondary.
        </span>
        <Link
          href="#admissions"
          className="text-gold-400 hover:text-gold-300 underline font-semibold ml-2 hidden sm:inline"
        >
          View Process
        </Link>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300 w-full",
          isScrolled
            ? "bg-navy-900/90 backdrop-blur-md shadow-lg shadow-navy-950/40 border-b border-gold-500/20 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Institution Brand */}
            <Link
              href="#campus"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-gold-400 rounded-md p-1"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400/20 to-navy-800 border border-gold-500/40 flex items-center justify-center text-gold-400 shadow-md group-hover:border-gold-400 transition-colors">
                <Shield className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-ivory group-hover:text-gold-300 transition-colors">
                  {SCHOOL_PLACEHOLDERS.institutionName}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-gold-400/80 font-mono">
                  {SCHOOL_PLACEHOLDERS.accreditation}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm text-ivory/80 hover:text-gold-300 transition-colors rounded-md hover:bg-navy-800/50 font-medium relative focus:outline-none focus:ring-1 focus:ring-gold-400"
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[9px] font-semibold uppercase bg-gold-500 text-navy-950 rounded-full tracking-wider">
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
                className="bg-gold-500 hover:bg-gold-400 text-navy-950 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-md shadow-md shadow-gold-500/20 hover:shadow-gold-500/40 transition-all flex items-center gap-1.5 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <span>Enquire Now</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 text-ivory hover:text-gold-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-navy-950/98 backdrop-blur-xl border-b border-gold-500/30 px-6 py-8 shadow-2xl transition-all animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 text-base font-medium text-ivory/90 hover:text-gold-400 border-b border-navy-800/80"
                >
                  <span>{item.label}</span>
                  {item.badge ? (
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-gold-500 text-navy-950 rounded-full">
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-ivory/40" />
                  )}
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  href="#admissions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold py-3 rounded-md shadow-md"
                >
                  Admission Enquiry 2026–27
                </Link>
                <a
                  href={`tel:${SCHOOL_PLACEHOLDERS.contact.admissionsPhone}`}
                  className="w-full text-center border border-gold-500/40 text-gold-400 font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 text-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Admissions Desk</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
