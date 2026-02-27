"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { weddingConfig } from "@/lib/wedding-config";

const { person1, person2 } = weddingConfig.couple;

const links = [
  { href: "/stationery", label: "Home" },
  { href: "/stationery/our-story", label: "Our Story" },
  { href: "/stationery/details", label: "Details" },
  { href: "/stationery/faq", label: "FAQ" },
  { href: "/stationery/bridal-party", label: "Party" },
  { href: "/stationery/rsvp", label: "RSVP" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-20 border-b border-neutral-200/60 bg-[#FDFBF7]">
      <div className="flex items-center justify-between px-8 py-8 md:px-16">
        <Link
          href="/stationery"
          className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.35em] text-neutral-800 transition-colors duration-300 hover:text-neutral-500"
        >
          {person1.firstName} &amp; {person2.firstName}
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.25em] text-neutral-500 transition-colors duration-300 hover:text-neutral-800 ${
                link.label === "RSVP" ? "border-b border-neutral-700 pb-0.5" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="text-neutral-700 md:hidden" aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-neutral-200/60 bg-[#FDFBF7]/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center gap-6 py-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.25em] text-neutral-500 transition-colors duration-300 hover:text-neutral-800 ${
                  link.label === "RSVP" ? "border-b border-neutral-700 pb-0.5" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
