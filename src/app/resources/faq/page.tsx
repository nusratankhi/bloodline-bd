import React from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, Droplet } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Is donating blood safe for my body?",
    a: "Yes, absolutely. Blood donation is completely safe. The human body replaces the liquid volume (plasma) within 24 to 48 hours, and red blood cells are completely regenerated within a few weeks. Only sterile, single-use disposable needles are utilized.",
  },
  {
    q: "How does BloodLine protect donor privacy?",
    a: "BloodLine never publishes your private phone number, exact address, or personal medical notes. When a patient attendant seeks blood, they must send a structured contact request. Only when you review and click 'Approve' is your contact securely shared.",
  },
  {
    q: "What is the BloodLine Universal Digital Identity Card?",
    a: "Every registered member, voluntary blood donor, and volunteer receives a personalized digital identity card featuring a unique serial number (e.g. BL-DR-2026-000102) and a cryptographically signed QR code. Anyone or any hospital can scan the QR code to confirm that the ID is valid and active on the national network.",
  },
  {
    q: "How often can I donate blood?",
    a: "Healthy adults can safely donate whole blood once every 3 to 4 months (90–120 days). Platelet apheresis can be donated more frequently under specific medical guidelines.",
  },
  {
    q: "Does BloodLine charge any money for blood requests or donor contact?",
    a: "No. BloodLine is 100% free and voluntary. Voluntary blood donation in Bangladesh must never involve financial transactions or commercial brokerage. If anyone solicits money in the name of BloodLine, please report them immediately to our national hotline at 10672.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-1.5 bg-red-100 text-[#D71920] px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Common Questions & Answers
          </h1>
          <p className="text-sm text-slate-600">
            Clear facts regarding blood donation, donor privacy, and the BloodLine platform.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2"
            >
              <h3 className="text-base font-bold text-slate-900">{item.q}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
