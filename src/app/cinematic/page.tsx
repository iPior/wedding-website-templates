import Link from "next/link";
import { CountdownTimer } from "@wedding/ui";
import { weddingConfig } from "@/lib/wedding-config";

const { person1, person2 } = weddingConfig.couple;
const weddingDate = new Date(weddingConfig.date);
const formattedDate = weddingDate.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function CinematicHomePage() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#fff8f8] px-6 py-16 text-center">
      <div className="w-full max-w-lg space-y-8">
        <p className="text-[10px] font-light uppercase tracking-[0.4em] text-[#8a7f7f]" style={{ animation: "fadeInUp 1s ease forwards", animationDelay: "0.2s", opacity: 0 }}>
          {weddingConfig.tagline}
        </p>

        <h1
          className="text-5xl uppercase leading-[1.1] tracking-[0.3em] text-[#2c2424] sm:text-7xl lg:text-[6rem]"
          style={{ fontFamily: "var(--font-display)", animation: "fadeInUp 1.2s ease forwards", animationDelay: "0.5s", opacity: 0 }}
        >
          {person1.firstName}
          <span className="block text-[0.5em] tracking-[0.5em] text-[#d4a0b0]">&amp;</span>
          {person2.firstName}
        </h1>

        <div className="mx-auto overflow-hidden">
          <div className="mx-auto h-[2px] bg-[#d4a0b0]" style={{ animation: "grow 0.8s ease forwards", animationDelay: "1.2s", width: 0, maxWidth: "6rem" }} />
        </div>

        <div style={{ animation: "fadeInUp 1s ease forwards", animationDelay: "1.5s", opacity: 0 }}>
          <p className="text-[11px] font-light uppercase tracking-[0.3em] text-[#8a7f7f]">{formattedDate}</p>
          <p className="mt-1 text-[10px] tracking-[0.2em] text-[#8a7f7f]/60">{weddingConfig.venue.ceremony.name}</p>
        </div>

        <div className="mx-auto overflow-hidden">
          <div className="mx-auto h-px bg-[#f0e0e4]" style={{ animation: "grow 0.8s ease forwards", animationDelay: "1.8s", width: 0, maxWidth: "3rem" }} />
        </div>

        <div style={{ animation: "fadeInUp 1s ease forwards", animationDelay: "2s", opacity: 0 }}>
          <p className="mb-5 text-[10px] uppercase tracking-[0.35em] text-[#d4a0b0]" style={{ fontFamily: "var(--font-display)" }}>
            Counting Down
          </p>
          <CountdownTimer targetDate={weddingConfig.date} numberClassName="font-[family-name:var(--font-display)]" />
        </div>

        <div style={{ animation: "fadeInUp 1s ease forwards", animationDelay: "2.2s", opacity: 0 }}>
          <Link
            href="/cinematic/rsvp"
            className="inline-block border border-[#d4a0b0] px-12 py-4 text-[11px] uppercase tracking-[0.3em] text-[#d4a0b0] transition-all duration-300 hover:bg-[#d4a0b0] hover:text-white"
          >
            RSVP Now
          </Link>
        </div>
      </div>
    </section>
  );
}
