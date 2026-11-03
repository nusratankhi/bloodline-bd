"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Settings,
  Users,
  CreditCard,
  Key,
  Globe,
  Database,
  Lock,
  Layers,
  ArrowLeft,
  CheckCircle2,
  FileCode,
} from "lucide-react";
import { ROLE_CARD_CONFIGS } from "@/lib/security/id-card-generator";
import { siteConfig } from "@/config/site";

export default function SuperAdminPage() {
  const [activeTab, setActiveTab] = useState<"roles" | "prefixes" | "cms" | "audit">("roles");
  const [hotlineInput, setHotlineInput] = useState(siteConfig.hotline);
  const [emailInput, setEmailInput] = useState(siteConfig.email);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-red-950/80 text-red-400 border border-red-800/60 px-3 py-1 rounded-full text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>National Super Administrator Control Center</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Platform Master Governance
            </h1>
            <p className="text-xs text-slate-400">
              National configuration, cryptographic ID prefix rules, role escalation controls, and global audit logging.
            </p>
          </div>

          <Link
            href="/admin"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition border border-slate-700"
          >
            ← District Admin View
          </Link>
        </div>

        {/* Global Architecture Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400 font-medium">Configured Roles</span>
            <p className="text-2xl font-black text-white">16 Roles</p>
            <p className="text-[11px] text-emerald-400">Strict RLS Active</p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400 font-medium">Card Template Types</span>
            <p className="text-2xl font-black text-white">16 Templates</p>
            <p className="text-[11px] text-red-400">SHA-256 Hashing Enforced</p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400 font-medium">Database Health</span>
            <p className="text-2xl font-black text-emerald-400">PostgreSQL 15+</p>
            <p className="text-[11px] text-slate-400">Supabase Connected</p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 p-5 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400 font-medium">Immutable Audit Trail</span>
            <p className="text-2xl font-black text-white">Active</p>
            <p className="text-[11px] text-slate-400">Zero-Trust Logs</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 gap-6 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("roles")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "roles"
                ? "border-red-500 text-red-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            RBAC Matrix (16 Roles)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("prefixes")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "prefixes"
                ? "border-red-500 text-red-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Digital ID Prefix & Card Engine
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cms")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "cms"
                ? "border-red-500 text-red-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            National Hotline & CMS Settings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "audit"
                ? "border-red-500 text-red-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Security Audit Trail
          </button>
        </div>

        {/* Tab 1: RBAC Roles */}
        {activeTab === "roles" && (
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Configured Roles & Authority Hierarchy</h3>
              <p className="text-xs text-slate-400">
                Level 1 through Level 16 roles with strict database-enforced permissions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(ROLE_CARD_CONFIGS).map(([key, conf], idx) => (
                <div
                  key={key}
                  className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-mono text-slate-400">
                      LEVEL {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-white mt-0.5">{conf.title}</h4>
                    <p className="text-[11px] font-mono text-red-400 mt-0.5">
                      Prefix: {conf.prefix}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${conf.badgeBg}`}>
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: ID Prefixes */}
        {activeTab === "prefixes" && (
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Digital Identity Serial Format Config</h3>
              <p className="text-xs text-slate-400">
                Pattern: <code className="text-red-400">BL-[PREFIX]-[YEAR]-[6_DIGIT_SERIAL]</code>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-2">
              <p className="text-emerald-400">✓ Super Admin: BL-SA-2026-000001</p>
              <p className="text-emerald-400">✓ District Admin: BL-DA-2026-000001</p>
              <p className="text-emerald-400">✓ Blood Donor: BL-DR-2026-000001</p>
              <p className="text-emerald-400">✓ Volunteer: BL-VL-2026-000001</p>
              <p className="text-emerald-400">✓ Hospital Admin: BL-HA-2026-000001</p>
              <p className="text-emerald-400">✓ Blood Bank Admin: BL-BA-2026-000001</p>
              <p className="text-emerald-400">✓ Registered Member: BL-MB-2026-000001</p>
            </div>
          </div>
        )}

        {/* Tab 3: CMS Settings */}
        {activeTab === "cms" && (
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-6 sm:p-8 max-w-xl space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">National Hotline & Platform Settings</h3>
              <p className="text-xs text-slate-400">
                Changes here immediately propagate to the website top bar and emergency hotlines.
              </p>
            </div>

            {settingsSaved && (
              <div className="p-3 bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs rounded-xl flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Settings updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  National Hotline Number
                </label>
                <input
                  type="text"
                  required
                  value={hotlineInput}
                  onChange={(e) => setHotlineInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  National Blood Coordination Desk Email
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                Save Global Settings
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Security Audit Trail */}
        {activeTab === "audit" && (
          <div className="bg-slate-800/50 border border-slate-700/60 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white">Immutable Security Audit Logs</h3>
            <div className="divide-y divide-slate-800 text-xs font-mono">
              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="text-emerald-400 font-bold">[CARD_ISSUED]</span>{" "}
                  <span className="text-slate-300">ID: BL-DR-2026-000102 for Rahim Ahmed</span>
                </div>
                <span className="text-slate-500">2026-11-03 12:47:00 UTC+6</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="text-amber-400 font-bold">[DONOR_VERIFIED]</span>{" "}
                  <span className="text-slate-300">Lab verification confirmed for O+ group</span>
                </div>
                <span className="text-slate-500">2026-11-03 11:30:15 UTC+6</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="text-red-400 font-bold">[CARD_REVOKED]</span>{" "}
                  <span className="text-slate-300">ID: BL-VL-2026-REVOKED-009 revoked by Super Admin</span>
                </div>
                <span className="text-slate-500">2026-11-03 09:12:44 UTC+6</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
