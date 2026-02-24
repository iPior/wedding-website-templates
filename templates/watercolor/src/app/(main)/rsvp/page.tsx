import { RsvpFlow } from "@wedding/ui";
import { searchGuests, getHouseholdForRsvp, submitRsvp, modifyRsvp } from "@/actions/rsvp";

export default function RsvpPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-16 md:min-h-[calc(100vh-5rem)]">
      <p className="text-xs uppercase tracking-[0.3em] text-[#d4a0b0] mb-3">001</p>
      <h2
        className="text-5xl text-[#2c2424] mb-4"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        Kindly Respond
      </h2>
      <p className="text-base leading-relaxed text-[#5a4f4f] mb-10">
        We would love to celebrate with you. Search for your name below to let
        us know if you can make it.
      </p>

      <div className="h-px bg-[#f0e0e4] mb-10" />

      <RsvpFlow
        searchGuests={searchGuests}
        getHouseholdForRsvp={getHouseholdForRsvp}
        submitRsvp={submitRsvp}
        modifyRsvp={modifyRsvp}
      />
    </main>
  );
}
