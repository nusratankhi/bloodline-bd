"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  Droplet,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  FileText,
  User,
  Phone,
} from "lucide-react";
import {
  BANGLADESH_DIVISIONS,
  BANGLADESH_DISTRICTS,
} from "@/config/bangladesh-locations";
import { siteConfig } from "@/config/site";
import { type BloodGroup, type EmergencyPriority } from "@/types";

export default function NewEmergencyRequestPage() {
  const router = useRouter();
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [unitsNeeded, setUnitsNeeded] = useState(1);
  const [priority, setPriority] = useState<EmergencyPriority>("urgent");
  const [patientName, setPatientName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("dhaka");
  const [selectedDistrict, setSelectedDistrict] = useState("dhaka");
  const [selectedUpazila, setSelectedUpazila] = useState("Dhanmondi");
  const [requiredDate, setRequiredDate] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const availableDistricts = BANGLADESH_DISTRICTS.filter(
    (d) => d.divisionId === selectedDivision
  );
  const currentDistrictObj = BANGLADESH_DISTRICTS.find(
    (d) => d.id === selectedDistrict
  );
  const availableUpazilas = currentDistrictObj?.upazilas || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const code = `EMR-${dateStr}-${randomSuffix}`;
    setGeneratedCode(code);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/emergency"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-[#D71920] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Emergency Requests</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10 space-y-8">
          {/* Header */}
          <div className="border-b border-slate-100 pb-5">
            <div className="inline-flex items-center space-x-1.5 bg-red-100 text-[#D71920] px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>National Blood Emergency Dispatch</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Submit Emergency Blood Request
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Please enter accurate hospital and patient details. Nearby compatible donors in
              your district will be alerted immediately.
            </p>
          </div>

          {isSubmitted ? (
            /* Success confirmation */
            <div className="p-8 text-center space-y-5 bg-emerald-50/60 rounded-2xl border border-emerald-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-950">
                  Emergency Request Dispatched!
                </h3>
                <p className="text-xs font-mono font-semibold text-emerald-700 mt-1">
                  Reference Code: {generatedCode}
                </p>
                <p className="text-xs text-emerald-800 max-w-md mx-auto mt-2 leading-relaxed">
                  Your request has been published across the BloodLine National Network. Verified
                  donors of group <strong>{bloodGroup}</strong> in{" "}
                  <strong>{currentDistrictObj?.name}</strong> are being notified.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <Link
                  href="/emergency"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
                >
                  View Active Emergency Board
                </Link>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-white border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold hover:bg-emerald-50 transition"
                >
                  Post Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Blood Group, Units, Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Required Blood Group *
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {siteConfig.bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Units Needed (Bags) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    required
                    value={unitsNeeded}
                    onChange={(e) => setUnitsNeeded(parseInt(e.target.value) || 1)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Emergency Priority *
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as EmergencyPriority)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="critical">Critical (Immediate)</option>
                    <option value="urgent">Urgent (Within 6 hrs)</option>
                    <option value="normal">Normal (Within 24 hrs)</option>
                  </select>
                </div>
              </div>

              {/* Patient Identifier */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Patient Name or Clinical Identifier *
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Patient Kabir Hossain (Ward 4, Bed 12)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Hospital Name */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Hospital Name & Department *
                </label>
                <input
                  type="text"
                  required
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  placeholder="e.g. Dhaka Medical College Hospital (ICU Unit)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Division, District, Upazila */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Division *
                  </label>
                  <select
                    value={selectedDivision}
                    onChange={(e) => {
                      setSelectedDivision(e.target.value);
                      const firstDist = BANGLADESH_DISTRICTS.find(
                        (d) => d.divisionId === e.target.value
                      );
                      if (firstDist) {
                        setSelectedDistrict(firstDist.id);
                        setSelectedUpazila(firstDist.upazilas[0] || "");
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {BANGLADESH_DIVISIONS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.nameBn})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    District *
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => {
                      setSelectedDistrict(e.target.value);
                      const dist = BANGLADESH_DISTRICTS.find((d) => d.id === e.target.value);
                      setSelectedUpazila(dist?.upazilas[0] || "");
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {availableDistricts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.nameBn})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Upazila / Thana *
                  </label>
                  <select
                    value={selectedUpazila}
                    onChange={(e) => setSelectedUpazila(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {availableUpazilas.map((upz) => (
                      <option key={upz} value={upz}>
                        {upz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Attendant Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Tanvir Alam (Brother)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Attendant Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Medical Details & Urgency Reason
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide medical context: reason for surgery, specific time needed, or blood bank requisition details."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Declaration & Clinical Disclaimer Checkbox */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input type="checkbox" required className="mt-0.5 rounded text-red-600" />
                  <span>
                    I confirm that this blood request is for a genuine medical emergency and all
                    provided hospital details are accurate. I understand BloodLine coordinates
                    voluntary donor discovery and that clinical compatibility testing is the
                    responsibility of the treating hospital.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#D71920] hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/20 flex items-center justify-center space-x-2 transition"
              >
                <AlertTriangle className="w-4 h-4 text-yellow-300" />
                <span>
                  {isSubmitting ? "Broadcasting Request..." : "Broadcast Emergency Blood Request"}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
