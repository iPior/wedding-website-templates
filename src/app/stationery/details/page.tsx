import { weddingConfig } from "@/lib/wedding-config";

const CEREMONY_EMBED =
  "https://maps.google.com/maps?q=142+Elm+Street+Maplewood+NJ+07040&t=&z=16&ie=UTF8&iwloc=B&output=embed";
const RECEPTION_EMBED =
  "https://maps.google.com/maps?q=88+Shoreline+Drive+Maplewood+NJ+07040&t=&z=16&ie=UTF8&iwloc=B&output=embed";
const CEREMONY_LINK = "https://maps.google.com/maps?q=142+Elm+Street+Maplewood+NJ+07040";
const RECEPTION_LINK = "https://maps.google.com/maps?q=88+Shoreline+Drive+Maplewood+NJ+07040";

function OrnamentalDivider({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-4"
      style={{ animation: "scaleIn 1.2s ease-out forwards", animationDelay: delay, opacity: 0 }}
    >
      <div className="h-px max-w-16 flex-1 bg-neutral-300/50" />
      <svg width="12" height="12" viewBox="0 0 14 14" className="text-neutral-300">
        <path d="M7 1 L8.5 5.5 L13 7 L8.5 8.5 L7 13 L5.5 8.5 L1 7 L5.5 5.5 Z" fill="currentColor" />
      </svg>
      <div className="h-px max-w-16 flex-1 bg-neutral-300/50" />
    </div>
  );
}

function VenueMap({ embedSrc, directionsHref, title }: { embedSrc: string; directionsHref: string; title: string }) {
  return (
    <div className="mt-8 text-left">
      <div className="overflow-hidden border border-neutral-100">
        <div className="relative w-full" style={{ paddingBottom: "52%" }}>
          <iframe
            src={embedSrc}
            className="absolute inset-0 h-full w-full"
            style={{ filter: "grayscale(0.15) contrast(0.92) sepia(0.08)" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
          />
        </div>
      </div>
      <a
        href={directionsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 font-[family-name:var(--font-body)] text-xs italic text-neutral-400 transition-colors duration-300 hover:text-neutral-700"
      >
        Get Directions
      </a>
    </div>
  );
}

export default function StationeryDetailsPage() {
  const { schedule, venue } = weddingConfig;

  return (
    <div className="space-y-16 text-center">
      <div className="space-y-4" style={{ animation: "fadeIn 1s ease-out forwards", opacity: 0 }}>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-light tracking-wide text-neutral-800 sm:text-5xl">
          Wedding Details
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-neutral-300/50" />
          <span className="text-xs text-neutral-300">✽</span>
          <div className="h-px w-12 bg-neutral-300/50" />
        </div>
      </div>

      <section className="space-y-10" style={{ animation: "fadeIn 1s ease-out 0.2s forwards", opacity: 0 }}>
        <div className="border border-neutral-200 p-8 sm:p-12">
          <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Ceremony
          </h2>
          <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-light tracking-wide text-neutral-700">{venue.ceremony.name}</p>
          <p className="mt-2 font-[family-name:var(--font-body)] text-sm text-neutral-500">{venue.ceremony.address}</p>
          <VenueMap embedSrc={CEREMONY_EMBED} directionsHref={CEREMONY_LINK} title="Ceremony venue map" />
        </div>

        <div className="border border-neutral-200 p-8 sm:p-12">
          <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Reception
          </h2>
          <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-light tracking-wide text-neutral-700">{venue.reception.name}</p>
          <p className="mt-2 font-[family-name:var(--font-body)] text-sm text-neutral-500">{venue.reception.address}</p>
          <VenueMap embedSrc={RECEPTION_EMBED} directionsHref={RECEPTION_LINK} title="Reception venue map" />
        </div>
      </section>

      <OrnamentalDivider delay="0.4s" />

      <section className="space-y-8" style={{ animation: "fadeIn 1s ease-out 0.6s forwards", opacity: 0 }}>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-neutral-800">Schedule</h2>
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div
              key={item.time}
              className="flex items-center justify-center gap-4"
              style={{ animation: "fadeIn 1s ease-out forwards", animationDelay: `${0.8 + index * 0.15}s`, opacity: 0 }}
            >
              <span className="w-24 text-right font-[family-name:var(--font-body)] text-sm text-neutral-500">{item.time}</span>
              <span className="text-neutral-300">&mdash;</span>
              <span className="w-24 text-left font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.1em] text-neutral-600">
                {item.event}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
