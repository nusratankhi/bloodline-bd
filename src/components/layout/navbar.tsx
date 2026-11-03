"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  Globe,
  User,
  UserPlus,
  Menu,
  X,
  ChevronDown,
  AlertTriangle,
  Heart,
  Droplet,
  FileCheck2,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donorDropdownOpen, setDonorDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [lang, setLang] = useState<"en" | "bn">("en");

  return (
    <header className="w-full sticky top-0 z-50 shadow-sm bg-white">
      {/* Top Hotline & Language Bar */}
      <div className="bg-[#D71920] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-red-700/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Hotline & Email */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 font-medium">
              <Phone className="w-3.5 h-3.5" />
              <span>Hotline:</span>
              <a
                href={`tel:${siteConfig.hotline}`}
                className="font-bold underline hover:text-red-100 transition-colors"
              >
                {siteConfig.hotline}
              </a>
            </div>
            <div className="hidden sm:flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:underline transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>

          {/* Language Selector & Socials */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-red-800/60 px-2.5 py-0.5 rounded-full text-[11px]">
              <Globe className="w-3 h-3 text-red-200" />
              <span>Bangladesh</span>
              <span className="text-red-300">|</span>
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "bn" : "en")}
                className="font-bangla font-semibold hover:text-yellow-200 cursor-pointer transition-colors"
              >
                {lang === "en" ? "বাংলা" : "English"}
              </button>
            </div>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-2 text-white/90">
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
                title="Facebook"
              >
                <span className="text-[11px] font-bold">f</span>
              </a>
              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
                title="YouTube"
              >
                <span className="text-[11px] font-bold">YT</span>
              </a>
              <a
                href={siteConfig.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
                title="LinkedIn"
              >
                <span className="text-[11px] font-bold">in</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative w-44 sm:w-52 h-12">
            <Image
              src="/brand/bloodline-logo.png"
              alt="BloodLine Logo"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-6 text-[14px] font-medium text-slate-700">
          <Link
            href="/"
            className="text-white bg-[#D71920] px-3 py-1.5 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Home
          </Link>

          {/* Find Donors Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDonorDropdownOpen(!donorDropdownOpen)}
              onMouseEnter={() => setDonorDropdownOpen(true)}
              className="flex items-center space-x-1 hover:text-[#D71920] transition"
            >
              <span>Find Donors</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {donorDropdownOpen && (
              <div
                onMouseLeave={() => setDonorDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50"
              >
                <Link
                  href="/donors"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-red-50 hover:text-[#D71920] text-sm"
                  onClick={() => setDonorDropdownOpen(false)}
                >
                  <Droplet className="w-4 h-4 text-[#D71920]" />
                  <span>Search Donors</span>
                </Link>
                <Link
                  href="/register?role=donor"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-red-50 hover:text-[#D71920] text-sm"
                  onClick={() => setDonorDropdownOpen(false)}
                >
                  <Heart className="w-4 h-4 text-[#D71920]" />
                  <span>Become a Donor</span>
                </Link>
                <Link
                  href="/verify"
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-red-50 hover:text-[#D71920] text-sm"
                  onClick={() => setDonorDropdownOpen(false)}
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>Verify Digital ID</span>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/emergency"
            className="flex items-center space-x-1 hover:text-[#D71920] transition"
          >
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D71920]"></span>
            </span>
            <span>Emergency Requests</span>
          </Link>

          <Link href="/camps" className="hover:text-[#D71920] transition">
            Donation Camps
          </Link>

          <Link href="/hospitals" className="hover:text-[#D71920] transition">
            Hospitals
          </Link>

          <Link href="/blood-banks" className="hover:text-[#D71920] transition">
            Blood Banks
          </Link>

          <Link href="/about" className="hover:text-[#D71920] transition">
            About Us
          </Link>

          {/* Resources Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setResourcesDropdownOpen(!resourcesDropdownOpen)}
              onMouseEnter={() => setResourcesDropdownOpen(true)}
              className="flex items-center space-x-1 hover:text-[#D71920] transition"
            >
              <span>Resources</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {resourcesDropdownOpen && (
              <div
                onMouseLeave={() => setResourcesDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50"
              >
                <Link
                  href="/resources/guide"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-[#D71920] text-sm"
                  onClick={() => setResourcesDropdownOpen(false)}
                >
                  Donation Guide
                </Link>
                <Link
                  href="/resources/eligibility"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-[#D71920] text-sm"
                  onClick={() => setResourcesDropdownOpen(false)}
                >
                  Eligibility Info
                </Link>
                <Link
                  href="/resources/faq"
                  className="block px-4 py-2 hover:bg-red-50 hover:text-[#D71920] text-sm"
                  onClick={() => setResourcesDropdownOpen(false)}
                >
                  FAQs
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" className="hover:text-[#D71920] transition">
            Contact
          </Link>
        </nav>

        {/* Action Buttons: Login / Register */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link
            href="/login"
            className="flex items-center space-x-1.5 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <User className="w-4 h-4 text-slate-500" />
            <span>Login</span>
          </Link>
          <Link
            href="/register"
            className="flex items-center space-x-1.5 px-4 py-2 bg-[#D71920] hover:bg-red-700 text-white rounded-lg text-sm font-semibold shadow-sm transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register</span>
          </Link>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <Link
              href="/login"
              className="flex items-center justify-center space-x-2 py-2.5 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Login</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center justify-center space-x-2 py-2.5 bg-[#D71920] text-white rounded-lg text-sm font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register</span>
            </Link>
          </div>

          <div className="space-y-1 text-sm font-medium text-slate-700">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md hover:bg-red-50 hover:text-[#D71920]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/donors"
              className="block px-3 py-2 rounded-md hover:bg-red-50 hover:text-[#D71920]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Donors
            </Link>
            <Link
              href="/emergency"
              className="flex items-center justify-between px-3 py-2 rounded-md bg-red-50 text-[#D71920] font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Emergency Requests</span>
              <AlertTriangle className="w-4 h-4" />
            </Link>
            <Link
              href="/camps"
              className="block px-3 py-2 rounded-md hover:bg-red-50 hover:text-[#D71920]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donation Camps
            </Link>
            <Link
              href="/hospitals"
              className="block px-3 py-2 rounded-md hover:bg-red-50 hover:text-[#D71920]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hospitals Directory
            </Link>
            <Link
              href="/blood-banks"
              className="block px-3 py-2 rounded-md hover:bg-red-50 hover:text-[#D71920]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blood Banks
            </Link>
            <Link
              href="/volunteer"
              className="block px-3 py-2 rounded-md hover:bg-red-50 hover:text-[#D71920]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Volunteer Network
            </Link>
            <Link
              href="/verify"
              className="block px-3 py-2 rounded-md hover:bg-red-50 hover:text-[#D71920]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Public ID Verification
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md hover:bg-red-50 hover:text-[#D71920]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md hover:bg-red-50 hover:text-[#D71920]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Support
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
