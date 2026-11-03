import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Terms of Service & Clinical Boundary
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Last Updated: November 2026 • BloodLine Bangladesh
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Nature of the Service</h2>
            <p>
              BloodLine is an open digital coordination and discovery network that connects voluntary
              blood donors with patient attendants in Bangladesh. BloodLine is not a hospital, medical
              laboratory, or blood bank.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Medical Disclaimer & Clinical Decisions</h2>
            <p>
              {siteConfig.disclaimer}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Non-Commercial Voluntary Principle</h2>
            <p>
              Blood donation on BloodLine is strictly voluntary and altruistic. Any attempt to sell
              blood, solicit payment, or charge broker fees will result in immediate lifetime account
              termination, ID revocation, and reporting to legal authorities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Digital Identity Credentials</h2>
            <p>
              {siteConfig.idCardDisclaimer} Any fraudulent alteration, spoofing, or unauthorized
              commercial reproduction of a BloodLine ID is strictly prohibited.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
