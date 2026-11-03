import React from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from "lucide-react";

export default function EligibilityInfoPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Health & Safety Criteria</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Blood Donation Eligibility Criteria
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Standard health parameters for voluntary donors in Bangladesh.
          </p>
        </div>

        {/* Clinical Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Critical Medical Safety Notice:</strong> The criteria below serve as general
            guidelines. BloodLine does not certify clinical eligibility. The treating hospital
            or authorized blood bank conducts physical checks, hemoglobin testing, and confidential
            screening before blood collection is authorized.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Who Can Donate */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2 text-emerald-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>General Eligibility Requirements</span>
            </h2>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">• Age:</span>
                <span>Between 18 and 60 years old.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">• Weight:</span>
                <span>Minimum 45 kg (females) or 50 kg (males).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">• Hemoglobin:</span>
                <span>At least 12.5 g/dL (tested free at the blood bank).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">• Blood Pressure:</span>
                <span>Systolic: 100-140 mmHg, Diastolic: 60-90 mmHg.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">• Frequency:</span>
                <span>At least 90-120 days interval between full blood donations.</span>
              </li>
            </ul>
          </div>

          {/* Temporary / Permanent Deferrals */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2 text-red-600">
              <XCircle className="w-5 h-5 text-red-600" />
              <span>Temporary Deferral Conditions</span>
            </h2>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">• Acute Illness:</span>
                <span>Fever, flu, or active antibiotic medication (defer for 7-14 days).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">• Dental Extraction:</span>
                <span>Defer for 3 to 7 days depending on procedure.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">• Tattoos / Piercings:</span>
                <span>Defer for 6 months after receiving a tattoo or piercing.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="font-bold text-slate-900">• Pregnancy & Lactation:</span>
                <span>Defer throughout pregnancy and 6 months post-delivery.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
