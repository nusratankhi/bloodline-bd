"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  Droplet,
  FileCheck2,
  Building2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Filter,
  Activity,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "verifications" | "cards" | "emergencies"
  >("overview");

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="bg-[#101828] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-red-600/30 text-red-300 border border-red-500/30 px-3 py-1 rounded-full text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>District Administration Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              BloodLine Regional Governance Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Assigned Scope: <strong>Dhaka Division & Regional Districts</strong> • Permission Level: Level 2
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/super-admin"
              className="px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Super Admin Console →
            </Link>
          </div>
        </div>

        {/* Admin Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500">Pending Lab Verifications</span>
            <p className="text-2xl font-black text-amber-600">18</p>
            <p className="text-[11px] text-slate-400">Donor blood test reports</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500">Active Emergency Alerts</span>
            <p className="text-2xl font-black text-[#D71920]">5</p>
            <p className="text-[11px] text-slate-400">Within Dhaka District</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500">Active Digital IDs</span>
            <p className="text-2xl font-black text-emerald-700">12,410</p>
            <p className="text-[11px] text-slate-400">Zero counterfeit flags</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-semibold text-slate-500">Active Volunteers</span>
            <p className="text-2xl font-black text-slate-900">840</p>
            <p className="text-[11px] text-slate-400">Field coordinators</p>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "overview"
                ? "border-[#D71920] text-[#D71920]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Donor Medical Verification
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cards")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "cards"
                ? "border-[#D71920] text-[#D71920]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Digital ID Card Lifecycle & Revocations
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("emergencies")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "emergencies"
                ? "border-[#D71920] text-[#D71920]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Emergency Request Dispatch & Monitoring
          </button>
        </div>

        {/* Tab 1: Donor Medical Verification Workflow */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Donor Blood Group Verification Queue
                </h3>
                <p className="text-xs text-slate-500">
                  Review submitted clinical laboratory test reports to issue verified badges.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">Tanzila Akhter</span>
                    <span className="bg-red-50 text-[#D71920] text-xs font-bold px-2 py-0.5 rounded">
                      A+
                    </span>
                    <span className="text-xs text-slate-400">Mirpur, Dhaka</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Uploaded: <em>Ibn Sina Diagnostic Lab Blood Grouping Report (Ref #IS-9921)</em>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                  >
                    View Document
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Approve Badge
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>

              <div className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">Kamrul Hasan</span>
                    <span className="bg-red-50 text-[#D71920] text-xs font-bold px-2 py-0.5 rounded">
                      B+
                    </span>
                    <span className="text-xs text-slate-400">Panchlaish, Chattogram</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Uploaded: <em>Popular Diagnostic Center Blood Grouping & Screening</em>
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
                  >
                    View Document
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-sm"
                  >
                    Approve Badge
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-lg"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Digital ID Card Management */}
        {activeTab === "cards" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Identity Card Registry & Governance
            </h3>
            <p className="text-xs text-slate-500">
              Authorized administrators can suspend, revoke, or renew digital credentials.
              Revocation immediately updates public QR verification.
            </p>

            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-mono font-bold text-slate-900">BL-DR-2026-000102</p>
                  <p className="text-xs text-slate-500">Cardholder: Rahim Ahmed (Blood Donor)</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    ACTIVE
                  </span>
                  <button
                    type="button"
                    className="text-xs text-red-600 font-semibold hover:underline"
                  >
                    Suspend Card
                  </button>
                </div>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-mono font-bold text-slate-900">BL-VL-2026-REVOKED-009</p>
                  <p className="text-xs text-slate-500">Cardholder: Shakil Anwar (Volunteer)</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                    REVOKED
                  </span>
                  <button
                    type="button"
                    className="text-xs text-slate-600 font-semibold hover:underline"
                  >
                    Reissue
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Emergency Request Dispatch */}
        {activeTab === "emergencies" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Active Regional Emergency Monitoring
            </h3>
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-center justify-between">
              <div>
                <strong>EMR-20261103-0104</strong> • National Heart Foundation (3 Units O+)
                <p className="text-red-700 mt-0.5">8 nearby matching donors notified via in-app & SMS.</p>
              </div>
              <span className="bg-red-600 text-white font-bold px-3 py-1 rounded-full text-xs">
                Matching Active
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
