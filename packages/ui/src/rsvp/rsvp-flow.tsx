"use client";

import { useState } from "react";
import type { HouseholdData, SearchResult } from "./guest-search";
import type { SubmitRsvpInput, RsvpResult } from "./rsvp-form";
import { GuestSearch } from "./guest-search";
import { RsvpForm } from "./rsvp-form";

type Props = {
  searchGuests: (firstName: string, lastName: string) => Promise<SearchResult>;
  getHouseholdForRsvp: (householdId: string) => Promise<HouseholdData | null>;
  submitRsvp: (input: SubmitRsvpInput) => Promise<RsvpResult>;
  modifyRsvp: (input: SubmitRsvpInput & { token: string }) => Promise<RsvpResult>;
};

type Step = "search" | "form" | "confirmed";

export function RsvpFlow({ searchGuests, getHouseholdForRsvp, submitRsvp, modifyRsvp }: Props) {
  const [step, setStep] = useState<Step>("search");
  const [household, setHousehold] = useState<HouseholdData | null>(null);

  function handleHouseholdFound(data: HouseholdData) {
    setHousehold(data);
    setStep("form");
  }

  function handleSuccess() {
    setStep("confirmed");
  }

  function handleBack() {
    setStep("search");
    setHousehold(null);
  }

  if (step === "search") {
    return (
      <GuestSearch
        onHouseholdFound={handleHouseholdFound}
        searchGuests={searchGuests}
        getHouseholdForRsvp={getHouseholdForRsvp}
      />
    );
  }

  if (step === "form" && household) {
    return (
      <div className="space-y-6">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f] transition-colors hover:text-[#2c2424]"
        >
          <span aria-hidden="true">&larr;</span>
          Back to search
        </button>
        <RsvpForm
          household={household}
          onSuccess={handleSuccess}
          submitRsvp={submitRsvp}
          modifyRsvp={modifyRsvp}
        />
      </div>
    );
  }

  if (step === "confirmed") {
    return (
      <div className="py-8 text-center">
        <p className="text-[#d4a0b0] text-3xl mb-6" style={{ fontFamily: "var(--font-playfair), serif" }}>
          &amp;
        </p>
        <h2
          className="text-4xl text-[#2c2424] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Thank You
        </h2>
        <div className="mx-auto my-6 h-px w-16 bg-[#f0e0e4]" />
        <p className="text-sm leading-relaxed text-[#5a4f4f] max-w-md mx-auto">
          Your RSVP has been submitted. You&apos;ll receive a confirmation email
          with a link to modify your response if needed.
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[#8a7f7f]">
          We are excited to celebrate with you
        </p>
      </div>
    );
  }

  return null;
}
