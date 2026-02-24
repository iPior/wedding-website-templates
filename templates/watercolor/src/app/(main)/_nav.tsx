"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { weddingConfig } from "../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;

const links = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/details", label: "Details" },
  { href: "/faq", label: "FAQ" },
  { href: "/bridal-party", label: "Party" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className="relative z-50">
        <div className="flex items-center justify-between px-6 md:px-16 py-10">
          {/* Couple names */}
          <Link
            href="/"
            className="text-sm tracking-[0.5em] uppercase text-[#2c2424]"
            style={{ fontVariant: "small-caps" }}
            onClick={() => setOpen(false)}
          >
            <span
              className="md:hidden text-lg text-[#8a7f7f]"
              style={{ fontFamily: "var(--font-playfair), serif", fontVariant: "normal" }}
            >
              {person1.firstName[0]}&amp;{person2.firstName[0]}
            </span>
            <span className="hidden md:inline">
              {person1.firstName} & {person2.firstName}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-12">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-xs tracking-[0.3em] uppercase transition-colors duration-300 hover:text-[#2c2424] ${
                  isActive(l.href) ? "text-[#2c2424]" : "text-[#8a7f7f]"
                }`}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute -bottom-1 left-0 right-[0.3em] h-px bg-[#d4a0b0]" />
                )}
              </Link>
            ))}
            <Link
              href="/rsvp"
              className="text-xs tracking-[0.3em] uppercase text-[#fff8f8] bg-[#2c2424] px-5 py-2.5 transition-colors duration-300 hover:bg-[#d4a0b0]"
            >
              RSVP
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-[#2c2424] z-50 relative"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-[#fff8f8] transition-transform duration-500 ease-in-out md:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-10">
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`relative text-2xl tracking-[0.3em] uppercase transition-colors duration-300 hover:text-[#2c2424] ${
                isActive(l.href) ? "text-[#2c2424]" : "text-[#8a7f7f]"
              }`}
              style={{
                transitionDelay: open ? `${i * 60 + 150}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(-16px)",
                opacity: open ? 1 : 0,
                transition: open
                  ? `transform 0.45s ease ${i * 60 + 150}ms, opacity 0.45s ease ${i * 60 + 150}ms, color 0.3s`
                  : "transform 0s, opacity 0s",
              }}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="block mt-1 mr-[0.3em] h-[1.5px] bg-[#d4a0b0]" />
              )}
            </Link>
          ))}
          <Link
            href="/rsvp"
            onClick={() => setOpen(false)}
            className="mt-4 text-sm tracking-[0.3em] uppercase text-[#fff8f8] bg-[#2c2424] px-12 py-4 transition-colors duration-300 hover:bg-[#d4a0b0]"
            style={{
              transitionDelay: open ? `${links.length * 60 + 150}ms` : "0ms",
              transform: open ? "translateY(0)" : "translateY(-16px)",
              opacity: open ? 1 : 0,
              transition: open
                ? `transform 0.45s ease ${links.length * 60 + 150}ms, opacity 0.45s ease ${links.length * 60 + 150}ms, color 0.3s`
                : "transform 0s, opacity 0s",
            }}
          >
            RSVP
          </Link>
        </nav>
      </div>

      {open && (
        <style>{`body { overflow: hidden; }`}</style>
      )}
    </>
  );
}
