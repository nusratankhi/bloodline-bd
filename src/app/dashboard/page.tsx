"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Droplet,
  ShieldCheck,
  CreditCard,
  Heart,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  Bell,
  Settings,
  ArrowRight,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function UserDashboardPage() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "requests" | "history">(
    "overview"
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center text-2xl font-black shadow-md shadow-red-500/20 shrink-0">
              R
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Rahim Ahmed
                </h1>
                <span className="bg-red-100 text-[#D71920] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Blood Donor (O+)
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full hidden sm:inline-block">
                  Volunteer
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Dhanmondi, Dhaka</span>
                </span>
                <span>•</span>
                <span>Member since Jan 2026</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Availability Toggle */}
            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-xs font-semibold">
              <span className="text-slate-600">Donor Status:</span>
              <button
                type="button"
                onClick={() => setIsAvailable(!isAvailable)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  isAvailable
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-300 text-slate-700"
                }`}
              >
                {isAvailable ? "Available" : "Unavailable"}
              </button>
            </div>

            <Link
              href="/dashboard/id-card"
              className="px-4 py-2.5 bg-[#D71920] hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center space-x-2 transition"
            >
              <CreditCard className="w-4 h-4" />
              <span>My Digital ID</span>
            </Link>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Verified Donations</span>
              <Droplet className="w-4 h-4 text-[#D71920] fill-current" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">28</p>
            <p className="text-[11px] text-emerald-600 font-semibold">
              Last: 12 June 2026
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Lives Impacted</span>
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">84+</p>
            <p className="text-[11px] text-slate-500">Approx. 3 lives per unit</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Active Digital Cards</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">2</p>
            <Link
              href="/dashboard/id-card"
              className="text-[11px] text-[#D71920] font-bold hover:underline inline-flex items-center space-x-1"
            >
              <span>View ID Cards →</span>
            </Link>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
              <span>Volunteer Tasks</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900">14</p>
            <p className="text-[11px] text-slate-500">Dhaka Central Area</p>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="flex border-b border-slate-200 gap-4 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "overview"
                ? "border-[#D71920] text-[#D71920]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Pending Contact Requests
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`pb-3 border-b-2 transition ${
              activeTab === "history"
                ? "border-[#D71920] text-[#D71920]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Donation History & Certificates
          </button>
        </div>

        {/* Tab 1: Pending Contact Requests (Privacy Consent) */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Seeker Contact Authorization
                </h3>
                <p className="text-xs text-slate-500">
                  Seekers cannot view your phone number until you explicitly approve their request.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">
                      Tanvir Alam (Attendant for Patient Kabir)
                    </span>
                    <span className="text-[10px] font-bold uppercase bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      Urgent Request
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    &ldquo;Urgent surgery scheduled at Dhaka Medical College Hospital tomorrow morning. Need 1 unit O+ blood.&rdquo;
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Requested 25 minutes ago • Dhaka Central
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    type="button"
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
                  >
                    Approve & Share Contact
                  </button>
                  <button
                    type="button"
                    className="px-3 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold transition"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Donation History */}
        {activeTab === "history" && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Verified Blood Donation History
            </h3>
            <div className="divide-y divide-slate-100 text-sm">
              <div className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">
                    Dhaka Medical College Hospital (Voluntary Camp)
                  </p>
                  <p className="text-xs text-slate-500">
                    12 June 2026 • 1 Unit Donated • Verified by Dr. M. Rahman
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Verified & Stamped
                </span>
              </div>

              <div className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">
                    National Institute of Cardiovascular Diseases (NICVD)
                  </p>
                  <p className="text-xs text-slate-500">
                    04 February 2026 • 1 Unit Donated • Verified by Lab Officer
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Verified & Stamped
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
