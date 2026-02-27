"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VARIANTS = ["watercolor", "stationery", "cinematic"] as const;

const VALID_SUFFIXES = new Set([
  "",
  "our-story",
  "details",
  "faq",
  "bridal-party",
  "rsvp",
  "admin",
  "admin/guests",
  "admin/emails",
]);

type Variant = (typeof VARIANTS)[number];

function extractPathInfo(pathname: string): { currentVariant: Variant | null; suffix: string } {
  const first = pathname.split("/")[1];
  if (!VARIANTS.includes(first as Variant)) {
    return { currentVariant: null, suffix: "" };
  }

  const suffix = pathname.replace(`/${first}`, "").replace(/^\//, "");
  return { currentVariant: first as Variant, suffix };
}

function buildTargetPath(targetVariant: Variant, suffix: string) {
  if (!suffix || !VALID_SUFFIXES.has(suffix)) {
    return `/${targetVariant}`;
  }
  return `/${targetVariant}/${suffix}`;
}

export function VariantSwitcher() {
  const pathname = usePathname();
  const { currentVariant, suffix } = extractPathInfo(pathname);

  return (
    <div className="fixed bottom-4 right-4 z-[120] rounded-sm border border-[#d9cec3] bg-white/90 p-3 shadow-sm backdrop-blur">
      <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#7d6d61]">Switch Design</p>
      <div className="flex gap-2">
        {VARIANTS.map((variant) => {
          const active = variant === currentVariant;
          return (
            <Link
              key={variant}
              href={buildTargetPath(variant, suffix)}
              className={`px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] transition-colors ${
                active
                  ? "bg-[#2c2424] text-white"
                  : "border border-[#e7ddd3] text-[#6f5f53] hover:border-[#2c2424] hover:text-[#2c2424]"
              }`}
            >
              {variant}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
