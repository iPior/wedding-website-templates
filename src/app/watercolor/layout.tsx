import { Playfair_Display, Lato } from "next/font/google";
import { Nav } from "./_nav";
import { PageTransition } from "./_page-transition";
import { weddingConfig } from "@/lib/wedding-config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const { person1, person2 } = weddingConfig.couple;

export default function WatercolorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${playfair.variable} ${lato.variable} min-h-screen bg-[#fff8f8] text-[#2c2424]`}
      style={{ fontFamily: "var(--font-lato), sans-serif" }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes grow {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }
      `}</style>
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute h-[60vh] w-[60vw] rounded-full blur-[100px]"
          style={{
            top: "-10%",
            right: "-10%",
            background: "radial-gradient(ellipse at center, rgba(255,218,233,0.4), rgba(247,224,232,0.2), transparent)",
          }}
        />
        <div
          className="absolute h-[50vh] w-[50vw] rounded-full blur-[100px]"
          style={{
            bottom: "-10%",
            left: "-10%",
            background: "radial-gradient(ellipse at center, rgba(210,217,139,0.2), rgba(255,255,227,0.3), transparent)",
          }}
        />
        <div
          className="absolute h-[30vh] w-[30vw] rounded-full blur-[100px]"
          style={{
            top: "40%",
            left: "10%",
            background: "radial-gradient(ellipse at center, rgba(247,224,232,0.15), rgba(255,255,227,0.2))",
          }}
        />
      </div>

      <div className="relative z-10">
        <Nav />
        <PageTransition>{children}</PageTransition>

        <footer className="mt-24 bg-[#2c2424]">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-10 md:px-12">
            <span className="text-lg text-[#8a7f7f]" style={{ fontFamily: "var(--font-playfair), serif" }}>
              {person1.firstName.charAt(0)}&nbsp;&amp;&amp;&nbsp;
              {person2.firstName.charAt(0)}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
