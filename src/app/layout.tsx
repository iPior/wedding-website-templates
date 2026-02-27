import type { Metadata } from "next";
import "./globals.css";
import { VariantSwitcher } from "@/components/variant-switcher";

export const metadata: Metadata = {
  title: "Wedding Website Design Showcase",
  description:
    "Route-based showcase of watercolor, stationery, and cinematic wedding website designs.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <VariantSwitcher />
      </body>
    </html>
  );
}
