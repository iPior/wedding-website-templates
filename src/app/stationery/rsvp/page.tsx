import { DemoRsvpFlow } from "@/components/demo-rsvp-flow";

export default function StationeryRsvpPage() {
  return (
    <>
      <style>{`
        .rsvp-v1 h1,
        .rsvp-v1 h2,
        .rsvp-v1 h3,
        .rsvp-v1 h4 {
          font-family: var(--font-display) !important;
          font-weight: 300 !important;
          letter-spacing: 0.06em !important;
        }
        .rsvp-v1 label {
          font-family: var(--font-display) !important;
          font-size: 0.62rem !important;
          text-transform: uppercase !important;
          letter-spacing: 0.22em !important;
          color: rgb(115 115 115) !important;
        }
        .rsvp-v1 input,
        .rsvp-v1 textarea {
          border-radius: 0 !important;
          border-color: rgba(200, 200, 195, 0.6) !important;
          background-color: rgba(253, 251, 247, 0.5) !important;
          font-family: var(--font-body) !important;
          font-size: 0.875rem !important;
        }
        .rsvp-v1 input:focus-visible,
        .rsvp-v1 textarea:focus-visible {
          outline: none !important;
          box-shadow: 0 0 0 1px rgba(140, 140, 130, 0.4) !important;
          border-color: rgba(140, 140, 130, 0.6) !important;
        }
        .rsvp-v1 button {
          border-radius: 0 !important;
          letter-spacing: 0.12em !important;
          font-family: var(--font-display) !important;
          font-size: 0.7rem !important;
          text-transform: uppercase !important;
        }
      `}</style>

      <div className="space-y-12 text-center">
        <div className="space-y-4" style={{ animation: "fadeIn 1s ease-out forwards", opacity: 0 }}>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-light tracking-wide text-neutral-800 sm:text-5xl">
            Respond
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-neutral-300/50" />
            <span className="text-xs text-neutral-300">✽</span>
            <div className="h-px w-12 bg-neutral-300/50" />
          </div>
          <p className="font-[family-name:var(--font-body)] text-sm italic text-neutral-500">
            Search for your name to get started.
          </p>
        </div>

        <div className="rsvp-v1 mx-auto max-w-lg text-left" style={{ animation: "fadeIn 1s ease-out 0.3s forwards", opacity: 0 }}>
          <DemoRsvpFlow householdName="The Whitfield Family" />
        </div>
      </div>
    </>
  );
}
