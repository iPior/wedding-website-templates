"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { weddingConfig } from "@/lib/wedding-config";

const { person1, person2 } = weddingConfig.couple;

const links = [
  { href: "/watercolor", label: "Home" },
  { href: "/watercolor/our-story", label: "Our Story" },
  { href: "/watercolor/details", label: "Details" },
  { href: "/watercolor/faq", label: "FAQ" },
  { href: "/watercolor/bridal-party", label: "Party" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/watercolor" ? pathname === href : pathname.startsWith(href));

  return (
    <>
      <nav className="relative z-50">
        <div className="flex items-center justify-between px-6 py-10 md:px-16">
          <Link
            href="/watercolor"
            className="text-sm uppercase tracking-[0.5em] text-[#2c2424]"
            style={{ fontVariant: "small-caps" }}
            onClick={() => setOpen(false)}
          >
            <span className="text-lg text-[#8a7f7f] md:hidden" style={{ fontFamily: "var(--font-playfair), serif", fontVariant: "normal" }}>
              {person1.firstName[0]}&amp;{person2.firstName[0]}
            </span>
            <span className="hidden md:inline">
              {person1.firstName} &amp; {person2.firstName}
            </span>
          </Link>

          <div className="hidden items-center gap-12 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs uppercase tracking-[0.3em] transition-colors duration-300 hover:text-[#2c2424] ${
                  isActive(link.href) ? "text-[#2c2424]" : "text-[#8a7f7f]"
                }`}
              >
                {link.label}
                {isActive(link.href) && <span className="absolute -bottom-1 left-0 right-[0.3em] h-px bg-[#d4a0b0]" />}
              </Link>
            ))}
            <Link
              href="/watercolor/rsvp"
              className="bg-[#2c2424] px-5 py-2.5 text-xs uppercase tracking-[0.3em] text-[#fff8f8] transition-colors duration-300 hover:bg-[#d4a0b0]"
            >
              RSVP
            </Link>
          </div>

          <button onClick={() => setOpen((value) => !value)} className="relative z-50 text-[#2c2424] md:hidden" aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col bg-[#fff8f8] transition-transform duration-500 ease-in-out md:hidden ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="flex flex-1 flex-col items-center justify-center gap-10">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`relative text-2xl uppercase tracking-[0.3em] transition-colors duration-300 hover:text-[#2c2424] ${
                isActive(link.href) ? "text-[#2c2424]" : "text-[#8a7f7f]"
              }`}
              style={{
                transitionDelay: open ? `${index * 60 + 150}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(-16px)",
                opacity: open ? 1 : 0,
                transition: open
                  ? `transform 0.45s ease ${index * 60 + 150}ms, opacity 0.45s ease ${index * 60 + 150}ms, color 0.3s`
                  : "transform 0s, opacity 0s",
              }}
            >
              {link.label}
              {isActive(link.href) && <span className="mt-1 mr-[0.3em] block h-[1.5px] bg-[#d4a0b0]" />}
            </Link>
          ))}
          <Link
            href="/watercolor/rsvp"
            onClick={() => setOpen(false)}
            className="mt-4 bg-[#2c2424] px-12 py-4 text-sm uppercase tracking-[0.3em] text-[#fff8f8] transition-colors duration-300 hover:bg-[#d4a0b0]"
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

      {open && <style>{`body { overflow: hidden; }`}</style>}
    </>
  );
}
