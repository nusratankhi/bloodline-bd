import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck, Heart, Droplets } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#101828] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="bg-white/95 p-3 rounded-lg inline-block shadow-sm">
              <div className="relative w-44 h-11">
                <Image
                  src="/brand/bloodline-logo.png"
                  alt="BloodLine Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              BloodLine is Bangladesh’s unified national digital blood donation network,
              bridging willing donors with patients in urgent need across all 64 districts.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Digital Identity & Secure Matching</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/donors" className="hover:text-red-400 transition">
                  Find Blood Donors
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="hover:text-red-400 transition">
                  Emergency Blood Requests
                </Link>
              </li>
              <li>
                <Link href="/camps" className="hover:text-red-400 transition">
                  Upcoming Donation Camps
                </Link>
              </li>
              <li>
                <Link href="/hospitals" className="hover:text-red-400 transition">
                  Partner Hospitals
                </Link>
              </li>
              <li>
                <Link href="/blood-banks" className="hover:text-red-400 transition">
                  Blood Bank Directory
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-red-400 transition">
                  Join as Volunteer
                </Link>
              </li>
              <li>
                <Link href="/verify" className="hover:text-red-400 transition">
                  Verify Digital ID Card
                </Link>
              </li>
            </ul>
          </div>

          {/* Donor Resources */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Donor Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/resources/guide" className="hover:text-red-400 transition">
                  Blood Donation Guide
                </Link>
              </li>
              <li>
                <Link href="/resources/eligibility" className="hover:text-red-400 transition">
                  Eligibility Criteria
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" className="hover:text-red-400 transition">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-400 transition">
                  About the Platform
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-red-400 transition">
                  Privacy & Data Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-red-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency & Helpline */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              Emergency Coordination
            </h4>
            <div className="bg-red-950/60 border border-red-800/60 p-4 rounded-xl space-y-2">
              <div className="flex items-center space-x-2 text-red-400 font-semibold text-xs">
                <Droplets className="w-4 h-4 text-red-400" />
                <span>24/7 National Blood Hotline</span>
              </div>
              <a
                href={`tel:${siteConfig.hotline}`}
                className="text-2xl font-bold text-white tracking-wide block hover:text-red-300 transition"
              >
                {siteConfig.hotline}
              </a>
              <p className="text-[11px] text-slate-400">
                Toll-free emergency blood discovery assistance across Bangladesh.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                <span>National Blood Coordination Desk, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medical & Legal Disclaimer */}
        <div className="mt-8 p-4 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-300 mb-1">
            Important Medical & Regulatory Notice:
          </p>
          <p>{siteConfig.disclaimer}</p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {currentYear} {siteConfig.name} ({siteConfig.positioning}). All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/verify" className="hover:text-slate-300">
              Digital ID Verification
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
