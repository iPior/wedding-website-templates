import { Playfair_Display, Lato } from "next/font/google";
import { Nav } from "./_nav";
import { PageTransition } from "./_page-transition";
import { weddingConfig } from "../../../wedding.config";

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

export const metadata = {
  title: `${person1.firstName} & ${person2.firstName} — Wedding`,
};

export default function MainLayout({
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
      {/* Watercolor wash fixed background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top-right blob */}
        <div
          className="absolute w-[60vw] h-[60vh] rounded-full blur-[100px]"
          style={{
            top: "-10%",
            right: "-10%",
            background:
              "radial-gradient(ellipse at center, rgba(255,218,233,0.4), rgba(247,224,232,0.2), transparent)",
          }}
        />
        {/* Bottom-left blob */}
        <div
          className="absolute w-[50vw] h-[50vh] rounded-full blur-[100px]"
          style={{
            bottom: "-10%",
            left: "-10%",
            background:
              "radial-gradient(ellipse at center, rgba(210,217,139,0.2), rgba(255,255,227,0.3), transparent)",
          }}
        />
        {/* Center-left blob */}
        <div
          className="absolute w-[30vw] h-[30vh] rounded-full blur-[100px]"
          style={{
            top: "40%",
            left: "10%",
            background:
              "radial-gradient(ellipse at center, rgba(247,224,232,0.15), rgba(255,255,227,0.2))",
          }}
        />
      </div>

      {/* Page content above watercolor layer */}
      <div className="relative z-10">
        <Nav />
        <PageTransition>{children}</PageTransition>

        {/* Footer */}
        <footer className="bg-[#2c2424] mt-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex items-center justify-center">
            <span
              className="text-lg text-[#8a7f7f]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {person1.firstName.charAt(0)}&nbsp;&&nbsp;
              {person2.firstName.charAt(0)}
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
