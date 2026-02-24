"use client";

import { useState } from "react";

type SearchResult = {
  guests: Array<{
    id: string;
    firstName: string;
    lastName: string;
    isPrimary: boolean;
    householdId: string;
    primaryGuestName: string | null;
  }>;
};

type HouseholdData = {
  householdId: string;
  householdName: string;
  maxPlusOnes: number;
  guests: Array<{
    id: string;
    firstName: string;
    lastName: string;
    isPrimary: boolean;
    attending: string | null;
    dietaryRestrictions: string | null;
    email: string | null;
  }>;
  existingPlusOnes: Array<{
    id: string;
    firstName: string;
    lastName: string;
    dietaryRestrictions: string | null;
  }>;
};

type Props = {
  onHouseholdFound: (data: HouseholdData) => void;
  searchGuests: (firstName: string, lastName: string) => Promise<SearchResult>;
  getHouseholdForRsvp: (householdId: string) => Promise<HouseholdData | null>;
};

export function GuestSearch({ onHouseholdFound, searchGuests, getHouseholdForRsvp }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingHousehold, setLoadingHousehold] = useState(false);
  const [notPrimaryMessage, setNotPrimaryMessage] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    setLoading(true);
    setResults(null);
    setNotPrimaryMessage(null);

    const result = await searchGuests(firstName.trim(), lastName.trim());
    setResults(result);
    setLoading(false);
  }

  async function handleSelectGuest(guest: SearchResult["guests"][0]) {
    if (!guest.isPrimary) {
      setNotPrimaryMessage(
        guest.primaryGuestName
          ? `${guest.primaryGuestName} is managing the RSVP for your household. Please contact them to submit your RSVP.`
          : "The primary contact for your household manages the RSVP. Please contact them."
      );
      return;
    }

    setLoadingHousehold(true);
    const household = await getHouseholdForRsvp(guest.householdId);
    setLoadingHousehold(false);

    if (household) {
      onHouseholdFound(household);
    } else {
      setNotPrimaryMessage("Something went wrong loading your household. Please try again.");
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label
              htmlFor="firstName"
              className="block text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]"
            >
              First Name
            </label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              required
              className="w-full border border-[#c8b0b4] bg-white px-3 py-2.5 text-sm text-[#2c2424] placeholder:text-[#8a7f7f]/45 focus:border-[#d4a0b0] focus:outline-none focus:ring-0 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="lastName"
              className="block text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]"
            >
              Last Name
            </label>
            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              required
              className="w-full border border-[#c8b0b4] bg-white px-3 py-2.5 text-sm text-[#2c2424] placeholder:text-[#8a7f7f]/45 focus:border-[#d4a0b0] focus:outline-none focus:ring-0 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2c2424] py-3.5 text-[0.7rem] uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#d4a0b0] disabled:opacity-50"
        >
          {loading ? "Searching..." : "Find My Invitation"}
        </button>
      </form>

      {notPrimaryMessage && (
        <div className="border border-[#f0e0e4] bg-[#fdf6f8] px-5 py-4 text-sm text-[#5a4f4f]">
          {notPrimaryMessage}
        </div>
      )}

      {results && results.guests.length === 0 && (
        <div className="border border-[#f0e0e4] bg-[#fdf6f8] px-5 py-4 text-sm text-[#5a4f4f]">
          We couldn&apos;t find your name. Please check the spelling and try again,
          or contact the couple for help.
        </div>
      )}

      {results && results.guests.length > 0 && !notPrimaryMessage && (
        <div className="space-y-3">
          <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#8a7f7f]">
            Select your name
          </p>
          {results.guests.map((guest) => (
            <button
              key={guest.id}
              onClick={() => handleSelectGuest(guest)}
              disabled={loadingHousehold}
              className="group w-full border border-[#f0e0e4] px-5 py-4 text-left transition-all hover:border-[#d4a0b0] hover:shadow-sm hover:-translate-y-px disabled:opacity-50"
            >
              <span
                className="text-lg text-[#2c2424]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {guest.firstName} {guest.lastName}
              </span>
              {!guest.isPrimary && (
                <span className="ml-3 text-[0.62rem] uppercase tracking-[0.15em] text-[#8a7f7f]">
                  household member
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export type { SearchResult, HouseholdData };
