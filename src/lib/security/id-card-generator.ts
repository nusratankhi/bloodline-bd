import crypto from "crypto";
import { type RoleName } from "@/types";

export interface RoleCardConfig {
  role: RoleName;
  prefix: string;
  title: string;
  themeColor: string;
  gradient: string;
  badgeBg: string;
}

export const ROLE_CARD_CONFIGS: Record<RoleName, RoleCardConfig> = {
  super_admin: {
    role: "super_admin",
    prefix: "BL-SA",
    title: "Super Administrator",
    themeColor: "#991B1B",
    gradient: "from-red-950 via-red-900 to-slate-900",
    badgeBg: "bg-red-800 text-red-100",
  },
  district_admin: {
    role: "district_admin",
    prefix: "BL-DA",
    title: "District Administrator",
    themeColor: "#B91C1C",
    gradient: "from-red-900 via-rose-950 to-slate-900",
    badgeBg: "bg-red-700 text-white",
  },
  moderator: {
    role: "moderator",
    prefix: "BL-MD",
    title: "Platform Moderator",
    themeColor: "#7C3AED",
    gradient: "from-purple-950 via-slate-900 to-slate-950",
    badgeBg: "bg-purple-700 text-white",
  },
  verification_officer: {
    role: "verification_officer",
    prefix: "BL-VO",
    title: "Verification Officer",
    themeColor: "#0D9488",
    gradient: "from-teal-950 via-slate-900 to-slate-950",
    badgeBg: "bg-teal-700 text-white",
  },
  hospital_admin: {
    role: "hospital_admin",
    prefix: "BL-HA",
    title: "Hospital Administrator",
    themeColor: "#0284C7",
    gradient: "from-sky-950 via-slate-900 to-blue-950",
    badgeBg: "bg-sky-700 text-white",
  },
  hospital_staff: {
    role: "hospital_staff",
    prefix: "BL-HS",
    title: "Hospital Clinical Staff",
    themeColor: "#0369A1",
    gradient: "from-sky-900 via-slate-900 to-slate-950",
    badgeBg: "bg-sky-600 text-white",
  },
  blood_bank_admin: {
    role: "blood_bank_admin",
    prefix: "BL-BA",
    title: "Blood Bank Administrator",
    themeColor: "#4F46E5",
    gradient: "from-indigo-950 via-slate-900 to-indigo-900",
    badgeBg: "bg-indigo-700 text-white",
  },
  blood_bank_staff: {
    role: "blood_bank_staff",
    prefix: "BL-BS",
    title: "Blood Bank Staff",
    themeColor: "#4338CA",
    gradient: "from-indigo-900 via-slate-900 to-slate-950",
    badgeBg: "bg-indigo-600 text-white",
  },
  district_coordinator: {
    role: "district_coordinator",
    prefix: "BL-DC",
    title: "District Coordinator",
    themeColor: "#006A4E",
    gradient: "from-emerald-950 via-green-900 to-slate-900",
    badgeBg: "bg-emerald-800 text-emerald-100",
  },
  upazila_coordinator: {
    role: "upazila_coordinator",
    prefix: "BL-UC",
    title: "Upazila Coordinator",
    themeColor: "#047857",
    gradient: "from-emerald-900 via-teal-950 to-slate-900",
    badgeBg: "bg-emerald-700 text-white",
  },
  union_coordinator: {
    role: "union_coordinator",
    prefix: "BL-NC",
    title: "Union Coordinator",
    themeColor: "#059669",
    gradient: "from-emerald-900 via-slate-900 to-slate-950",
    badgeBg: "bg-emerald-600 text-white",
  },
  volunteer: {
    role: "volunteer",
    prefix: "BL-VL",
    title: "National Volunteer",
    themeColor: "#006A4E",
    gradient: "from-[#006A4E] via-slate-900 to-[#101828]",
    badgeBg: "bg-[#006A4E] text-white",
  },
  blood_donor: {
    role: "blood_donor",
    prefix: "BL-DR",
    title: "National Blood Donor",
    themeColor: "#D71920",
    gradient: "from-[#D71920] via-red-950 to-[#101828]",
    badgeBg: "bg-[#D71920] text-white",
  },
  blood_seeker: {
    role: "blood_seeker",
    prefix: "BL-SK",
    title: "Blood Seeker",
    themeColor: "#E11D48",
    gradient: "from-rose-900 via-slate-900 to-slate-950",
    badgeBg: "bg-rose-700 text-white",
  },
  registered_member: {
    role: "registered_member",
    prefix: "BL-MB",
    title: "Registered Member",
    themeColor: "#334155",
    gradient: "from-slate-800 via-slate-900 to-[#101828]",
    badgeBg: "bg-slate-700 text-white",
  },
  public_visitor: {
    role: "public_visitor",
    prefix: "BL-PV",
    title: "Public Visitor",
    themeColor: "#64748B",
    gradient: "from-slate-700 to-slate-900",
    badgeBg: "bg-slate-600 text-white",
  },
};

/**
 * Generates a unique, compliant BloodLine ID number.
 * Format: BL-[PREFIX]-[YEAR]-[SERIAL]
 * Example: BL-DR-2026-000102
 */
export function generateCardNumber(role: RoleName, serialNumber: number): string {
  const config = ROLE_CARD_CONFIGS[role] || ROLE_CARD_CONFIGS.registered_member;
  const year = new Date().getFullYear();
  const formattedSerial = String(serialNumber).padStart(6, "0");
  return `${config.prefix}-${year}-${formattedSerial}`;
}

/**
 * Generates a cryptographically secure 32-byte public verification token.
 */
export function generateVerificationToken(): { token: string; tokenHash: string } {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashVerificationToken(token);
  return { token, tokenHash };
}

/**
 * Computes SHA-256 hash of a verification token for secure database lookup.
 */
export function hashVerificationToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
