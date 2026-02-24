"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { weddingConfig } from "../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Details", href: "/details" },
  { label: "FAQ", href: "/faq" },
  { label: "Party", href: "/bridal-party" },
  { label: "RSVP", href: "/rsvp" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-20 border-b border-[#f0e0e4] bg-[#fff8f8]">
      <div className="flex items-center justify-between px-8 py-8 md:px-16">
        {/* Couple names */}
        <Link
          href="/"
          className="text-sm uppercase tracking-[0.4em] text-[#2c2424] transition-colors duration-300 hover:text-[#8a7f7f]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {person1.firstName} & {person2.firstName}
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-12 md:flex">
          {NAV_ITEMS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 hover:text-[#2c2424] ${
                l.label === "RSVP"
                  ? "border-b border-[#2c2424] pb-0.5 text-[#2c2424]"
                  : "text-[#8a7f7f]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-[#8a7f7f] md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-[#f0e0e4] bg-[#fff8f8]/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center gap-6 py-8">
            {NAV_ITEMS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 hover:text-[#2c2424] ${
                  l.label === "RSVP"
                    ? "border-b border-[#2c2424] pb-0.5 text-[#2c2424]"
                    : "text-[#8a7f7f]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
