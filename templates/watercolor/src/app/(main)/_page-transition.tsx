"use client";

import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      style={{ animation: "fadeIn 0.6s ease forwards", opacity: 0 }}
    >
      {children}
    </div>
  );
}
