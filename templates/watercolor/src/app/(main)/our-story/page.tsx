import { weddingConfig } from "../../../../wedding.config";

// Gradient palettes — one per milestone, evocative of each story beat
const milestoneVisuals = [
  {
    gradient: "linear-gradient(145deg, #f5e6c8 0%, #e8c48a 55%, #d4a86c 100%)",
  },
  {
    gradient: "linear-gradient(145deg, #d4e4f0 0%, #b0c8dc 55%, #8cafc8 100%)",
  },
  {
    gradient: "linear-gradient(145deg, #f0d8cc 0%, #d8b0a0 55%, #c49488 100%)",
  },
  {
    gradient: "linear-gradient(145deg, #dcd4ec 0%, #b8acd0 55%, #9888b8 100%)",
  },
];

// Alternating polaroid tilts
const polaroidRotations = [-2.5, 1.8, -1.5, 2.2, -2, 5.5];

function PhotoFrame({ gradient, year, image }: { gradient: string; year: string; image?: string }) {
  if (image) {
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={year} className="absolute inset-0 w-full h-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.1) 100%)",
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
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.1) 100%)",
        }}
      />
      {/* Year watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontSize: "clamp(3rem, 8vw, 5rem)",
          fontWeight: 400,
          letterSpacing: "0.05em",
          color: "rgba(255,255,255,0.2)",
        }}
      >
        {year}
      </div>
      {/* Camera indicator */}
      <div className="absolute bottom-3 right-3">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.2"
        >
          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </div>
    </div>
  );
}

export default function OurStoryPage() {
  const { ourStory } = weddingConfig;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">001</p>
      <h1
        className="text-5xl text-[#2c2424] mb-8 md:mb-4"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {ourStory.title}
      </h1>
      {/* Timeline — alternating left/right with photos on opposing side */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center spine */}
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(212,160,176,0.3), transparent)",
          }}
        />

        {(() => {
          let polaroidCount = 0;
          return ourStory.milestones.map((m, i) => {
          const isEven = i % 2 === 0;
          const visual = milestoneVisuals[i % milestoneVisuals.length];
          const polaroidIndex = polaroidCount++;

          return (
            <div key={m.year} className="relative mb-20">
              {/* Spine dot */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2  translate-y-1/2 top-3 w-3 h-3 rounded-full border-2 border-[#d4a0b0] bg-[#fff8f8] z-10" />

              <div
                className={`flex flex-col md:flex-row md:items-start gap-6 ${
                  !isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Text side */}
                <div
                  className={`pl-12 md:pl-0 md:w-1/2 ${
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <p
                    className="text-3xl text-[#d4a0b0]/60 mb-1"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {m.year}
                  </p>
                  <h2
                    className="text-2xl text-[#2c2424] mb-2"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {m.title}
                  </h2>
                  <p className="text-sm text-[#8a7f7f]">{m.description}</p>
                </div>

                {/* Photo side */}
                <div
                  className={`pl-12 md:pl-0 md:w-1/2 flex items-center justify-center ${
                    isEven ? "md:pl-12" : "md:pr-12"
                  }`}
                >
                  {/* Polaroid frame */}
                  <div
                    style={{
                      transform: `rotate(${polaroidRotations[polaroidIndex % polaroidRotations.length]}deg)`,
                      backgroundColor: "#ffffff",
                      padding: "10px 10px 40px 10px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
                      display: "inline-block",
                      width: "100%",
                      maxWidth: "320px",
                    }}
                  >
                    <PhotoFrame gradient={visual.gradient} year={m.year} image={m.image || undefined} />
                  </div>
                </div>
              </div>
            </div>
          );
        });
        })()}
      </div>
    </main>
  );
}
