import { weddingConfig } from "@/lib/wedding-config";
import Image from "next/image";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function StationeryBridalPartyPage() {
  const { bridalParty } = weddingConfig;

  return (
    <div className="space-y-16 text-center">
      <div className="space-y-4" style={{ animation: "fadeIn 1s ease-out forwards", opacity: 0 }}>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-light tracking-wide text-neutral-800 sm:text-5xl">
          Wedding Party
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-neutral-300/50" />
          <span className="text-xs text-neutral-300">✽</span>
          <div className="h-px w-12 bg-neutral-300/50" />
        </div>
        <p className="font-[family-name:var(--font-body)] text-sm italic text-neutral-500">The wonderful people standing by our side.</p>
      </div>

      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2">
        {bridalParty.map((member, index) => (
          <div
            key={member.name}
            className="flex flex-col items-center space-y-4"
            style={{ animation: "fadeIn 1s ease-out forwards", animationDelay: `${0.3 + index * 0.2}s`, opacity: 0 }}
          >
            {member.image ? (
              <div className="relative size-28 overflow-hidden rounded-full border border-neutral-200 sm:size-32">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>
            ) : (
              <div className="flex size-28 items-center justify-center rounded-full border border-neutral-200 bg-[#F8F6F1] sm:size-32">
                <span className="font-[family-name:var(--font-display)] text-xl font-light tracking-wider text-neutral-400">
                  {getInitials(member.name)}
                </span>
              </div>
            )}

            <p className="font-[family-name:var(--font-display)] text-xl font-light tracking-wide text-neutral-700">{member.name}</p>
            <p className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.2em] text-neutral-400">{member.role}</p>
            <p className="mx-auto max-w-xs font-[family-name:var(--font-body)] text-sm italic leading-relaxed text-neutral-500">
              {member.bio}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
