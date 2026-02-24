import { weddingConfig } from "../../../../wedding.config";

// Gradient palettes — one per milestone, evocative of each story beat
const milestoneVisuals = [
  {
    // 2019: Summer barbecue — warm golden afternoon
    gradient: "linear-gradient(145deg, #f5e6c8 0%, #e8c48a 55%, #d4a86c 100%)",
    accent: "#c4924a",
  },
  {
    // 2020: Waterfront walk — soft coastal blue
    gradient: "linear-gradient(145deg, #d4e4f0 0%, #b0c8dc 55%, #8cafc8 100%)",
    accent: "#6898b8",
  },
  {
    // 2022: First apartment — warm terracotta hearth
    gradient: "linear-gradient(145deg, #f0d8cc 0%, #d8b0a0 55%, #c49488 100%)",
    accent: "#b47868",
  },
  {
    // 2025: Mountain proposal — lavender dusk
    gradient: "linear-gradient(145deg, #dcd4ec 0%, #b8acd0 55%, #9888b8 100%)",
    accent: "#7868a8",
  },
];

function PhotoFrame({
  gradient,
  accent,
  year,
  image,
}: {
  gradient: string;
  accent: string;
  year: string;
  image?: string;
}) {
  if (image) {
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={year} className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.12) 100%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "4/3", background: gradient }}
    >
      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.12) 100%)",
        }}
      />
      {/* Year watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
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
      {/* Camera icon — subtle indicator */}
      <div className="absolute bottom-4 right-4">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.2"
        >
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>
    </div>
  );
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div className="h-px flex-1 max-w-20 bg-neutral-300/50" />
      <svg width="14" height="14" viewBox="0 0 14 14" className="text-neutral-300">
        <path
          d="M7 1 L8.5 5.5 L13 7 L8.5 8.5 L7 13 L5.5 8.5 L1 7 L5.5 5.5 Z"
          fill="currentColor"
        />
      </svg>
      <div className="h-px flex-1 max-w-20 bg-neutral-300/50" />
    </div>
  );
}

export default function OurStoryPage() {
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
              {/* Photo frame */}
              <div className="mx-auto max-w-sm border border-neutral-200 p-2 shadow-sm">
                <PhotoFrame
                  gradient={visual.gradient}
                  accent={visual.accent}
                  year={milestone.year}
                  image={milestone.image || undefined}
                />
              </div>

              {/* Text block */}
              <div className="space-y-2">
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  <span className="inline-block w-8 border-t border-neutral-300/50 align-middle" />
                  <span className="mx-3">{milestone.year}</span>
                  <span className="inline-block w-8 border-t border-neutral-300/50 align-middle" />
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
