"use client";

import { useState } from "react";
import type { HouseholdData } from "./guest-search";

type SubmitRsvpInput = {
  householdId: string;
  email: string;
  guests: Array<{
    id: string;
    attending: "YES" | "NO";
    dietaryRestrictions?: string;
  }>;
  plusOnes: Array<{
    firstName: string;
    lastName: string;
    dietaryRestrictions?: string;
  }>;
};

type RsvpResult = {
  success: boolean;
  error?: string;
  alreadySubmitted?: boolean;
};

type GuestFormData = {
  id: string;
  firstName: string;
  lastName: string;
  attending: "YES" | "NO" | "";
  dietaryRestrictions: string;
};

type PlusOneFormData = {
  firstName: string;
  lastName: string;
  dietaryRestrictions: string;
};

type Props = {
  household: HouseholdData;
  modifyToken?: string;
  onSuccess: () => void;
  submitRsvp: (input: SubmitRsvpInput) => Promise<RsvpResult>;
  modifyRsvp: (input: SubmitRsvpInput & { token: string }) => Promise<RsvpResult>;
};

export function RsvpForm({ household, modifyToken, onSuccess, submitRsvp, modifyRsvp }: Props) {
  const primaryGuest = household.guests.find((g) => g.isPrimary);

  const [email, setEmail] = useState(primaryGuest?.email ?? "");
  const [guests, setGuests] = useState<GuestFormData[]>(
    household.guests.map((g) => ({
      id: g.id,
      firstName: g.firstName,
      lastName: g.lastName,
      attending: (g.attending === "YES" || g.attending === "NO" ? g.attending : "") as GuestFormData["attending"],
      dietaryRestrictions: g.dietaryRestrictions ?? "",
    }))
  );
  const [plusOnes, setPlusOnes] = useState<PlusOneFormData[]>(
    household.existingPlusOnes.map((p) => ({
      firstName: p.firstName,
      lastName: p.lastName,
      dietaryRestrictions: p.dietaryRestrictions ?? "",
    }))
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateGuest(index: number, field: keyof GuestFormData, value: string) {
    setGuests((prev) =>
      prev.map((g, i) => (i === index ? { ...g, [field]: value } : g))
    );
  }

  function addPlusOne() {
    if (plusOnes.length >= household.maxPlusOnes) return;
    setPlusOnes((prev) => [
      ...prev,
      { firstName: "", lastName: "", dietaryRestrictions: "" },
    ]);
  }

  function removePlusOne(index: number) {
    setPlusOnes((prev) => prev.filter((_, i) => i !== index));
  }

  function updatePlusOne(index: number, field: keyof PlusOneFormData, value: string) {
    setPlusOnes((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    for (const guest of guests) {
      if (!guest.attending) {
        setError(`Please select attending status for ${guest.firstName} ${guest.lastName}`);
        return;
      }
    }

    for (let i = 0; i < plusOnes.length; i++) {
      const po = plusOnes[i];
      if (!po.firstName.trim() || !po.lastName.trim()) {
        setError(`Please enter a name for plus-one #${i + 1}`);
        return;
      }
    }

    setLoading(true);

    const input: SubmitRsvpInput = {
      householdId: household.householdId,
      email: email.trim(),
      guests: guests.map((g) => ({
        id: g.id,
        attending: g.attending as "YES" | "NO",
        dietaryRestrictions: g.dietaryRestrictions || undefined,
      })),
      plusOnes: plusOnes
        .filter((p) => p.firstName.trim())
        .map((p) => ({
          firstName: p.firstName.trim(),
          lastName: p.lastName.trim(),
          dietaryRestrictions: p.dietaryRestrictions || undefined,
        })),
    };

    let result: RsvpResult;
    if (modifyToken) {
      result = await modifyRsvp({ ...input, token: modifyToken });
    } else {
      result = await submitRsvp(input);
    }

    setLoading(false);

    if (result.success) {
      onSuccess();
    } else {
      setError(result.error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div>
        <h2
          className="text-3xl text-[#2c2424]"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {household.householdName}
        </h2>
        <p className="mt-2 text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
          {modifyToken ? "Update your RSVP below" : "Please respond for each guest in your household"}
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]"
        >
          Your Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full border border-[#c8b0b4] bg-white px-3 py-2.5 text-sm text-[#2c2424] placeholder:text-[#8a7f7f]/45 focus:border-[#d4a0b0] focus:outline-none focus:ring-0 transition-colors"
        />
        <p className="text-xs text-[#8a7f7f]">
          We&apos;ll send a confirmation with a link to modify your RSVP.
        </p>
      </div>

      <div className="h-px bg-[#f0e0e4]" />

      {/* Guests */}
      <div className="space-y-8">
        {guests.map((guest, index) => (
          <div key={guest.id}>
            {index > 0 && <div className="h-px bg-[#f0e0e4] mb-8" />}
            <div className="space-y-5">
              <div className="flex items-baseline gap-3">
                <h3
                  className="text-xl text-[#2c2424]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {guest.firstName} {guest.lastName}
                </h3>
                {household.guests[index]?.isPrimary && (
                  <span className="text-[0.6rem] uppercase tracking-[0.15em] text-[#d4a0b0]">
                    Primary
                  </span>
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
                    className={`flex-1 py-3 text-[0.7rem] uppercase tracking-[0.15em] border transition-all ${
                      guest.attending === "YES"
                        ? "bg-[#2c2424] text-white border-[#2c2424]"
                        : "bg-[#d4a0b0] text-white border-[#d4a0b0] hover:bg-[#c8909e]"
                    }`}
                  >
                    Joyfully Accepts
                  </button>
                  <button
                    type="button"
                    onClick={() => updateGuest(index, "attending", "NO")}
                    className={`flex-1 py-3 text-[0.7rem] uppercase tracking-[0.15em] border transition-all ${
                      guest.attending === "NO"
                        ? "bg-[#8a6060] text-white border-[#8a6060]"
                        : "bg-[#c4a0a0] text-white border-[#c4a0a0] hover:bg-[#b08888]"
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
                    placeholder="Any allergies or dietary restrictions..."
                    rows={2}
                    className="w-full border border-[#c8b0b4] bg-white px-3 py-2.5 text-sm text-[#2c2424] placeholder:text-[#8a7f7f]/45 focus:border-[#d4a0b0] focus:outline-none focus:ring-0 transition-colors resize-none"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Plus-Ones */}
      {household.maxPlusOnes > 0 && (
        <>
          <div className="h-px bg-[#f0e0e4]" />
          <div className="space-y-6">
            <div className="flex items-baseline justify-between">
              <div>
                <h3
                  className="text-xl text-[#2c2424]"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Additional Guests
                </h3>
                <p className="mt-1 text-xs text-[#8a7f7f]">
                  You may bring up to {household.maxPlusOnes} additional guest{household.maxPlusOnes > 1 ? "s" : ""}.
                </p>
              </div>
              {plusOnes.length < household.maxPlusOnes && (
                <button
                  type="button"
                  onClick={addPlusOne}
                  className="bg-[#f0e0e4] border border-[#f0e0e4] px-4 py-2 text-[0.65rem] uppercase tracking-[0.15em] text-[#5a4f4f] transition-colors hover:bg-[#e8d0d6]"
                >
                  + Add Guest
                </button>
              )}
            </div>

            {plusOnes.map((po, index) => (
              <div key={index} className="space-y-4 border-l-2 border-[#f0e0e4] pl-5">
                <div className="flex items-baseline justify-between">
                  <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
                    Guest {index + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removePlusOne(index)}
                    className="text-[0.62rem] uppercase tracking-[0.15em] text-[#d4a0b0] hover:text-[#2c2424] transition-colors"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
                      First Name
                    </label>
                    <input
                      value={po.firstName}
                      onChange={(e) => updatePlusOne(index, "firstName", e.target.value)}
                      required
                      className="w-full border border-[#c8b0b4] bg-white px-3 py-2.5 text-sm text-[#2c2424] placeholder:text-[#8a7f7f]/45 focus:border-[#d4a0b0] focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
                      Last Name
                    </label>
                    <input
                      value={po.lastName}
                      onChange={(e) => updatePlusOne(index, "lastName", e.target.value)}
                      required
                      className="w-full border border-[#c8b0b4] bg-white px-3 py-2.5 text-sm text-[#2c2424] placeholder:text-[#8a7f7f]/45 focus:border-[#d4a0b0] focus:outline-none focus:ring-0 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
                    Dietary Restrictions
                  </label>
                  <textarea
                    value={po.dietaryRestrictions}
                    onChange={(e) => updatePlusOne(index, "dietaryRestrictions", e.target.value)}
                    placeholder="Any allergies or dietary restrictions..."
                    rows={2}
                    className="w-full border border-[#c8b0b4] bg-white px-3 py-2.5 text-sm text-[#2c2424] placeholder:text-[#8a7f7f]/45 focus:border-[#d4a0b0] focus:outline-none focus:ring-0 transition-colors resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {error && (
        <div className="border border-[#f0e0e4] bg-[#fdf6f8] px-5 py-4 text-sm text-[#5a4f4f]">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#2c2424] py-3.5 text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#d4a0b0] disabled:opacity-50"
      >
        {loading
          ? "Submitting..."
          : modifyToken
            ? "Update RSVP"
            : "Submit RSVP"}
      </button>
    </form>
  );
}

export type { SubmitRsvpInput, RsvpResult };
