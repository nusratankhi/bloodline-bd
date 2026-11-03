"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Droplet,
  AlertTriangle,
  Search,
  MapPin,
  Building,
  Heart,
  ChevronDown,
} from "lucide-react";
import {
  BANGLADESH_DIVISIONS,
  BANGLADESH_DISTRICTS,
  type District,
} from "@/config/bangladesh-locations";
import { siteConfig } from "@/config/site";

export function HeroSearchPanel() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"donor" | "emergency">("donor");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  // Dependent districts based on selected division
  const availableDistricts = selectedDivision
    ? BANGLADESH_DISTRICTS.filter((d) => d.divisionId === selectedDivision)
    : BANGLADESH_DISTRICTS;

  // Dependent upazilas based on selected district
  const currentDistrictObj = BANGLADESH_DISTRICTS.find(
    (d) => d.id === selectedDistrict
  );
  const availableUpazilas = currentDistrictObj?.upazilas || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "emergency") {
      router.push("/emergency/new");
      return;
    }

    const params = new URLSearchParams();
    if (selectedBloodGroup) params.set("blood_group", selectedBloodGroup);
    if (selectedDivision) params.set("division", selectedDivision);
    if (selectedDistrict) params.set("district", selectedDistrict);
    if (selectedUpazila) params.set("upazila", selectedUpazila);

    router.push(`/donors?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto shadow-2xl rounded-2xl bg-white border border-slate-100 overflow-hidden transform -translate-y-6 sm:-translate-y-8 z-20 relative">
      {/* Search Header Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab("donor")}
          className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 py-3.5 px-8 font-semibold text-sm transition-all duration-200 ${
            activeTab === "donor"
              ? "bg-[#D71920] text-white shadow-sm"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <Droplet className="w-4 h-4 text-white" />
          <span>Find a Blood Donor</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("emergency")}
          className={`flex-1 sm:flex-none flex items-center justify-center space-x-2 py-3.5 px-8 font-semibold text-sm transition-all duration-200 ${
            activeTab === "emergency"
              ? "bg-[#D71920] text-white shadow-sm"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100"
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Emergency Blood Request</span>
        </button>
      </div>

      {/* Search Form Fields */}
      <form onSubmit={handleSearch} className="p-4 sm:p-6 bg-white">
        {activeTab === "donor" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
            {/* Blood Group */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex items-center space-x-1">
                <Droplet className="w-3.5 h-3.5 text-[#D71920]" />
                <span>Blood Group</span>
              </label>
              <div className="relative">
                <select
                  value={selectedBloodGroup}
                  onChange={(e) => setSelectedBloodGroup(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                >
                  <option value="">Select Blood Group</option>
                  {siteConfig.bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Division */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Division</span>
              </label>
              <div className="relative">
                <select
                  value={selectedDivision}
                  onChange={(e) => {
                    setSelectedDivision(e.target.value);
                    setSelectedDistrict("");
                    setSelectedUpazila("");
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                >
                  <option value="">Select Division</option>
                  {BANGLADESH_DIVISIONS.map((div) => (
                    <option key={div.id} value={div.id}>
                      {div.name} ({div.nameBn})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* District */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>District</span>
              </label>
              <div className="relative">
                <select
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedUpazila("");
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none"
                >
                  <option value="">Select District</option>
                  {availableDistricts.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name} ({dist.nameBn})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Upazila / Thana */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 flex items-center space-x-1">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                <span>Upazila / Thana</span>
              </label>
              <div className="relative">
                <select
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  disabled={!selectedDistrict || availableUpazilas.length === 0}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 appearance-none"
                >
                  <option value="">Select Upazila</option>
                  {availableUpazilas.map((upz) => (
                    <option key={upz} value={upz}>
                      {upz}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#D71920] hover:bg-red-700 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center space-x-2 shadow-md transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search Donors</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="py-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-700">
              <p className="font-bold text-slate-900 mb-1">
                Do you need blood urgently for a patient?
              </p>
              <p className="text-xs text-slate-500">
                Post an emergency blood request immediately. Our network will notify matching nearby donors in your district.
              </p>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#D71920] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center space-x-2 shadow-lg transition-colors whitespace-nowrap"
            >
              <AlertTriangle className="w-4 h-4 text-yellow-300" />
              <span>Post Emergency Request</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
