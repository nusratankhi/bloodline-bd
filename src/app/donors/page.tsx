"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Droplet,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  Search,
  Filter,
  ChevronDown,
  UserCheck,
  HeartHandshake,
  AlertCircle,
  X,
} from "lucide-react";
import {
  BANGLADESH_DIVISIONS,
  BANGLADESH_DISTRICTS,
} from "@/config/bangladesh-locations";
import { siteConfig } from "@/config/site";
import { type BloodGroup, type DonorStatus } from "@/types";

interface DonorCardData {
  id: string;
  name: string;
  avatarUrl?: string;
  bloodGroup: BloodGroup;
  divisionId: string;
  districtName: string;
  upazilaName: string;
  status: DonorStatus;
  verifiedDonations: number;
  isBloodGroupVerified: boolean;
  lastDonationDate: string;
}

const SAMPLE_DONORS: DonorCardData[] = [
  {
    id: "donor-001",
    name: "Rahim Ahmed",
    bloodGroup: "O+",
    divisionId: "dhaka",
    districtName: "Dhaka",
    upazilaName: "Dhanmondi",
    status: "available",
    verifiedDonations: 28,
    isBloodGroupVerified: true,
    lastDonationDate: "2026-06-12",
  },
  {
    id: "donor-002",
    name: "Tanzila Akhter",
    bloodGroup: "A+",
    divisionId: "dhaka",
    districtName: "Dhaka",
    upazilaName: "Mirpur",
    status: "available",
    verifiedDonations: 14,
    isBloodGroupVerified: true,
    lastDonationDate: "2026-05-18",
  },
  {
    id: "donor-003",
    name: "Kamrul Hasan",
    bloodGroup: "B+",
    divisionId: "chittagong",
    districtName: "Chattogram",
    upazilaName: "Panchlaish",
    status: "available",
    verifiedDonations: 9,
    isBloodGroupVerified: true,
    lastDonationDate: "2026-04-10",
  },
  {
    id: "donor-004",
    name: "Nusrat Jahan",
    bloodGroup: "AB+",
    divisionId: "dhaka",
    districtName: "Gazipur",
    upazilaName: "Tongi",
    status: "donated_recently",
    verifiedDonations: 6,
    isBloodGroupVerified: true,
    lastDonationDate: "2026-09-30",
  },
  {
    id: "donor-005",
    name: "Mehedi Hasan",
    bloodGroup: "O-",
    divisionId: "sylhet",
    districtName: "Sylhet",
    upazilaName: "Sylhet Sadar",
    status: "available",
    verifiedDonations: 19,
    isBloodGroupVerified: true,
    lastDonationDate: "2026-03-22",
  },
  {
    id: "donor-006",
    name: "Fatima Begum",
    bloodGroup: "A-",
    divisionId: "rajshahi",
    districtName: "Rajshahi",
    upazilaName: "Boalia",
    status: "available",
    verifiedDonations: 11,
    isBloodGroupVerified: true,
    lastDonationDate: "2026-04-05",
  },
];

export default function DonorsSearchPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [activeContactModal, setActiveContactModal] = useState<DonorCardData | null>(null);
  const [requestSent, setRequestSent] = useState(false);
  const [requestReason, setRequestReason] = useState("");

  const filteredDonors = SAMPLE_DONORS.filter((donor) => {
    if (selectedGroup && donor.bloodGroup !== selectedGroup) return false;
    if (selectedDivision && donor.divisionId !== selectedDivision) return false;
    if (selectedDistrict && donor.districtName.toLowerCase() !== selectedDistrict.toLowerCase())
      return false;
    if (availabilityFilter === "available" && donor.status !== "available") return false;
    return true;
  });

  const handleSendContactRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setActiveContactModal(null);
      setRequestReason("");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-red-100 text-[#D71920] px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Droplet className="w-3.5 h-3.5 fill-current" />
              <span>National Blood Donor Discovery</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Find Voluntary Blood Donors
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Search verified donors across all 64 districts with strict privacy protections.
            </p>
          </div>

          <Link
            href="/emergency/new"
            className="px-5 py-2.5 bg-[#D71920] hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-md flex items-center space-x-2 transition"
          >
            <span>Post Emergency Request</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Blood Group */}
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Blood Group
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Blood Groups</option>
                {siteConfig.bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* Division */}
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Division
              </label>
              <select
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setSelectedDistrict("");
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Divisions</option>
                {BANGLADESH_DIVISIONS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.nameBn})
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                District
              </label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Districts</option>
                {BANGLADESH_DISTRICTS.filter((d) =>
                  selectedDivision ? d.divisionId === selectedDivision : true
                ).map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.nameBn})
                  </option>
                ))}
              </select>
            </div>

            {/* Availability */}
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Availability
              </label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Donors</option>
                <option value="available">Available Now</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-lg border border-slate-200">
                    {donor.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{donor.name}</h3>
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {donor.upazilaName}, {donor.districtName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Blood Group Badge */}
                <div className="bg-red-50 text-[#D71920] border border-red-200/70 px-3 py-1.5 rounded-xl text-center">
                  <span className="text-lg font-black block leading-none">
                    {donor.bloodGroup}
                  </span>
                  <span className="text-[9px] font-semibold uppercase">Group</span>
                </div>
              </div>

              {/* Verified Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500 block">Verified Donations:</span>
                  <span className="font-bold text-slate-900">
                    {donor.verifiedDonations} Times
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-500 block">Status:</span>
                  <span
                    className={`font-bold capitalize ${
                      donor.status === "available"
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }`}
                  >
                    {donor.status.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Action Button: Privacy-Preserving Request to Contact */}
              <button
                type="button"
                onClick={() => setActiveContactModal(donor)}
                className="w-full py-2.5 bg-[#D71920] hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center space-x-1.5 transition"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Request Contact Permission</span>
              </button>
            </div>
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <Droplet className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No Donors Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No matching voluntary donors found for the selected criteria. Try broadening your location or post an emergency blood request.
            </p>
          </div>
        )}
      </div>

      {/* REQUEST CONTACT MODAL (Strict Privacy Double-Opt-In) */}
      {activeContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setActiveContactModal(null)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-red-100 text-[#D71920] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Request Contact Permission
                </h3>
                <p className="text-xs text-slate-500">
                  For Donor: <strong>{activeContactModal.name}</strong> ({activeContactModal.bloodGroup})
                </p>
              </div>
            </div>

            {requestSent ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Request Dispatched!</h4>
                <p className="text-xs text-emerald-700">
                  The donor will receive your contact request notification. Once approved, contact details will be shared securely.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendContactRequest} className="space-y-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 leading-relaxed">
                  <strong>Privacy Safeguard:</strong> BloodLine protects donor privacy. Phone numbers and private contacts are never publicly exposed without explicit consent.
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Emergency Hospital & Patient Note
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={requestReason}
                    onChange={(e) => setRequestReason(e.target.value)}
                    placeholder="e.g. Urgent blood needed for surgery at Dhaka Medical College Hospital tomorrow 10 AM."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D71920] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  Send Contact Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
