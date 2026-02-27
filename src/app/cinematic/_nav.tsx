"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { weddingConfig } from "@/lib/wedding-config";

const { person1, person2 } = weddingConfig.couple;

const navItems = [
  { label: "Home", href: "/cinematic" },
  { label: "Our Story", href: "/cinematic/our-story" },
  { label: "Details", href: "/cinematic/details" },
  { label: "FAQ", href: "/cinematic/faq" },
  { label: "Party", href: "/cinematic/bridal-party" },
  { label: "RSVP", href: "/cinematic/rsvp" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-20 border-b border-[#f0e0e4] bg-[#fff8f8]">
      <div className="flex items-center justify-between px-8 py-8 md:px-16">
        <Link
          href="/cinematic"
          className="text-sm uppercase tracking-[0.4em] text-[#2c2424] transition-colors duration-300 hover:text-[#8a7f7f]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {person1.firstName} &amp; {person2.firstName}
        </Link>

        <div className="hidden items-center gap-12 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 hover:text-[#2c2424] ${
                item.label === "RSVP" ? "border-b border-[#2c2424] pb-0.5 text-[#2c2424]" : "text-[#8a7f7f]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="text-[#8a7f7f] md:hidden" aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-[#f0e0e4] bg-[#fff8f8]/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center gap-6 py-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-[11px] uppercase tracking-[0.3em] transition-colors duration-300 hover:text-[#2c2424] ${
                  item.label === "RSVP" ? "border-b border-[#2c2424] pb-0.5 text-[#2c2424]" : "text-[#8a7f7f]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
