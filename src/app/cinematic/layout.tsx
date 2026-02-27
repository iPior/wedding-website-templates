import { Nav } from "./_nav";
import { Italiana, Outfit } from "next/font/google";
import { weddingConfig } from "@/lib/wedding-config";

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
const weddingDate = new Date(weddingConfig.date);
const formattedDate = weddingDate.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function CinematicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${italiana.variable} ${outfit.variable} min-h-screen bg-[#fff8f8] text-[#2c2424]`} style={{ fontFamily: "var(--font-body)" }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes grow {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes growPartial {
          from { width: 0; }
          to { width: 6rem; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <Nav />
      <main>{children}</main>

      <footer className="bg-[#2c2424] py-14 text-center">
        <div className="mx-auto h-[1px] w-12 bg-[#8a7f7f]/40" style={{ animation: "growPartial 0.8s ease forwards" }} />
        <p className="mt-8 text-[11px] uppercase tracking-[0.3em] text-[#8a7f7f]" style={{ fontFamily: "var(--font-display)" }}>
          {person1.firstName} &amp; {person2.firstName}
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#8a7f7f]/60">{formattedDate}</p>
      </footer>
    </div>
  );
}
