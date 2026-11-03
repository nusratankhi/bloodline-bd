"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Calendar,
  Droplet,
  Heart,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  BANGLADESH_DIVISIONS,
  BANGLADESH_DISTRICTS,
} from "@/config/bangladesh-locations";
import { siteConfig } from "@/config/site";
import { type BloodGroup } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [roleSelection, setRoleSelection] = useState<
    "donor" | "seeker" | "volunteer" | "member"
  >("donor");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [lastDonationDate, setLastDonationDate] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("dhaka");
  const [selectedDistrict, setSelectedDistrict] = useState("dhaka");
  const [selectedUpazila, setSelectedUpazila] = useState("Dhanmondi");
  const [gender, setGender] = useState("male");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState<"en" | "bn">("en");
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const availableDistricts = BANGLADESH_DISTRICTS.filter(
    (d) => d.divisionId === selectedDivision
  );
  const currentDistrictObj = BANGLADESH_DISTRICTS.find(
    (d) => d.id === selectedDistrict
  );
  const availableUpazilas = currentDistrictObj?.upazilas || [];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard/id-card");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Logo & Header */}
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 inline-block">
              <div className="relative w-44 h-12">
                <Image
                  src="/brand/bloodline-logo.png"
                  alt="BloodLine"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </Link>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Join the National Blood Network
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Create your citizen profile and receive your universal role-specific digital ID.
            </p>
          </div>
        </div>

        {/* Register Form Box */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-slate-200/80">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Primary Role Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">
                Select Your Primary Community Role *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => setRoleSelection("donor")}
                  className={`p-3 rounded-xl border text-center transition ${
                    roleSelection === "donor"
                      ? "border-[#D71920] bg-red-50 text-[#D71920] font-bold shadow-sm"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Droplet className="w-5 h-5 mx-auto mb-1 fill-current" />
                  <span className="text-xs">Blood Donor</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRoleSelection("volunteer")}
                  className={`p-3 rounded-xl border text-center transition ${
                    roleSelection === "volunteer"
                      ? "border-[#006A4E] bg-emerald-50 text-[#006A4E] font-bold shadow-sm"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Heart className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Volunteer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRoleSelection("seeker")}
                  className={`p-3 rounded-xl border text-center transition ${
                    roleSelection === "seeker"
                      ? "border-rose-600 bg-rose-50 text-rose-700 font-bold shadow-sm"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <User className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Blood Seeker</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRoleSelection("member")}
                  className={`p-3 rounded-xl border text-center transition ${
                    roleSelection === "member"
                      ? "border-slate-800 bg-slate-100 text-slate-900 font-bold shadow-sm"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Member</span>
                </button>
              </div>
            </div>

            {/* Donor Blood Details */}
            {roleSelection === "donor" && (
              <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Blood Group *
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                    className="w-full bg-white border border-red-200 rounded-xl p-2.5 text-sm font-bold text-[#D71920] focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {siteConfig.bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Last Donation Date (if any)
                  </label>
                  <input
                    type="date"
                    value={lastDonationDate}
                    onChange={(e) => setLastDonationDate(e.target.value)}
                    className="w-full bg-white border border-red-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {/* Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name (as per NID/Passport) *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahim Ahmed"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Mobile Number (for OTP & Verification) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Email & Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahim@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Location Hierarchy: Division, District, Upazila */}
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {availableUpazilas.map((upz) => (
                    <option key={upz} value={upz}>
                      {upz}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Terms and Consent Checkbox */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded text-red-600"
                />
                <span>
                  I agree to the <strong>Terms of Service</strong> and{" "}
                  <strong>Privacy Policy</strong>. I consent to receive emergency blood
                  notifications and acknowledge that BloodLine Digital Identity is not a
                  government-issued ID or clinical medical license.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading || !agreed}
              className="w-full py-4 bg-[#D71920] hover:bg-red-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/20 flex items-center justify-center space-x-2 transition"
            >
              <span>{isLoading ? "Creating Account & Issuing ID..." : "Register & Get Digital ID"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-6 mt-6 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Already have an account? </span>
            <Link href="/login" className="font-bold text-[#D71920] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
