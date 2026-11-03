"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import {
  BANGLADESH_DIVISIONS,
  BANGLADESH_DISTRICTS,
} from "@/config/bangladesh-locations";

export default function VolunteerPortalPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("dhaka");
  const [selectedDistrict, setSelectedDistrict] = useState("dhaka");
  const [availability, setAvailability] = useState("part_time");
  const [skills, setSkills] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableDistricts = BANGLADESH_DISTRICTS.filter(
    (d) => d.divisionId === selectedDivision
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#006A4E] to-emerald-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center space-x-2 bg-white/20 px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              <Heart className="w-4 h-4 fill-white text-emerald-300" />
              <span>National Volunteer Movement</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Join the BloodLine Volunteer Network
            </h1>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Become a community hero. Coordinate emergency blood requests, manage local
              donation camps, and help build a blood-safe Bangladesh in your district.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-2 shrink-0">
            <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto">
              <Award className="w-6 h-6 text-yellow-300" />
            </div>
            <p className="text-2xl font-black">2,400+ Active</p>
            <p className="text-xs text-emerald-200">Across 64 Districts</p>
          </div>
        </div>

        {/* 3 Pillars of Volunteering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006A4E] flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-slate-900 text-base">Emergency Blood Dispatch</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assist patient families in urgently locating rare blood groups in your upazila or district.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006A4E] flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-slate-900 text-base">Camp Organization</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Support universities, clubs, and Red Crescent units in running safe voluntary donation drives.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#006A4E] flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-slate-900 text-base">Digital Volunteer ID & Badges</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Earn verified community service hours, certificate recognition, and an official National Volunteer ID Card.
            </p>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10 max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-slate-900">Volunteer Application</h2>
            <p className="text-xs text-slate-500">
              Submit your details to be assigned to your local District Coordinator.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-emerald-950">
                Application Received!
              </h3>
              <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                Thank you for stepping forward to serve Bangladesh. The District Coordinator for{" "}
                <strong>{selectedDistrict}</strong> will review your application and issue
                your Volunteer Digital ID card shortly.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-2.5 bg-[#006A4E] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ayesha Rahman"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ayesha@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      if (firstDist) setSelectedDistrict(firstDist.id);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {availableDistricts.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} ({d.nameBn})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Availability *
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="part_time">Part-Time (Evenings & Weekends)</option>
                  <option value="full_time">Full-Time Active</option>
                  <option value="on_call">Emergency On-Call Only</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#006A4E] hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                Submit Volunteer Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
