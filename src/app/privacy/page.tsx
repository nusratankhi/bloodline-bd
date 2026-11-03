import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Privacy & Data Protection Policy
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Effective Date: November 2026 • Bangladesh National Blood Network
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 space-y-6 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Data Minimization & Consent</h2>
            <p>
              BloodLine respects the privacy and dignity of all blood donors and seekers.
              Under no circumstances do we sell, rent, or publicly index your private phone numbers,
              residential street addresses, or emergency contacts.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Contact Request Protocol</h2>
            <p>
              When an attendant requests blood, your phone number remains masked. Contact details
              are decrypted and shared only when you actively review the hospital request and click
              &ldquo;Approve Contact Sharing&rdquo;. You retain the right to revoke future contact permissions
              at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Cryptographic Digital ID Verification</h2>
            <p>
              Public QR codes on your BloodLine Digital ID point to secure token verification endpoints.
              These endpoints only reveal public non-sensitive verification details: your name, approved
              role title, unique card number, issue/expiry dates, and active validity status.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Medical Data Security</h2>
            <p>
              Uploaded lab tests and grouping documents are stored in private, encrypted cloud storage
              accessible only by authorized verification officers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
