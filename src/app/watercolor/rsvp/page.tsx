import { DemoRsvpFlow } from "@/components/demo-rsvp-flow";

export default function WatercolorRsvpPage() {
  return (
    <main className="mx-auto min-h-[calc(100vh-5rem)] max-w-3xl px-6 py-10 md:py-16">
      <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#d4a0b0]">001</p>
      <h2 className="mb-4 text-5xl text-[#2c2424]" style={{ fontFamily: "var(--font-playfair), serif" }}>
        Kindly Respond
      </h2>
      <p className="mb-10 text-base leading-relaxed text-[#5a4f4f]">
        We would love to celebrate with you. Search for your name below to continue through the RSVP demo.
      </p>

      <div className="mb-10 h-px bg-[#f0e0e4]" />
      <DemoRsvpFlow householdName="Whitfield-Harrington Household" />
    </main>
  );
}
