"use client";

import React, { useState } from "react";
import { type PreschoolEnquiryInput, type EnquirySubmissionResponse } from "@/lib/validation";
import { CheckCircle2, AlertCircle, Loader2, Send, Sparkles, Heart, Smile, MessageCircle } from "lucide-react";

export function EnquiryForm() {
  const [formData, setFormData] = useState<PreschoolEnquiryInput>({
    parentName: "",
    studentName: "",
    phone: "",
    email: "",
    classInterestedIn: "Nursery",
    preferredBranch: "Branch 1",
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseState, setResponseState] = useState<EnquirySubmissionResponse | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleClassSelect = (className: "Play Group" | "Nursery" | "Junior KG" | "Senior KG") => {
    setFormData((prev) => ({ ...prev, classInterestedIn: className }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFieldErrors({});
    setResponseState(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: EnquirySubmissionResponse = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setResponseState(data);
      } else {
        setResponseState(data);
        // Reset form upon verified database storage
        setFormData({
          parentName: "",
          studentName: "",
          phone: "",
          email: "",
          classInterestedIn: "Nursery",
          preferredBranch: "Branch 1",
          message: "",
          honeypot: "",
        });
      }
    } catch {
      setResponseState({
        success: false,
        message: "Unable to connect to the enquiry service. Please try again or reach out to the school directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const classTiles = [
    {
      id: "Play Group" as const,
      label: "Play Group",
      tagline: "Sensory wonder & first steps",
      badge: "Level 0",
      activeBg: "bg-coral-50/90 border-coral-500 text-coral-950 ring-2 ring-coral-300",
      inactiveBg: "bg-white/80 border-slate-200 text-slate-700 hover:border-coral-300 hover:bg-coral-50/40",
      badgeColor: "bg-coral-100 text-coral-800 border-coral-200",
      checkColor: "bg-coral-500 text-white",
    },
    {
      id: "Nursery" as const,
      label: "Nursery",
      tagline: "Play, explore and discover",
      badge: "Level 1",
      activeBg: "bg-mint-50/90 border-mint-500 text-mint-950 ring-2 ring-mint-300",
      inactiveBg: "bg-white/80 border-slate-200 text-slate-700 hover:border-mint-300 hover:bg-mint-50/40",
      badgeColor: "bg-mint-100 text-mint-800 border-mint-200",
      checkColor: "bg-mint-500 text-white",
    },
    {
      id: "Junior KG" as const,
      label: "Junior KG",
      tagline: "Build skills and confidence",
      badge: "Level 2",
      activeBg: "bg-sky-50/90 border-sky-500 text-sky-950 ring-2 ring-sky-300",
      inactiveBg: "bg-white/80 border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50/40",
      badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
      checkColor: "bg-sky-500 text-white",
    },
    {
      id: "Senior KG" as const,
      label: "Senior KG",
      tagline: "Grow, create and prepare",
      badge: "Level 3",
      activeBg: "bg-amber-50/90 border-amber-500 text-amber-950 ring-2 ring-amber-300",
      inactiveBg: "bg-white/80 border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50/40",
      badgeColor: "bg-sunshine-100 text-amber-800 border-sunshine-200",
      checkColor: "bg-amber-500 text-white",
    },
  ];

  return (
    <div className="rounded-4xl p-8 sm:p-12 border-2 border-slate-200/90 bg-gradient-to-br from-[#FFFDF8] via-white to-[#FAF6EE] shadow-xl relative overflow-hidden">
      {/* Decorative Pastel Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sunshine-100/40 blur-3xl pointer-events-none -z-10" />

      <div className="mb-8">
        <div className="storybook-sticker bg-sunshine-100 text-amber-900 border border-sunshine-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Academic Session 2026–2027</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2 font-heading">
          Admission Enquiry Form
        </h3>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Complete your details below to register interest for Little Kingdom Preschool. Our team will reach out to schedule an in-person walkthrough.
        </p>
      </div>

      {/* Response Alert */}
      {responseState && (
        <div
          className={`mb-8 p-6 rounded-3xl border-2 flex items-start gap-4 ${
            responseState.success
              ? "bg-mint-50 border-mint-300 text-mint-950"
              : "bg-rose-50 border-rose-300 text-rose-950"
          }`}
        >
          {responseState.success ? (
            <CheckCircle2 className="w-6 h-6 text-mint-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="text-sm">
            <p className="font-extrabold text-base">{responseState.message}</p>
            {responseState.referenceId && (
              <p className="mt-2 font-mono text-xs text-sky-900 bg-white px-3 py-1.5 rounded-xl border border-sky-200 inline-block font-bold">
                Application Reference ID: <strong>{responseState.referenceId}</strong>
              </p>
            )}
            {responseState.notificationSummary && (
              <div className="mt-3 pt-3 border-t border-slate-200/80 text-xs text-slate-600 space-y-1">
                <p>
                  <strong>Database Storage:</strong> Confirmed & Persisted safely
                </p>
                <p>
                  <strong>Notification Dispatch:</strong> {responseState.notificationSummary.details}
                </p>
              </div>
            )}

            {responseState.notificationSummary?.directWhatsAppUrl && (
              <div className="mt-4 pt-3 border-t border-slate-200/80">
                <a
                  href={responseState.notificationSummary.directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Send Details Directly on WhatsApp (70390 15296)</span>
                </a>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Click to open WhatsApp with your enquiry details pre-filled to chat directly with Mrs. Neeta Jadhav.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Anti-Spam Honeypot Field */}
        <div className="hidden" aria-hidden="true">
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* 1. Large Styled Pastel Class Selection Tiles */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-3">
            Choose Class Level <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {classTiles.map((tile) => {
              const isSelected = formData.classInterestedIn === tile.id;
              return (
                <div
                  key={tile.id}
                  onClick={() => handleClassSelect(tile.id)}
                  className={`p-4 sm:p-5 rounded-3xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between text-left relative ${
                    isSelected ? tile.activeBg : tile.inactiveBg
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${tile.badgeColor}`}>
                      {tile.badge}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                        isSelected ? tile.checkColor : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>

                  <div>
                    <span className="font-heading font-black text-lg text-slate-900 block">
                      {tile.label}
                    </span>
                    <span className="text-xs text-slate-500 italic mt-0.5 block font-medium">
                      &ldquo;{tile.tagline}&rdquo;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Campus Branch Selector (2 Branches) */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-800 mb-2.5">
            Select Preferred Campus Branch <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "Branch 1", label: "Branch 1", sublabel: "Primary Campus", color: "border-sky-400 bg-sky-50/70" },
              { id: "Branch 2", label: "Branch 2", sublabel: "Activity Campus", color: "border-mint-400 bg-mint-50/70" },
              { id: "Either / Nearest Branch", label: "Either Campus", sublabel: "Nearest to Home", color: "border-purple-400 bg-purple-50/70" },
            ].map((bOption) => {
              const isSelected = formData.preferredBranch === bOption.id;
              return (
                <button
                  key={bOption.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, preferredBranch: bOption.id }))}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? `${bOption.color} text-slate-900 shadow-xs ring-2 ring-sky-300 font-extrabold`
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-black">{bOption.label}</span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected ? "bg-sky-600 text-white border-sky-600" : "border-slate-300 bg-white"
                    }`}>
                      {isSelected ? "✓" : ""}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {bOption.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Text Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          {/* Parent/Guardian Name */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              Parent / Guardian Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="parentName"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.parentName}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl bg-white border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-colors shadow-2xs ${
                fieldErrors.parentName ? "border-rose-400 bg-rose-50/50" : "border-slate-200"
              }`}
            />
            {fieldErrors.parentName && (
              <p className="text-xs text-rose-500 mt-1 font-bold">{fieldErrors.parentName[0]}</p>
            )}
          </div>

          {/* Student Name */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              Student Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="studentName"
              required
              placeholder="e.g. Aarav Sharma"
              value={formData.studentName}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl bg-white border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-colors shadow-2xs ${
                fieldErrors.studentName ? "border-rose-400 bg-rose-50/50" : "border-slate-200"
              }`}
            />
            {fieldErrors.studentName && (
              <p className="text-xs text-rose-500 mt-1 font-bold">{fieldErrors.studentName[0]}</p>
            )}
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              Contact Phone <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+91 98000 00000"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl bg-white border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-colors shadow-2xs ${
                fieldErrors.phone ? "border-rose-400 bg-rose-50/50" : "border-slate-200"
              }`}
            />
            {fieldErrors.phone && (
              <p className="text-xs text-rose-500 mt-1 font-bold">{fieldErrors.phone[0]}</p>
            )}
          </div>

          {/* Email Address - Optional */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="parent@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl bg-white border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-colors shadow-2xs ${
                fieldErrors.email ? "border-rose-400 bg-rose-50/50" : "border-slate-200"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-500 mt-1 font-bold">{fieldErrors.email[0]}</p>
            )}
          </div>
        </div>

        {/* Additional Message - Optional */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
            Additional Questions / Notes <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="Tell us about your child's favorite activities or preferred walkthrough timing..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-5 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200 resize-none shadow-2xs"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-black text-base tracking-wide shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Recording Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Submit Admission Enquiry</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
