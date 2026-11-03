"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Search,
  ShieldCheck,
  QrCode,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function VerifySearchPage() {
  const router = useRouter();
  const [idInput, setIdInput] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idInput.trim()) return;

    // Direct token or card serial lookup
    const cleanId = idInput.trim().toUpperCase();
    router.push(`/verify/id/${cleanId}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Bangladesh Verification Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Verify Digital Identity Card
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Confirm the active credentials of blood donors, hospital staff, coordinators,
            and volunteers on the BloodLine National Network.
          </p>
        </div>

        {/* Verification Card Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8 space-y-6">
          <form onSubmit={handleVerify} className="space-y-4">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Enter Digital ID Number or Verification Token
            </label>

            <div className="relative">
              <input
                type="text"
                value={idInput}
                onChange={(e) => setIdInput(e.target.value)}
                placeholder="e.g. BL-DR-2026-000102"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-base font-mono font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-[#D71920] hover:bg-red-700 text-white font-semibold px-5 rounded-lg flex items-center space-x-2 transition"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Verify</span>
              </button>
            </div>

            <p className="text-xs text-slate-500">
              You can also point your mobile camera at any BloodLine QR code to be verified instantly.
            </p>
          </form>

          {/* Verification Security Highlights */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Cryptographic verification protects against counterfeit credentials.</span>
            </div>
            <div className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Revoked or suspended cards fail active verification in real-time.</span>
            </div>
          </div>
        </div>

        {/* Demo Cards Section */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/70 space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Quick Verification Demo
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => router.push("/verify/id/BL-DR-2026-000102")}
              className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-[#D71920] rounded-lg font-mono font-medium transition"
            >
              BL-DR-2026-000102 (Active Donor)
            </button>
            <button
              type="button"
              onClick={() => router.push("/verify/id/BL-VL-2026-REVOKED-009")}
              className="px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 rounded-lg font-mono font-medium transition"
            >
              BL-VL-2026-REVOKED-009 (Revoked Card)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
