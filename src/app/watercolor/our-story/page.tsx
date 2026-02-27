import { weddingConfig } from "@/lib/wedding-config";

const milestoneVisuals = [
  { gradient: "linear-gradient(145deg, #f5e6c8 0%, #e8c48a 55%, #d4a86c 100%)" },
  { gradient: "linear-gradient(145deg, #d4e4f0 0%, #b0c8dc 55%, #8cafc8 100%)" },
  { gradient: "linear-gradient(145deg, #f0d8cc 0%, #d8b0a0 55%, #c49488 100%)" },
  { gradient: "linear-gradient(145deg, #dcd4ec 0%, #b8acd0 55%, #9888b8 100%)" },
];

const polaroidRotations = [-2.5, 1.8, -1.5, 2.2, -2, 5.5];

function PhotoFrame({ gradient, year, image }: { gradient: string; year: string; image?: string }) {
  if (image) {
    return (
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={year} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.1) 100%)" }} />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3", background: gradient }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.1) 100%)" }} />
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
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
    </div>
  );
}

export default function WatercolorOurStoryPage() {
  const { ourStory } = weddingConfig;

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#d4a0b0]">001</p>
      <h1 className="mb-8 text-5xl text-[#2c2424] md:mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
        {ourStory.title}
      </h1>

      <div className="relative mx-auto max-w-4xl">
        <div
          className="absolute bottom-0 left-4 top-0 w-px md:left-1/2"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(212,160,176,0.3), transparent)" }}
        />

        {(() => {
          let polaroidCount = 0;
          return ourStory.milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;
            const visual = milestoneVisuals[index % milestoneVisuals.length];
            const polaroidIndex = polaroidCount++;

            return (
              <div key={milestone.year} className="relative mb-20">
                <div className="absolute left-4 top-3 z-10 h-3 w-3 translate-y-1/2 rounded-full border-2 border-[#d4a0b0] bg-[#fff8f8] md:left-1/2 md:-translate-x-1/2" />

                <div className={`flex flex-col gap-6 md:flex-row md:items-start ${!isEven ? "md:flex-row-reverse" : ""}`}>
                  <div className={`pl-12 md:w-1/2 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                    <p className="mb-1 text-3xl text-[#d4a0b0]/60" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      {milestone.year}
                    </p>
                    <h2 className="mb-2 text-2xl text-[#2c2424]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      {milestone.title}
                    </h2>
                    <p className="text-sm text-[#8a7f7f]">{milestone.description}</p>
                  </div>

                  <div className={`flex items-center justify-center pl-12 md:w-1/2 md:pl-0 ${isEven ? "md:pl-12" : "md:pr-12"}`}>
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
                      <PhotoFrame gradient={visual.gradient} year={milestone.year} image={milestone.image || undefined} />
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
