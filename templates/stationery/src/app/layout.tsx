import type { Metadata } from "next";
import { Cormorant, Lora } from "next/font/google";
import { weddingConfig } from "../../wedding.config";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-display",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${cormorant.variable} ${lora.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
