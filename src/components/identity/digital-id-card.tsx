"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  ShieldCheck,
  Droplet,
  Printer,
  Download,
  Share2,
  Check,
  Copy,
  RotateCw,
  ExternalLink,
  Heart,
  Phone,
  AlertCircle,
} from "lucide-react";
import { type DigitalIdentityCard } from "@/types";
import { ROLE_CARD_CONFIGS } from "@/lib/security/id-card-generator";
import { siteConfig } from "@/config/site";

interface DigitalIdCardProps {
  card: DigitalIdentityCard;
  allowFlip?: boolean;
}

export function DigitalIdCardView({ card, allowFlip = true }: DigitalIdCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const roleConfig =
    ROLE_CARD_CONFIGS[card.role] || ROLE_CARD_CONFIGS.registered_member;

  // Generate QR Code on mount
  useEffect(() => {
    QRCode.toDataURL(card.verificationUrl, {
      width: 256,
      margin: 1,
      color: {
        dark: "#101828",
        light: "#FFFFFF",
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error("QR Code generation error:", err));
  }, [card.verificationUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(card.verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `BloodLine Digital ID — ${card.userName}`,
          text: `Verify my official BloodLine ${card.roleTitle} ID card on the Bangladesh National Blood Network.`,
          url: card.verificationUrl,
        });
      } catch (err) {
        console.log("Share cancelled or not supported:", err);
      }
    } else {
      setShareModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* CARD CONTAINER (Standard Credit/ID Card Ratio ~ 85.6mm x 53.98mm) */}
      <div
        ref={cardRef}
        id="printable-id-card"
        className="w-full max-w-[420px] aspect-[1.586/1] rounded-2xl relative shadow-2xl p-6 text-white overflow-hidden transition-transform duration-500 border border-slate-700/50"
        style={{
          background: `linear-gradient(135deg, ${roleConfig.themeColor} 0%, #101828 75%)`,
        }}
      >
        {/* Subtle Watermark & Geometry */}
        <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none"></div>
        <div className="absolute right-20 top-4 opacity-10 pointer-events-none">
          <Droplet className="w-36 h-36" />
        </div>

        {!isFlipped ? (
          /* FRONT SIDE */
          <div className="h-full flex flex-col justify-between relative z-10">
            {/* Top Bar: Logo & Role Badge */}
            <div className="flex items-start justify-between">
              <div className="bg-white/95 px-3 py-1.5 rounded-lg shadow-sm">
                <div className="relative w-28 h-7">
                  <Image
                    src="/brand/bloodline-logo.png"
                    alt="BloodLine"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm ${roleConfig.badgeBg}`}
                >
                  {roleConfig.title}
                </span>
                <span className="text-[9px] text-slate-300 font-mono mt-0.5">
                  STATUS:{" "}
                  <strong className="text-emerald-400">
                    {card.status.toUpperCase()}
                  </strong>
                </span>
              </div>
            </div>

            {/* Middle: Profile Image, Name, Card Number & Blood Group */}
            <div className="flex items-center space-x-4 my-auto pt-2">
              {/* Photo */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-white/80 shadow-md bg-slate-800 shrink-0">
                {card.userAvatar ? (
                  <Image
                    src={card.userAvatar}
                    alt={card.userName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-300 text-xl font-bold">
                    {card.userName.charAt(0)}
                  </div>
                )}
              </div>

              {/* Bio & Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-white truncate leading-tight">
                  {card.userName}
                </h3>
                <p className="text-xs font-mono font-semibold tracking-wider text-red-200 mt-0.5">
                  ID: {card.cardNumber}
                </p>

                {/* Donor Specific Details */}
                {card.bloodGroup && (
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="inline-flex items-center space-x-1 bg-red-600/90 text-white text-xs font-black px-2 py-0.5 rounded">
                      <Droplet className="w-3 h-3 fill-current" />
                      <span>{card.bloodGroup}</span>
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium">
                      {card.verifiedDonationCount ?? 0} Donations
                    </span>
                  </div>
                )}

                {card.assignedLocation && (
                  <p className="text-[10px] text-slate-300 mt-1 truncate">
                    Area: {card.assignedLocation}
                  </p>
                )}
              </div>

              {/* QR Code */}
              <div className="shrink-0 bg-white p-1 rounded-lg shadow-md">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Digital ID QR Code"
                    className="w-14 h-14 sm:w-16 sm:h-16"
                  />
                ) : (
                  <div className="w-14 h-14 bg-slate-200 animate-pulse rounded"></div>
                )}
              </div>
            </div>

            {/* Bottom Bar: Issue Date & Verification Notice */}
            <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[9px] text-slate-300">
              <div>
                <span>ISSUED: {card.issueDate}</span>
                {card.expiryDate && <span> • EXP: {card.expiryDate}</span>}
              </div>
              <span className="font-semibold text-white/90 tracking-wide">
                SCAN TO VERIFY
              </span>
            </div>
          </div>
        ) : (
          /* BACK SIDE */
          <div className="h-full flex flex-col justify-between relative z-10 text-[10px] text-slate-300">
            <div className="flex items-center justify-between border-b border-white/20 pb-2">
              <span className="font-bold text-white text-xs tracking-wide">
                EMERGENCY BLOOD DONATION NETWORK
              </span>
              <span className="text-[9px] font-mono text-amber-300">
                HOTLINE: {siteConfig.hotline}
              </span>
            </div>

            <div className="space-y-1.5 my-auto py-2">
              <p className="leading-tight">
                <strong>Emergency Notice:</strong> This card identifies an approved
                participant on the BloodLine Bangladesh National Blood Network.
              </p>
              <p className="leading-tight text-slate-400">
                To confirm active validity and verify identity, scan the QR code on the
                front or visit:
              </p>
              <p className="font-mono text-red-200 text-[9px] break-all">
                {card.verificationUrl}
              </p>
            </div>

            <div className="pt-2 border-t border-white/20 text-[8px] text-slate-400 leading-snug">
              <p className="font-semibold text-slate-300">Official Disclaimer:</p>
              <p>{siteConfig.idCardDisclaimer}</p>
            </div>
          </div>
        )}
      </div>

      {/* CARD ACTION BUTTONS */}
      <div className="w-full max-w-[420px] flex flex-wrap items-center justify-between gap-2 text-xs">
        {allowFlip && (
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlipped ? "View Front" : "View Back"}</span>
          </button>
        )}

        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Card</span>
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
          <span>{copied ? "Link Copied!" : "Copy Link"}</span>
        </button>

        <button
          type="button"
          onClick={handleNativeShare}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#D71920] hover:bg-red-700 text-white font-semibold rounded-lg shadow-sm transition"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share ID</span>
        </button>
      </div>

      {/* SOCIAL SHARING MODAL */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-slate-900">Share Digital ID</h4>
              <button
                type="button"
                onClick={() => setShareModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Share your verified <strong>{card.roleTitle}</strong> ID badge with friends
              and family to encourage blood donation in Bangladesh.
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check my verified BloodLine ${card.roleTitle} ID: ${card.verificationUrl}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 p-2.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition"
              >
                <span>WhatsApp</span>
              </a>

              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  card.verificationUrl
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 p-2.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition"
              >
                <span>Facebook</span>
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  card.verificationUrl
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 p-2.5 bg-sky-50 text-sky-700 rounded-lg hover:bg-sky-100 transition"
              >
                <span>LinkedIn</span>
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  card.verificationUrl
                )}&text=${encodeURIComponent(
                  `Proud to be an official ${card.roleTitle} on BloodLine Bangladesh!`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 p-2.5 bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition"
              >
                <span>Twitter / X</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                handleCopyLink();
                setShareModalOpen(false);
              }}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition"
            >
              {copied ? "Link Copied!" : "Copy Verification URL"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
