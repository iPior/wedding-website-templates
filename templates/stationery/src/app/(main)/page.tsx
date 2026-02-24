import { weddingConfig } from "../../../wedding.config";
import { CountdownTimer } from "@wedding/ui";
import Link from "next/link";

function OrnamentalDivider({ delay = "0s" }: { delay?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-4"
      style={{ animation: "scaleIn 1.2s ease-out forwards", animationDelay: delay, opacity: 0 }}
    >
      <div className="h-px flex-1 max-w-14 bg-neutral-300/50" />
      <svg width="9" height="9" viewBox="0 0 14 14" className="text-neutral-300">
        <path d="M7 1 L8.5 5.5 L13 7 L8.5 8.5 L7 13 L5.5 8.5 L1 7 L5.5 5.5 Z" fill="currentColor" />
      </svg>
      <div className="h-px flex-1 max-w-14 bg-neutral-300/50" />
    </div>
  );
}

export default function HomePage() {
  const { couple, date, tagline } = weddingConfig;
  const { person1, person2 } = couple;
  const weddingDate = new Date(date);
  const formattedDate = weddingDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-10">
      {/* Invitation card */}
      <div
        className="w-full max-w-xs border border-neutral-200 px-10 py-12 text-center sm:max-w-sm sm:px-14 sm:py-16"
        style={{ animation: "fadeIn 0.6s ease-out forwards", opacity: 0 }}
      >
        <div className="space-y-5">
          {/* Name 1 */}
          <h1
            className="font-[family-name:var(--font-display)] text-6xl font-light leading-tight tracking-wide text-neutral-800 sm:text-7xl"
            style={{ animation: "fadeIn 1.2s ease-out 0.3s forwards", opacity: 0 }}
          >
            {person1.firstName}
          </h1>

          {/* "&" divider */}
          <div
            className="flex items-center justify-center gap-3"
            style={{ animation: "scaleIn 1s ease-out 0.5s forwards", opacity: 0 }}
          >
            <div className="h-px w-10 bg-neutral-300/60" />
            <span className="font-[family-name:var(--font-display)] text-base font-light text-neutral-400">&amp;</span>
            <div className="h-px w-10 bg-neutral-300/60" />
          </div>

          {/* Name 2 */}
          <h1
            className="font-[family-name:var(--font-display)] text-6xl font-light leading-tight tracking-wide text-neutral-800 sm:text-7xl"
            style={{ animation: "fadeIn 1.2s ease-out 0.6s forwards", opacity: 0 }}
          >
            {person2.firstName}
          </h1>

          {/* Date */}
          <p
            className="font-[family-name:var(--font-body)] text-sm italic text-neutral-500"
            style={{ animation: "fadeIn 1s ease-out 0.8s forwards", opacity: 0 }}
          >
            {formattedDate}
          </p>

          {/* Tagline */}
          <p
            className="font-[family-name:var(--font-body)] text-xs italic text-neutral-400"
            style={{ animation: "fadeIn 1s ease-out 0.95s forwards", opacity: 0 }}
          >
            {tagline}
          </p>

          <OrnamentalDivider delay="1.1s" />

          {/* Countdown */}
          <div style={{ animation: "fadeIn 1s ease-out 1.2s forwards", opacity: 0 }}>
            <CountdownTimer targetDate={weddingConfig.date} numberClassName="font-[family-name:var(--font-display)]" />
          </div>

          <OrnamentalDivider delay="1.35s" />

          {/* RSVP */}
          <div
            className="space-y-3"
            style={{ animation: "fadeIn 1s ease-out 1.5s forwards", opacity: 0 }}
          >
            <p className="font-[family-name:var(--font-body)] text-xs italic text-neutral-500">
              We would be honored by your presence.
            </p>
            <Link
              href="/rsvp"
              className="inline-block border border-neutral-300 bg-transparent px-8 py-3 font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.2em] text-neutral-700 transition-all duration-300 hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
            >
              Respond
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
