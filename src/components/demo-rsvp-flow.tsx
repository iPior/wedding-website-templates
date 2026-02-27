"use client";

import { useState } from "react";

type Step = "search" | "form" | "confirmed";

type Guest = {
  id: string;
  firstName: string;
  lastName: string;
  attending: "YES" | "NO" | "";
  dietaryRestrictions: string;
  isPrimary?: boolean;
};

const DEFAULT_GUESTS: Guest[] = [
  {
    id: "g1",
    firstName: "Emma",
    lastName: "Whitfield",
    attending: "YES",
    dietaryRestrictions: "",
    isPrimary: true,
  },
  {
    id: "g2",
    firstName: "James",
    lastName: "Harrington",
    attending: "",
    dietaryRestrictions: "",
  },
];

type Props = {
  householdName?: string;
};

export function DemoRsvpFlow({ householdName = "Whitfield-Harrington Household" }: Props) {
  const [step, setStep] = useState<Step>("search");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("guest@example.com");
  const [error, setError] = useState<string | null>(null);
  const [guests, setGuests] = useState<Guest[]>(DEFAULT_GUESTS);

  function updateGuest(index: number, field: keyof Guest, value: string) {
    setGuests((prev) => prev.map((guest, i) => (i === index ? { ...guest, [field]: value } : guest)));
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;
    setStep("form");
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    for (const guest of guests) {
      if (!guest.attending) {
        setError(`Please choose attendance for ${guest.firstName} ${guest.lastName}.`);
        return;
      }
    }

    setStep("confirmed");
  }

  if (step === "confirmed") {
    return (
      <div className="py-8 text-center">
        <p className="mb-6 text-3xl text-[#d4a0b0]" style={{ fontFamily: "var(--font-playfair), serif" }}>
          &amp;
        </p>
        <h2 className="mb-4 text-4xl text-[#2c2424]" style={{ fontFamily: "var(--font-playfair), serif" }}>
          Thank You
        </h2>
        <div className="mx-auto my-6 h-px w-16 bg-[#f0e0e4]" />
        <p className="mx-auto max-w-md text-sm leading-relaxed text-[#5a4f4f]">
          Your demo RSVP has been submitted. This is a static showcase flow for presentation purposes.
        </p>
      </div>
    );
  }

  if (step === "search") {
    return (
      <form onSubmit={handleSearchSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
              First Name
            </label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
              className="w-full border border-[#c8b0b4] bg-white px-3 py-2.5 text-sm text-[#2c2424] placeholder:text-[#8a7f7f]/45 focus:border-[#d4a0b0] focus:outline-none focus:ring-0"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
              Last Name
            </label>
            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              required
              className="w-full border border-[#c8b0b4] bg-white px-3 py-2.5 text-sm text-[#2c2424] placeholder:text-[#8a7f7f]/45 focus:border-[#d4a0b0] focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#2c2424] py-3.5 text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#d4a0b0]"
        >
          Find My Invitation
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => setStep("search")}
        className="inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f] transition-colors hover:text-[#2c2424]"
      >
        <span aria-hidden="true">&larr;</span>
        Back to search
      </button>

      <form onSubmit={handleFormSubmit} className="space-y-8">
        <div>
          <h2 className="text-3xl text-[#2c2424]" style={{ fontFamily: "var(--font-playfair), serif" }}>
            {householdName}
          </h2>
          <p className="mt-2 text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
            Static demo form
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
            Your Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-[#c8b0b4] bg-white px-3 py-2.5 text-sm text-[#2c2424] placeholder:text-[#8a7f7f]/45 focus:border-[#d4a0b0] focus:outline-none focus:ring-0"
          />
        </div>

        <div className="h-px bg-[#f0e0e4]" />

        <div className="space-y-8">
          {guests.map((guest, index) => (
            <div key={guest.id}>
              {index > 0 && <div className="mb-8 h-px bg-[#f0e0e4]" />}
              <div className="space-y-5">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-xl text-[#2c2424]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    {guest.firstName} {guest.lastName}
                  </h3>
                  {guest.isPrimary && (
                    <span className="text-[0.6rem] uppercase tracking-[0.15em] text-[#d4a0b0]">Primary</span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
                    Will you be attending?
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => updateGuest(index, "attending", "YES")}
                      className={`flex-1 border py-3 text-[0.7rem] uppercase tracking-[0.15em] transition-all ${
                        guest.attending === "YES"
                          ? "border-[#2c2424] bg-[#2c2424] text-white"
                          : "border-[#d4a0b0] bg-[#d4a0b0] text-white hover:bg-[#c8909e]"
                      }`}
                    >
                      Joyfully Accepts
                    </button>
                    <button
                      type="button"
                      onClick={() => updateGuest(index, "attending", "NO")}
                      className={`flex-1 border py-3 text-[0.7rem] uppercase tracking-[0.15em] transition-all ${
                        guest.attending === "NO"
                          ? "border-[#8a6060] bg-[#8a6060] text-white"
                          : "border-[#c4a0a0] bg-[#c4a0a0] text-white hover:bg-[#b08888]"
                      }`}
                    >
                      Regretfully Declines
                    </button>
                  </div>
                </div>

                {guest.attending === "YES" && (
                  <div className="space-y-2">
                    <label className="block text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
                      Dietary Restrictions
                    </label>
                    <textarea
                      value={guest.dietaryRestrictions}
                      onChange={(e) => updateGuest(index, "dietaryRestrictions", e.target.value)}
                      rows={2}
                      className="w-full resize-none border border-[#c8b0b4] bg-white px-3 py-2.5 text-sm text-[#2c2424] placeholder:text-[#8a7f7f]/45 focus:border-[#d4a0b0] focus:outline-none focus:ring-0"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {error && <div className="border border-[#f0e0e4] bg-[#fdf6f8] px-5 py-4 text-sm text-[#5a4f4f]">{error}</div>}

        <button
          type="submit"
          className="w-full bg-[#2c2424] py-3.5 text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#d4a0b0]"
        >
          Submit RSVP
        </button>
      </form>
    </div>
  );
}
