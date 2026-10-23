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
    <div className="storybook-card p-8 sm:p-12 border-2 border-slate-200/90 bg-white shadow-xl">
      <div className="mb-8">
        <div className="storybook-sticker bg-sunshine-100 text-sunshine-800 border border-sunshine-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sunshine-600" />
          <span>Academic Session 2026–2027</span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-black text-slate-900 mb-2">
          Admission Enquiry Form
        </h3>
        <p className="text-base text-slate-600 leading-relaxed font-normal">
          Complete your details below to register prospective interest for Little Kingdom Preschool. Our team will reach out to schedule an in-person walkthrough.
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
                  <strong>Database Storage:</strong> Confirmed & Persisted in SQLite
                </p>
                <p>
                  <strong>Gateway Status:</strong> {responseState.notificationSummary.details}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Parent/Guardian Name - Required */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
              Parent / Guardian Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="parentName"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.parentName}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl bg-ivory-100 border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-colors ${
                fieldErrors.parentName ? "border-rose-400 bg-rose-50/50" : "border-slate-200"
              }`}
            />
            {fieldErrors.parentName && (
              <p className="text-xs text-rose-500 mt-1 font-bold">{fieldErrors.parentName[0]}</p>
            )}
          </div>

          {/* Student Name - Required */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
              Student Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="studentName"
              required
              placeholder="e.g. Aarav Sharma"
              value={formData.studentName}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl bg-ivory-100 border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-colors ${
                fieldErrors.studentName ? "border-rose-400 bg-rose-50/50" : "border-slate-200"
              }`}
            />
            {fieldErrors.studentName && (
              <p className="text-xs text-rose-500 mt-1 font-bold">{fieldErrors.studentName[0]}</p>
            )}
          </div>

          {/* Contact Number - Required */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
              Contact Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+91 98000 00000"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl bg-ivory-100 border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-colors ${
                fieldErrors.phone ? "border-rose-400 bg-rose-50/50" : "border-slate-200"
              }`}
            />
            {fieldErrors.phone && (
              <p className="text-xs text-rose-500 mt-1 font-bold">{fieldErrors.phone[0]}</p>
            )}
          </div>

          {/* Email Address - Optional */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="parent@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-5 py-3.5 rounded-2xl bg-ivory-100 border text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200 transition-colors ${
                fieldErrors.email ? "border-rose-400 bg-rose-50/50" : "border-slate-200"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-500 mt-1 font-bold">{fieldErrors.email[0]}</p>
            )}
          </div>
        </div>

        {/* Class Interested In - Required with exact 3 classes */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2.5">
            Class Interested In <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "Nursery", label: "Nursery", note: "Play, explore and discover", color: "border-mint-400 bg-mint-50/70" },
              { id: "Junior KG", label: "Junior KG", note: "Build skills and confidence", color: "border-sky-400 bg-sky-50/70" },
              { id: "Senior KG", label: "Senior KG", note: "Grow, create and prepare", color: "border-sunshine-400 bg-sunshine-50/70" },
            ].map((option) => (
              <label
                key={option.id}
                className={`p-4 rounded-3xl border-2 cursor-pointer flex flex-col items-center text-center transition-all ${
                  formData.classInterestedIn === option.id
                    ? `${option.color} text-slate-900 shadow-sm scale-102`
                    : "bg-ivory-100 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
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
                <span className="font-black text-base">{option.label}</span>
                <span className="text-xs text-slate-500 mt-0.5 italic font-medium">{option.note}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Message - Optional */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
            Additional Message <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="Tell us about your child's favorite activities or preferred walkthrough timing..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-5 py-3.5 rounded-2xl bg-ivory-100 border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-200 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-base tracking-wide shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50"
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
