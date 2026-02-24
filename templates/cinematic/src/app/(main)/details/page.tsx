import { weddingConfig } from "../../../../wedding.config";

const CEREMONY_EMBED =
  "https://maps.google.com/maps?q=142+Elm+Street+Maplewood+NJ+07040&t=&z=16&ie=UTF8&iwloc=B&output=embed";
const RECEPTION_EMBED =
  "https://maps.google.com/maps?q=88+Shoreline+Drive+Maplewood+NJ+07040&t=&z=16&ie=UTF8&iwloc=B&output=embed";
const CEREMONY_LINK =
  "https://maps.google.com/maps?q=142+Elm+Street+Maplewood+NJ+07040";
const RECEPTION_LINK =
  "https://maps.google.com/maps?q=88+Shoreline+Drive+Maplewood+NJ+07040";

const weddingDate = new Date(weddingConfig.date);
const formattedDate = weddingDate.toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function DetailsPage() {
  return (
    <>
      {/* ═══ SCENE 1 — Page Header ═══ */}
      <section className="flex min-h-[25vh] items-center justify-center bg-[#fff8f8] px-6 text-center">
        <div>
          <h1
            className="text-4xl uppercase tracking-[0.3em] text-[#2c2424] sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 1.2s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            Wedding Details
          </h1>
          <div className="mx-auto mt-6 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-[#d4a0b0]"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "1s",
                width: 0,
                maxWidth: "6rem",
              }}
            />
          </div>
          <p
            className="mt-4 text-[11px] font-light uppercase tracking-[0.3em] text-[#8a7f7f]"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "1.3s",
              opacity: 0,
            }}
          >
            {formattedDate}
          </p>
        </div>
      </section>

      {/* ═══ SCENE 2 — Ceremony ═══ */}
      <section className="border-t border-[#f0e0e4] bg-[#fff8f8] py-14 sm:py-20">
        <div
          className="mx-auto max-w-4xl px-6"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.3em] text-[#d4a0b0]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Ceremony
          </p>
          <h2
            className="mt-6 text-3xl uppercase tracking-[0.15em] text-[#2c2424] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {weddingConfig.venue.ceremony.name}
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-[#8a7f7f]">
            {weddingConfig.venue.ceremony.address}
          </p>
          <div
            className="mt-8 h-[2px] bg-[#f0e0e4]"
            style={{
              animation: "grow 0.8s ease forwards",
              animationDelay: "0.6s",
              width: 0,
              maxWidth: "4rem",
            }}
          />

          {/* Map */}
          <div className="mt-10 overflow-hidden border border-[#f0e0e4]">
            <div className="relative w-full" style={{ paddingBottom: "45%" }}>
              <iframe
                src={CEREMONY_EMBED}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ceremony venue map"
              />
            </div>
          </div>
          <a
            href={CEREMONY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-[10px] uppercase tracking-[0.3em] text-[#8a7f7f] transition-colors duration-300 hover:text-[#2c2424]"
          >
            Open in Maps &rarr;
          </a>
        </div>
      </section>

      {/* ═══ SCENE 3 — Reception ═══ */}
      <section className="border-t border-[#f0e0e4] bg-[#fff8f8] py-14 sm:py-20">
        <div
          className="mx-auto max-w-4xl px-6"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          <p
            className="text-[11px] uppercase tracking-[0.3em] text-[#d4a0b0]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Reception
          </p>
          <h2
            className="mt-6 text-3xl uppercase tracking-[0.15em] text-[#2c2424] sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {weddingConfig.venue.reception.name}
          </h2>
          <p className="mt-3 text-sm font-light leading-relaxed text-[#8a7f7f]">
            {weddingConfig.venue.reception.address}
          </p>
          <div
            className="mt-8 h-[2px] bg-[#f0e0e4]"
            style={{
              animation: "grow 0.8s ease forwards",
              animationDelay: "0.6s",
              width: 0,
              maxWidth: "4rem",
            }}
          />

          {/* Map */}
          <div className="mt-10 overflow-hidden border border-[#f0e0e4]">
            <div className="relative w-full" style={{ paddingBottom: "45%" }}>
              <iframe
                src={RECEPTION_EMBED}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Reception venue map"
              />
            </div>
          </div>
          <a
            href={RECEPTION_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-[10px] uppercase tracking-[0.3em] text-[#8a7f7f] transition-colors duration-300 hover:text-[#2c2424]"
          >
            Open in Maps &rarr;
          </a>
        </div>
      </section>

      {/* ═══ SCENE 4 — Schedule ═══ */}
      <section className="border-t border-[#f0e0e4] bg-[#fff8f8] py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div
            className="text-center"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            <h2
              className="text-3xl uppercase tracking-[0.3em] text-[#2c2424] sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Schedule
            </h2>
            <div className="mx-auto mt-6 overflow-hidden">
              <div
                className="mx-auto h-[2px] bg-[#f0e0e4]"
                style={{
                  animation: "grow 0.8s ease forwards",
                  animationDelay: "0.6s",
                  width: 0,
                  maxWidth: "4rem",
                }}
              />
            </div>
          </div>

          <div className="mt-10 space-y-0">
            {weddingConfig.schedule.map((item, index) => (
              <div
                key={index}
                className="flex items-baseline justify-between border-b border-[#f0e0e4] py-5 last:border-b-0"
                style={{
                  animation: "fadeInUp 0.8s ease forwards",
                  animationDelay: `${0.4 + index * 0.15}s`,
                  opacity: 0,
                }}
              >
                <span
                  className="text-lg uppercase tracking-[0.1em] text-[#2c2424]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.event}
                </span>
                <span className="text-[11px] tracking-[0.2em] text-[#8a7f7f]">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
