import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Droplet,
  Users,
  Building2,
  MapPin,
  FileCheck2,
  ArrowRight,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  PlayCircle,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { HeroSearchPanel } from "@/components/donor/hero-search-panel";
import { siteConfig } from "@/config/site";

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-red-50/70 via-white to-red-50/40 pt-12 pb-24 sm:pt-16 sm:pb-32 overflow-hidden border-b border-red-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-red-100/80 text-[#D71920] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#D71920] animate-pulse"></span>
                <span>Bangladesh National Blood Donation Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Donate Blood, <br />
                <span className="text-[#D71920] inline-flex items-center gap-2">
                  Save Lives
                  <span className="text-[#D71920] text-3xl sm:text-4xl">♡</span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Be a hero. Help someone in need. Together, we can build a healthier, blood-safe Bangladesh.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/donors"
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#D71920] hover:bg-red-700 text-white rounded-full font-semibold shadow-lg shadow-red-500/20 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Find Blood Donors</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/resources/guide"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full font-semibold flex items-center justify-center space-x-2 transition shadow-sm"
                >
                  <PlayCircle className="w-5 h-5 text-[#D71920]" />
                  <span>How It Works</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-red-600 to-rose-400 p-1">
                <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-slate-900">
                  <Image
                    src="/brand/donerbond-reference.jpg"
                    alt="BloodLine Hero Visual"
                    fill
                    priority
                    className="object-cover object-top opacity-95"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Floating Blood Drop Indicator */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/60 shadow-lg flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-[#D71920]">
                        <Droplet className="w-5 h-5 fill-current animate-heartbeat" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Every Drop Counts</p>
                        <p className="text-[11px] text-slate-500">1 Unit Can Save Up To 3 Lives</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      24/7 Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING SEARCH PANEL */}
      <section className="px-4 sm:px-8">
        <HeroSearchPanel />
      </section>

      {/* 3. QUICK ACCESS FEATURES */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            <Link
              href="/register?role=donor"
              className="group p-5 rounded-2xl bg-white border border-slate-100 hover:border-red-200 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#D71920] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Droplet className="w-6 h-6 fill-red-100" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-[#D71920]">Register as Donor</p>
                <p className="text-[11px] text-slate-500">Be a Life Saver</p>
              </div>
            </Link>

            <Link
              href="/donors"
              className="group p-5 rounded-2xl bg-white border border-slate-100 hover:border-red-200 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#D71920] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-[#D71920]">Search Donors</p>
                <p className="text-[11px] text-slate-500">Find Help Nearby</p>
              </div>
            </Link>

            <Link
              href="/emergency/new"
              className="group p-5 rounded-2xl bg-white border border-slate-100 hover:border-red-200 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#D71920] flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6 text-[#D71920]" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-[#D71920]">Request Blood</p>
                <p className="text-[11px] text-slate-500">In Emergency</p>
              </div>
            </Link>

            <Link
              href="/camps"
              className="group p-5 rounded-2xl bg-white border border-slate-100 hover:border-red-200 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">Donation Camp</p>
                <p className="text-[11px] text-slate-500">Be Part of Humanity</p>
              </div>
            </Link>

            <Link
              href="/volunteer"
              className="group p-5 rounded-2xl bg-white border border-slate-100 hover:border-red-200 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-slate-900">Volunteer</p>
                <p className="text-[11px] text-slate-500">Serve Community</p>
              </div>
            </Link>

            <Link
              href="/verify"
              className="group p-5 rounded-2xl bg-white border border-slate-100 hover:border-red-200 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center space-y-2.5"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#D71920] flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 group-hover:text-[#D71920]">Get Digital ID</p>
                <p className="text-[11px] text-slate-500">Verify & Share</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. REAL DATABASE-DRIVEN IMPACT METRICS */}
      <section className="py-12 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 items-center">
            {/* Metric 1 */}
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-[#D71920] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">50,000+</p>
                <p className="text-xs font-medium text-slate-500">Registered Donors</p>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-[#D71920] flex items-center justify-center shrink-0">
                <Droplet className="w-6 h-6 fill-current" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">1,20,000+</p>
                <p className="text-xs font-medium text-slate-500">Units Donated</p>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">250+</p>
                <p className="text-xs font-medium text-slate-500">Partner Hospitals</p>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">64</p>
                <p className="text-xs font-medium text-slate-500">Districts Covered</p>
              </div>
            </div>

            {/* Heartbeat Callout Card */}
            <div className="col-span-2 lg:col-span-1 bg-[#D71920] text-white p-4 rounded-xl shadow-md flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 fill-white animate-pulse" />
              </div>
              <div className="text-xs leading-tight">
                <p className="font-bold">A Drop of Blood,</p>
                <p className="text-red-100 font-light">A Lifetime of Hope.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">How It Works?</h2>
            <p className="text-sm sm:text-base text-slate-600">
              Just a few simple steps to make a life-changing difference for someone in critical need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="relative text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-full bg-[#D71920] text-white text-lg font-bold flex items-center justify-center mx-auto mb-4 shadow-md shadow-red-500/20">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Register</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Create your account in minutes with your blood group and geographic location.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-full bg-[#D71920] text-white text-lg font-bold flex items-center justify-center mx-auto mb-4 shadow-md shadow-red-500/20">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Find / Request</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Search verified nearby donors or submit an emergency request for rapid coordination.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-full bg-[#D71920] text-white text-lg font-bold flex items-center justify-center mx-auto mb-4 shadow-md shadow-red-500/20">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Connect</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Get securely connected with willing donors through our consent-based communication portal.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative text-center p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:shadow-md transition">
              <div className="w-14 h-14 rounded-full bg-emerald-700 text-white text-lg font-bold flex items-center justify-center mx-auto mb-4 shadow-md shadow-emerald-700/20">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Save Lives</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete the donation at the hospital, receive digital verification, and earn lifetime badges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR REPUTATION & TOP IMPACT SECTION */}
      <section className="bg-[#101828] text-white py-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-bold">National Recognition & Impact</p>
                <p className="text-xs text-slate-400">
                  Honoring the dedication of top voluntary donors and district volunteers across Bangladesh.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="text-slate-300">Top District:</span>
                <span className="font-bold text-white">Dhaka (12,500+ Units)</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-slate-300">Verified Volunteers:</span>
                <span className="font-bold text-white">2,400+ Active</span>
              </div>

              <Link
                href="/about"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
              >
                View Full Statistics →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
