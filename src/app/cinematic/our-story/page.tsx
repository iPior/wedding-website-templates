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
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={year} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.1) 100%)" }} />
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/2", background: gradient }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.1) 100%)" }} />
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 12vw, 7rem)",
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

export default function CinematicOurStoryPage() {
  const { ourStory } = weddingConfig;

  return (
    <>
      <section className="flex min-h-[25vh] items-center justify-center bg-[#fff8f8] px-6 text-center">
        <div>
          <h1 className="text-4xl uppercase tracking-[0.3em] text-[#2c2424] sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
            {ourStory.title}
          </h1>
          <div className="mx-auto mt-6 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-[#d4a0b0]"
              style={{ animation: "grow 0.8s ease forwards", animationDelay: "0.5s", width: 0, maxWidth: "6rem" }}
            />
          </div>
        </div>
      </section>

      {ourStory.milestones.map((milestone, index) => {
        const delay = `${0.2 + index * 0.1}s`;
        const visual = milestoneVisuals[index % milestoneVisuals.length];
        const isEven = index % 2 === 0;

        return (
          <section key={milestone.year} className="border-t border-[#f0e0e4] bg-[#fff8f8] py-12 sm:py-16">
            <div
              className="mx-auto max-w-4xl px-6"
              style={{ animation: "fadeInUp 1s ease forwards", animationDelay: delay, opacity: 0 }}
            >
              <div className={`flex flex-col gap-8 sm:flex-row sm:items-center ${!isEven ? "sm:flex-row-reverse" : ""}`}>
                <div className="flex-1">
                  <p className="text-[5rem] leading-none text-[#f0e0e4] sm:text-[7rem] lg:text-[8rem]" style={{ fontFamily: "var(--font-display)" }}>
                    {milestone.year}
                  </p>
                  <h2
                    className="mt-4 text-xl uppercase tracking-[0.15em] text-[#2c2424] sm:text-2xl"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {milestone.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-[#8a7f7f]">{milestone.description}</p>
                </div>

                <div className="w-full flex-shrink-0 sm:w-64 lg:w-80">
                  <div className="border border-[#f0e0e4] p-1.5">
                    <PhotoFrame gradient={visual.gradient} year={milestone.year} image={milestone.image || undefined} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
