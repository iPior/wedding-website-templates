import Image from "next/image";
import { weddingConfig } from "@/lib/wedding-config";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function CinematicBridalPartyPage() {
  return (
    <>
      <section className="flex min-h-[25vh] items-center justify-center bg-[#fff8f8] px-6 text-center">
        <div>
          <h1
            className="text-4xl uppercase tracking-[0.3em] text-[#2c2424] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-display)", animation: "fadeInUp 1.2s ease forwards", animationDelay: "0.3s", opacity: 0 }}
          >
            Bridal Party
          </h1>
          <div className="mx-auto mt-6 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-[#d4a0b0]"
              style={{ animation: "grow 0.8s ease forwards", animationDelay: "1s", width: 0, maxWidth: "6rem" }}
            />
          </div>
        </div>
      </section>

      {weddingConfig.bridalParty.map((member, index) => {
        const delay = `${0.2 + index * 0.1}s`;

        return (
          <section key={member.name} className="border-t border-[#f0e0e4] bg-[#fff8f8] py-12 sm:py-16">
            <div className="mx-auto max-w-4xl px-6" style={{ animation: "fadeInUp 1s ease forwards", animationDelay: delay, opacity: 0 }}>
              <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-14">
                <div className="shrink-0">
                  {member.image ? (
                    <div className="relative h-32 w-32 overflow-hidden sm:h-40 sm:w-40">
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center bg-[#f0e0e4] sm:h-40 sm:w-40">
                      <span className="text-3xl tracking-[0.2em] text-[#8a7f7f] sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                        {getInitials(member.name)}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#d4a0b0]">{member.role}</p>
                  <h2 className="mt-3 text-2xl uppercase tracking-[0.15em] text-[#2c2424] sm:text-3xl" style={{ fontFamily: "var(--font-display)" }}>
                    {member.name}
                  </h2>
                  <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-[#8a7f7f]">{member.bio}</p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
