import React from "react";
import Link from "next/link";
import {
  Droplet,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  AlertCircle,
  Building,
} from "lucide-react";

interface BloodBankItem {
  id: string;
  name: string;
  nameBn: string;
  district: string;
  address: string;
  phone: string;
  operatingHours: string;
  services: string[];
  isVerified: boolean;
}

const SAMPLE_BLOOD_BANKS: BloodBankItem[] = [
  {
    id: "bb-01",
    name: "Bangladesh Red Crescent Blood Bank",
    nameBn: "বাংলাদেশ রেড ক্রিসেন্ট রক্ত কেন্দ্র",
    district: "Dhaka",
    address: "7/5 Aurangzeb Road, Mohammadpur, Dhaka-1207",
    phone: "02-9116563, 01811-458524",
    operatingHours: "24 Hours / 7 Days",
    services: ["Whole Blood", "Packed Red Cells", "Platelet Concentrate", "Fresh Frozen Plasma"],
    isVerified: true,
  },
  {
    id: "bb-02",
    name: "Sandhani Central Blood Bank",
    nameBn: "সন্ধানী কেন্দ্রীয় রক্ত পরিসঞ্চালন কেন্দ্র",
    district: "Dhaka",
    address: "DMCH Complex, Secretariat Road, Dhaka",
    phone: "02-55165088 Ext. 102",
    operatingHours: "24 Hours / 7 Days",
    services: ["Voluntary Blood Collection", "Screening (HBsAg, HCV, HIV, Syphilis, Malaria)", "Grouping"],
    isVerified: true,
  },
  {
    id: "bb-03",
    name: "Quantum Voluntary Blood Bank",
    nameBn: "কোয়ান্টাম রক্ত পরিসঞ্চালন কেন্দ্র",
    district: "Dhaka",
    address: "31/1 Shantinagar, Dhaka-1217",
    phone: "02-9351969, 01714-010869",
    operatingHours: "24 Hours / 7 Days",
    services: ["Apheresis Platelets", "PRBC", "FFP", "Cryoprecipitate"],
    isVerified: true,
  },
  {
    id: "bb-04",
    name: "Chattogram Red Crescent Blood Center",
    nameBn: "চট্টগ্রাম রেড ক্রিসেন্ট রক্ত কেন্দ্র",
    district: "Chattogram",
    address: "Anderkilla, Kotwali, Chattogram",
    phone: "031-612398",
    operatingHours: "24 Hours / 7 Days",
    services: ["Screened Whole Blood", "Components Separation"],
    isVerified: true,
  },
];

export default function BloodBanksPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-red-100 text-[#D71920] px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Droplet className="w-3.5 h-3.5 fill-current" />
            <span>National Certified Centers</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Certified Blood Bank Directory
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Official non-profit, humanitarian, and institutional blood transfusion centers
            in Bangladesh.
          </p>
        </div>

        {/* Regulatory Notice */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200/80 text-xs text-slate-600 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Inventory Transparency Policy:</strong> To ensure patient safety, BloodLine
            does not display unverified or stale blood unit counts. Please contact the certified
            blood banks directly to check current component stock.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_BLOOD_BANKS.map((bb) => (
            <div
              key={bb.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{bb.name}</h3>
                  <p className="text-xs font-bangla text-slate-500 font-semibold mt-0.5">
                    {bb.nameBn}
                  </p>
                </div>
                <span className="inline-flex items-center space-x-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Licensed</span>
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{bb.address}</span>
                </div>
                <div className="flex items-center space-x-2 font-mono text-slate-900 font-semibold">
                  <Phone className="w-4 h-4 text-[#D71920] shrink-0" />
                  <span>Hotline: {bb.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700 font-semibold">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Hours: {bb.operatingHours}</span>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[11px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Services & Component Preparation:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {bb.services.map((svc) => (
                    <span
                      key={svc}
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded-lg"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
