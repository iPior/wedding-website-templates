"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AttendanceChart, RsvpTimeline } from "@wedding/ui";

type Variant = "watercolor" | "stationery" | "cinematic";
type Section = "dashboard" | "guests" | "emails";

type Guest = {
  id: string;
  name: string;
  household: string;
  email: string;
  attending: "YES" | "NO" | "PENDING";
};

const INITIAL_GUESTS: Guest[] = [
  { id: "g1", name: "Emma Whitfield", household: "Whitfield Family", email: "emma@example.com", attending: "YES" },
  { id: "g2", name: "James Harrington", household: "Harrington Family", email: "james@example.com", attending: "YES" },
  { id: "g3", name: "Nora Patel", household: "Patel Family", email: "nora@example.com", attending: "NO" },
  { id: "g4", name: "Leo Kim", household: "Kim Household", email: "leo@example.com", attending: "PENDING" },
  { id: "g5", name: "Mia Flores", household: "Flores Household", email: "mia@example.com", attending: "YES" },
  { id: "g6", name: "Owen Reid", household: "Reid Family", email: "owen@example.com", attending: "PENDING" },
];

const TIMELINE_DATA = [
  { date: "May 01", count: 1 },
  { date: "May 04", count: 2 },
  { date: "May 08", count: 3 },
  { date: "May 11", count: 4 },
  { date: "May 14", count: 4 },
  { date: "May 18", count: 5 },
  { date: "May 21", count: 6 },
];

const THEME = {
  watercolor: {
    page: "bg-[#fff8f8] text-[#2c2424]",
    panel: "border-[#f0e0e4] bg-white/70",
    muted: "text-[#8a7f7f]",
    accent: "text-[#d4a0b0]",
    button: "bg-[#2c2424] hover:bg-[#d4a0b0] text-white",
    headingFont: "var(--font-playfair), serif",
  },
  stationery: {
    page: "bg-[#FDFBF7] text-neutral-800",
    panel: "border-neutral-200 bg-[#fffefb]",
    muted: "text-neutral-500",
    accent: "text-neutral-700",
    button: "bg-neutral-800 hover:bg-neutral-600 text-white",
    headingFont: "var(--font-display)",
  },
  cinematic: {
    page: "bg-[#fff8f8] text-[#2c2424]",
    panel: "border-[#f0e0e4] bg-[#fffaf9]",
    muted: "text-[#8a7f7f]",
    accent: "text-[#2c2424]",
    button: "bg-[#2c2424] hover:bg-[#534646] text-white",
    headingFont: "var(--font-display)",
  },
} as const;

export function MockAdminPage({ variant, section }: { variant: Variant; section: Section }) {
  const theme = THEME[variant];
  const [guests, setGuests] = useState(INITIAL_GUESTS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | "YES" | "NO" | "PENDING">("ALL");
  const [newGuestName, setNewGuestName] = useState("");
  const [sendState, setSendState] = useState<"idle" | "sending" | "done">("idle");

  const basePath = `/${variant}/admin`;

  const counts = useMemo(() => {
    const yes = guests.filter((g) => g.attending === "YES").length;
    const no = guests.filter((g) => g.attending === "NO").length;
    const pending = guests.filter((g) => g.attending === "PENDING").length;
    return { yes, no, pending };
  }, [guests]);

  const filteredGuests = useMemo(() => {
    return guests.filter((guest) => {
      const matchesSearch = !search || guest.name.toLowerCase().includes(search.toLowerCase()) || guest.household.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = status === "ALL" || guest.attending === status;
      return matchesSearch && matchesStatus;
    });
  }, [guests, search, status]);

  function addMockGuest() {
    if (!newGuestName.trim()) return;
    setGuests((current) => [
      ...current,
      {
        id: `g${current.length + 1}`,
        name: newGuestName.trim(),
        household: "New Household",
        email: "newguest@example.com",
        attending: "PENDING",
      },
    ]);
    setNewGuestName("");
  }

  async function simulateEmailSend() {
    setSendState("sending");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSendState("done");
  }

  return (
    <main className={`min-h-[calc(100vh-5rem)] ${theme.page}`}>
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className={`text-xs uppercase tracking-[0.22em] ${theme.muted}`}>Demo Admin</p>
            <h1 className="mt-1 text-4xl" style={{ fontFamily: theme.headingFont }}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)} Admin
            </h1>
          </div>
          <span className={`border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${theme.panel} ${theme.muted}`}>
            Mock Data Only
          </span>
        </div>

        <div className={`mb-8 flex gap-2 border p-2 ${theme.panel}`}>
          {[
            { key: "dashboard", label: "Dashboard", href: basePath },
            { key: "guests", label: "Guests", href: `${basePath}/guests` },
            { key: "emails", label: "Emails", href: `${basePath}/emails` },
          ].map((item) => {
            const active = section === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-2 text-[11px] uppercase tracking-[0.2em] ${
                  active ? `${theme.button}` : `${theme.muted} border border-transparent hover:border-current`
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {section === "dashboard" && (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className={`border p-4 ${theme.panel}`}>
                <p className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted}`}>Total Guests</p>
                <p className="mt-2 text-3xl" style={{ fontFamily: theme.headingFont }}>{guests.length}</p>
              </div>
              <div className={`border p-4 ${theme.panel}`}>
                <p className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted}`}>Attending</p>
                <p className={`mt-2 text-3xl ${theme.accent}`} style={{ fontFamily: theme.headingFont }}>{counts.yes}</p>
              </div>
              <div className={`border p-4 ${theme.panel}`}>
                <p className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted}`}>Pending</p>
                <p className="mt-2 text-3xl" style={{ fontFamily: theme.headingFont }}>{counts.pending}</p>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className={`border p-4 ${theme.panel}`}>
                <p className={`mb-4 text-[10px] uppercase tracking-[0.22em] ${theme.muted}`}>Attendance Split</p>
                <AttendanceChart
                  data={[
                    { name: "YES", value: counts.yes },
                    { name: "NO", value: counts.no },
                    { name: "PENDING", value: counts.pending },
                  ]}
                />
              </div>

              <div className={`border p-4 ${theme.panel}`}>
                <p className={`mb-4 text-[10px] uppercase tracking-[0.22em] ${theme.muted}`}>RSVP Timeline</p>
                <RsvpTimeline data={TIMELINE_DATA} />
              </div>
            </div>
          </div>
        )}

        {section === "guests" && (
          <div className="space-y-6">
            <div className={`border p-4 ${theme.panel}`}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search guests or household"
                  className="w-full border border-[#e6dbd0] bg-white px-3 py-2 text-sm outline-none"
                />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as typeof status)}
                  className="border border-[#e6dbd0] bg-white px-3 py-2 text-sm"
                >
                  <option value="ALL">All</option>
                  <option value="YES">Attending</option>
                  <option value="NO">Declined</option>
                  <option value="PENDING">Pending</option>
                </select>
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  placeholder="Quick add guest name"
                  className="w-full border border-[#e6dbd0] bg-white px-3 py-2 text-sm outline-none"
                />
                <button onClick={addMockGuest} className={`px-4 py-2 text-xs uppercase tracking-[0.18em] ${theme.button}`}>
                  Add
                </button>
              </div>
            </div>

            <div className={`overflow-hidden border ${theme.panel}`}>
              <table className="w-full text-left">
                <thead className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted}`}>
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Household</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map((guest) => (
                    <tr key={guest.id} className="border-t border-[#eee3d9] text-sm">
                      <td className="px-4 py-3">{guest.name}</td>
                      <td className={`px-4 py-3 ${theme.muted}`}>{guest.household}</td>
                      <td className="px-4 py-3">{guest.attending}</td>
                      <td className={`px-4 py-3 ${theme.muted}`}>{guest.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {section === "emails" && (
          <div className={`max-w-2xl border p-5 ${theme.panel}`}>
            <p className={`text-[10px] uppercase tracking-[0.2em] ${theme.muted}`}>Broadcast to 124 subscribers</p>
            <div className="mt-4 space-y-3">
              <input placeholder="Subject" className="w-full border border-[#e6dbd0] bg-white px-3 py-2 text-sm outline-none" />
              <textarea placeholder="Write your message..." rows={7} className="w-full border border-[#e6dbd0] bg-white px-3 py-2 text-sm outline-none" />
              <button
                onClick={simulateEmailSend}
                disabled={sendState === "sending"}
                className={`px-4 py-2 text-xs uppercase tracking-[0.18em] disabled:opacity-60 ${theme.button}`}
              >
                {sendState === "sending" ? "Sending..." : "Send Broadcast"}
              </button>
              {sendState === "done" && <p className={`text-xs uppercase tracking-[0.15em] ${theme.muted}`}>Mock email sent successfully.</p>}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
