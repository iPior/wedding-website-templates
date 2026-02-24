import Link from "next/link";
import { CountdownTimer } from "@wedding/ui";
import { weddingConfig } from "../../../wedding.config";

const { person1, person2 } = weddingConfig.couple;
const weddingDate = new Date(weddingConfig.date);
const formattedDate = weddingDate.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function HomePage() {
  return (
    <section className="flex min-h-[calc(100vh-15rem)] items-center justify-center px-6 text-center py-12 md:py-0">
      <div className="w-full max-w-2xl space-y-12">
        {/* Tagline */}
        <p
          className="text-xs font-light uppercase tracking-[0.4em] text-[#8a7f7f] sm:text-md"
          style={{ animation: "fadeInUp 1s ease forwards", animationDelay: "0.2s", opacity: 0 }}
        >
          {weddingConfig.tagline}
        </p>

        {/* Names */}
        <h1
          className="text-center text-5xl uppercase leading-[1.1] tracking-[0.3em] text-[#2c2424] sm:text-7xl lg:text-[6rem]"
          style={{ fontFamily: "var(--font-playfair), serif", animation: "fadeInUp 1.2s ease forwards", animationDelay: "0.5s", opacity: 0 }}
        >
          {person1.firstName}
          <span className="block text-[0.5em] tracking-[0.5em] text-[#d4a0b0]">&</span>
          {person2.firstName}
        </h1>

        {/* Pink grow divider */}
        <div className="mx-auto overflow-hidden">
          <div
            className="mx-auto h-[2px] bg-[#d4a0b0]"
            style={{ animation: "grow 0.8s ease forwards", animationDelay: "1.2s", width: 0, maxWidth: "6rem" }}
          />
        </div>

        {/* Date + venue */}
        <div style={{ animation: "fadeInUp 1s ease forwards", animationDelay: "1.5s", opacity: 0 }}>
          <p className="text-sm font-light uppercase tracking-[0.3em] text-[#8a7f7f] sm:text-lg">
            {formattedDate}
          </p>
          <p className="mt-1 text-xs tracking-[0.2em] text-[#8a7f7f]/60 sm:text-md">
            {weddingConfig.venue.ceremony.name}
          </p>
        </div>

        {/* Thin separator */}
        <div className="mx-auto overflow-hidden">
          <div
            className="mx-auto h-px bg-[#f0e0e4]"
            style={{ animation: "grow 0.8s ease forwards", animationDelay: "1.8s", width: 0, maxWidth: "3rem" }}
          />
        </div>

        {/* Countdown */}
        <div style={{ animation: "fadeInUp 1s ease forwards", animationDelay: "2s", opacity: 0 }}>
          <p
            className="mb-5 text-sm uppercase tracking-[0.35em] text-[#d4a0b0]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Counting Down
          </p>
          <CountdownTimer targetDate={weddingConfig.date} numberClassName="font-[family-name:var(--font-playfair)]" />
        </div>

        {/* RSVP */}
        <div style={{ animation: "fadeInUp 1s ease forwards", animationDelay: "2.2s", opacity: 0 }}>
          <Link
            href="/rsvp"
            className="inline-block bg-[#2c2424] px-12 py-4 text-[11px] uppercase tracking-[0.3em] text-[#fff8f8] transition-all duration-300 hover:bg-[#d4a0b0]"
          >
            RSVP Now
          </Link>
        </div>
      </div>
    </section>
  );
}
