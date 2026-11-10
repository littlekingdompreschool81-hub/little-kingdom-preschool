"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Application Error Caught]", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-ivory-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200 shadow-xl flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-black text-slate-900 font-heading mb-2">
          Something went a little off track!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          We encountered an unexpected glitch while loading this page. Please try refreshing or return to the main homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
        </div>

        <p className="text-[11px] text-slate-400 mt-6">
          {SCHOOL_INFO.name} • Contact Admissions: 7039015296
        </p>
      </div>
    </main>
  );
}
