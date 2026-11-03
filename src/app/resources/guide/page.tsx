import React from "react";
import Link from "next/link";
import { Droplet, Heart, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function DonationGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-red-100 text-[#D71920] px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Droplet className="w-3.5 h-3.5 fill-current" />
            <span>Donor Education & Preparation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Complete Blood Donation Guide
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Everything you need to know before, during, and after donating blood in Bangladesh.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-6 text-sm text-slate-700 leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Before Donating</h2>
            <ul className="space-y-2 list-disc pl-5 text-slate-600 text-xs sm:text-sm">
              <li>Drink at least 500ml of water or fresh juice 30 minutes before donating.</li>
              <li>Eat a healthy, low-fat meal 2-3 hours before your appointment. Never donate on an empty stomach.</li>
              <li>Get a good night’s rest (at least 6-8 hours of sleep).</li>
              <li>Avoid alcohol or smoking for at least 24 hours prior to donation.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">2. During Donation</h2>
            <ul className="space-y-2 list-disc pl-5 text-slate-600 text-xs sm:text-sm">
              <li>The actual blood collection takes only 8 to 10 minutes.</li>
              <li>A sterile, brand-new disposable needle is used for every donor and disposed of safely immediately afterwards.</li>
              <li>Relax, breathe normally, and squeeze the soft ball gently as advised by the phlebotomist.</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">3. After Donating (Post-Care)</h2>
            <ul className="space-y-2 list-disc pl-5 text-slate-600 text-xs sm:text-sm">
              <li>Rest in the refreshment area for 10-15 minutes and enjoy light snacks/juice.</li>
              <li>Keep the adhesive bandage on your arm for at least 4-5 hours.</li>
              <li>Drink extra fluids throughout the next 24-48 hours to replenish plasma volume.</li>
              <li>Avoid heavy lifting, intense workouts, or strenuous physical labor for the rest of the day.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-center bg-red-50 border border-red-200 p-6 rounded-2xl">
          <div>
            <h3 className="font-bold text-red-950 text-base">Ready to Save Lives?</h3>
            <p className="text-xs text-red-700">Check your eligibility or register as a voluntary donor today.</p>
          </div>
          <Link
            href="/register?role=donor"
            className="px-5 py-2.5 bg-[#D71920] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
          >
            Register as Donor →
          </Link>
        </div>
      </div>
    </div>
  );
}
