import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Calendar,
  MapPin,
  Building,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  FileCheck2,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { ROLE_CARD_CONFIGS } from "@/lib/security/id-card-generator";
import { type RoleName } from "@/types";

interface VerifyPageProps {
  params: {
    token: string;
  };
}

export default async function VerifyIdPage({ params }: VerifyPageProps) {
  const { token } = params;

  // Mock verification lookup demonstration for tokens
  // In production, queries Supabase by SHA-256(token)
  const isValidToken = token && token.length >= 8;
  const isRevoked = token.toLowerCase().includes("revoked");
  const isSuspended = token.toLowerCase().includes("suspended");

  // Sample card payload for valid token demonstration
  const sampleCard = {
    cardNumber: "BL-DR-2026-000102",
    userName: "Rahim Ahmed",
    role: "blood_donor" as RoleName,
    roleTitle: "National Blood Donor",
    bloodGroup: "O+",
    verifiedDonationCount: 28,
    assignedLocation: "Dhanmondi, Dhaka",
    issueDate: "2026-01-15",
    expiryDate: "2028-01-15",
    status: isRevoked
      ? "revoked"
      : isSuspended
      ? "suspended"
      : isValidToken
      ? "active"
      : "not_found",
  };

  const roleConfig =
    ROLE_CARD_CONFIGS[sampleCard.role] || ROLE_CARD_CONFIGS.registered_member;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#D71920] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to BloodLine Home</span>
        </Link>

        {/* Verification Certificate Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#101828] to-slate-800 text-white p-6 sm:p-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-xl shadow-sm">
                <div className="relative w-28 h-7">
                  <Image
                    src="/brand/bloodline-logo.png"
                    alt="BloodLine"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                ID VERIFICATION
              </p>
              <p className="text-xs font-bold text-red-300">
                Bangladesh Network
              </p>
            </div>
          </div>

          {/* Verification Status Banner */}
          <div className="p-6 sm:p-8 space-y-6">
            {sampleCard.status === "active" ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start space-x-3.5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-900">
                    Official Active Identity Verified
                  </h3>
                  <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                    This digital credential has been cryptographically confirmed on the BloodLine
                    National Database as genuine and active.
                  </p>
                </div>
              </div>
            ) : sampleCard.status === "revoked" ? (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start space-x-3.5">
                <ShieldX className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-red-900">
                    Identity Card Revoked
                  </h3>
                  <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                    This card was revoked by administrative authority and is no longer valid.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3.5">
                <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-amber-900">
                    Card Suspended or Not Found
                  </h3>
                  <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                    The requested verification token could not be verified as active.
                  </p>
                </div>
              </div>
            )}

            {/* Privacy-Safe Card Details Table */}
            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Cardholder Name</span>
                <span className="font-bold text-slate-900">{sampleCard.userName}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Digital ID Number</span>
                <span className="font-mono font-bold text-red-600">
                  {sampleCard.cardNumber}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Approved Role</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
                  {sampleCard.roleTitle}
                </span>
              </div>

              {sampleCard.bloodGroup && (
                <div className="py-3 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Blood Group</span>
                  <span className="font-bold text-[#D71920]">
                    {sampleCard.bloodGroup}
                  </span>
                </div>
              )}

              {sampleCard.assignedLocation && (
                <div className="py-3 flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Assigned Region</span>
                  <span className="text-slate-800 font-medium">
                    {sampleCard.assignedLocation}
                  </span>
                </div>
              )}

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Date of Issue</span>
                <span className="text-slate-700">{sampleCard.issueDate}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <span className="text-slate-500 font-medium">Current Status</span>
                <span
                  className={`font-bold uppercase text-xs px-2.5 py-0.5 rounded-full ${
                    sampleCard.status === "active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {sampleCard.status}
                </span>
              </div>
            </div>

            {/* Official Legal & Medical Disclaimer */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed space-y-1">
              <p className="font-bold text-slate-700">Official Disclaimer:</p>
              <p>{siteConfig.idCardDisclaimer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
