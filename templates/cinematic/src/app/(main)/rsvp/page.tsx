import { RsvpFlow } from "@wedding/ui";
import { searchGuests, getHouseholdForRsvp, submitRsvp, modifyRsvp } from "@/actions/rsvp";

export default function RsvpPage() {
  return (
    <>
      <style>{`
        /* ── Variant 2: Romantic / Pink Cream ── */
        .rsvp-v2 h1,
        .rsvp-v2 h2,
        .rsvp-v2 h3,
        .rsvp-v2 h4 {
          font-family: var(--font-display) !important;
          text-transform: uppercase !important;
          letter-spacing: 0.12em !important;
          font-weight: 400 !important;
        }
        .rsvp-v2 label {
          font-family: var(--font-display) !important;
          font-size: 0.62rem !important;
          text-transform: uppercase !important;
          letter-spacing: 0.28em !important;
          color: #8a7f7f !important;
        }
        .rsvp-v2 input,
        .rsvp-v2 textarea {
          border-color: #f0e0e4 !important;
          background-color: transparent !important;
          color: #2c2424 !important;
        }
        .rsvp-v2 input:focus-visible,
        .rsvp-v2 textarea:focus-visible {
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(212, 160, 176, 0.25) !important;
          border-color: #d4a0b0 !important;
        }
        .rsvp-v2 input::placeholder,
        .rsvp-v2 textarea::placeholder {
          color: rgba(138, 127, 127, 0.5) !important;
          font-size: 0.8rem !important;
          font-style: italic !important;
        }
        .rsvp-v2 button[type="submit"] {
          background: #2c2424 !important;
          color: white !important;
          border-radius: 0 !important;
          letter-spacing: 0.2em !important;
          text-transform: uppercase !important;
          font-size: 0.68rem !important;
          font-family: var(--font-display) !important;
        }
        .rsvp-v2 button[type="submit"]:hover {
          background: #3d3030 !important;
        }
        .rsvp-v2 button[type="button"] {
          border-radius: 0 !important;
          font-family: var(--font-display) !important;
          font-size: 0.7rem !important;
          letter-spacing: 0.1em !important;
          text-transform: uppercase !important;
          border-color: #f0e0e4 !important;
        }
        .rsvp-v2 [data-variant="default"],
        .rsvp-v2 button.bg-primary {
          background: #2c2424 !important;
          border-color: #2c2424 !important;
        }
        .rsvp-v2 [class*="rounded-md"],
        .rsvp-v2 [class*="rounded-lg"] {
          border-radius: 0 !important;
        }
        .rsvp-v2 hr,
        .rsvp-v2 [role="separator"] {
          border-color: #f0e0e4 !important;
        }
        .rsvp-v2 [class*="border"] {
          border-color: #f0e0e4 !important;
        }
        .rsvp-v2 p {
          color: #8a7f7f !important;
          font-size: 0.82rem !important;
        }
        .rsvp-v2 .text-muted-foreground {
          color: #8a7f7f !important;
        }
      `}</style>

      {/* Page Header */}
      <section className="flex min-h-[25vh] items-center justify-center bg-[#fff8f8] px-6 text-center">
        <div>
          <h1
            className="text-4xl uppercase tracking-[0.3em] text-[#2c2424] sm:text-5xl lg:text-6xl"
            style={{
              fontFamily: "var(--font-display)",
              animation: "fadeInUp 1.2s ease forwards",
              animationDelay: "0.3s",
              opacity: 0,
            }}
          >
            RSVP
          </h1>
          <div className="mx-auto mt-6 overflow-hidden">
            <div
              className="mx-auto h-[2px] bg-[#d4a0b0]"
              style={{
                animation: "grow 0.8s ease forwards",
                animationDelay: "1s",
                width: 0,
                maxWidth: "6rem",
              }}
            />
          </div>
          <p
            className="mt-4 text-[11px] font-light uppercase tracking-[0.3em] text-[#8a7f7f]"
            style={{
              animation: "fadeInUp 1s ease forwards",
              animationDelay: "1.3s",
              opacity: 0,
            }}
          >
            Please let us know if you can make it
          </p>
        </div>
      </section>

      {/* RSVP Form */}
      <section className="border-t border-[#f0e0e4] bg-[#fff8f8] py-14 sm:py-20">
        <div
          className="mx-auto max-w-3xl px-6 rsvp-v2"
          style={{
            animation: "fadeInUp 1s ease forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <RsvpFlow
            searchGuests={searchGuests}
            getHouseholdForRsvp={getHouseholdForRsvp}
            submitRsvp={submitRsvp}
            modifyRsvp={modifyRsvp}
          />
        </div>
      </section>
    </>
  );
}
