import { Nav } from "./_nav";
import { weddingConfig } from "../../../wedding.config";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { person1, person2 } = weddingConfig.couple;
  const date = new Date(weddingConfig.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-800">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scaleX(0.3); }
          to { opacity: 1; transform: scaleX(1); }
        }
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
      `}</style>

      <Nav />

      <main className="mx-auto max-w-2xl px-6 py-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/60 bg-[#FAF8F3]">
        <div className="mx-auto max-w-2xl px-6 py-14 text-center">
          {/* Ornamental flourish */}
          <div
            className="flex items-center justify-center gap-3"
            style={{
              animation: "scaleIn 1.2s ease-out forwards",
              opacity: 0,
            }}
          >
            <div className="h-px w-12 bg-neutral-300/60" />
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="text-neutral-300"
            >
              <path
                d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z"
                fill="currentColor"
              />
            </svg>
            <div className="h-px w-12 bg-neutral-300/60" />
          </div>

          <p
            className="mt-6 font-[family-name:var(--font-display)] text-xl font-light tracking-wide text-neutral-600"
            style={{
              animation: "fadeIn 1s ease-out 0.2s forwards",
              opacity: 0,
            }}
          >
            {person1.firstName} & {person2.firstName}
          </p>
          <p
            className="mt-2 font-[family-name:var(--font-body)] text-sm italic text-neutral-400"
            style={{
              animation: "fadeIn 1s ease-out 0.4s forwards",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>
        </div>
      </footer>
    </div>
  );
}
