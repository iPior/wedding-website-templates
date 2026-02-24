"use client";

import { useRouter, useSearchParams } from "next/navigation";

const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "YES", label: "Attending" },
  { value: "NO", label: "Declined" },
  { value: "PENDING", label: "Pending" },
];

export function GuestFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";
  const currentStatus = searchParams.get("status") ?? "";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <input
          placeholder="Search by name..."
          defaultValue={currentSearch}
          onChange={(e) => updateParams("search", e.target.value)}
          className="w-full border border-[#f0e0e4] bg-white/60 px-3 py-2 text-sm text-[#2c2424] outline-none transition-colors focus:border-[#d4a0b0] placeholder:text-[#8a7f7f]/40"
        />
      </div>
      <div className="flex gap-1">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => updateParams("status", opt.value)}
            className={`px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${
              currentStatus === opt.value
                ? "bg-[#2c2424] text-[#fff8f8]"
                : "border border-[#f0e0e4] text-[#8a7f7f] hover:border-[#2c2424] hover:text-[#2c2424]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
