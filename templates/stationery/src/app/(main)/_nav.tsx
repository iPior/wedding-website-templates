"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { weddingConfig } from "../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;

const links = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/details", label: "Details" },
  { href: "/faq", label: "FAQ" },
  { href: "/bridal-party", label: "Party" },
  { href: "/rsvp", label: "RSVP" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative z-20 border-b border-neutral-200/60 bg-[#FDFBF7]">
      <div className="flex items-center justify-between px-8 py-8 md:px-16">
        {/* Couple names */}
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.35em] text-neutral-800 transition-colors duration-300 hover:text-neutral-500"
        >
          {person1.firstName} & {person2.firstName}
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.25em] text-neutral-500 transition-colors duration-300 hover:text-neutral-800 ${
                l.label === "RSVP" ? "border-b border-neutral-700 pb-0.5" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-neutral-700 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-neutral-200/60 bg-[#FDFBF7]/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col items-center gap-6 py-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.25em] text-neutral-500 transition-colors duration-300 hover:text-neutral-800 ${
                  l.label === "RSVP" ? "border-b border-neutral-700 pb-0.5" : ""
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
