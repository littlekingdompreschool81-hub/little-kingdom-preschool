"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Download,
  Search,
  RefreshCw,
  ArrowLeft,
  Filter,
  UserCheck,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";
import { type EnquiryRecord } from "@/lib/validation";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All");

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      const data = await res.json();
      if (data.success && data.enquiries) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Filtered list
  const filtered = enquiries.filter((item) => {
    const matchesClass =
      classFilter === "All" || item.classInterestedIn === classFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      item.studentName.toLowerCase().includes(term) ||
      item.parentName.toLowerCase().includes(term) ||
      item.phone.toLowerCase().includes(term) ||
      item.referenceId.toLowerCase().includes(term) ||
      (item.email && item.email.toLowerCase().includes(term));
    return matchesClass && matchesSearch;
  });

  // Counts
  const totalCount = enquiries.length;
  const nurseryCount = enquiries.filter((e) => e.classInterestedIn === "Nursery").length;
  const jrKgCount = enquiries.filter((e) => e.classInterestedIn === "Junior KG").length;
  const srKgCount = enquiries.filter((e) => e.classInterestedIn === "Senior KG").length;

  // Export to CSV Function
  const exportToCSV = () => {
    if (enquiries.length === 0) return;
    const headers = [
      "Reference ID",
      "Student Name",
      "Class Interested",
      "Parent Name",
      "Phone",
      "Email",
      "Message",
      "Date Submitted",
    ];

    const rows = enquiries.map((e) => [
      `"${e.referenceId}"`,
      `"${e.studentName.replace(/"/g, '""')}"`,
      `"${e.classInterestedIn}"`,
      `"${e.parentName.replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email || ""}"`,
      `"${(e.message || "").replace(/"/g, '""')}"`,
      `"${new Date(e.createdAt).toLocaleString()}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `LittleKingdom_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Return to website"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="relative w-10 h-10 aspect-square rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
              <Image
                src={SCHOOL_INFO.logoUrl}
                alt={SCHOOL_INFO.logoAlt}
                fill
                className="object-contain p-1"
                sizes="40px"
              />
            </div>

            <div>
              <h1 className="font-black text-lg text-slate-900 leading-tight">
                {SCHOOL_INFO.name} — Admissions Desk
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Live Received Enquiries Database • Session 2026–2027
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={fetchEnquiries}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={exportToCSV}
              disabled={enquiries.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV (Excel)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Total Enquiries
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{totalCount}</span>
              <span className="text-xs text-slate-500 font-medium">Received</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-mint-200 shadow-xs">
            <span className="text-xs font-bold text-mint-700 uppercase tracking-wider block mb-1">
              Nursery
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-mint-700">{nurseryCount}</span>
              <span className="text-xs text-slate-500 font-medium">Applications</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-sky-200 shadow-xs">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block mb-1">
              Junior KG
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-sky-700">{jrKgCount}</span>
              <span className="text-xs text-slate-500 font-medium">Applications</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-sunshine-200 shadow-xs">
            <span className="text-xs font-bold text-sunshine-700 uppercase tracking-wider block mb-1">
              Senior KG
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-sunshine-700">{srKgCount}</span>
              <span className="text-xs text-slate-500 font-medium">Applications</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Class Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {["All", "Nursery", "Junior KG", "Senior KG"].map((cls) => (
              <button
                key={cls}
                onClick={() => setClassFilter(cls)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  classFilter === cls
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student, parent, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        {/* Enquiries List */}
        {loading ? (
          <div className="p-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-sky-500" />
            <p className="font-bold text-sm">Loading enquiries from SQLite database...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
            <UserCheck className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            <h3 className="font-black text-base text-slate-700">No Enquiries Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {searchTerm || classFilter !== "All"
                ? "No applications matched your current search or class filter."
                : "No enquiries have been submitted yet. When a parent completes the admission form, their application will appear here instantly."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Student & Class Details */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 font-black text-lg flex items-center justify-center shrink-0">
                      {item.studentName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-200">
                          {item.referenceId}
                        </span>
                        <span
                          className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                            item.classInterestedIn === "Nursery"
                              ? "bg-mint-100 text-mint-800"
                              : item.classInterestedIn === "Junior KG"
                              ? "bg-sky-100 text-sky-800"
                              : "bg-sunshine-100 text-sunshine-800"
                          }`}
                        >
                          {item.classInterestedIn}
                        </span>
                        <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <h4 className="text-xl font-black text-slate-900">
                        {item.studentName}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Parent / Guardian: <strong className="text-slate-800">{item.parentName}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Contact Info Buttons */}
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${item.phone}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-sky-600" />
                      <span>{item.phone}</span>
                    </a>

                    {item.email ? (
                      <a
                        href={`mailto:${item.email}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-sunshine-600" />
                        <span>{item.email}</span>
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 italic">No email provided</span>
                    )}
                  </div>
                </div>

                {/* Additional Parent Notes */}
                {item.message && (
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                    <strong className="text-slate-800 block mb-0.5">Parent Message:</strong>
                    <span>&ldquo;{item.message}&rdquo;</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
