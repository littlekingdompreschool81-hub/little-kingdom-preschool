import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, MessageCircle, Sparkles } from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ivory-100 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-sunshine-200/40 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-4xl p-8 sm:p-12 border-2 border-slate-200/90 shadow-xl flex flex-col items-center">
        {/* School Logo */}
        <div className="relative w-20 h-20 rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-6">
          <Image
            src={SCHOOL_INFO.logoUrl}
            alt={SCHOOL_INFO.logoAlt}
            fill
            className="object-contain p-2"
          />
        </div>

        <div className="storybook-sticker bg-amber-100 text-amber-900 border border-amber-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Page Not Found • 404</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading mb-3 tracking-tight">
          Oops! This Little Path Wandered Off
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
          The page you are looking for does not exist or might have moved. Let&apos;s guide you back to our cheerful kingdom!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm shadow-md transition-all hover:scale-102"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <a
            href="https://wa.me/917039015296"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-all hover:scale-102"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400">
          {SCHOOL_INFO.name} • Dombivli West (Branch 1 &amp; Branch 2)
        </div>
      </div>
    </main>
  );
}
