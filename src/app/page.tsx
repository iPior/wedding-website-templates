import Link from "next/link";

const designs = [
  {
    name: "Watercolor",
    href: "/watercolor",
    description: "Soft editorial look with watercolor layers and romantic serif typography.",
    gradient: "from-[#ffe4ef] via-[#fbeff5] to-[#fff8fb]",
    accent: "#d4a0b0",
  },
  {
    name: "Stationery",
    href: "/stationery",
    description: "Invitation-inspired layout with warm parchment tones and ornamental flourishes.",
    gradient: "from-[#fdfbf7] via-[#f8f3ea] to-[#f3ede2]",
    accent: "#8b7355",
  },
  {
    name: "Cinematic",
    href: "/cinematic",
    description: "Bold, full-width rhythm with dramatic headings and elegant section breaks.",
    gradient: "from-[#fff8f8] via-[#ffeef1] to-[#fff8fb]",
    accent: "#2c2424",
  },
];

export default function ShowcaseHomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#fff7f2,_#fff)] px-6 py-14 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-[#9f8d7c]">Wedding Website Templates</p>
        <h1 className="mt-4 text-4xl text-[#2f2823] md:text-6xl">Design Route Showcase</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#6e5f53] md:text-base">
          Browse three complete design systems in one app. Each route keeps its own visual language,
          page structure, and a static RSVP interaction for demos.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {designs.map((design) => (
            <Link
              key={design.href}
              href={design.href}
              className={`group rounded-sm border border-[#eadfd5] bg-gradient-to-br ${design.gradient} p-6 transition-transform duration-300 hover:-translate-y-1`}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-[#8f7f73]">Theme</p>
              <h2 className="mt-2 text-3xl text-[#2f2823]">{design.name}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#6e5f53]">{design.description}</p>
              <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.22em]" style={{ color: design.accent }}>
                Open Design
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  -&gt;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-xs leading-relaxed text-[#8f7f73]">
          Note: This repo is now a static showcase. The original full-stack iteration used Supabase,
          Prisma, Resend, and a production RSVP pipeline.
        </p>
      </div>
    </main>
  );
}
