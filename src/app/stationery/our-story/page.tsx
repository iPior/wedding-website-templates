import { weddingConfig } from "@/lib/wedding-config";

const milestoneVisuals = [
  { gradient: "linear-gradient(145deg, #f5e6c8 0%, #e8c48a 55%, #d4a86c 100%)" },
  { gradient: "linear-gradient(145deg, #d4e4f0 0%, #b0c8dc 55%, #8cafc8 100%)" },
  { gradient: "linear-gradient(145deg, #f0d8cc 0%, #d8b0a0 55%, #c49488 100%)" },
  { gradient: "linear-gradient(145deg, #dcd4ec 0%, #b8acd0 55%, #9888b8 100%)" },
];

function PhotoFrame({ gradient, year, image }: { gradient: string; year: string; image?: string }) {
  if (image) {
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={year} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.12) 100%)" }} />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3", background: gradient }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.12) 100%)" }} />
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.5rem, 10vw, 6rem)",
          fontWeight: 300,
          letterSpacing: "0.1em",
          color: "rgba(255,255,255,0.25)",
        }}
      >
        {year}
      </div>
    </div>
  );
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div className="h-px max-w-20 flex-1 bg-neutral-300/50" />
      <svg width="14" height="14" viewBox="0 0 14 14" className="text-neutral-300">
        <path d="M7 1 L8.5 5.5 L13 7 L8.5 8.5 L7 13 L5.5 8.5 L1 7 L5.5 5.5 Z" fill="currentColor" />
      </svg>
      <div className="h-px max-w-20 flex-1 bg-neutral-300/50" />
    </div>
  );
}

export default function StationeryOurStoryPage() {
  const { ourStory } = weddingConfig;

  return (
    <div className="space-y-14 text-center">
      <div className="space-y-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-light tracking-wide text-neutral-800 sm:text-4xl">
          {ourStory.title}
        </h1>
      </div>

      <OrnamentalDivider />

      <div className="space-y-16">
        {ourStory.milestones.map((milestone, index) => {
          const visual = milestoneVisuals[index % milestoneVisuals.length];
          return (
            <div key={milestone.year} className="space-y-5">
              <div className="mx-auto max-w-sm border border-neutral-200 p-2 shadow-sm">
                <PhotoFrame gradient={visual.gradient} year={milestone.year} image={milestone.image || undefined} />
              </div>

              <div className="space-y-2">
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  <span className="inline-block w-8 align-middle border-t border-neutral-300/50" />
                  <span className="mx-3">{milestone.year}</span>
                  <span className="inline-block w-8 align-middle border-t border-neutral-300/50" />
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-wide text-neutral-700">
                  {milestone.title}
                </h2>
                <p className="mx-auto max-w-sm font-[family-name:var(--font-body)] text-sm leading-relaxed text-neutral-500">
                  {milestone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
