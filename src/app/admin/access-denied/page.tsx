"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ShieldAlert, ArrowLeft, RefreshCw, Mail, Lock } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";

function AccessDeniedContent() {
  const searchParams = useSearchParams();
  const attemptedEmail = searchParams.get("email") || "your Google account";
  const reason = searchParams.get("reason");

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-3xl p-8 sm:p-10 border-2 border-rose-200 shadow-xl relative z-10 text-center">
      {/* Shield Alert Icon */}
      <div className="w-20 h-20 rounded-3xl bg-rose-50 border-2 border-rose-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
        <ShieldAlert className="w-10 h-10 text-rose-600" />
      </div>

      <span className="storybook-sticker bg-rose-100 text-rose-800 border border-rose-200 mb-3">
        <Lock className="w-3.5 h-3.5 text-rose-600" />
        <span>Access Restricted</span>
      </span>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
        Access Denied
      </h1>

      <p className="text-sm font-bold text-rose-600 mb-4">
        Unapproved Staff Account
      </p>

      {/* Email Identification Badge */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5 break-all">
        <div className="flex items-center justify-center gap-1.5 text-slate-500 font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Attempted Account:</span>
        </div>
        <p className="font-mono font-bold text-slate-900 text-sm">
          {attemptedEmail}
        </p>
      </div>

      {/* Detailed Explanation */}
      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
        {reason === "unverified_google_email"
          ? "Your Google account email has not been verified by Google. For child safety and privacy, unverified accounts cannot be granted staff access."
          : "This email address is not registered on the Little Kingdom Preschool staff allowlist. To protect confidential student and family enquiries, access is strictly limited to authorized personnel."}
      </p>

      {/* Request Access Instructions */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 text-left mb-6 leading-relaxed">
        <p className="font-bold mb-1">Are you a teacher or staff member?</p>
        <p>
          Please contact Principal <strong>{SCHOOL_INFO.principal}</strong> or the school administration to have your official email address added to the authorized staff allowlist.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link
          href="/admin/login"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all hover:-translate-y-0.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sign In with Different Account</span>
        </Link>

        <Link
          href="/"
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs uppercase tracking-wider border border-slate-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Homepage</span>
        </Link>
      </div>
    </div>
  );
}

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pastel Blobs */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-rose-100/50 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-amber-100/50 blur-3xl pointer-events-none -z-10" />

      {/* Top Bar Return Link */}
      <div className="max-w-md mx-auto w-full mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-500 hover:text-sky-700 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Website</span>
        </Link>
      </div>

      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <AccessDeniedContent />
      </Suspense>

      {/* Footer */}
      <div className="text-center text-xs text-slate-400 mt-6">
        &copy; {new Date().getFullYear()} {SCHOOL_INFO.name}. Security & Compliance.
      </div>
    </div>
  );
}
