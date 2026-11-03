import React from "react";
import Link from "next/link";
import {
  Building2,
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Droplet,
  ExternalLink,
} from "lucide-react";

interface HospitalItem {
  id: string;
  name: string;
  nameBn: string;
  type: string;
  district: string;
  address: string;
  phone: string;
  emergencyHotline: string;
  hasBloodBank: boolean;
  isVerified: boolean;
}

const SAMPLE_HOSPITALS: HospitalItem[] = [
  {
    id: "hosp-01",
    name: "Dhaka Medical College & Hospital (DMCH)",
    nameBn: "ঢাকা মেডিকেল কলেজ ও হাসপাতাল",
    type: "Government Tertiary Care",
    district: "Dhaka",
    address: "Secretariat Road, Ramna, Dhaka-1000",
    phone: "02-55165088",
    emergencyHotline: "01711-000000",
    hasBloodBank: true,
    isVerified: true,
  },
  {
    id: "hosp-02",
    name: "National Institute of Cardiovascular Diseases (NICVD)",
    nameBn: "জাতীয় হৃদরোগ ইনস্টিটিউট ও হাসপাতাল",
    type: "Specialized Cardiac Hospital",
    district: "Dhaka",
    address: "Sher-e-Bangla Nagar, Dhaka-1207",
    phone: "02-9122560",
    emergencyHotline: "01819-000000",
    hasBloodBank: true,
    isVerified: true,
  },
  {
    id: "hosp-03",
    name: "Chattogram Medical College Hospital (CMCH)",
    nameBn: "চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল",
    type: "Government Tertiary Care",
    district: "Chattogram",
    address: "57 K.B. Fazlul Kader Road, Chattogram",
    phone: "031-619400",
    emergencyHotline: "01730-000000",
    hasBloodBank: true,
    isVerified: true,
  },
  {
    id: "hosp-04",
    name: "Rajshahi Medical College Hospital (RMCH)",
    nameBn: "রাজশাহী মেডিকেল কলেজ হাসপাতাল",
    type: "Government Tertiary Care",
    district: "Rajshahi",
    address: "Medical College Road, Rajshahi-6000",
    phone: "0721-772150",
    emergencyHotline: "01712-000000",
    hasBloodBank: true,
    isVerified: true,
  },
  {
    id: "hosp-05",
    name: "Sylhet MAG Osmani Medical College Hospital",
    nameBn: "সিলেট এম.এ.জি. ওসমানী মেডিকেল কলেজ হাসপাতাল",
    type: "Government Tertiary Care",
    district: "Sylhet",
    address: "Medical Road, Kajolshah, Sylhet-3100",
    phone: "0821-713487",
    emergencyHotline: "01713-000000",
    hasBloodBank: true,
    isVerified: true,
  },
];

export default function HospitalsDirectoryPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>National Healthcare Facilities</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Hospital Directory & Transfusion Centers
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Verified government, specialized, and partner hospitals across Bangladesh equipped
            with licensed blood transfusion units.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_HOSPITALS.map((hosp) => (
            <div
              key={hosp.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    {hosp.type}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-2">
                    {hosp.name}
                  </h3>
                  <p className="text-xs font-bangla text-slate-500 font-medium">
                    {hosp.nameBn}
                  </p>
                </div>
                {hosp.isVerified && (
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </div>

              <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{hosp.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>General: {hosp.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-[#D71920] font-bold">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>Emergency Blood Desk: {hosp.emergencyHotline}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Blood Bank On-Site</span>
                </span>
                <span className="font-mono text-slate-500">{hosp.district}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
