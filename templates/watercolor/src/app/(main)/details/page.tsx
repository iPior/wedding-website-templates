import { weddingConfig } from "../../../../wedding.config";
import { LazyMap } from "@wedding/ui";

const CEREMONY_EMBED =
  "https://maps.google.com/maps?q=142+Elm+Street+Maplewood+NJ+07040&t=&z=16&ie=UTF8&iwloc=B&output=embed";
const RECEPTION_EMBED =
  "https://maps.google.com/maps?q=88+Shoreline+Drive+Maplewood+NJ+07040&t=&z=16&ie=UTF8&iwloc=B&output=embed";
const CEREMONY_LINK =
  "https://maps.google.com/maps?q=142+Elm+Street+Maplewood+NJ+07040";
const RECEPTION_LINK =
  "https://maps.google.com/maps?q=88+Shoreline+Drive+Maplewood+NJ+07040";

const weddingDate = new Date(weddingConfig.date);

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const ceremonyTime = weddingConfig.schedule.find((s) => s.event === "Ceremony")?.time;
const receptionTime = weddingConfig.schedule.find((s) => s.event === "Cocktail Hour")?.time;

function VenueCard({
  label,
  time,
  name,
  address,
  embedSrc,
  screenshotSrc,
  directionsHref,
  mapTitle,
}: {
  label: string;
  time?: string;
  name: string;
  address: string;
  embedSrc: string;
  screenshotSrc: string;
  directionsHref: string;
  mapTitle: string;
}) {
  return (
    <div className="sm:border sm:border-[#f0e0e4] sm:bg-[#fff8f8] sm:p-8">
        {/* Label + time */}
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#d4a0b0]">{label}</p>
          {time && (
            <p className="text-xs tracking-[0.15em] text-[#8a7f7f]">{time}</p>
          )}
        </div>

        {/* Venue name + address */}
        <h3
          className="text-2xl text-[#2c2424] mb-2"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {name}
        </h3>
        <p className="text-sm leading-relaxed text-[#8a7f7f] mb-6">{address}</p>

        {/* Map — static screenshot, click to load interactive */}
        <LazyMap
          embedSrc={embedSrc}
          screenshotSrc={screenshotSrc}
          title={mapTitle}
        />

        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-[#8a7f7f] transition-colors hover:text-[#2c2424]"
        >
          Open in Maps
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 8 L8 2 M4 2 H8 V6" />
          </svg>
        </a>
    </div>
  );
}

export default function DetailsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16">

      {/* ───────── 001 — When & Where ───────── */}
      <section className="mb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">001</p>
        <h2
          className="text-5xl text-[#2c2424] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          When & Where
        </h2>
        <p className="text-base leading-relaxed text-[#5a4f4f] mb-14 md:mb-10">
          Join us on {formatDate(weddingDate)} as we celebrate our love with
          family and friends.
        </p>

        <div className="space-y-16 md:space-y-8">
          <VenueCard
            label="Ceremony"
            time={ceremonyTime}
            name={weddingConfig.venue.ceremony.name}
            address={weddingConfig.venue.ceremony.address}
            embedSrc={CEREMONY_EMBED}
            screenshotSrc="/maps/ceremony-map.png"
            directionsHref={CEREMONY_LINK}
            mapTitle="Ceremony venue map"
          />
          <VenueCard
            label="Reception"
            time={receptionTime}
            name={weddingConfig.venue.reception.name}
            address={weddingConfig.venue.reception.address}
            embedSrc={RECEPTION_EMBED}
            screenshotSrc="/maps/reception-map.png"
            directionsHref={RECEPTION_LINK}
            mapTitle="Reception venue map"
          />
        </div>
      </section>

      <div className="h-px bg-[#f0e0e4] mb-14" />

      {/* ───────── 002 — Schedule ───────── */}
      <section>
        <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">002</p>
        <h2
          className="text-5xl text-[#2c2424] mb-10"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Schedule
        </h2>
        <div>
          {weddingConfig.schedule.map((item) => (
            <div
              key={item.event}
              className="flex items-baseline justify-between border-b border-[#f0e0e4] py-5 last:border-b-0"
            >
              <span
                className="text-lg text-[#2c2424]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {item.event}
              </span>
              <span className="text-xs tracking-[0.2em] text-[#8a7f7f]">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
