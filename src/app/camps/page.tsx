import React from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  Droplet,
} from "lucide-react";

interface CampData {
  id: string;
  title: string;
  organizer: string;
  location: string;
  district: string;
  date: string;
  time: string;
  targetUnits: number;
  registeredDonors: number;
  status: "upcoming" | "active" | "completed";
}

const SAMPLE_CAMPS: CampData[] = [
  {
    id: "camp-01",
    title: "Dhaka University Central Blood Donation Camp",
    organizer: "Badhan & BloodLine Volunteer Network",
    location: "Teacher-Student Centre (TSC) Auditorium, University of Dhaka",
    district: "Dhaka",
    date: "15 November 2026",
    time: "09:00 AM - 05:00 PM",
    targetUnits: 300,
    registeredDonors: 198,
    status: "upcoming",
  },
  {
    id: "camp-02",
    title: "Chattogram Youth Blood Drive 2026",
    organizer: "Red Crescent Chattogram & BloodLine",
    location: "Chattogram Press Club Hall, Jamal Khan",
    district: "Chattogram",
    date: "20 November 2026",
    time: "10:00 AM - 04:00 PM",
    targetUnits: 200,
    registeredDonors: 142,
    status: "upcoming",
  },
  {
    id: "camp-03",
    title: "Rajshahi Divisional Humanitarian Blood Camp",
    organizer: "Rajshahi Medical College Volunteer Association",
    location: "Shaheed Minar Premises, Rajshahi University",
    district: "Rajshahi",
    date: "25 November 2026",
    time: "09:30 AM - 04:30 PM",
    targetUnits: 150,
    registeredDonors: 87,
    status: "upcoming",
  },
];

export default function DonationCampsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>National Voluntary Camps</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Upcoming Blood Donation Camps
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Join community-organized voluntary camps across Bangladesh and help save lives together.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_CAMPS.map((camp) => (
            <div
              key={camp.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  {camp.status}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {camp.district} District
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {camp.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Organized by: {camp.organizer}
                </p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center space-x-2 text-slate-900 font-semibold">
                  <Calendar className="w-4 h-4 text-[#D71920]" />
                  <span>{camp.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{camp.time}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{camp.location}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="pt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Donors Registered</span>
                  <span className="font-bold text-slate-900">
                    {camp.registeredDonors} / {camp.targetUnits} Bags
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#D71920] h-full rounded-full"
                    style={{
                      width: `${(camp.registeredDonors / camp.targetUnits) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-2.5 bg-[#D71920] hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow-sm transition"
              >
                Register as Camp Donor
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
