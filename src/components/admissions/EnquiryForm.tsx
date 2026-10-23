"use client";

import React, { useState } from "react";
import { type AdmissionEnquiryInput, type EnquirySubmissionResponse } from "@/lib/validation";
import { CheckCircle2, AlertCircle, Loader2, Send, FileText } from "lucide-react";

export function EnquiryForm() {
  const [formData, setFormData] = useState<AdmissionEnquiryInput>({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    gradeApplying: "Foundation Stage (Pre-K to Gr 2)",
    academicYear: "2026–2027",
    visitPreference: "in-person",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseState, setResponseState] = useState<EnquirySubmissionResponse | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear individual field error on edit
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
        // Reset form on success
        setFormData({
          studentName: "",
          parentName: "",
          email: "",
          phone: "",
          gradeApplying: "Foundation Stage (Pre-K to Gr 2)",
          academicYear: "2026–2027",
          visitPreference: "in-person",
          message: "",
        });
      }
    } catch {
      setResponseState({
        success: false,
        message: "Failed to connect to admissions endpoint. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-10 border border-gold-500/30">
      <div className="mb-8">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory mb-2">
          Admission Enquiry (2026–2027)
        </h3>
        <p className="text-sm text-ivory/70 font-light">
          Submit student details below to initiate prospective admission review and schedule a personalized campus walkthrough.
        </p>
      </div>

      {/* Response Alert */}
      {responseState && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${
            responseState.success
              ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-200"
              : "bg-rose-950/70 border-rose-500/40 text-rose-200"
          }`}
        >
          {responseState.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          )}
          <div className="text-sm">
            <p className="font-semibold">{responseState.message}</p>
            {responseState.referenceId && (
              <p className="mt-1 font-mono text-xs text-gold-300">
                Application Reference: <strong>{responseState.referenceId}</strong>
              </p>
            )}
            {responseState.devNotice && (
              <p className="mt-2 text-xs text-ivory/60 border-t border-emerald-500/20 pt-2 font-mono">
                System Status: {responseState.devNotice}
              </p>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Student Full Name */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-gold-400 mb-2">
              Student Full Name *
            </label>
            <input
              type="text"
              name="studentName"
              required
              placeholder="e.g. Eleanor Vance"
              value={formData.studentName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-navy-950/80 border text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors ${
                fieldErrors.studentName ? "border-rose-500" : "border-gold-500/25"
              }`}
            />
            {fieldErrors.studentName && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.studentName[0]}</p>
            )}
          </div>

          {/* Parent/Guardian Name */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-gold-400 mb-2">
              Parent / Guardian Name *
            </label>
            <input
              type="text"
              name="parentName"
              required
              placeholder="e.g. Dr. Arthur Vance"
              value={formData.parentName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-navy-950/80 border text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors ${
                fieldErrors.parentName ? "border-rose-500" : "border-gold-500/25"
              }`}
            />
            {fieldErrors.parentName && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.parentName[0]}</p>
            )}
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-gold-400 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="parent@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-navy-950/80 border text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors ${
                fieldErrors.email ? "border-rose-500" : "border-gold-500/25"
              }`}
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.email[0]}</p>
            )}
          </div>

          {/* Contact Phone */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-gold-400 mb-2">
              Telephone / Mobile *
            </label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-navy-950/80 border text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold-400 transition-colors ${
                fieldErrors.phone ? "border-rose-500" : "border-gold-500/25"
              }`}
            />
            {fieldErrors.phone && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.phone[0]}</p>
            )}
          </div>

          {/* Grade Level Applying */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-gold-400 mb-2">
              Grade Level Applying For *
            </label>
            <select
              name="gradeApplying"
              value={formData.gradeApplying}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-navy-950/80 border border-gold-500/25 text-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <option value="Foundation Stage (Pre-K to Gr 2)">Foundation Stage (Pre-K to Gr 2)</option>
              <option value="Middle Years (Gr 3 to Gr 5)">Middle Years Lower (Gr 3 to Gr 5)</option>
              <option value="Middle Years (Gr 6 to Gr 8)">Middle Years Upper (Gr 6 to Gr 8)</option>
              <option value="Senior Secondary (Gr 9 to Gr 10)">Senior Secondary (Gr 9 to Gr 10)</option>
              <option value="Pre-University Baccalaureate (Gr 11 to Gr 12)">Pre-University Baccalaureate (Gr 11 to Gr 12)</option>
            </select>
          </div>

          {/* Academic Session */}
          <div>
            <label className="block text-xs uppercase font-mono tracking-wider text-gold-400 mb-2">
              Academic Session *
            </label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-navy-950/80 border border-gold-500/25 text-ivory text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <option value="2026–2027">Session 2026–2027 (Immediate Term)</option>
              <option value="2027–2028">Session 2027–2028 (Advance Registration)</option>
            </select>
          </div>
        </div>

        {/* Visit Preference */}
        <div>
          <label className="block text-xs uppercase font-mono tracking-wider text-gold-400 mb-2">
            Campus Walkthrough Preference
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "in-person", label: "In-Person Guided Tour" },
              { id: "virtual", label: "Virtual Admissions Session" },
              { id: "undecided", label: "Decide Later" },
            ].map((option) => (
              <label
                key={option.id}
                className={`p-3 rounded-lg border cursor-pointer text-xs flex items-center justify-center text-center font-medium transition-all ${
                  formData.visitPreference === option.id
                    ? "bg-gold-500/20 border-gold-400 text-gold-300"
                    : "bg-navy-950/60 border-gold-500/20 text-ivory/70 hover:border-gold-500/40"
                }`}
              >
                <input
                  type="radio"
                  name="visitPreference"
                  value={option.id}
                  checked={formData.visitPreference === option.id}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Specific Inquiries / Background Notes */}
        <div>
          <label className="block text-xs uppercase font-mono tracking-wider text-gold-400 mb-2">
            Specific Inquiries or Academic Background
          </label>
          <textarea
            name="message"
            rows={3}
            placeholder="Share any special talents, linguistic backgrounds, or specific questions for the admissions committee..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-navy-950/80 border border-gold-500/25 text-ivory text-sm placeholder:text-ivory/30 focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-md bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm tracking-wide shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Application...</span>
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
