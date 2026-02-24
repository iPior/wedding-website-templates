"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/guests", label: "Guests" },
  { href: "/admin/emails", label: "Emails" },
];

type Props = {
  userEmail: string;
  coupleInitials: string;
  logoutAction: () => Promise<void>;
};

export function AdminNav({ userEmail, coupleInitials, logoutAction }: Props) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[#f0e0e4] bg-[#fff8f8]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link
            href="/admin"
            className="text-base text-[#8a7f7f]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {coupleInitials}
          </Link>

          <span className="h-4 w-px bg-[#f0e0e4]" />

          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs uppercase tracking-[0.25em] transition-colors duration-200"
                style={{
                  color: pathname === link.href ? "#2c2424" : "#8a7f7f",
                }}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-px bg-[#d4a0b0]" />
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-[11px] uppercase tracking-[0.15em] text-[#8a7f7f]/60 sm:block">
            {userEmail}
          </span>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-xs uppercase tracking-[0.25em] text-[#8a7f7f] transition-colors duration-200 hover:text-[#2c2424]"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
