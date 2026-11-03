import React from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  MapPin,
  Building2,
  Droplet,
  PlusCircle,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Activity,
  Heart,
} from "lucide-react";
import { type BloodGroup, type EmergencyPriority } from "@/types";
import { siteConfig } from "@/config/site";

interface EmergencyItem {
  id: string;
  requestCode: string;
  patientIdentifier: string;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  hospitalName: string;
  districtName: string;
  requiredDateTime: string;
  priority: EmergencyPriority;
  status: string;
  description: string;
}

const SAMPLE_EMERGENCIES: EmergencyItem[] = [
  {
    id: "emr-01",
    requestCode: "EMR-20261103-0104",
    patientIdentifier: "Patient #8491 (Cardiac Surgery)",
    bloodGroup: "O+",
    unitsNeeded: 3,
    hospitalName: "National Heart Foundation, Mirpur",
    districtName: "Dhaka",
    requiredDateTime: "Today at 04:30 PM",
    priority: "critical",
    status: "verified",
    description: "Urgent bypass surgery patient requiring 3 fresh units of O+ blood.",
  },
  {
    id: "emr-02",
    requestCode: "EMR-20261103-0105",
    patientIdentifier: "Patient #9023 (Thalassemia Child)",
    bloodGroup: "B+",
    unitsNeeded: 1,
    hospitalName: "Dhaka Medical College Hospital",
    districtName: "Dhaka",
    requiredDateTime: "Today at 08:00 PM",
    priority: "urgent",
    status: "verified",
    description: "Routine transfusion for 8-year-old child suffering from Thalassemia major.",
  },
  {
    id: "emr-03",
    requestCode: "EMR-20261103-0106",
    patientIdentifier: "Patient #6612 (Accident Trauma)",
    bloodGroup: "AB-",
    unitsNeeded: 2,
    hospitalName: "Chattogram Medical College Hospital",
    districtName: "Chattogram",
    requiredDateTime: "Within 3 hours",
    priority: "critical",
    status: "matching_donors",
    description: "Emergency road accident trauma case requiring rare AB- blood units.",
  },
];

export default function EmergencyRequestsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 sm:p-8 rounded-3xl shadow-lg">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping"></span>
              <span>24/7 National Emergency Blood Broadcast</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Emergency Blood Requests
            </h1>
            <p className="text-xs sm:text-sm text-red-100 max-w-xl">
              Verified clinical blood needs submitted by patient attendants across Bangladesh.
              If you match the required blood group and area, reach out immediately.
            </p>
          </div>

          <Link
            href="/emergency/new"
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-[#D71920] font-bold text-sm rounded-2xl shadow-md flex items-center justify-center space-x-2 transition shrink-0"
          >
            <PlusCircle className="w-5 h-5 text-[#D71920]" />
            <span>Post Emergency Request</span>
          </Link>
        </div>

        {/* Emergency Medical Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Clinical Safety Notice:</strong> BloodLine coordinates blood donor discovery.
            Cross-matching, screening for transfusion-transmissible infections (TTI), and actual
            transfusions must be conducted strictly by certified clinical pathologists at the hospital.
          </div>
        </div>

        {/* Live Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_EMERGENCIES.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-red-400 p-6 shadow-sm hover:shadow-md transition space-y-4 relative overflow-hidden"
            >
              {/* Top Urgency Ribbon */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    req.priority === "critical"
                      ? "bg-red-600 text-white animate-pulse"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {req.priority} PRIORITY
                </span>

                <span className="text-[11px] font-mono text-slate-500 font-semibold">
                  {req.requestCode}
                </span>
              </div>

              {/* Group & Units */}
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-red-100/90 text-[#D71920] flex flex-col items-center justify-center font-black">
                  <span className="text-xl leading-none">{req.bloodGroup}</span>
                  <span className="text-[9px] font-semibold uppercase">GROUP</span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{req.patientIdentifier}</h3>
                  <p className="text-xs text-[#D71920] font-bold mt-0.5">
                    Needs {req.unitsNeeded} Units of Blood
                  </p>
                </div>
              </div>

              {/* Hospital & Location */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-start space-x-2">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-800">{req.hospitalName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{req.districtName} District</span>
                </div>
                <div className="flex items-center space-x-2 text-red-600 font-semibold">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>Required: {req.requiredDateTime}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                &ldquo;{req.description}&rdquo;
              </p>

              {/* Contact Button */}
              <Link
                href={`/emergency/${req.id}`}
                className="w-full py-2.5 bg-[#D71920] hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-2 transition"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>I Can Donate Blood</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
