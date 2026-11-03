"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  Droplet,
  User,
  Heart,
  Award,
  Layers,
  ArrowLeft,
  FileCheck2,
} from "lucide-react";
import { DigitalIdCardView } from "@/components/identity/digital-id-card";
import { type DigitalIdentityCard, type RoleName } from "@/types";
import { siteConfig } from "@/config/site";

// Demonstration cards for a user holding multiple approved roles (Donor + Volunteer)
const SAMPLE_USER_CARDS: DigitalIdentityCard[] = [
  {
    id: "card-donor-01",
    cardNumber: "BL-DR-2026-000102",
    userId: "usr-001",
    userName: "Rahim Ahmed",
    userAvatar: "",
    role: "blood_donor",
    roleTitle: "National Blood Donor",
    bloodGroup: "O+",
    verifiedDonationCount: 28,
    assignedLocation: "Dhanmondi, Dhaka",
    issueDate: "2026-01-15",
    expiryDate: "2028-01-15",
    status: "active",
    qrPublicToken: "bl_token_donor_9921_rahim",
    verificationUrl: `${siteConfig.url}/verify/id/BL-DR-2026-000102`,
    disclaimer: siteConfig.idCardDisclaimer,
  },
  {
    id: "card-volunteer-01",
    cardNumber: "BL-VL-2026-000418",
    userId: "usr-001",
    userName: "Rahim Ahmed",
    userAvatar: "",
    role: "volunteer",
    roleTitle: "National Volunteer",
    assignedLocation: "Dhaka Central Division",
    issueDate: "2026-02-01",
    expiryDate: "2028-02-01",
    status: "active",
    qrPublicToken: "bl_token_vol_418_rahim",
    verificationUrl: `${siteConfig.url}/verify/id/BL-VL-2026-000418`,
    disclaimer: siteConfig.idCardDisclaimer,
  },
];

export default function MyDigitalIdPage() {
  const [selectedCardId, setSelectedCardId] = useState<string>(
    SAMPLE_USER_CARDS[0].id
  );

  const activeCard =
    SAMPLE_USER_CARDS.find((c) => c.id === selectedCardId) ||
    SAMPLE_USER_CARDS[0];

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#D71920] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>Cryptographically Verified ID</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            My Digital Identity Cards
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Every approved role in BloodLine receives an individual, tamper-proof digital
            credential with a unique serial and secure verification QR code.
          </p>
        </div>

        {/* Role Card Selector (Multiple Roles Support) */}
        {SAMPLE_USER_CARDS.length > 1 && (
          <div className="flex justify-center">
            <div className="inline-flex p-1 bg-slate-200/80 rounded-xl space-x-1">
              {SAMPLE_USER_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedCardId(card.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                    selectedCardId === card.id
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {card.roleTitle}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live ID Card Preview Component */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80 flex flex-col items-center">
          <DigitalIdCardView card={activeCard} allowFlip={true} />
        </div>

        {/* Security & Verification Guidelines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1.5">
            <h4 className="font-bold text-slate-800 flex items-center space-x-1.5">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              <span>Tamper-Resistant QR Code</span>
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              When hospital staff or coordinators scan the QR code on your card, our system
              validates your live status in real time against the national database.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1.5">
            <h4 className="font-bold text-slate-800 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#D71920]" />
              <span>Multi-Role Independence</span>
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Holding multiple roles (e.g., Blood Donor and Volunteer) gives you separate,
              purpose-specific ID cards with independent tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
