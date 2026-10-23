"use client";

import React, { useState } from "react";
import { type PreschoolEnquiryInput, type EnquirySubmissionResponse } from "@/lib/validation";
import { CheckCircle2, AlertCircle, Loader2, Send, Sparkles, Heart } from "lucide-react";

export function EnquiryForm() {
  const [formData, setFormData] = useState<PreschoolEnquiryInput>({
    parentName: "",
    studentName: "",
    phone: "",
    email: "",
    classInterestedIn: "Nursery",
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

  return (
    <div className="soft-card p-6 sm:p-10 border border-slate-200/90 bg-white">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunshine-100 text-sunshine-800 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sunshine-600" />
          <span>Academic Session 2026–2027</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-heading mb-2">
          Admission Enquiry Form
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          Fill in your details below to begin your child&apos;s joyful journey at Little Kingdom Preschool. Our team will contact you to schedule a school visit.
        </p>
      </div>

      {/* Response Alert */}
      {responseState && (
        <div
          className={`mb-6 p-5 rounded-2xl border flex items-start gap-3.5 ${
            responseState.success
              ? "bg-mint-50 border-mint-200 text-mint-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}
        >
          {responseState.success ? (
            <CheckCircle2 className="w-5 h-5 text-mint-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div className="text-sm">
            <p className="font-bold">{responseState.message}</p>
            {responseState.referenceId && (
              <p className="mt-1.5 font-mono text-xs text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 inline-block">
                Enquiry Reference ID: <strong>{responseState.referenceId}</strong>
              </p>
            )}
            {responseState.notificationSummary && (
              <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-xs text-slate-600 space-y-1">
                <p>
                  <strong>Database Storage:</strong> Confirmed & Persisted
                </p>
                <p>
                  <strong>Gateway Status:</strong> {responseState.notificationSummary.details}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Anti-Spam Honeypot Field (Hidden from real users) */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Parent/Guardian Name - Required */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Parent / Guardian Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="parentName"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.parentName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-ivory-100 border text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors ${
                fieldErrors.parentName ? "border-rose-400" : "border-slate-200"
              }`}
            />
            {fieldErrors.parentName && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{fieldErrors.parentName[0]}</p>
            )}
          </div>

          {/* Student Name - Required */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Student Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="studentName"
              required
              placeholder="e.g. Aarav Sharma"
              value={formData.studentName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-ivory-100 border text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors ${
                fieldErrors.studentName ? "border-rose-400" : "border-slate-200"
              }`}
            />
            {fieldErrors.studentName && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{fieldErrors.studentName[0]}</p>
            )}
          </div>

          {/* Contact Number - Required */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Contact Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+91 98000 00000"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-ivory-100 border text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors ${
                fieldErrors.phone ? "border-rose-400" : "border-slate-200"
              }`}
            />
            {fieldErrors.phone && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{fieldErrors.phone[0]}</p>
            )}
          </div>

          {/* Email Address - Optional */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="parent@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-ivory-100 border text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-colors ${
                fieldErrors.email ? "border-rose-400" : "border-slate-200"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-500 mt-1 font-medium">{fieldErrors.email[0]}</p>
            )}
          </div>
        </div>

        {/* Class Interested In - Required with exact order */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Class Interested In <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "Nursery", label: "Nursery", note: "Play, explore and discover" },
              { id: "Junior KG", label: "Junior KG", note: "Build skills and confidence" },
              { id: "Senior KG", label: "Senior KG", note: "Grow, create and prepare" },
            ].map((option) => (
              <label
                key={option.id}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer flex flex-col items-center text-center transition-all ${
                  formData.classInterestedIn === option.id
                    ? "bg-sky-50 border-sky-500 text-sky-900 shadow-xs"
                    : "bg-ivory-100 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-ivory-200"
                }`}
              >
                <input
                  type="radio"
                  name="classInterestedIn"
                  value={option.id}
                  checked={formData.classInterestedIn === option.id}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="font-extrabold text-sm">{option.label}</span>
                <span className="text-[11px] text-slate-500 mt-0.5 italic">{option.note}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Message - Optional */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Additional Message <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="Any specific questions, child's interests, or preferred walkthrough timings..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-ivory-100 border border-slate-200 text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-sm tracking-wide shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Recording Enquiry...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Admission Enquiry</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
