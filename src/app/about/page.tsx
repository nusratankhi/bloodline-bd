import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Users,
  MapPin,
  Building2,
  Award,
  Droplet,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-[#D71920] px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <Droplet className="w-4 h-4 fill-current" />
            <span>{siteConfig.positioning}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About BloodLine
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Bridging voluntary blood donors with patients in urgent need across all 8 Divisions
            and 64 Districts of Bangladesh.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Our National Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every year in Bangladesh, over 1 million units of blood are required for life-saving
            surgeries, thalassemia patients, road accident trauma cases, and maternal care.
            BloodLine is engineered as a secure, high-availability digital coordination infrastructure
            that eliminates the panic of emergency blood discovery through real-time matching,
            transparent hospital directories, and cryptographically verified digital identity cards.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-[#D71920] flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Voluntary & Non-Profit</h3>
              <p className="text-xs text-slate-500">
                100% voluntary blood donation without commercialization or exploitative brokerage.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Zero-Trust Privacy</h3>
              <p className="text-xs text-slate-500">
                Donor personal details are never publicly leaked; contact is shared strictly via double-opt-in consent.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Nationwide Coverage</h3>
              <p className="text-xs text-slate-500">
                Active coordinators, partner hospitals, and volunteer teams in all 64 districts.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory & Safety Notice */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-4">
          <h3 className="text-lg font-bold">Clinical & Medical Coordination Boundary</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {siteConfig.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
