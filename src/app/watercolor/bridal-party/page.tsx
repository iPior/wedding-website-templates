import Image from "next/image";
import { weddingConfig } from "@/lib/wedding-config";

export default function WatercolorBridalPartyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#d4a0b0]">001</p>
      <h2 className="mb-4 text-5xl text-[#2c2424]" style={{ fontFamily: "var(--font-playfair), serif" }}>
        The Wedding Party
      </h2>
      <p className="mb-12 text-base leading-relaxed text-[#5a4f4f]">
        The people who have stood by us through it all, and who we are honored to have by our side on the big day.
      </p>

      <div className="grid grid-cols-2 gap-8">
        {weddingConfig.bridalParty.map((member) => (
          <div key={member.name}>
            <div className="mb-3 flex aspect-[3/4] items-center justify-center overflow-hidden rounded-sm bg-gradient-to-br from-[#F7e0e8] to-[#ffdae9]">
              {member.image ? (
                <Image src={member.image} alt={member.name} width={300} height={400} className="h-full w-full object-cover" />
              ) : (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
                </svg>
              )}
            </div>
            <h3 className="mb-1 text-lg text-[#2c2424]" style={{ fontFamily: "var(--font-playfair), serif" }}>
              {member.name}
            </h3>
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-[#8a7f7f]">{member.role}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
