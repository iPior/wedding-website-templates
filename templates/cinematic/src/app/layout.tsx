import type { Metadata } from "next";
import { Italiana, Outfit } from "next/font/google";
import { weddingConfig } from "../../wedding.config";
import "./globals.css";

const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const { person1, person2 } = weddingConfig.couple;

export const metadata: Metadata = {
  title: `${person1.firstName} & ${person2.firstName} — Wedding`,
  description: `Wedding website for ${person1.firstName} ${person1.lastName} & ${person2.firstName} ${person2.lastName}`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${italiana.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
