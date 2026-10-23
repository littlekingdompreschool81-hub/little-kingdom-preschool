"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  KeyRound,
  CheckCircle2,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Local/Dev sign-in state
  const [devEmail, setDevEmail] = useState("");
  const [devLoading, setDevLoading] = useState(false);
  const [devError, setDevError] = useState<string | null>(null);

  useEffect(() => {
    // Check if query params contain errors
    const errorParam = searchParams.get("error");
    if (errorParam) {
      if (errorParam === "csrf_mismatch") {
        setErrorMessage("Security verification failed (CSRF mismatch). Please try again.");
      } else if (errorParam === "token_exchange_failed") {
        setErrorMessage("Could not complete authentication with Google. Please retry.");
      } else if (errorParam === "access_denied") {
        setErrorMessage("Sign-in request was cancelled.");
      } else {
        setErrorMessage(`Authentication error: ${errorParam}`);
      }
    }

    // Check if already authenticated
    const checkCurrentSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (data.authenticated) {
          router.push("/admin/enquiries");
        }
      } catch {
        // Not authenticated
      } finally {
        setCheckingSession(false);
      }
    };
    checkCurrentSession();
  }, [router, searchParams]);

  const handleGoogleSignIn = () => {
    setLoading(true);
    setErrorMessage(null);
    window.location.href = "/api/auth/google";
  };

  const handleDevLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!devEmail) return;
    setDevLoading(true);
    setDevError(null);

    try {
      const res = await fetch("/api/auth/dev-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: devEmail }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setDevError(data.message || "Failed to authenticate.");
      } else {
        router.push("/admin/enquiries");
      }
    } catch {
      setDevError("Network error while verifying staff email.");
    } finally {
      setDevLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="py-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 rounded-full border-4 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full bg-white rounded-3xl p-8 sm:p-10 border-2 border-slate-200/90 shadow-xl relative z-10">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-4">
          <Image
            src={SCHOOL_INFO.logoUrl}
            alt={SCHOOL_INFO.logoAlt}
            fill
            className="object-contain p-1"
          />
        </div>

        <span className="storybook-sticker bg-sky-100 text-sky-800 border border-sky-200 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>Staff & Admissions Portal</span>
        </span>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
          {SCHOOL_INFO.name}
        </h1>
        <p className="text-xs font-bold text-sunshine-600 mt-0.5">
          &ldquo;{SCHOOL_INFO.motto}&rdquo;
        </p>
      </div>

      {/* Security Warning Notice */}
      <div className="mb-6 p-4 rounded-2xl bg-sky-50/80 border border-sky-200 text-xs text-slate-700 leading-relaxed">
        <div className="flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <p>
            This portal contains confidential student and parent records. Access is restricted exclusively to authorized school personnel verified against the server allowlist.
          </p>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Google OAuth Button */}
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-sm border-2 border-slate-300 hover:border-slate-400 shadow-md transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.34 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        <span>{loading ? "Redirecting to Google..." : "Sign In with Google"}</span>
      </button>

      {/* Divider */}
      <div className="relative my-8 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
          Allowlist Verification
        </span>
      </div>

      {/* Dev / Authorized Email Tester (Always server-checked against allowlist!) */}
      <form onSubmit={handleDevLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
            Approved Staff Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              required
              placeholder="e.g. principal@littlekingdom.com"
              value={devEmail}
              onChange={(e) => setDevEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Checks against the server allowlist. Unlisted accounts are rejected with 403 Forbidden.
          </p>
        </div>

        {devError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
            <p>{devError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={devLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-black text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>{devLoading ? "Verifying..." : "Verify & Access Dashboard"}</span>
        </button>
      </form>

      {/* Administrative Policy Footer */}
      <div className="mt-8 pt-6 border-t border-slate-100 text-center text-[11px] text-slate-400 space-y-1">
        <p>Managed by Principal {SCHOOL_INFO.principal}</p>
        <p>Unauthorized access attempts are blocked and logged.</p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-ivory-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pastel Blobs */}
      <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-sky-100/60 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-sunshine-100/60 blur-3xl pointer-events-none -z-10" />

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
        <LoginContent />
      </Suspense>

      {/* Bottom Footer Note */}
      <div className="text-center text-xs text-slate-400 mt-6">
        &copy; {new Date().getFullYear()} {SCHOOL_INFO.name}. Internal Administration.
      </div>
    </div>
  );
}
