"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  ShieldCheck,
  LogOut,
  Users,
  Plus,
  Trash2,
  AlertCircle,
  X,
  Lock,
} from "lucide-react";
import { SCHOOL_INFO } from "@/lib/constants";
import { type EnquiryRecord } from "@/lib/validation";

interface CurrentUser {
  email: string;
  name: string;
  role: "admin" | "staff";
  picture?: string;
}

interface AllowlistEntry {
  email: string;
  name: string;
  role: "admin" | "staff";
  addedBy: string;
  addedAt: string;
  notes?: string;
}

export default function AdminEnquiriesPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All");

  // Allowlist Modal State (Admin only)
  const [showAllowlistModal, setShowAllowlistModal] = useState(false);
  const [allowlist, setAllowlist] = useState<AllowlistEntry[]>([]);
  const [allowlistLoading, setAllowlistLoading] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<"admin" | "staff">("staff");
  const [allowlistMsg, setAllowlistMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Check auth session first
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const data = await res.json();
        if (!data.authenticated || !data.user) {
          router.replace("/admin/login");
          return;
        }
        setCurrentUser(data.user);
        setAuthChecking(false);
        fetchEnquiries();
      } catch {
        router.replace("/admin/login");
      }
    };
    verifyAuth();
  }, [router]);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries");
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (res.status === 403) {
        router.replace("/admin/access-denied");
        return;
      }
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

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore
    }
    router.replace("/admin/login");
  };

  // Allowlist Management Functions
  const fetchAllowlist = async () => {
    setAllowlistLoading(true);
    setAllowlistMsg(null);
    try {
      const res = await fetch("/api/admin/allowlist");
      const data = await res.json();
      if (data.success && data.allowlist) {
        setAllowlist(data.allowlist);
      }
    } catch {
      setAllowlistMsg({ type: "error", text: "Failed to fetch staff allowlist." });
    } finally {
      setAllowlistLoading(false);
    }
  };

  const openAllowlistManager = () => {
    setShowAllowlistModal(true);
    fetchAllowlist();
  };

  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    setAllowlistMsg(null);

    try {
      const res = await fetch("/api/admin/allowlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail, name: newName, role: newRole }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAllowlistMsg({ type: "success", text: data.message });
        setNewEmail("");
        setNewName("");
        fetchAllowlist();
      } else {
        setAllowlistMsg({ type: "error", text: data.error || "Failed to add email." });
      }
    } catch {
      setAllowlistMsg({ type: "error", text: "Network error adding staff email." });
    }
  };

  const handleRevokeStaff = async (emailToRemove: string) => {
    if (!confirm(`Are you sure you want to revoke access for ${emailToRemove}?`)) return;
    setAllowlistMsg(null);

    try {
      const res = await fetch(`/api/admin/allowlist?email=${encodeURIComponent(emailToRemove)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAllowlistMsg({ type: "success", text: data.message });
        fetchAllowlist();
      } else {
        setAllowlistMsg({ type: "error", text: data.error || "Failed to revoke email." });
      }
    } catch {
      setAllowlistMsg({ type: "error", text: "Network error revoking staff email." });
    }
  };

  // Filtered list
  const filtered = enquiries.filter((item) => {
    const matchesClass = classFilter === "All" || item.classInterestedIn === classFilter;
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

  if (authChecking) {
    return (
      <div className="min-h-screen bg-ivory-100 flex flex-col items-center justify-center gap-3">
        <div className="animate-spin w-8 h-8 rounded-full border-4 border-sky-500 border-t-transparent" />
        <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
          Verifying Server Authorization...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory-100 text-slate-800 pb-20">
      {/* Top Security Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-500 hover:text-sky-700 transition-colors p-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Public Site</span>
            </Link>

            <div className="h-4 w-px bg-slate-200" />

            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                <Image
                  src={SCHOOL_INFO.logoUrl}
                  alt={SCHOOL_INFO.logoAlt}
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm text-slate-900 leading-tight">
                  {SCHOOL_INFO.name}
                </span>
                <span className="text-[10px] font-bold text-sunshine-600">
                  Staff Enquiries Portal
                </span>
              </div>
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {currentUser && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center font-bold text-[11px]">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="font-bold text-slate-900 leading-tight">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {currentUser.email} • {currentUser.role === "admin" ? "Administrator" : "Staff"}
                  </span>
                </div>
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                    currentUser.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {currentUser.role}
                </span>
              </div>
            )}

            {/* Admin-only Allowlist Management Button */}
            {currentUser?.role === "admin" && (
              <button
                onClick={openAllowlistManager}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition-colors"
                title="Manage Approved Staff Email Allowlist"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Staff Allowlist</span>
              </button>
            )}

            {/* Export CSV (Server Endpoint) */}
            <a
              href="/api/enquiries/export"
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </a>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Title & Metric Overview */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-extrabold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Verified Staff Environment</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Admissions Enquiries
            </h1>
            <p className="text-sm text-slate-600 mt-1 font-medium">
              Confidential log of prospective parents and children for Academic Session 2026–2027.
            </p>
          </div>

          <button
            onClick={fetchEnquiries}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-extrabold text-slate-700 transition-colors shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-sky-600" : ""}`} />
            <span>Refresh List</span>
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Enquiries
            </span>
            <div className="text-3xl font-black text-slate-900 mt-1">{totalCount}</div>
            <span className="text-[11px] text-slate-400 font-medium">All applications</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-mint-200 shadow-xs">
            <span className="text-xs font-bold text-mint-700 uppercase tracking-wider">
              Nursery
            </span>
            <div className="text-3xl font-black text-mint-700 mt-1">{nurseryCount}</div>
            <span className="text-[11px] text-slate-400 font-medium">Level 1 Play</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-sky-200 shadow-xs">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
              Junior KG
            </span>
            <div className="text-3xl font-black text-sky-700 mt-1">{jrKgCount}</div>
            <span className="text-[11px] text-slate-400 font-medium">Level 2 Skills</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-sunshine-200 shadow-xs">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
              Senior KG
            </span>
            <div className="text-3xl font-black text-amber-700 mt-1">{srKgCount}</div>
            <span className="text-[11px] text-slate-400 font-medium">Level 3 Prep</span>
          </div>
        </div>

        {/* Controls: Search & Class Filter */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student, parent, phone, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ivory-100 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          {/* Class Filters */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Class:</span>
            </span>
            {["All", "Nursery", "Junior KG", "Senior KG"].map((cls) => (
              <button
                key={cls}
                onClick={() => setClassFilter(cls)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                  classFilter === cls
                    ? "bg-sky-600 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Enquiries Data Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <div className="animate-spin w-8 h-8 rounded-full border-4 border-sky-500 border-t-transparent mx-auto mb-3" />
              <p className="text-xs font-bold text-slate-500">Loading enquiries from database...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center px-4">
              <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">No Enquiries Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {searchTerm || classFilter !== "All"
                  ? "No submissions match your active filter or search keywords."
                  : "No enquiries have been submitted through the website yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-extrabold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 sm:px-6">Reference ID</th>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Class</th>
                    <th className="py-3.5 px-4">Parent / Guardian</th>
                    <th className="py-3.5 px-4">Contact</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 sm:px-6">Message / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((item) => (
                    <tr key={item.id || item.referenceId} className="hover:bg-sky-50/40 transition-colors">
                      {/* Reference ID */}
                      <td className="py-4 px-4 sm:px-6 font-mono font-bold text-sky-700 whitespace-nowrap">
                        {item.referenceId}
                      </td>

                      {/* Student Name */}
                      <td className="py-4 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {item.studentName}
                      </td>

                      {/* Class Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                            item.classInterestedIn === "Nursery"
                              ? "bg-mint-100 text-mint-800 border border-mint-200"
                              : item.classInterestedIn === "Junior KG"
                              ? "bg-sky-100 text-sky-800 border border-sky-200"
                              : "bg-sunshine-100 text-amber-900 border border-sunshine-200"
                          }`}
                        >
                          {item.classInterestedIn}
                        </span>
                      </td>

                      {/* Parent Name */}
                      <td className="py-4 px-4 text-slate-800 font-medium whitespace-nowrap">
                        {item.parentName}
                      </td>

                      {/* Contact Phone & Email */}
                      <td className="py-4 px-4 whitespace-nowrap space-y-1">
                        <a
                          href={`tel:${item.phone}`}
                          className="flex items-center gap-1.5 text-slate-700 hover:text-sky-600 font-semibold"
                        >
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.phone}</span>
                        </a>
                        {item.email && (
                          <a
                            href={`mailto:${item.email}`}
                            className="flex items-center gap-1.5 text-slate-500 hover:text-sky-600 text-[11px]"
                          >
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{item.email}</span>
                          </a>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>

                      {/* Message / Walkthrough Notes */}
                      <td className="py-4 px-4 sm:px-6 text-slate-600 max-w-xs">
                        {item.message ? (
                          <p className="line-clamp-2 italic">&ldquo;{item.message}&rdquo;</p>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Admin-only Allowlist Management Modal */}
      {showAllowlistModal && currentUser?.role === "admin" && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Staff Email Allowlist
                  </h3>
                  <p className="text-xs text-slate-500">
                    Authorized Google accounts permitted to view enquiries.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAllowlistModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {allowlistMsg && (
              <div
                className={`my-3 p-3 rounded-xl text-xs flex items-center gap-2 ${
                  allowlistMsg.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-rose-50 text-rose-800 border border-rose-200"
                }`}
              >
                {allowlistMsg.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{allowlistMsg.text}</span>
              </div>
            )}

            {/* Add New Staff Form */}
            <form onSubmit={handleAddStaff} className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">
                Authorize New Staff Member
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <input
                  type="email"
                  required
                  placeholder="teacher@littlekingdom.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <input
                  type="text"
                  placeholder="Staff Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <div className="flex gap-2">
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as "admin" | "staff")}
                    className="px-2 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none"
                  >
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </form>

            {/* Allowlist Table */}
            <div className="flex-1 overflow-y-auto">
              {allowlistLoading ? (
                <div className="py-8 text-center text-xs text-slate-400">Loading allowlist...</div>
              ) : allowlist.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">No staff accounts configured.</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {allowlist.map((entry) => (
                    <div
                      key={entry.email}
                      className="py-3 px-1 flex items-center justify-between gap-4 text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{entry.email}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                              entry.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {entry.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {entry.name} • Added by {entry.addedBy} on{" "}
                          {new Date(entry.addedAt).toLocaleDateString()}
                        </p>
                      </div>

                      {entry.email.toLowerCase() !== currentUser.email.toLowerCase() && (
                        <button
                          onClick={() => handleRevokeStaff(entry.email)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                          title="Revoke Access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
