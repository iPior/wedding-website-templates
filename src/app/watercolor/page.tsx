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

export default function WatercolorHomePage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-8 md:px-12">
        <div className="mb-14 grid grid-cols-1 items-end gap-8 md:mb-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#d4a0b0]">{formattedDate}</p>
            <h1
              className="text-7xl leading-[0.85] tracking-tight text-[#2c2424] md:text-[8rem] lg:text-[10rem]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {person1.firstName}
            </h1>
            <div className="my-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#d2d98b]" />
              <span className="text-sm uppercase tracking-[0.3em] text-[#8a7f7f]">and</span>
              <div className="h-px flex-1 bg-[#d2d98b]" />
            </div>
            <h1
              className="text-7xl leading-[0.85] tracking-tight text-[#2c2424] md:text-[8rem] lg:text-[10rem]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {person2.firstName}
            </h1>
          </div>

          <div className="md:col-span-5">
            <div className="aspect-[3/4] rounded-sm bg-gradient-to-br from-[#F7e0e8] to-[#ffdae9]" />
            <div className="mt-4 space-y-1">
              <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f7f]">{weddingConfig.venue.ceremony.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8a7f7f]">Toronto, Ontario</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 border-t border-[#f0e0e4] pt-10 md:flex-row md:items-center md:justify-between">
          <CountdownTimer targetDate={weddingConfig.date} />
          <div className="flex flex-col items-start gap-3 md:items-end">
            <p className="text-sm uppercase tracking-[0.3em] text-[#8a7f7f]">Will you join us?</p>
            <Link
              href="/watercolor/rsvp"
              className="inline-block bg-[#2c2424] px-10 py-4 text-xs uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-[#d4a0b0]"
            >
              RSVP Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
